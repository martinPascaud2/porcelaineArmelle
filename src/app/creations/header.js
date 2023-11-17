"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { amatic } from "@/assets/fonts";
import { types } from "@/assets/globals";

import classNames from "@/utils/classNames";

export default function Header() {
  const TypeLink = ({ type }) => {
    const href = `/creations/${type.name}?page=1`;

    const pathname = usePathname();
    const isActive = decodeURIComponent(pathname) === href.split("?")[0];

    return (
      <div
        className={classNames(
          isActive
            ? `w-64 h-36  border-2 border-terra-800`
            : "w-60 h-32  border-2 hover:border-2 border-slate-100 hover:border-slate-800 hover:scale-x-[1.07] hover:scale-y-[1.12] transition ease-in-out delay-0 duration-600",
          "shrink-0 relative mt-4 mb-1 sm:mt-0 rounded-lg font-medium flex justify-center"
        )}
      >
        <Link href={href} className="flex">
          <Image
            src={type.imagePath}
            priority
            quality={100}
            width={500}
            height={500}
            sizes="100vw"
            alt={`Lien vers ${type}`}
            className="rounded-md"
            style={{
              objectFit: "cover",
            }}
          />
        </Link>
        <Link
          href={href}
          className={classNames(
            isActive ? `text-6xl ` : `text-5xl`,
            `absolute top-1/2 ${amatic.className} text-bold text-slate-100 `
          )}
        >
          {type.name}
        </Link>
      </div>
    );
  };

  return (
    <header
      id="header"
      className={`flex sticky top-0 sm:top-0 h-44 sm:h-48 border-b border-terra-800 bg-terra-100 sm:justify-center gap-x-12 items-center overflow-x-auto self-stretch`}
    >
      {types.map((type) => (
        <TypeLink key={type.name} type={type} />
      ))}
    </header>
  );
}
