import { Separator } from "@radix-ui/react-select";
import LeftChatPage from "./left-chat-page";
import RightChatPage from "./right-chat-page";
import { useAuth } from "@lib/hooks/useAuth";
import Loader from "@components/loading/loader";
import React from "react";
import { auth } from "src/firebase/firebase-config";
import { UserInfo } from "@lib/types/chat-types";
import profilePng from "@assets/images/default.png"
import chatLogo from "@assets/images/chatLogoYoupi.png"
import { fetchUserByID } from "@lib/services/user.service";
import { motion } from "framer-motion"
import { container, item } from "@components/variants/staggered-children";

interface Props {
  initialId? : string
}

const ChatPage : React.FC<Props> = ({initialId}) => {
  // Hooks user, dapetim userId supaya bisa passing ke sub-page
  const { isLoading } = useAuth();
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);

  // Handler
  const handleUserChatClick = () => {
    setIsDetailOpen(true);
  }

  const handleBackClick = () => {
    setIsDetailOpen(false)
  }

  // State
  const [currId, setCurrId] = React.useState(auth.currentUser?.uid || "");
  const [otherId, setOtherId] = React.useState("");
  const [userInfo, setUserInfo] = React.useState<UserInfo>();

  // React.useEffect(() => {
  //   if (initialId) {
  //     setOtherId(initialId);
  //     fetchUserByID(initialId).then((userInfo) => {
  //       if (userInfo) {
  //         setUserInfo({
  //           uid: initialId,
  //           displayName: `${userInfo.firstName} ${userInfo.lastName}`,
  //           photoUrl: profilePng
  //         });
  //         setIsDetailOpen(true);
  //       }

  //       console.log("Detail after opened : ", userInfo);
        
  //     });
  //   }
  // }, [initialId]);

  //Change User
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrId(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  // Combining ID with validations
  const combinedId =
    currId && otherId
      ? currId > otherId
        ? currId + otherId
        : otherId + currId
      : "";

  if (isLoading) {
    return <Loader />;
  }

  console.log("Current ID:", currId);
  console.log("Other ID:", otherId);
  console.log("User Info:", userInfo);
  console.log("Combined ID:", combinedId);

  return (
    <div className={`w-screen h-screen flex flex-row lg:px-4 font-nunito`}>
      {window.innerWidth >= 640 ? (
        <>
          <LeftChatPage
            setUserInfo={setUserInfo}
            setOtherId={setOtherId}
            onUserChatClick={handleUserChatClick}
          />
          <Separator
            aria-orientation="vertical"
            className="border-[1.5px] shadow-xl mx-2"
          />
          {combinedId && currId && otherId && userInfo ? (
            <RightChatPage
            onHandleBackClick={handleBackClick}
            photoUrl={userInfo.photoUrl || profilePng}
            displayName={userInfo.displayName}
            combinedId={combinedId}
            currId={currId}
            otherId={otherId}
          />
          ) : (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="visible"
              className={`flex flex-col justify-center items-center w-full gap-y-8`}
            >
              <motion.img 
                variants={item}
                src={chatLogo} alt="" className={`w-[25%] h-auto opacity-60`}/>
              <motion.h1 
              variants={item}
                className="text-slate-500 text-base">Start a conversation now!</motion.h1>
            </motion.div>
          )}
          
        </>
      ) : (
        <>
          {!isDetailOpen && (
            <LeftChatPage setUserInfo={setUserInfo} setOtherId={setOtherId} onUserChatClick={handleUserChatClick}/>
          )}

          {isDetailOpen && (
            <RightChatPage
              onHandleBackClick={handleBackClick}
              photoUrl={userInfo?.photoUrl || profilePng}
              displayName={userInfo?.displayName || "Anonymous"}
              combinedId={combinedId}
              currId={currId}
              otherId={otherId}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ChatPage;
