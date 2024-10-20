import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate random 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTPEmail = async (email: string, otp: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Account Verification",
    html: `Your OTP is <b>${otp}</b>. It will expire in 10 minutes.`,
  };
  await transporter.sendMail(mailOptions);
};

export const sendInviteEmail = async (email: string, inviteToken: string) => {
  const inviteLink = `${process.env.BASE_URL}/invite?token=${inviteToken}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Invitation to join",
    html: `Click <a href="${inviteLink}">here</a> to create your account.`,
  };
  await transporter.sendMail(mailOptions);
};
