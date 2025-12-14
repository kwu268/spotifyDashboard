// src/app/test-token/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getValidAccessToken } from "@/lib/getValidAccountToken";

export default async function TestTokenPage() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return <div>Not authenticated</div>;
    }

    try {
      const token = await getValidAccessToken(session.user.id);
      console.log("Valid token:", token);
      return <div>Token fetched! Check terminal logs.</div>;
    } catch (error) {
      console.error("Error fetching token:", error);
      return <div>Error fetching token. Check logs.</div>;
    }
  } catch (authError) {
    console.error("Auth error:", authError);
    return <div>Error with auth: {String(authError)}</div>;
  }
}