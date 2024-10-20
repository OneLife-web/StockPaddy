import SignUpForm from "@/components/forms/SignUpForm";
import Logo from "@/components/Logo";
import { Suspense } from "react";

const SignUpPage = () => {
  return (
    <main className="dark:text-black min-h-full lg:pb-24 relative">
      <div>
        <Logo />
        <h2 className="heading1 mb-1">Create Your Account</h2>
        <p className="text-xs lg:text-sm">
          Join StockPaddy today and streamline your inventory management!
        </p>
        <Suspense fallback="loading">
          <SignUpForm />
        </Suspense>
      </div>
    </main>
  );
};

export default SignUpPage;
