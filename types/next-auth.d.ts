import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role?: string;
  }

  interface Session {
    id: string;
    user: User & {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }

  interface JWT {
    id: string;
    role?: string;
  }
}