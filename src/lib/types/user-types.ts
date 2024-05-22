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
  NotAuthenthicated = "Not Authenticated",
  Loading = "Loading",
}

export interface UserRegis{
  nim: string;
  email: string;
  name: string;
  phoneNumber: string;
  password: string;
}