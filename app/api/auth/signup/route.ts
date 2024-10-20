import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Invite from "@/models/Invite";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";
import Role from "@/models/Role";
import { generateOTP, sendOTPEmail } from "@/utils/sendEmail";

export async function POST(req: NextRequest) {
  const { email, name, password, inviteToken } = await req.json();
  await connectToDatabase();

  // Handle Invite-based Signup
  if (inviteToken) {
    // Check if invite exists
    const invite = await Invite.findOne({ token: inviteToken });
    if (!invite) {
      return NextResponse.json(
        { error: "Invalid or expired invite token" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user from the invite
    const newUser = new User({
      email: invite.email,
      name,
      password: hashedPassword,
      role: invite.role, // Role is inherited from the invite
      verified: true, // No need for verification since they used the invite
    });

    await newUser.save();

    // Delete the invite after it's used
    await Invite.deleteOne({ token: inviteToken });

    return NextResponse.json({
      message: "User registered successfully using invite.",
    });
  }

  // Handle Admin Signup (No invite token present)
  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Generate OTP
  const otp = generateOTP();
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes
  const superAdminRole = await Role.findOne({ role_name: "super_admin" });
  const role = superAdminRole._id;

  // Create and save the new admin user
  const newUser = new User({
    email,
    name,
    password: hashedPassword,
    role,
    verified: false,
    otp,
    otpExpiresAt,
  });

  await newUser.save();

  // Send OTP to user's email
  await sendOTPEmail(newUser.email, otp);

  return NextResponse.json({
    message:
      "Admin registered successfully. Please verify your account with the OTP sent to your email.",
  });
}
