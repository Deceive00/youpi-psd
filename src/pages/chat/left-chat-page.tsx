import ButtonGroup from "@components/ui/button-group";
import UserChat from "@components/ui/user-chat-card";
import logo from "@assets/logo/default-logo.png";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "src/firebase/firebase-config";

interface UserInfo {
  uid: string;
  displayName: string;
  photoUrl: string;
}
interface Chat {
  userInfo: UserInfo;
  lastMessage: {
    text: string
  },
  date: {
    seconds: number;
    nanoseconds: number;
  } | null;
}

interface UserChats {
  [combinedId: string]: Chat;
}

interface Props {
  setOtherId: (uid: string) => void
  setUserInfo: (userInfo: UserInfo) => void
  onUserChatClick: () => void
 }

const LeftChatPage : React.FC<Props> = ({setOtherId, setUserInfo, onUserChatClick}) => {
  const navigate = useNavigate();
  // State
  const userId = auth.currentUser?.uid;
  const [userChats, setUserChats] = React.useState<UserChats>({});
  const [selectedButton, setSelectedButton] = React.useState<string>("All");

  // Update Document
  const updateUserChatsDoc = async () => {
    if (!userId) return;

    try {
      await setDoc(doc(db, "userChats", userId), {});
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch userChats from firebases
  const fetchUserChats = async () => {
    try {
      if (userId) {
        console.log("User is not null");

        // doc(db, nama_db, id_nya)s
        const userChatsCollectionRef = doc(db, "userChats", userId);
        const unsubscribe = onSnapshot(userChatsCollectionRef, (snapshot) => {
          if (snapshot.exists()) {

            const data = snapshot.data() as UserChats
            setUserChats(data);
          } else {
            // Create new userChats document for this current user using updateDoc
            updateUserChatsDoc();
          }
        });

        console.log("userChats : ", userChats.combinedId.lastMessage);
        return unsubscribe;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buttons = ["All", "Vendor", "Sender"];

  React.useEffect(() => {
    fetchUserChats();
  }, []);

  return (
    <div className={`lg:w-2/6 w-full flex flex-col mx-2 lg:gap-y-4 gap-y-6 pt-4 mt-8 shadow-r-[3px]`}>
      <div className={`flex flex-row gap-x-2`}>
        <img src={logo} className="h-6" alt="" onClick={() => navigate("/")} />
        <h1 className={`text-xl font-bold text-slate-600`}>Messages</h1>
        {/* Tambahin Icon tapi belom tau icon apa... */}
      </div>

      {/* All | Team | Friends */}
      <div className="w-full flex justify-start">
        <ButtonGroup 
          onUserBackClick={onUserChatClick}
          buttons={buttons} 
          widthX={12} 
          onSelect={(button) => setSelectedButton(button)}
          selectedButton={selectedButton}  
        />
      </div>

      {/* Map from userChats state */}
      {Object.entries(userChats).map(([combinedId, chat]) => (
        <UserChat
          onClick={() => 
            {
              setOtherId(chat.userInfo.uid);
              setUserInfo(chat.userInfo);
              onUserChatClick()
            }
          }
          key={combinedId}
          name={chat.userInfo.displayName}
          imageSrc={chat.userInfo.photoUrl}
          lastText={chat.lastMessage.text}
          date={chat.date}
          unread=""
        />
      ))}
    </div>
  );
};

export default LeftChatPage;
