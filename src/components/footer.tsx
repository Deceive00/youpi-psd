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
    <div className="w-full bg-black text-white lg:px-20 sm:px-12 font-nunito flex flex-col justify-around lg:text-base sm:text-sm py-8">
      {/* Top */}
      <div className="w-full flex justify-start my-8">
        {/* Logo */}
        <img src={logo} alt="Youpi Logo" className="h-8" />
      </div>
      {/* Middle */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div className="flex flex-col sm:gap-y-2 items-center sm:items-start">
          {/* Company */}
          <span className="font-bold lg:mb-6 sm:mb-2">Company</span>
          <span className="font-light">About</span>
          <span className="font-light">Products</span>
          <span className="font-light">Blog</span>
        </div>
        <div className="flex flex-col sm:gap-y-2 items-center sm:items-start">
          {/* Join With Us */}
          <span className="font-bold mb-6">Join With Us</span>
          <span className="font-light">Delivery Partners</span>
          <span className="font-light">Merchant Partners</span>
        </div>
        <div className="flex flex-col sm:gap-y-2 items-center sm:items-start">
          {/* Contact Us */}
          <span className="font-bold mb-6">Contact Us</span>
          <span className="font-light">Help</span>
          <span className="font-light">Our Location</span>
          <span className="font-light">Send Newsletter</span>
        </div>
        <div className="flex flex-col sm:gap-y-2 items-center sm:items-start">
          {/* Social Media */}
          <span className="font-bold mb-1">Find newest news</span>
          <div className="flex flex-row gap-x-4 mb-4">
            <FaFacebookF className="sm:text-base lg:text-xl" />
            <FaInstagram className="sm:text-base lg:text-xl" />
            <FaYoutube className="sm:text-base lg:text-xl" />
            <FaTwitter className="sm:text-base lg:text-xl" />
          </div>
          <span className="font-bold mb-1">Download the application</span>
          <div className="flex lg:flex-row sm:flex-col lg:gap-x-4 sm:gap-y-4 mb-4">
            <div className="sm:bg-white sm:gap-x-4 lg:gap-x-0 lg:bg-transparent sm:text-black lg:text-white sm:px-12 lg:px-0 sm:rounded-md sm:py-1.5 sm:flex sm:flex-row sm:items-centers">
                <IoLogoGooglePlaystore className="text-xl" />
                <span className="lg:hidden">Google Play</span>
            </div>
            <div className="sm:bg-white sm:gap-x-4 lg:gap-x-0 lg:bg-transparent sm:text-black lg:text-white sm:px-12 lg:px-0 sm:rounded-md sm:py-1.5 sm:flex sm:flex-row sm:items-center">
                <IoLogoAppleAppstore className="text-xl" />
                <span className="lg:hidden">Apple Store</span>
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
