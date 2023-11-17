"use client";

import Link from "next/link";

export function LogoutButton({ signOut }) {
  return (
    <Link
      className="absolute top-2 right-2 hidden sm:block border border-terra-800 text-terra-800 hover:bg-slate-100 rounded-md px-4 py-3 text-sm font-normal absolute right-0 self-center"
      onClick={() => signOut()}
      href="/"
    >
      Déconnexion
    </Link>
  );
}

export function LoginButton() {
  return (
    <Link
      href="/connect"
      className=" absolute top-2 right-2 hidden sm:block border border-terra-800 text-terra-800 hover:bg-slate-100 rounded-md px-4 py-3 text-sm font-normal absolute right-0 self-center"
    >
      Se connecter
    </Link>
  );
}
