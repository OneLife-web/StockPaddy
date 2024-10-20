import OtpForm from "@/components/forms/OtpForm";
import Logo from "@/components/Logo";

const VerificationPage = ({
  searchParams,
}: {
  searchParams: { email: string };
}) => {
  const { email } = searchParams;
  return (
    <main className="dark:text-black min-h-full lg:pb-24 relative">
      {email && (
        <div>
          <Logo />
          <h2 className="heading1 mb-1 text-center">Verify Your Account</h2>
          <p className="text-xs lg:text-sm text-center">
            We&apos;ve sent a 6-digit code to your email.
          </p>
          <OtpForm email={email} />
        </div>
      )}
    </main>
  );
};

export default VerificationPage;
