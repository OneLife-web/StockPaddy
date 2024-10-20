// /models/User.ts
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Schema.Types.ObjectId, ref: "Role", required: true },
  verified: { type: Boolean, default: false },
  otp: { type: String }, // Store OTP
  otpExpiresAt: { type: Date }, // OTP expiry
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
