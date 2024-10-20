import { NextRequest, NextResponse } from "next/server";
import User from "@/utils/models/User";
import connectToDatabase from "@/lib/mongodb";
import { generateOTP, sendOTPEmail } from "@/utils/sendEmail";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  await connectToDatabase();

  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Generate a new OTP
  const otp = generateOTP();
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

  // Update the user with the new OTP and expiration time
  user.otp = otp;
  user.otpExpiresAt = otpExpiresAt;
  await user.save();

  // Send the new OTP to the user's email
  await sendOTPEmail(user.email, otp);

  return NextResponse.json({
    message: "New OTP sent successfully to your email.",
  });
}