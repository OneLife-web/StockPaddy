import SignUpForm from "@/components/forms/SignUpForm";
import Logo from "@/components/Logo";

const SignUpPage = () => {
  return (
    <main className="dark:text-black">
      <div>
        <Logo />
        <h2 className="heading1 mb-1">Create Your Account</h2>
        <p className="text-xs lg:text-sm">
          Join StockPaddy today and streamline your inventory management!
        </p>
        <SignUpForm />
      </div>
    </main>
  );
};

export default SignUpPage;
