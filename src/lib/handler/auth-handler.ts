import { AuthFactory } from "@lib/factory/auth-factory";
import { AuthRepository } from "@lib/repository/auth-repository";
import { UserRegis, UserType } from "@lib/types/user-types";
import { VendorRegis } from "@lib/types/vendor-types"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc } from "firebase/firestore";
import { auth, db } from "src/firebase/firebase-config";

export const AuthHandler = {
  getUserByID : async (userId: string) => {
    return await AuthRepository.fetchUserByID(userId);
  },
  register : async (regisData: UserRegis | VendorRegis, userType: UserType ) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      regisData.email,
      regisData.password
    );
    if (userType === UserType.USER) {
      let data = regisData as UserRegis;
      const { password, confirmationPassword, ...dataWithoutPasswords } = data;
      await AuthRepository.registerUser(dataWithoutPasswords, userCredential.user.uid)
      return;
    }
  
    else if (userType === UserType.VENDOR) {
      let data = regisData as VendorRegis;
      const { password, confirmationPassword, ...dataWithoutPasswords } = data;
      const campusDoc = await AuthRepository.getCampusById(data.campusName);
      if (campusDoc.exists()) {
        const newVendorData = AuthFactory.createVendor(0, 0, userCredential.user.uid, [], dataWithoutPasswords);
        await AuthRepository.registerVendor(data, doc(db, "campus", newVendorData.campusName))
        return;
      } else {
        throw new Error("Campus document not found");
      }
    }
  },
  login : (email: string, password: string) => {
    AuthRepository.login(email, password);
  },
  logout: () =>{
    AuthRepository.logout()
  } 
}

