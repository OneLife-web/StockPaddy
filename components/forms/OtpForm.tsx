"use client";
import Link from "next/link";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const OtpForm = ({ email }: { email: string }) => {
  const year = new Date().getFullYear();
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const { loading, data, error, fetchData } = useFetch({
    url: "/api/auth/verify-otp",
    method: "POST",
  });

  const { loading: resendLoading, fetchData: resendOtp } = useFetch({
    url: "/api/auth/resend-otp",
    method: "POST",
  });

  useEffect(() => {
    if (submitAttempted && data && !error) {
      toast.success("Verification successful!");
      router.push("/sign-in");
    }
  }, [data, error, submitAttempted, router]);

  const handleVerify = async () => {
    if (otp.length < 6) {
      toast.error("OTP must be 6 characters long.");
      return;
    }
    const data = {
      email,
      otp,
    };
    try {
      setSubmitAttempted(true);
      await fetchData(data);
    } catch (error) {
      console.error("Error during verifying user:", error);
      setSubmitAttempted(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp({ email });
      toast.success("New OTP sent to your email.");
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Failed to resend OTP. Please try again.");
    }
  };
  return (
    <div className="mt-10">
      {error && (
        <p className="text-sm mb-3 text-red-500 text-center">{error}</p>
      )}
      <div className="w-fit mx-auto mb-7">
        <InputOTP
          value={otp}
          onChange={setOtp}
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <button
        className="btn1 h-[48px] flex items-center justify-center disabled:cursor-not-allowed"
        disabled={loading}
        type="button"
        onClick={handleVerify}
      >
        {loading ? <Loader2 className="animate-spin" /> : "Verify"}
      </button>
      <div>
        <p className="lg:text-sm text-center mt-4">
          Didn’t receive the code?{" "}
          <button
            onClick={handleResendOtp}
            disabled={resendLoading}
            className="font-clashmd"
          >
            {resendLoading ? "Sending..." : "Resend OTP"}
          </button>
        </p>
      </div>
      <p className="text-xs lg:text-sm whitespace-nowrap text-center absolute max-lg:bottom-20 lg:bottom-10 left-[50%] translate-x-[-50%]">
        Copyright © {year} StockPaddy. All rights reserved
      </p>
    </div>
  );
};

export default OtpForm;
