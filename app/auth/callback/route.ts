import { getOAuthToken } from "@/app/lib/esi/sso";
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function GET(request: Request) {
  const { origin, searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    // show an error page?
    // or just send an error to display?
  }

  const token = await getOAuthToken(code!);

  if (!token?.access_token) {
    // show an error page?
    // or just send an error to display?
  }

  const decoded = jwtDecode(token?.access_token!);

  const charID = decoded.sub?.split(":")[2];
  if (!charID) {
    // show an error page?
    // or just send an error to display?
  }

  const response = NextResponse.redirect(`${origin}/character/${charID}`, {
    status: 302,
  });

  if (token?.access_token) {
    response.cookies.set("esi_token_" + charID, token.access_token, {
      httpOnly: true,
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}
