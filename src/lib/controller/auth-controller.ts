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
  
  login : async (email: string, password: string) => {
    await AuthHandler.login(email, password);
  },
  
  logout: async () =>{
    await AuthHandler.logout()
    window.location.href = "/"
  }
  
}