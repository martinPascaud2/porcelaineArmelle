"use client";

import Link from "next/link";

export function LogoutButton({ signOut }) {
  return (
    <Link
      className="text-slate-100 hover:bg-terra-700 rounded-md px-3 py-2 text-sm font-medium mb-2 mt-1 absolute right-0"
      onClick={() => signOut()}
      href="/"
    >
      Déconnexion
    </Link>
  );
}
