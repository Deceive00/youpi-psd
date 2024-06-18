import { AuthHandler } from "@lib/handler/auth-handler";
import { UserRegis, UserType } from "@lib/types/user-types";
import { VendorRegis } from "@lib/types/vendor-types";

export const AuthController = {
  //@ts-ignore
  getUserByID : async (userId: string) => {
    return await AuthHandler.getUserByID(userId);
  },
  register : async (regisData: UserRegis | VendorRegis, userType: UserType) => {
    AuthHandler.register(regisData, userType)
  },
  
  login : (email: string, password: string) => {
    AuthHandler.login(email, password);
  },
  
  logout: () =>{
    AuthHandler.logout()
  }
  
}