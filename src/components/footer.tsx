import React from "react";
import logo from "@assets/logo/default-logo.png";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { IoLogoAppleAppstore } from "react-icons/io5";

const Footer: React.FC = () => {
  return (
    <div className="w-full bg-black text-white px-6 lg:px-20 sm:px-12 font-nunito flex flex-col justify-around lg:text-base sm:text-sm py-8">
      {/* Top */}
      <div className="w-full flex justify-start my-8">
        {/* Logo */}
        <img src={logo} alt="Youpi Logo" className="h-8" />
      </div>
      {/* Middle */}
      <div className="w-full grid grid-cols-1 grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div className="flex flex-col sm:gap-y-2 items-start">
          {/* Company */}
          <span className="font-bold mb-6">Company</span>
          <span className="font-light"><a href="/order">Order</a></span>
          <span className="font-light"><a href="/about">About</a></span>
          <span className="font-light"><a href="/history">History</a></span>
        </div>
        <div className="flex flex-col sm:gap-y-2 items-start">
          {/* Join With Us */}
          <span className="font-bold mb-6">Join With Us</span>
          <span className="font-light">As Delivery Partners</span>
          <span className="font-light">As Merchant Partners</span>
        </div>
        <div className="flex flex-col sm:gap-y-2 items-start">
          {/* Contact Us */}
          <span className="font-bold mb-6">Contact Us</span>
          <span className="font-light"><a href="/chat">Chat</a></span>
          <span className="font-light">Our Location</span>
          <span className="font-light">Send Newsletter</span>
        </div>
        <div className="flex flex-col sm:gap-y-2 items-start">
          {/* Social Media */}
          <span className="font-bold mb-1">Find newest news</span>
          <div className="flex flex-row gap-x-4 mb-4">
            <FaFacebookF className="sm:text-base lg:text-xl" />
            <FaInstagram className="sm:text-base lg:text-xl" />
            <FaYoutube className="sm:text-base lg:text-xl" />
            <FaTwitter className="sm:text-base lg:text-xl" />
          </div>
          {/* Download Now */}
          <span className="font-bold mb-1">Downloads</span>
          <div className="flex lg:flex-row flex-row lg:gap-x-4 gap-x-4 mb-4">
            <div className="gap-x-2 lg:gap-x-0 lg:bg-transparent text-white lg:text-white lg:px-0 rounded-md flex flex-row items-center">
                <IoLogoGooglePlaystore className="text-xl" />
                <span className="hidden">Google Play</span>
            </div>
            <div className="gap-x-2 lg:gap-x-0 lg:bg-transparent text-white lg:text-white lg:px-0 rounded-md flex flex-row items-center">
                <IoLogoAppleAppstore className="text-xl" />
                <span className="hidden">Apple Store</span>
            </div>
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className="w-full h-px bg-gray-600 rounded mb-4" />
      {/* Bottom */}
      <div>
        <h6 className="text-center font-semibold">
          @2024 Youpi | Youpi is a trademark of PT YouPi Indonesia. All Rights Reserved
        </h6>
      </div>
    </div>
  );
};

export default Footer;
