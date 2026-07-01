import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, profile }) {
      const id = (profile as any)?.sub ?? user.id;
      if (id && user.email) {
        const { error } = await supabaseAdmin.from("profiles").upsert(
          { id, name: user.name ?? "", email: user.email },
          { onConflict: "id" }
        );
        if (error) console.error("Supabase signIn upsert error:", error);
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.sub = (profile as any).sub;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard =
        nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/solve") ||
        nextUrl.pathname.startsWith("/topics") ||
        nextUrl.pathname.startsWith("/profile") ||
        nextUrl.pathname.startsWith("/tutors") ||
        nextUrl.pathname.startsWith("/community") ||
        nextUrl.pathname.startsWith("/pomodoro");

      if (isOnDashboard && !isLoggedIn) {
        return Response.redirect(new URL("/login", nextUrl));
      }
      return true;
    },
  },
});
