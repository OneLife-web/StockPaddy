import { InputProps } from "@/types";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, label, value, onChange, placeholder, className, icon }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    // Convert value to string or number based on type
    const inputValue = type === 'number' 
      ? (value !== undefined ? Number(value) : '') 
      : value;

    return (
      <div className="grid gap-2 lg:text-sm">
        {label && <label className="font-clashmd">{label}</label>}
        <div className="relative">
          <input
            ref={ref}
            type={type === "password" && !showPassword ? "password" : type} // Toggle input type based on state
            defaultValue={inputValue}
            onChange={(e) => {
              const newValue = type === 'number' 
                ? (e.target.value === '' ? '' : Number(e.target.value)) 
                : e.target.value;
              onChange(newValue);
            }}
            placeholder={placeholder}
            className={`rounded-lg w-full h-[48px] px-4 text-base ${className}`}
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

Input.displayName = "Input"; // Optional: helps with debugging

export default Input;
