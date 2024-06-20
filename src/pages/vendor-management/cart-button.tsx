import { useState, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { UserCart } from "@lib/types/user-types";
import styles from "./cart-button.module.css";
import { useNavigate } from "react-router-dom";

interface CartButtonProps {
  userCart: UserCart | null;
}

export default function CartButton({ userCart }: CartButtonProps) {
  const navigate = useNavigate();
  const [cartButton, setCartButton] = useState(false);

  useEffect(() => {
    if (userCart && userCart?.menus.length > 0) {
      setCartButton(true);
    } else {
      setCartButton(false);
    }
  }, [userCart]);

  return (
    <>
      <div
        className={`fixed z-[90] bottom-5 right-5 w-14 h-14 rounded-lg bg-primary hover:bg-orange-300 hover:cursor-pointer flex items-center justify-center ${
          styles.cartButton
        } ${cartButton ? styles.visible : ""}`}
        onClick={() => navigate("/cart")}
      >
        <FaCartShopping className="w-7 h-7 text-white" />
      </div>
    </>
  );
}
