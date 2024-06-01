import ButtonGroup from "@components/ui/button-group";
import UserChat from "@components/ui/user-chat-card";
import { useAuth } from "@lib/hooks/useAuth";
import { Separator } from "@radix-ui/react-select";
import React from "react";
import MainLayout from "src/layout/main-layout";
import dummyUser from "../../assets/images/default.png"

export default function ChatPage(){
    // Hooks user
    // const {user, logout} = useAuth();

    React.useEffect(() => {
        
    })

    const buttons = ['All','Friends','Officials']

    return(
        <MainLayout className={`pt-14 sm:pt16 overflow-x-hidden`}>
            {
                <div className={`w-screen h-screen flex flec-row px-20 font-nunito`}>
                    {/* Left */}
                    <div className={`w-2/6 flex flex-col gap-y-4 pt-4`}>
                        <div>
                            <h1 className={`text-xl font-bold`}>Messages</h1>
                            
                            {/* Tambahin Icon tapi belom tau icon apa... */}
                        </div>

                        {/* All | Team | Friends */}
                        <div className="w-full flex justify-start">
                            <ButtonGroup buttons={buttons} widthX={12}/>
                        </div>

                        {/* Mapping from userMessage database */}
                        <div className={` w-full overflow-y-auto`}>
                            <UserChat name="Yoseftian Nuhedward" imageSrc={dummyUser} lastText="Last night before one direction meet taylor swift, did you wait for me?" unread="1"/>
                            <UserChat name="Yoseftian Nuhedward" imageSrc={dummyUser} lastText="kata darryl lu udh makan saksang panggang ya vik, gimana rasanya?" unread="1"/>
                            <UserChat name="Yoseftian Nuhedward" imageSrc={dummyUser} lastText="yoseftianganteng@gmail.com" unread="1"/>
                            <UserChat name="Yoseftian Nuhedward" imageSrc={dummyUser} lastText="yoseftianganteng@gmail.com" unread="1"/>
                            <UserChat name="Yoseftian Nuhedward" imageSrc={dummyUser} lastText="kata darryl lu udh makan saksang panggang ya vik, gimana rasanya?" unread="1"/>
                            <UserChat name="Yoseftian Nuhedward" imageSrc={dummyUser} lastText="kata darryl lu udh makan saksang panggang ya vik, gimana rasanya?" unread="1"/>
                            <UserChat name="Yoseftian Nuhedward" imageSrc={dummyUser} lastText="kata darryl lu udh makan saksang panggang ya vik, gimana rasanya?" unread="1"/>
                            <UserChat name="Yoseftian Nuhedward" imageSrc={dummyUser} lastText="kata darryl lu udh makan saksang panggang ya vik, gimana rasanya?" unread="1"/>
                            <UserChat name="Yoseftian Nuhedward" imageSrc={dummyUser} lastText="kata darryl lu udh makan saksang panggang ya vik, gimana rasanya?" unread="1"/>
                            <UserChat name="Yoseftian Nuhedward" imageSrc={dummyUser} lastText="kata darryl lu udh makan saksang panggang ya vik, gimana rasanya?" unread="1"/>
                            <UserChat name="Yoseftian Nuhedward" imageSrc={dummyUser} lastText="kata darryl lu udh makan saksang panggang ya vik, gimana rasanya?" unread="1"/>
                            <UserChat name="Yoseftian Nuhedward" imageSrc={dummyUser} lastText="kata darryl lu udh makan saksang panggang ya vik, gimana rasanya?" unread="1"/>
                            <UserChat name="Yoseftian Nuhedward" imageSrc={dummyUser} lastText="kata darryl lu udh makan saksang panggang ya vik, gimana rasanya?" unread="1"/>
                            <UserChat name="Yoseftian Nuhedward" imageSrc={dummyUser} lastText="kata darryl lu udh makan saksang panggang ya vik, gimana rasanya?" unread="1"/>
                        </div>

                    </div>
                    {/* Separator */}
                    <Separator className={`bg-gray-300`}/>

                    {/* Right */}
                    <div className={`w-4/6 bg-blue-100`}>
                        right
                    </div>
                </div>
            }
        </MainLayout>
    )
}