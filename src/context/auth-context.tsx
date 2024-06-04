import { AuthState, User, UserRegis, UserType } from "@lib/types/user-types";
import { ReactNode, createContext, useState, useEffect } from "react";
import { useMutation } from "react-query";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase-config";
import { queryClient } from "@lib/settings/query-settings";
import { useToast } from "@components/ui/use-toast";
import { Vendor, VendorRegis } from "@lib/types/vendor-types";

interface AuthContextProviderProps {
  children: ReactNode;
}

export type AuthContextType = {
  user: User | Vendor | null;
  authState: AuthState;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => any;
  logout: () => Promise<void>;
  register: ({ regisData, userType }: { regisData: UserRegis | VendorRegis, userType: UserType }) => any;
  isLoading: boolean;
  userType: UserType;
  getUserId: () => string | null;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  authState: AuthState.NotAuthenticated,
  login: async () => { },
  logout: async () => { },
  register: async () => { },
  isLoading: false,
  userType: UserType.USER,
  getUserId: () => null, 
});

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [user, setUser] = useState<User | Vendor | null>(null);
  const [userType, setUserType] = useState<UserType>(UserType.USER);
  const [authState, setAuthState] = useState<AuthState>(
    AuthState.NotAuthenticated
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  const fetchUserData = async (uid?: string) => {
    if (!uid || user) return;
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        setUser(userData);
        setAuthState(AuthState.Authenticated);
        setUserType(UserType.USER);
        return;
      } else {
        const campusQuerySnapshot = await getDocs(collection(db, "campus"));
        let matchingVendorFound = false;
        campusQuerySnapshot.forEach((campusDoc) => {
          const campusData = campusDoc.data();
          for (const vendor of campusData.vendors || []) {
            if (vendor.id === uid) {
              matchingVendorFound = true;
              setUser(vendor as Vendor);
              setAuthState(AuthState.Authenticated);
              setUserType(UserType.VENDOR);
              break;
            }
          }

          if (!matchingVendorFound) {
            console.error("No matching vendor found in campus");
            throw new Error("Vendor not found");
          } else {
            return;
          }
        });
      }
    } catch (error: any) {
      console.error("Error fetching user data:", error.message);
      setUser(null);
      setAuthState(AuthState.NotAuthenticated);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData(auth?.currentUser?.uid);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        fetchUserData(currentUser.uid);
      } else {
        setUser(null);
        setAuthState(AuthState.NotAuthenticated);
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const logout = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      signOut(auth)
        .then(() => {
          console.log("Sign out successful");
          setUser(null);
          setAuthState(AuthState.NotAuthenticated);
          setUserType(UserType.USER);
          queryClient.invalidateQueries(["userData"]);
          resolve();
          window.location.reload();
        })
        .catch((logoutError) => {
          console.log("Error logging out : ", logoutError);
          reject(logoutError);
        });
    });
  };

  const {
    mutate: login,
  } = useMutation(
    async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      await signInWithEmailAndPassword(auth, email, password);
      const currentUser = auth.currentUser;
      if (currentUser) {
        fetchUserData(currentUser.uid);
      }
    },
    {
      onSuccess: () => {
        console.log("User logged in successfully");
        setAuthState(AuthState.Authenticated)
        window.location.href = '/';
        setIsLoading(false);
      },
      onError: (error: any) => {
        console.error("Error logging in user:", error.message);
        setAuthState(AuthState.NotAuthenticated);
        toast({
          title: "Login Failed",
          description: "Something went wrong",
          variant: "error",
        })
        setIsLoading(false);
        throw error;
      },
    }
  );

  const {
    mutate: register,
  } = useMutation(
    async ({ regisData, userType }: { regisData: UserRegis | VendorRegis, userType: UserType }) => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        regisData.email,
        regisData.password
      );
      if (userType === UserType.USER) {
        let data = regisData as UserRegis;
        const { password, confirmationPassword, ...dataWithoutPasswords } = data;
        const userRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userRef, {
          isSender: false,
          ...dataWithoutPasswords,
        });
        return;
      }
      else if (userType === UserType.VENDOR) {
        let data = regisData as VendorRegis;
        const { password, confirmationPassword, ...dataWithoutPasswords } = data;
        const campusDocRef = doc(db, "campus", data.campusName);
        const campusDoc = await getDoc(campusDocRef);

        if (campusDoc.exists()) {
          const newVendorData = {
            rating: 0,
            review: 0,
            id: userCredential.user.uid,
            categories: [],
            ...dataWithoutPasswords
          };

          await updateDoc(campusDocRef, {
            vendors: arrayUnion(newVendorData),
          });

          return;
        } else {
          throw new Error("Campus document not found");
        }
      }
    },
    {
      onSuccess: () => {
        toast({
          title: "Register Successful!",
          description: "Your account has been created",
          variant: "success",
        })
          ;
      },
      onError: (error: any) => {
        console.error("Error creating user:", error.message);
        toast({
          title: "Register Failed",
          description: "Something went wrong",
          variant: "error",
        })
        throw error;
      },
    }
  );

  const getUserId = (): string | null => {
    return auth.currentUser ? auth.currentUser.uid : null;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading: isLoading,
        user,
        authState,
        login,
        userType,
        logout,
        register,
        getUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
