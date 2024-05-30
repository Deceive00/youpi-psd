import { cn } from "@lib/utils/cn";
import * as React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder, type, leftIcon, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false);

    const [showPassword, setShowPassword] = React.useState(false);

    const handleToggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const isPassword = type === "password";

    return (
      <label className={`relative block ${className}`}>
        {leftIcon && (
          <div className="absolute inset-y-0 left-3 flex items-center">
            {leftIcon}
          </div>
        )}
        <input
          type={isPassword && showPassword ? "text" : type}
          className={cn(
            "flex h-14 w-full rounded-lg border border-gray-400 bg-background px-3 py-6 text-base ring-offset-background outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-orange-500",
            isPassword ? "pr-10" : "",
            leftIcon ? "pl-10" : "",
            className
          )}
          ref={ref}
          {...props}
          onFocus={() => setFocused(true)}
          onBlur={(e) => setFocused(e.target.value !== "")}
        />
        <span
          className={cn(
            "absolute left-3 px-1 transition-all duration-300 font-nunito z-3 text-ellipsis overflow-hidden max-h-6",
            {
              "top-[28%] opacity-50 text-black": !focused && !props.value,
              "top-0 left-2 -translate-y-1/2 text-orange-500 bg-white px-1 text-sm":
                focused,
            },
            leftIcon ? "ml-8" : ""
          )}
          style={{ pointerEvents: "none" }}
        >
          {placeholder}
        </span>
        {isPassword && (
          <button
            type="button"
            onClick={handleToggleShowPassword}
            className="absolute inset-y-0 right-3 flex items-center"
          >
            {showPassword ? (
              <FaEyeSlash className="h-5 w-5 text-gray-400" />
            ) : (
              <FaEye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        )}
        {focused && (
          <div
            className={`absolute inset-0 rounded-lg pointer-events-none animate-draw-border text-ellipsis overflow-hidden`}
          ></div>
        )}
      </label>
    );
  }
);

Input.displayName = "Input";

export { Input };
