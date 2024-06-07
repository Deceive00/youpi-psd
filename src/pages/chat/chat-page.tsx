import { Separator } from "@radix-ui/react-select";
import LeftChatPage from "./left-chat-page";
import RightChatPage from "./right-chat-page";
import { useAuth } from "@lib/hooks/useAuth";
import Loader from "@components/loading/loader";
import React from "react";
import { auth } from "src/firebase/firebase-config";

const ChatPage = () => {
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
  const [userInfo, setUserInfo] = React.useState<{
    displayName: string;
    uid: string;
    photoUrl: string;
  } | null>();

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

  // HandleOtherID

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={`w-screen h-screen flex flex-row lg:px-20 font-nunito`}>
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
          <RightChatPage
            onHandleBackClick={handleBackClick}
            photoUrl={userInfo?.photoUrl || ""}
            displayName={userInfo?.displayName || "Anonymous"}
            combinedId={combinedId}
            currId={currId}
            otherId={otherId}
          />
        </>
      ) : (
        <>
          {!isDetailOpen && (
            <LeftChatPage setUserInfo={setUserInfo} setOtherId={setOtherId} onUserChatClick={handleUserChatClick}/>
          )}

          {isDetailOpen && (
            <RightChatPage
              onHandleBackClick={handleBackClick}
              photoUrl={userInfo?.photoUrl || ""}
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
