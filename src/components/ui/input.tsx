import { cn } from "@lib/utils/cn";
import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false);

    return (
      <label className="relative block">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-lg border border-gray-400 bg-background px-3 py-6 text-sm ring-offset-background outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-orange-500",
            className
          )}
          ref={ref}
          {...props}
          onFocus={() => setFocused(true)}
          onBlur={(e) => setFocused(e.target.value !== "")}
        />
        <span
          className={cn(
            "absolute left-3 px-1 transition-all duration-500 font-nunito z-50 text-ellipsis overflow-hidden",
            {
              "top-[28%] opacity-50": !focused && !props.value,
              "top-0 left-2 -translate-y-1/2 text-orange-500 bg-white px-1 text-sm":
                focused || props.value,
            }
          )}
          style={{ pointerEvents: "none" }}
        >
          Email
        </span>
        {focused && (
          <div className="absolute inset-0 rounded-lg pointer-events-none animate-draw-border text-ellipsis overflow-hidden"></div>
        )}
      </label>
    );
  }
);
Input.displayName = "Input";

export { Input };
