// components/SignUpForm.tsx
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import toast from "react-hot-toast";
import FormFieldComponent from "../FormField";
import { UserRound, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const SignUpForm = () => {
  const year = new Date().getFullYear();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success("You submitted the following values:");
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-10">
        <FormFieldComponent
          form={form}
          name="name"
          label="Name"
          placeholder="Enter your fullname"
          icon={<UserRound strokeWidth={1.2} size={18} />}
        />
        <FormFieldComponent
          form={form}
          name="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          icon={<Mail strokeWidth={1.2} size={18} />}
        />
        <FormFieldComponent
          form={form}
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
        <button className="btn1 h-[48px]" type="submit">
          Sign Up
        </button>
        <p className="lg:text-sm">
          Already have an account ?{" "}
          <Link className="font-clashmd" href="/sign-in">
            Sign In Instead
          </Link>
        </p>
        <div className="hidden">
          <div className="mx-auto w-20 h-[1px] bg-gray-500 relative">
            <p className="absolute left-[50%] translate-x-[-50%]">OR</p>
          </div>
          <button className="w-full hover:bg-orange-400 !bg-white h-[48px] flex items-center justify-center ring-1 !ring-slate-300">
            <Image src="/google.svg" width={20} height={20} alt="google icon" />
          </button>
        </div>
        <p className="text-xs lg:text-sm whitespace-nowrap text-center absolute bottom-10 left-[50%] translate-x-[-50%]">
          Copyright © {year} StockPaddy. All rights reserved
        </p>
      </form>
    </Form>
  );
};

export default SignUpForm;
