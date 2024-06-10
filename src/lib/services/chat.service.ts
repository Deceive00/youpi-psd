import {  Message, UserChats, UserInfo } from "@lib/types/chat-types";
import { Timestamp, arrayUnion, doc, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "src/firebase/firebase-config";
import {v4 as uuidv4 } from "uuid"
import { fetchUserByID } from "./user.service";
import dummyPng from "@assets/images/default.png"

// const navigate = useNavigate()

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

// Chat Vendor
// Chat Sender
// Initnya dia akan create new Chat

export const createCombinedId = (id1: string, id2: string): string => {
  return id1 && id2 ? (id1 > id2 ? id1 + id2 : id2 + id1) : "";
};

// export const navigateToChatRoom = (navigate : any, combinedId : string) => {
//   navigate("/chat");
// }

export const startMessaging = async (userId : string, otherId : string, text : string) => {
  const combinedId = createCombinedId(userId, otherId)

  if(!text) return

  try{
    const chatDocRef = doc(db, "chats", combinedId);
    const chatDocSnapshot = await getDoc(chatDocRef);

    if (!chatDocSnapshot.exists()) {
      await setDoc(chatDocRef, { messages: [] });
    }

    await sendMessage(userId, combinedId, text);
    // Update UserChats pake lastMessage yang bener
    // Pastiin update 2x : buat sender dan receiver

    // 1. Update UserChats untuk currentUser
    await handleUserChats(userId, otherId, text, combinedId);

    // 2. Update UserChats untuk otherUser
    await handleUserChats(otherId, otherId,text, combinedId);

    // navigate('/chat')
  }catch(err){
    console.log(err);
  }
}

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

// Update User Chats with validations
export const handleUserChats = async (id: string, otherId: string, text: string, combinedId: string) => {
  const docRef = doc(db, "userChats", id)
  const docSnapshot = await getDoc(docRef)

  const currentUserData = await fetchUserByID(id);

  // Get user data
  const ui: UserInfo = {
    uid: otherId,
    displayName: `${currentUserData?.firstName} ${currentUserData?.lastName}`,
    photoUrl: dummyPng
  };


  if(docSnapshot.exists() && docSnapshot.data()[combinedId]){
    await updateDoc(doc(db, "userChats", id), {
      [combinedId + ".lastMessage"]: {
        text,
      },
      [combinedId + ".date"]: serverTimestamp(),
    });
  }else{
    await updateDoc(docRef, {
      [combinedId] : {
        userInfo: {
          uid: ui.uid,
          displayName : ui.displayName,
          photoUrl : ui.photoUrl,
        },
        lastMessage : {text},
        date: serverTimestamp()
      }
    });
  }
}

// Update UserChats for latest buy
export const updateUserChats = async (id: string, text: string, combinedId: string) => {
    await updateDoc(doc(db, "userChats", id) , {
        [combinedId + ".lastMessage"] : {
            text
        },
        [combinedId+ ".date"] : serverTimestamp(),
    })
}