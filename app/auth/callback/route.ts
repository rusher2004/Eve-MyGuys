import { charIDFromJWTSub, fetchOAuthToken } from "@/app/lib/esi/sso";
import { setKV } from "@/app/lib/kv";
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { JWTToken, OAuthGrantType } from "@/app/lib/definitions";

export async function GET(request: Request) {
  const { origin, searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    // show an error page?
    // or just send an error to display?
  }

  const token = await fetchOAuthToken(code!, OAuthGrantType.Authorization);

  if (!token?.access_token) {
    // show an error page?
    // or just send an error to display?
  }

  const { sub } = jwtDecode(token?.access_token!) as JWTToken;
  const charID = charIDFromJWTSub(sub);

  if (!charID) {
    // show an error page?
    // or just send an error to display?
  }

  const response = NextResponse.redirect(`${origin}/character/${charID}`, {
    status: 302,
  });

  const key = "esi_token_" + charID;

  if (token?.access_token) {
    response.cookies.set(key, token.access_token, {
      httpOnly: true,
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
    });

    await setKV(key, {
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    });
  }

  return response;
}
