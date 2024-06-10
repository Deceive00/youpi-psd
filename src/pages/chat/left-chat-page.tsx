import ButtonGroup from "@components/ui/button-group";
import UserChat from "@components/ui/user-chat-card";
import logo from "@assets/logo/default-logo.png";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "src/firebase/firebase-config";
import { motion } from "framer-motion"
import { UserChats, UserInfo } from "@lib/types/chat-types";
import { fetchUserChats } from "@lib/services/chat.service";

interface Props {
  setOtherId: (uid: string) => void;
  setUserInfo: (userInfo: UserInfo) => void;
  onUserChatClick: () => void;
}

const LeftChatPage : React.FC<Props> = ({setOtherId, setUserInfo, onUserChatClick}) => {
  const navigate = useNavigate();
  // State
  const userId = auth.currentUser?.uid;
  const [userChats, setUserChats] = React.useState<UserChats>({});
  const [selectedButton, setSelectedButton] = React.useState<string>("All");

  const buttons = ["All", "Vendor", "Sender"];

  React.useEffect(() => {
    fetchUserChats((data) => {
      setUserChats(data);
    })
  }, []);

  return (
    <motion.div 
      key={userId}
      transition={{delay:0.1}}
      animate={{scale:1, x:0}}
      initial={{scale:1, x:1000}}
      className={`lg:w-2/6 w-full box-content flex flex-col mx-4 lg:gap-y-4 gap-y-6 lg:pt-4 pt-2 mt-8 shadow-r-[3px]`}
    >
      <div className={`flex flex-row gap-x-2`}>
        <img src={logo} className="h-6" alt="" onClick={() => navigate("/")} />
        <h1 className={`text-xl font-bold text-slate-600`}>Messages</h1>
        {/* Tambahin Icon tapi belom tau icon apa... */}
      </div>

      {/* All | Team | Friends */}
      <div className="w-full flex justify-center">
        <ButtonGroup 
          onUserBackClick={onUserChatClick}
          buttons={buttons} 
          widthX={10} 
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
          lastText={chat.lastMessage?.text || "No messages yet"}
          date={chat.date}
          unread=""
        />
      ))}
    </motion.div>
  );
};

export default LeftChatPage;
