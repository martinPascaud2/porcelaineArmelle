import { NextResponse } from "next/server";

import { jwtVerify } from "./app/utils/jwtVerify";

export async function middleware(request) {
  const token = request.cookies.get("token");

  if (request.nextUrl.pathname.startsWith("/editArticles")) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/connect?page=editArticles", request.url)
      );
    }
    console.log("request ici", request);

    const { userStatus } = await jwtVerify(token);

    if (userStatus !== "Admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
  }

  return NextResponse.next();
}
