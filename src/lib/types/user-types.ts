export interface User{
  nim: string;
  email: string;
  name: string;
  isSender: Boolean;
  phoneNumber: string;
  // anggepannya kalo role id dia itu sender, dia juga sbnernya user tapi ada suaut button yang nampilin ke page sender
}

export enum AuthState {
  Authenticated = "Authenticated",
  NotAuthenticated = "Not Authenticated",
  Loading = "Loading",
}

export interface UserRegis {
  nim: string;
  email: string;
  firstName: string;
  lastName: string;
  dob: Date;
  phoneNumber: string;
  password: string;
  confirmationPassword: string;
}

export interface UserCart {
  campusName: string;
  vendorName: string;
  name: string;
  description: string;
  price: Number;
  coverImage: string;
  notes: string;
  quantity: Number;
}

export interface UserCartNew {
  vendorId: string;
  menus: MenuCart[];
}

export interface MenuCart {
  menuId: string;
  menuQuantity: Number;
  notes: string;
}

export enum UserType {
  USER = "User",
  VENDOR = "Vendor",
}
