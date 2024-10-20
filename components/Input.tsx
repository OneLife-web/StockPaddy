import { cn } from "@/lib/utils";
import { InputProps } from "@/types";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, label, value, onChange, placeholder, className, icon }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className="grid gap-2 lg:text-sm">
        {label && <label className="font-clashmd">{label}</label>}
        <div className="relative">
          <input
            ref={ref}
            type={type === "password" && !showPassword ? "password" : "text"} // Toggle input type based on state
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={cn(
              "rounded-lg w-full focus:ring-1 h-[48px] px-4 text-base focus:outline-none placeholder:text-sm",
              { className }
            )}
          />
          {type === "password" && (
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute w-fit h-fit right-4 top-[50%] translate-y-[-50%]"
            >
              {showPassword ? (
                <EyeOff strokeWidth={1.2} size={18} />
              ) : (
                <Eye strokeWidth={1.2} size={18} />
              )}
            </div>
          )}
          {icon && (
            <div className="absolute w-fit h-fit right-4 top-[50%] translate-y-[-50%]">
              {icon}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input'; // Optional: helps with debugging

export default Input;
