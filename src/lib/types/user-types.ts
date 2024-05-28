export interface User{
  id: string;
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

export interface UserRegis{
  nim: string;
  email: string;
  firstName: string;
  lastName: string;
  dob: Date;
  phoneNumber: string;
  password: string;
  confirmationPassword: string;
  
}

export interface Menu{
  name: string;
  description: string;
  image: string;
  price: Number;
};
export interface MenuCategory{
  name: string;
  menus: Menu[];
}

export interface Vendor{
  email: string;
  name: string;
  coverImage: string;
  rating: Number;
  review: Number;
  id: string;
  categories: MenuCategory[];
}

export interface Campus{
  name: string;
  vendors: Vendor[];
}