// /models/Invite.ts
import mongoose, { Schema } from "mongoose";

const inviteSchema = new Schema({
  email: { type: String, required: true, unique: true },
  token: { type: String, required: true, unique: true },
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now, expires: 3600 }, // Invite expires after 1 hour
});

const Invite = mongoose.models.Invite || mongoose.model("Invite", inviteSchema);
export default Invite;
