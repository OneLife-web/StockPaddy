import SignInForm from "@/components/forms/SignInForm";
import Logo from "@/components/Logo";
import { Suspense } from "react";

const SignInPage = () => {
  return (
    <main className="dark:text-black min-h-full lg:pb-24 relative">
      <div>
        <Logo variant={2} width={300} height={300} />
        <h2 className="heading1 mb-1">Welcome Back!</h2>
        <p className="text-xs lg:text-sm">
          Sign in to your StockPaddy account and continue optimizing your
          inventory management.
        </p>
        <Suspense fallback="Loading...">
          <SignInForm />
        </Suspense>
      </div>
    </main>
  );
};

export default SignInPage;
