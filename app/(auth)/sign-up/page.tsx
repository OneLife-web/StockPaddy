import Logo from "@/components/Logo";
import React from "react";

const SignUpPage = () => {
  return (
    <main className="">
      <div>
        <Logo />
        <h2 className="heading1 mb-1">Create Your Account</h2>
        <p className="text-xs lg:text-sm">
          Join StockPaddy today and streamline your inventory management!
        </p>
      </div>
    </main>
  );
};

export default SignUpPage;
