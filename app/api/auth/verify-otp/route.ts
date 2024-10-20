// /app/api/verify-otp.ts
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();
  await connectToDatabase();

  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Check if OTP is valid
  if (user.otp !== otp || user.otpExpiresAt < new Date()) {
    return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
  }

  // Mark user as verified
  user.verified = true;
  user.otp = undefined;  // Clear OTP after verification
  user.otpExpiresAt = undefined;
  await user.save();

  return NextResponse.json({ message: "User verified successfully." });
}