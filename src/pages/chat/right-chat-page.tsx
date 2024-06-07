import { doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { db } from "src/firebase/firebase-config";
import { FaVideo } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { Separator } from "@radix-ui/react-select";
import { motion } from "framer-motion"
import { Message } from "@lib/types/chat-types";
import { userChatVariant } from "@components/variants/user-chat";
import { fetchChats, sendMessage, updateUserChats } from "@lib/services/chat.service";

interface Props {
    currId : string
    otherId : string
    combinedId : string
    displayName : string
    photoUrl: string
    onHandleBackClick: () => void
}

const RightChatPage : React.FC<Props> = ({combinedId, currId, otherId, displayName,photoUrl, onHandleBackClick}) => {
    const [ text, setText ] = React.useState("");
    const [ chats, setChats ] = React.useState<Message[]>([]);
    const endMessageRef = React.useRef<HTMLDivElement>(null);

    
    // Keyboard Enter Handler
    const keyboardListener = (e:KeyboardEvent) => {
        console.log(e.keyCode);
        
        if(e.keyCode == 13){
            handleText()
        }
    }

    // Handle New Text
    const handleText = async () => {
        if(!text) return

        try{
            const chatDocRef = doc(db, 'chats', combinedId)
            const chatDocSnapshot = await getDoc(chatDocRef)

            if(!chatDocSnapshot.exists()){
                await setDoc(chatDocRef, {messages: []})
            }

            sendMessage(currId, combinedId, text)
            // Update UserChats pake lastMessage yang bener
            // Pastiin update 2x : buat sender dan receiver

            // 1. Update UserChats untuk currentUser
            updateUserChats(currId, text, combinedId)

            // 2. Update UserChats untuk otherUser
            updateUserChats(otherId, text, combinedId)

            setText("")
        }catch(err){
            console.log(err);
        }
    }

    // UseEffect
    React.useEffect(() => {
        const unsubscribe = fetchChats(combinedId, (data) => {
            setChats(data)
        })

        return () => {
            unsubscribe();
        }
    }, [combinedId])

    // KeyListener
    React.useEffect(() =>{
        console.log("Keyboard Listener added [!]");
        
        window.addEventListener('keydown', keyboardListener)

        return () => {
            window.removeEventListener("keydown", keyboardListener);
          };
    }, [])

    // Scroll to most bottom div
    React.useEffect(() => {
        if (endMessageRef.current) {
            endMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chats]);
  
    return (
    <motion.div className={`lg:w-4/6 w-screen flex flex-col px-4 lg:px-0 font-nunito`}>
        {/* Top */}
        <div className={`w-full h-1/6 bg-white flex flex-row justify-between items-center`}>
            <div className={`flex flex-row items-center gap-x-4` }>
                <motion.div 
                    key={`${photoUrl}`} 
                    animate={{scale: 1}} 
                    initial={{scale:0}}
                >
                    <img
                        className="w-12 h-12 rounded-full"
                        src={photoUrl}
                        alt=""
                    />
                </motion.div>
                <motion.div key={`${displayName}`} className="flex flex-col" animate={{x: 0, scale:1}} initial={{x:200, scale:0}} transition={{delay: 0.25}}>
                    <h1 className={`font-bold text-lg`}>{displayName}</h1>
                </motion.div>
            </div>
            <div className="flex flex-row text-xl gap-x-4">
                <FaVideo/>
                <IoCall/>
                <BsThreeDotsVertical onClick={onHandleBackClick}/>
            </div>
        </div>
        <Separator className={`border-[1px] shadow-xl mx-2`} />

        {/* Middle */}
        <div 
            className={`w-full h-full rounded-r-lg rounded-l-lg box-content overflow-y-auto lg:px-3 lg:pt-3 mt-4 lg:mt-0`
        }>
            {/* Mapping from chats database */}
            {
                chats.map((chat) => (
                    <motion.div 
                        key={chat.id} 
                        variants={userChatVariant} initial="hidden" animate="visible"
                    >
                        <div className={`chat ${chat.senderId === currId ? "chat-end" : "chat-start"}`}>
                            <div className="chat-bubble" style={{
                                backgroundColor: chat.senderId == currId ? '#e78c38' : '#EEEEEE',
                                color: chat.senderId == currId ? '#ffedd6' : '#060e16',
                                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                            }}>
                                {chat.message}
                            </div>
                            <div className="chat-footer opacity-50">
                                Delivered
                            </div>
                        </div>
                    </motion.div>
                ))
            }
            <div ref={endMessageRef}></div>
        </div>
        {/* Bottom */}
        <div className={`w-full h-1/6 bg-white flex flex-row gap-x-4 items-center`}>
            <input
                className={`
                    w-full h-12 rounded-md bg-slate-50 px-6 focus:outline-none focus:ring-0
                `} 
                placeholder="Text your message here...."
                type="text" 
                value={text} 
                onChange={e => setText(e.target.value)}/>
            {/* Ganti pake Icon */}
            <button 
                className={`
                   w-12 h-12 rounded-md bg-orange-100 text-primary flex items-center justify-center
                `}
                onClick={handleText}>
                    <IoSend className={`text-xl`}/>
            </button>
        </div>
    </motion.div>
  )
};

export default RightChatPage;