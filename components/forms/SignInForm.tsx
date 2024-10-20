// components/SignUpForm.tsx
"use client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import FormFieldComponent from "../FormField";
import { UserRound, Mail, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useFetch from "@/hooks/useFetch";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const SignInForm = () => {
  const router = useRouter();
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const year = new Date().getFullYear();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // useFetch hook to handle the fetch logic
  const { loading, data, error, fetchData } = useFetch({
    url: "/api/auth/signup",
    method: "POST",
  });

  useEffect(() => {
    if (submitAttempted && data && !error) {
      toast.success("Sign up successful!");
      const email = form.getValues("email"); // Accessing email from form values
      router.push(`/verify?email=${email}`);
    }
  }, [data, error, submitAttempted, router]);

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    try {
      setSubmitAttempted(true);
      await fetchData(formData);
    } catch (error) {
      console.error("Error during sign-up:", error);
      setSubmitAttempted(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10">
        {error && (
          <p className="text-sm mb-1 text-red-500 text-center">{error}</p>
        )}
        <div className="space-y-5">
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
          <button
            className="btn1 h-[48px] flex items-center justify-center disabled:cursor-not-allowed"
            disabled={loading}
            type="submit"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
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
              <Image
                src="/google.svg"
                width={20}
                height={20}
                alt="google icon"
              />
            </button>
          </div>
        </div>

        <p className="text-xs lg:text-sm whitespace-nowrap text-center absolute max-lg:bottom-20 lg:bottom-10 left-[50%] translate-x-[-50%]">
          Copyright © {year} StockPaddy. All rights reserved
        </p>
      </form>
    </Form>
  );
};

export default SignInForm;
