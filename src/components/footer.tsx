import React from "react"

const Footer : React.FC = () => {
    return (
        <div className="w-full h-56 bg-black text-white">
            Ini footer
            {/* Top */}
            <div>
                {/* Logo */}
            </div>
            {/* Middle */}
            <div>
                <div>
                    {/* Company */}
                    <span>Company</span>

                    <span>About</span>
                    <span>Products</span>
                    <span>Blog</span>
                </div>
                <div>
                    {/* Join With Us */}
                    <span>Join With Us</span>

                    <span>Delivery Partners</span>
                    <span>Merchant Partners</span>
                </div>
                <div>
                    {/* Contact Us */}
                    <span>Contact Us</span>

                    <span>Help</span>
                    <span>Our Location</span>
                </div>
                <div>
                    {/* Sosial Media */}
                    <span>Find newest news</span>

                    <span>Download the application</span>
                </div>
            </div>
            {/* Bottom */}
            <div>
                <h6>2023 Youpi | Youpi is a trademark of PT YouPi Indonesia. All Rights Reserved</h6>
            </div>
        </div>
    )
}

export default Footer