import { AuthState, User, UserRegis } from "@lib/types/user-types";
import { ReactNode, createContext, useState, useEffect } from "react";
import { useMutation } from "react-query";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase-config";
import { queryClient } from "@lib/settings/query-settings";
import { useToast } from "@components/ui/use-toast";

interface AuthContextProviderProps {
  children: ReactNode;
}

export type AuthContextType = {
  user: User | null;
  authState: AuthState;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => any;
  logout: () => Promise<void>;
  register: ({userRegisData, successCallback} : {userRegisData: UserRegis, successCallback : any}) => any;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  authState: AuthState.NotAuthenticated,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  isLoading: false,
});

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [authState, setAuthState] = useState<AuthState>(
    AuthState.NotAuthenticated
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  const fetchUserData = async (uid?: string) => {
    if (!uid) return;
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        setUser(userData);
        setAuthState(AuthState.Authenticated);
        queryClient.invalidateQueries(["userData"]);
      } else {
        throw new Error("No user data found");
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
    isLoading: loginLoading,
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
        console.log(currentUser);
      }
    },
    {
      onSuccess: () => {
        console.log("User logged in successfully");
        setAuthState(AuthState.Authenticated)
        window.location.href = '/';
      },
      onError: (error: any) => {
        console.log('tolong')
        console.error("Error logging in user:", error.message);
        setAuthState(AuthState.NotAuthenticated);
        toast({
          title: "Login Failed",
          description: "Something went wrong",
          variant: "error",
        })
        throw error;
      },
    }
  );

  const {
    mutate: register,
    isLoading: createLoading,
  } = useMutation(
    async ({userRegisData, successCallback} : {userRegisData: UserRegis, successCallback : any}) => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userRegisData.email,
        userRegisData.password
      );
      const userRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userRef, {
        isSender: false,
        ...userRegisData,
      });
      return userCredential;
    },
    {
      onSuccess: (userCredential) => {
        if (userCredential.user) {
          fetchUserData(userCredential.user.uid);
        }
        console.log("User created:", userCredential.user);
        toast({
          title: "Register Successful!",
          description: "Your account has been created",
          variant: "success",
        })
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

  return (
    <AuthContext.Provider
      value={{
        isLoading: isLoading || createLoading || loginLoading,
        user,
        authState,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
