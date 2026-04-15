import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: false,
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: (credentials.email as string).toLowerCase() },
        });

        // User exists but only has Google account (no password set)
        if (user && !user.password) return null;
        if (!user) return null;

        const valid = await bcrypt.compare(
          credentials.password as string,
          user.password!
        );
        if (!valid) return null;

        return { id: user.id, email: user.email, name: user.name, image: user.image };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean);
        const isAdmin = adminEmails.includes(user.email);
        try {
          await prisma.user.upsert({
            where: { email: user.email },
            update: { name: user.name, image: user.image },
            create: {
              email: user.email,
              name: user.name ?? "",
              image: user.image ?? "",
              emailVerified: new Date(),
              role: isAdmin ? "admin" : "user",
            },
          });
        } catch (e) { console.error("Failed to upsert user:", e); }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // Fetch role from DB if it's not on the user object (for Google users on first login)
        if (!(user as any).role) {
          if (!token.email) {
            token.role = "user";
          } else {
            const dbUser = await prisma.user.findUnique({ where: { email: token.email } });
            token.role = dbUser?.role || "user";
          }
        } else {
          token.role = (user as any).role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});

