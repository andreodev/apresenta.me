import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

type LoginResponse = {
  user: {
    id: string | number;
    name?: string | null;
    email?: string | null;
  };
  accessToken?: string;
  token?: string;
};

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        if (!response.ok) return null;

        const data = (await response.json()) as LoginResponse;
        const accessToken = data.accessToken ?? data.token;

        return {
          id: String(data.user.id),
          name: data.user.name,
          email: data.user.email,
          accessToken,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};
