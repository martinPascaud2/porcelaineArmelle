"use client";

import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";

import { inter, amatic } from "@/assets/fonts";
import verseuses from "/public/verseuses.jpeg";
import couleeverte from "/public/coulée verte.jpeg";
import truc from "/public/truc.jpeg";

import CldImage from "@/components/CloudImage";

export default function Header() {
  const [scrolled, setScrolled] = useState(0);
  useEffect(() => {
    const getScroll = () => {
      window.addEventListener("scroll", function () {
        const scrollPosition = window.scrollY;
        setScrolled(scrollPosition > 100);
      });
    };
    getScroll();
  }, []);

  return (
    <header
      id="header"
      className={`${
        scrolled
          ? "sm:transform-none transition-transform duration-500 ease-in-out delay-0  -translate-y-full scale-y-0"
          : "flex"
      }  sm:flex sticky top-0 sm:top-16 bg-slate-100 h-44 sm:h-40 border border-terra-500  sm:justify-center gap-x-12 items-center overflow-x-auto`}
    >
      <div className="shrink-0 w-64 h-36 relative mt-4 sm:mt-0 border-2 border-terra-500 rounded-lg text-sm font-medium text-slate-400 flex justify-center">
        <Link
          href="/"
          className={`${inter.className}  bg-terra-100  rounded-lg text-sm font-medium text-slate-400 hover:border-slate-400 hover:text-slate-500  flex   transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none`}
        >
          <Image
            src={verseuses}
            //   priority
            quality={100}
            //   fill
            priority
            sizes="100vw"
            alt="Verseuses"
            className="rounded"
            style={{
              objectFit: "cover",
              //   width: "100%",
            }}
          />
        </Link>
        <Link
          href="/"
          className={`absolute top-1/2 text-5xl text-slate-300 ${amatic.className}`}
        >
          Verseuses
        </Link>
      </div>
      <div className="shrink-0 w-60 h-32 relative mt-4 sm:mt-0 border hover:border-2 border-slate-300 hover:border-slate-400 hover:scale-[1.12] transition	ease-in-out delay-0 duration-300 rounded-lg font-medium   flex justify-center  ">
        <Link
          href="/"
          className={`${inter.className}  bg-terra-100  rounded-lg text-sm font-medium   flex   transition	ease-in-out delay-0 duration-300`}
        >
          <Image
            src={couleeverte}
            priority
            quality={100}
            //   fill
            //   priority
            sizes="100vw"
            alt="Verseuses"
            className="rounded"
            style={{
              objectFit: "cover",
              //   width: "100%",
            }}
          />
          {/* <CldImage
              quality={100}
              priority
              width={252}
              height={140}
              style={{ objectFit: "cover" }}
              src={"x2djorflyok84x0c7e0m"}
              alt="Description of my image"
              className="rounded"
            /> */}
        </Link>
        <Link
          href="/"
          className={`absolute top-1/2 text-5xl text-slate-300  ${amatic.className}`}
        >
          Coulée verte
        </Link>
      </div>
      <div className="shrink-0 w-60 h-32 relative mt-4 sm:mt-0 border hover:border-2 border-slate-300 hover:border-slate-400 hover:scale-[1.12] transition	ease-in-out delay-0 duration-300 rounded-lg font-medium   flex justify-center  ">
        <Link
          href="/"
          className={`${inter.className}  bg-terra-100  rounded-lg text-sm font-medium   flex   transition	ease-in-out delay-0 duration-300`}
        >
          <Image
            src={truc}
            priority
            quality={100}
            sizes="100vw"
            alt="Verseuses"
            className="rounded"
            style={{
              objectFit: "cover",
              //   width: "100%",
            }}
          />
          {/* <CldImage
              quality={100}
              priority
              width={252}
              height={140}
              style={{ objectFit: "cover" }}
              src={"x2djorflyok84x0c7e0m"}
              alt="Description of my image"
              className="rounded"
            /> */}
        </Link>
        <Link
          href="/"
          className={`absolute top-1/2 text-5xl text-slate-300  ${amatic.className}`}
        >
          Truc
        </Link>
      </div>
    </header>
  );
}
