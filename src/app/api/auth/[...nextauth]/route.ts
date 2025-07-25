import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Simple in-memory user storage (in production, use a database)
export const users: Array<{
  id: string;
  name: string;
  email: string;
  password: string;
  role?: string;
}> = [];

// Add a default user for testing
users.push({
  id: "1",
  name: "Test User",
  email: "test@example.com",
  password: bcrypt.hashSync("password123", 12),
  role: "user",
});

// Add admin user
users.push({
  id: "admin",
  name: "Admin User",
  email: "admin@courseapp.com",
  password: bcrypt.hashSync("admin123", 12),
  role: "admin",
});

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = users.find((u) => u.email === credentials.email);

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role || "user",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret:
    process.env.NEXTAUTH_SECRET || "fallback-secret-key-for-development-only",
});

export { handler as GET, handler as POST };
