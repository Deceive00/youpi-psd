export interface Message {
  senderId: string;
  message: string;
  id: string;
  date: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface UserInfo {
  uid: string;
  displayName: string;
  photoUrl: string;
}

export interface Chat {
  userInfo: UserInfo;
  lastMessage: {
    text: string;
  };
  date: {
    seconds: number;
    nanoseconds: number;
  } | null;
}

export interface UserChats {
  [combinedId: string]: Chat;
}
