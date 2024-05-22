import { AuthState, User, UserRegis } from "@lib/types/user-types";
import { ReactNode, createContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase-config";
import { queryClient } from "@lib/settings/query-settings";
interface AuthContextProviderProps {
  children: ReactNode;
}

export type AuthContextType = {
  user: User | null;
  authState: AuthState;
  login: ({email, password} : {email : string, password: string}) => any;
  logout: () => Promise<void>;
  register: (userRegisData: UserRegis) => any;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  authState: AuthState.NotAuthenthicated,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  isLoading: false,
});

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {

  const [user, setUser] = useState<User | null>(null);
  const [authState, setAuthState] = useState<AuthState>(AuthState.NotAuthenthicated);

  const logout = () : Promise<void> => {
    return new Promise((resolve, reject) => {
      signOut(auth).then(() => {
        console.log("Sign out succesful");
        setUser(null);
        setAuthState(AuthState.NotAuthenthicated);
        queryClient.invalidateQueries(['userData']);
        resolve();
        window.location.reload()
      }).catch((logoutError) => {
        console.log('Error logging out : ', logoutError);
        reject(logoutError);
      })
    })
  };

  const {
    mutate: login,
    isLoading: loginLoading,
  } = useMutation(
    async ({email, password} : {email : string, password: string}) => {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if(user){
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data() as User;
        setUser(userData);
        queryClient.invalidateQueries(['userData']);
      }
      else{
        throw new Error("Not authenticated")
      }
    },
    {
      onSuccess: () => {
        console.log("User created succesfully");
      },
      onError: (error: any) => {
        console.error("Error creating user:", error.message);
      },
    }
  );
  const {
    mutate: register,
    isLoading: createLoading,
  } = useMutation(
    async (userData: UserRegis) => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const userRef = doc(db, "users", userCredential.user.uid);
      const res = await setDoc(userRef, {
        isSender: false,
        ...userData,
      });
      return res;
    },
    {
      onSuccess: (user) => {
        console.log("User created:", user);
      },
      onError: (error: any) => {
        console.error("Error creating user:", error.message);
      },
    }
  );

  const { isLoading } = useQuery(
    ["userData"],
    async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          return userDoc.data() as User;
        } else {
          throw new Error("No user data found");
        }
      }
      throw new Error("No current user");
    
    },
    {
      retry: false,
      staleTime: 0,
      onSuccess: (userData: User) => {
        setUser(userData);
        setAuthState(AuthState.Authenticated);
      },
      onError: (error: Error) => {
        console.error("Error fetching user data:", error.message);
        setAuthState(AuthState.NotAuthenthicated);
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
