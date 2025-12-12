import prisma from "../../../../lib/prisma";
import NextAuth, { type NextAuthOptions, type Session } from "next-auth";
import { type JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import SpotifyProvider from "next-auth/providers/spotify";

const scopes = [
  "user-read-email",
  "user-read-private",
  "user-read-recently-played",
  "user-top-read",
].join(",");

export const authOptions: NextAuthOptions = {
  // Adapter: tells nextAuth to use Neon database for storing user accounts, sessions, and OAuth account data (where tokens are first saved )
  // When user signs in, Prisma adatper creates/updates the User, Session, and Account records in the database
  adapter: PrismaAdapter(prisma),

  // Providers: defines the authentication method. Using SPOTIFY_SCLIENT_ID and SPOTIFY_CLIENT_SECRET from environment variables to inititate OAuth flow with Spotify
  //authorization: When user logs in, they will be prompted to consent for permissions for the same permissions defined in scopes variable
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: scopes,
        },
      },
    }),
  ],
  // Callbacks: Custom logic to manage session and tokens
  // Ensures I can access tokens needed for data fetching
  // Flow: User Signs in -> jwt callback --> returns jwt token with access and refresh tokens -> session callback called with the jwt token from previous step -> session object returned to client with tokens included
  callbacks: {

    async signIn({ user, account, profile }) {
            // 🌟 LOG THE DATA HERE 🌟
            console.log("--- SIGN IN CALLBACK DATA ---");
            console.log("User Data (from Provider):", user);
            console.log("Account (contains tokens/ID):", account);
            console.log("Profile (full response):", profile);
            console.log("-----------------------------");

            // Return true to allow sign in, or false to block it
            return true;
        },


    // This runs immediately after successful sign-in
    // Logic:
    // 1. Checks if this is the initial sign in by checking if account object exists
    // 2. if account exists, it means user just signed in, so we store the access and refresh tokens in the JWT
    // 3. else, we just return the existing token (subsequent requests)
    async jwt({ token, account }) {
      // Checks if this is the initial sign-in
      if (account) {
        token.accessToken = account.access_token as string;
        token.refreshToken = account.refresh_token as string;
        // You must also store the ID, which is needed for the database lookup
        token.id = token.sub!; // token.sub is the user's ID
      }
      return token;
    },

    // runs whenever useSession() or server handler uses auth() or getSession()
    // Logic:
    // 1. receives the session and token (from the jwt callback)
    // 2. adds the accessToken, refreshToken, and user ID from the token to the session object
    // 3. returns the modified session object to be used on client side
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.id = token.id as string;
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },

  // 4. Strategy: Use JWTs stored in secure cookie for mananging user's session state
  session: {
    strategy: "jwt",
  },

  // 5. Secret: Provides secret key used to encrype and sign the JWTs to prevent tampering and ensuring security
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

// This exports the handler function's GET and POST methods
export { handler as GET, handler as POST };
