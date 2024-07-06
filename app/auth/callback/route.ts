import { getOAuthToken } from "@/app/lib/esi/sso";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { origin, searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    // show an error page?
    // or just send an error to display?
  }

  const token = await getOAuthToken(code!);

  const response = NextResponse.redirect(origin, {
    status: 302,
  });

  if (token?.access_token) {
    response.cookies.set("token", token.access_token, {
      httpOnly: true,
      sameSite: true,
      secure: true,
    });
  }

  return response;
}
