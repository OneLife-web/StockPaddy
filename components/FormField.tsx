// components/FormField.tsx
import React, { forwardRef, ReactNode, useRef } from "react";
import { UseFormReturn, FieldValues, Path, PathValue } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Input from "./Input";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";

interface FormFieldComponentProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder?: string;
  type?: string;
  icon?: ReactNode;
  className?: string;
  formType?: "default" | "select" | "image";
}

function FormFieldComponent<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  icon,
  type,
  className,
  formType,
}: FormFieldComponentProps<TFieldValues>) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          console.log(reader.result);
          form.setValue(
            name as Path<TFieldValues>,
            reader.result as PathValue<TFieldValues, Path<TFieldValues>>
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    form.setValue(
      name as Path<TFieldValues>,
      "" as PathValue<TFieldValues, Path<TFieldValues>>
    ); // Clear the form value
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            {formType === "image" ? (
              <div className="grid gap-3">
                <label className="font-clashmd">{label}</label>
                <div className="bg-gray-100 h-[150px] rounded-lg myFlex">
                  {field.value ? (
                    <div className="relative">
                      <Image
                        src={field.value}
                        width={150}
                        height={150}
                        alt="Preview"
                        className="rounded-lg"
                      />
                      <button
                        onClick={handleDeleteImage}
                        className="absolute -right-2 -top-2 text-red-500 bg-white rounded-full p-1"
                      >
                        <X strokeWidth={1.2} size={14} />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={handleButtonClick}
                      className="myFlex flex-col gap-1"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <UploadCloud />
                      <p className="text-sm">Click to select image</p>
                    </div>
                  )}
                </div>
              </div>
            ) : formType === "select" ? (
              <div className="grid gap-2">
                <label className="font-clashmd">{label}</label>
                <select {...field} className="bg-gray-100 h-[48px] rounded-lg">
                  <option value="" className="text-sm text-text-3">{placeholder}</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
              </div>
            ) : (
              <Input
                placeholder={placeholder}
                icon={icon}
                label={label}
                type={type}
                className={className}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
}

export default FormFieldComponent;
