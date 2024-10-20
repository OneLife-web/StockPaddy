import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import connectToDatabase from "@/lib/mongodb";
import User from "./models/User";
import bcrypt from "bcryptjs";

// Extend NextAuth types for session
declare module "next-auth" {
  interface Session {
    id: string; // MongoDB User ID
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();

        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Credentials not provided.");
        }

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with this email.");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValidPassword) {
          throw new Error("Incorrect password");
        }

        // Check if email is verified
        if (!user.verified) {
          throw new Error("Please verify your email");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      await connectToDatabase();
      if (account?.provider === "google") {
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          const newUser = new User({
            email: user.email,
            name: user.name,
          });
          const savedUser = await newUser.save();
          user.id = savedUser._id.toString();
        } else {
          user.id = existingUser._id.toString();
        }
      }
      return true; // Ensure true is returned for successful sign-in
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && typeof token.id === "string") {
        session.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/",
    error: "/auth/error",
  },
};
