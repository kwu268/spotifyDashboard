import prisma from "@/lib/prisma";
import { DateTime } from "luxon";

const url = process.env.SPOTIFY_REFRESH_URL!;
const basicAuth = Buffer.from(
  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
).toString("base64");

export const getValidAccessToken = async (userId: string) => {
  try {
    // 1. Fetch the user's Spotify account from the database using Prisma
    const userAccount = await prisma.account.findFirst({
      where: {
        userId: userId,
        provider: "spotify",
      },
    });
    // 2. If no account is found, throw error
    if (!userAccount) {
      throw new Error("No Spotify account found for user");
    }
    const { access_token, refresh_token, expires_at } = userAccount;

    const expiredTime = DateTime.fromSeconds(expires_at as number);
    const isExpired = expiredTime <= DateTime.now().plus({ seconds: 5 });
    console.log("Current time:", DateTime.now().toSeconds());
    console.log("Expires at:", expiredTime.toSeconds());
    console.log("Is expired:", isExpired);

    // 3. if access token has not expired, return it
    if (!isExpired) {
      console.log("!@#!@#");
      return access_token;
    }
    console.log("@@@ preparing to refresh");

    // 4. If access token has expired, use refresh token to get a new access token from Spotify
    const payload = {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    };
    const refreshResponse = await fetch(url, {
      method: "POST",
      body: new URLSearchParams(payload as Record<string, string>),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",

        Authorization: `Basic ${basicAuth}`,
      },
    });
    if (!refreshResponse.ok) {
      throw new Error("Failed to refresh access token");
    }
    // 5. set new values in the database
    const tokenData = await refreshResponse.json();

    const updateAccount = await prisma.account.update({
      where: {
        id: userAccount.id,
      },
      data: {
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token ?? refresh_token,
        expires_at: Math.floor(
          DateTime.now().plus({ seconds: tokenData.expires_in }).toSeconds()
        ),
      },
    });

    return tokenData.access_token;
  } catch (e) {
    console.error("Error getting valid access token:", e);
  }
};
