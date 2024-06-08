import { Message, UserChats } from "@lib/types/chat-types";
import { Timestamp, arrayUnion, doc, onSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "src/firebase/firebase-config";
import {v4 as uuidv4 } from "uuid"

export const fetchChats = (
  combinedId: string,
  onDataReceived: (data: Message[]) => void
) => {
  console.log("Fetching");

  const chatsCollectionRef = doc(db, "chats", combinedId);
  const unsubscribe = onSnapshot(chatsCollectionRef, (snapshot) => {
    if (snapshot.exists()) {
      // Return the result
      const fetched = snapshot.data().messages as Message[];
      onDataReceived(fetched);

      console.log(fetched);
    } else {
      console.error("Chats not found!");
    }
  });

  return unsubscribe;
};

// Fetch User Chats
export const fetchUserChats = (onDataReceived: (data: UserChats) => void) => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;
  if (userId) {
    console.log("User is not null : " + userId);

    // doc(db, nama_db, id_nya)s
    const userChatsCollectionRef = doc(db, "userChats", userId);
    const unsubscribe = onSnapshot(userChatsCollectionRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as UserChats;

        console.log("Fetched User Chats : ", data);
        
        onDataReceived(data);
      } else {
        // Create new userChats document for this current user using updateDoc
        updateUserChatsDoc();
      }
    });

    return unsubscribe;
  }
};

// Update Document User Chats
export const updateUserChatsDoc = async () => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;

  try {
    await setDoc(doc(db, "userChats", userId), {});
  } catch (err) {
    console.log(err);
  }
};

// Add New Chat as a sender
export const sendMessage = async (currId : string, combinedId: string, text: string) => {
  await updateDoc(doc(db, "chats", combinedId), {
    messages: arrayUnion({
      id: uuidv4(),
      message: text,
      senderId: currId,
      date: Timestamp.now(),
    }),
  });
};

// Update UserChats for latest buy
export const updateUserChats = async (id: string, text: string, combinedId: string) => {
    await updateDoc(doc(db, "userChats", id) , {
        [combinedId + ".lastMessage"] : {
            text
        },
        [combinedId+ ".date"] : serverTimestamp(),
    })
}