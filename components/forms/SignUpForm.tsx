// components/SignUpForm.tsx
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import toast from "react-hot-toast";
import FormFieldComponent from "../FormField";
import { UserRound, Mail } from "lucide-react";

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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
