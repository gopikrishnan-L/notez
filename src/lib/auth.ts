import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/lib/auth.config";
import prisma from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      //   console.log({ token });
      //   console.log({ session });
      const userAccount = await prisma.user.findUnique({
        where: { id: token.sub },
      });

      if (!userAccount) {
        session.error = "UserNotFound";
        return session;
      }

      session.user.id = userAccount.id;

      const googleAccount = await prisma.account.findFirst({
        where: { userId: token.sub, provider: "google" },
      });

      //   console.log(JSON.stringify(googleAccount));
      if (!googleAccount) session.error = "GoogleAccountDoesNotExist";
      else if (googleAccount.expires_at! * 1000 < Date.now()) {
        // If the access token has expired, try to refresh it
        try {
          // https://accounts.google.com/.well-known/openid-configuration
          // We need the `token_endpoint`.
          const response = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            body: new URLSearchParams({
              client_id: process.env.AUTH_GOOGLE_ID!,
              client_secret: process.env.AUTH_GOOGLE_SECRET!,
              grant_type: "refresh_token",
              refresh_token: googleAccount.refresh_token!,
            }),
          });

          const tokensOrError = await response.json();

          if (!response.ok) throw tokensOrError;

          const newTokens = tokensOrError as {
            access_token: string;
            expires_in: number;
            refresh_token?: string;
          };

          await prisma.account.update({
            data: {
              access_token: newTokens.access_token,
              expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
              refresh_token:
                newTokens.refresh_token ?? googleAccount.refresh_token,
            },
            where: {
              provider_providerAccountId: {
                provider: "google",
                providerAccountId: googleAccount.providerAccountId,
              },
            },
          });
        } catch (error) {
          console.error("Error refreshing access_token", error);
          // If we fail to refresh the token, return an error so we can handle it on the page
          session.error = "RefreshTokenError";
        }
      }
      return session;
    },
    signIn({ user, account, profile, email, credentials }: any) {
      if (account.provider === "google") {
        console.log({ user, account, profile, email, credentials });
        return true;
      }
      return false;
    },
  },
  ...authConfig,
});

declare module "next-auth" {
  interface Session {
    error?: "RefreshTokenError" | "GoogleAccountDoesNotExist" | "UserNotFound";
  }
}
