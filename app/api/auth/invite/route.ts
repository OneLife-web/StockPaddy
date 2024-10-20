import { NextRequest, NextResponse } from 'next/server';
import Invite from '@/models/Invite';
import { sendInviteEmail } from '@/utils/sendEmail'; // Utility to send invitation email
import crypto from 'crypto';
import connectToDatabase from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  const { email, role } = await req.json(); // role could be 'staff', 'manager', etc.
  await connectToDatabase();

  // Check if the email already exists in User
  const existingInvite = await Invite.findOne({ email });
  if (existingInvite) {
    return NextResponse.json({ error: 'User already invited' }, { status: 400 });
  }

  // Generate unique invite token
  const inviteToken = crypto.randomBytes(32).toString('hex');

  const newInvite = new Invite({
    email,
    token: inviteToken,
    role: role || 'staff',
  });

  await newInvite.save();

  // Send the invite email
  await sendInviteEmail(email, inviteToken);

  return NextResponse.json({ message: 'Invite sent successfully.' });
}