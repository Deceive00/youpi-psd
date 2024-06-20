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
import { AuthController } from "@lib/controller/auth-controller";

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
  logout: any;
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
      setIsLoading(true);
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
        });
        if (!matchingVendorFound) {
          console.error("No matching vendor found in campus");
          throw new Error("Vendor not found");
        } else {
          return;
        }
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

  const logout = async () => {
    await AuthController.logout()
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
      await AuthController.login(email, password)
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
      await AuthController.register(regisData, userType);
    },
    {
      onSuccess: () => {
        console.log("Register succesful");
        
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
