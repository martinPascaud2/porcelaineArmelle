"use server";

import { cookies } from "next/headers";
import * as jose from "jose";

export async function connect(prevState, formData) {
  console.log("formData", formData);
  console.log("prevState", prevState);
  const password = formData.get("password");
  if (password !== process.env.ADMIN_PASSWORD) {
    return { status: 401, message: "Mot de passe incorrect" };
  } else {
    const secret = new TextEncoder().encode(process.env.PRIVATE_KEY);
    const alg = "HS256";

    const jwt = await new jose.SignJWT({
      [process.env.NEXT_PUBLIC_APP_URL]: true,
    })
      .setProtectedHeader({ alg })
      .setSubject("Admin")
      .sign(secret);

    cookies().set({
      name: "token",
      value: jwt,
      httpOnly: true,
      path: "/",
    });

    return { status: 200, message: "Connexion autorisée" };
  }
}
