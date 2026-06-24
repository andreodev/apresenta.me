import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },

      async authorize(credentials) {

        console.log("credentials:", credentials);

        console.log("NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/users/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        console.log("status:", response.status);


       const text = await response.text();

console.log("backend response:", text);

if (!response.ok) {
  return null;
}

const data = JSON.parse(text);
        
        return {
          id: String(data.user.id),
          name: data.user.name,
          email: data.user.email,
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
});

export { handler as GET, handler as POST };