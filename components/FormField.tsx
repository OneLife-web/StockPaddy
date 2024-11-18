// components/FormField.tsx
import React, { ReactNode } from "react";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Input from "./Input";

interface FormFieldComponentProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder?: string;
  type?: string;
  icon?: ReactNode;
  className?: string;
}

function FormFieldComponent<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  icon,
  type,
  className
}: FormFieldComponentProps<TFieldValues>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              placeholder={placeholder}
              icon={icon}
              label={label}
              type={type}
              className={className}
              {...field}
            />
          </FormControl>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
}

export default FormFieldComponent;
