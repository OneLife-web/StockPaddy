// components/FormField.tsx
import React, { ReactNode, useRef } from "react";
import { UseFormReturn, FieldValues, Path, PathValue } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Input from "./Input";
import { CalendarIcon, ChevronDown, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";

interface FormFieldComponentProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder?: string;
  type?: string;
  icon?: ReactNode;
  className?: string;
  formType?: "calendar" | "select" | "image";
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
                <div className="bg-gray-100 h-[180px] rounded-lg myFlex">
                  {field.value ? (
                    <div className="relative">
                      <Image
                        src={field.value}
                        width={150}
                        height={150}
                        alt="Preview"
                        className="rounded-lg w-[150px] h-[150px] object-cover"
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
                <div className="relative w-full">
                  <select
                    {...field}
                    className="bg-gray-100 h-[48px] text-sm px-3 focus:outline-none text-text-1 focus:ring-1 ring-orange-400 rounded-lg pr-8 w-full"
                  >
                    <option value="">{placeholder}</option>
                    <option className="text-base text-text-1" value="option1">
                      Option 1
                    </option>
                    <option className="text-base text-text-1" value="option2">
                      Option 2
                    </option>
                  </select>
                  <span className="absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown strokeWidth={1.2} size={20} />
                  </span>
                </div>
              </div>
            ) : formType === "calendar" ? (
              <div className="grid gap-2">
                <label className="font-clashmd">{label}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-4 bg-gray-100 rounded-lg border-0 shadow-none text-left h-[48px] font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-90" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
