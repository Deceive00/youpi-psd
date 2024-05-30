import React from "react"
import logo from "@assets/logo/default-logo.png"
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { IoLogoAppleAppstore } from "react-icons/io5";

const Footer : React.FC = () => {
    return (
        <div className="w-full h-96 bg-black text-white px-20 font-nunito flex flex-col justify-around">
            {/* Top */}
            <div className="w-full h-12 flex items-center">
                {/* Logo */}
                <img src={logo} alt="" className="h-8"/>
            </div>
            {/* Middle */}
            <div className="w-full h-32 flex flex-row justify-between">
                <div className="flex flex-col">
                    {/* Company */}
                    <span className="font-bold mb-6">Company</span>

                    <span className="font-light">About</span>
                    <span className="font-light">Products</span>
                    <span className="font-light">Blog</span>
                </div>
                <div className="flex flex-col" >
                    {/* Join With Us */}
                    <span className="font-bold mb-6">Join With Us</span>

                    <span className="font-light">Delivery Partners</span>
                    <span className="font-light">Merchant Partners</span>
                </div>
                <div className="flex flex-col">
                    {/* Contact Us */}
                    <span className="font-bold mb-6">Contact Us</span>

                    <span className="font-light">Help</span>
                    <span className="font-light">Our Location</span>
                </div>
                <div className="flex flex-col">
                    {/* Sosial Media */}
                    <span className="font-bold mb-1">Find newest news</span>
                    <div className="flex flex-row gap-x-4 mb-4">
                        <FaFacebookF className="text-xl"/>
                        <FaInstagram className="text-xl"/>
                        <FaYoutube className="text-xl"/>
                        <FaTwitter className="text-xl"/>
                    </div>

                    <span className="font-bold mb-1 flex">Download the application</span>
                    <div className="flex flex-row gap-x-4 mb-4">
                        <IoLogoGooglePlaystore className="text-xl"/>
                        <IoLogoAppleAppstore className="text-xl"/>
                    </div>
                </div>
            </div>
            {/* Divider */}
            <div className="w-full h-px bg-gray-600 rounded"/>
            {/* Bottom */}
            <div>
                <h6 className="text-center font-semibold">@2024 Youpi | Youpi is a trademark of PT YouPi Indonesia. All Rights Reserved</h6>
            </div>
        </div>
    )
}

export default Footer