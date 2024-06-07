import { Message } from "@lib/types/chat-types";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "src/firebase/firebase-config";

export const fetchChats = async (combinedId : string, onDataReceived : (data: Message[]) => void) => {
    console.log("Fetching");
    
    try{
        const chatsCollectionRef = doc(db, "chats", combinedId);
        const unsubscribe = onSnapshot(chatsCollectionRef, (snapshot) => {
            if(snapshot.exists()){
                // Return the result 
                onDataReceived(snapshot.data().messages)  
            }else{
                throw new Error("Chats not found!");
            }

            return unsubscribe
        })

        return unsubscribe;
    } catch(err){
        console.log(err);
    }
}