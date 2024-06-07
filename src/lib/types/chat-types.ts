export interface Message {
    senderId: string;
    message: string;
    id: string;
    date: {
      seconds: number;
      nanoseconds: number;
    };
}