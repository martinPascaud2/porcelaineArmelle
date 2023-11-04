"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import CldImage from "@/components/CloudImage";

import { inter, amatic } from "@/assets/fonts";
import verseuses from "/public/verseuses.jpeg";
import couleeverte from "/public/coulée verte.jpeg";
import truc from "/public/truc.jpeg";

import { types } from "@/assets/globals";

// const ComponentA = dynamic(() => import('../components/A'))
// const srcTEST = dynamic(() => import("/public/verseuses.jpeg"));
// console.log("srcTEST", srcTEST);

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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

  // const srcTEST = import(`http://localhost:3000/public/verseuses.jpeg`);
  // console.log("srcTEST", srcTEST);

  const TypeLink = ({ type }) => {
    const href = `/creations/${type.name}?page=1`;
    const pathname = usePathname();
    const isActive = decodeURIComponent(pathname) === href.split("?")[0];

    return (
      <div
        className={classNames(
          isActive
            ? `w-64 h-36  border-2 border-terra-500`
            : "w-60 h-32  border hover:border-2 border-slate-300 hover:border-slate-400 hover:scale-x-[1.07] hover:scale-y-[1.12] transition	ease-in-out delay-0 duration-600",
          "shrink-0 relative mt-4 sm:mt-0 rounded-lg font-medium flex justify-center"
        )}
      >
        <Link href={href} className="flex">
          <Image
            // dynamic(() => import('../components/A'))
            src={type.imagePath}
            // src={verseuses}
            //   priority
            priority
            quality={100}
            //   fill
            width={500}
            height={500}
            sizes="100vw"
            alt="Verseuses"
            className="rounded"
            style={{
              objectFit: "cover",
              // width: "100%",
            }}
          />
        </Link>
        <Link
          href={href}
          className={classNames(
            isActive ? `text-6xl` : `text-5xl`,
            `absolute top-1/2 ${amatic.className} text-slate-300`
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
      className={`${
        scrolled
          ? "sm:transform-none transition-transform duration-500 ease-in-out delay-0  -translate-y-full scale-y-0"
          : "flex"
      }  sm:flex sticky top-0 sm:top-16 bg-slate-100 h-44 sm:h-40 border border-terra-500  sm:justify-center gap-x-12 items-center overflow-x-auto self-stretch`}
    >
      {types.map((type) => (
        <TypeLink key={type.name} type={type} />
      ))}
      {/* <TypeLink type={typesTEST[0]} /> */}
      {/* <div className="shrink-0 w-64 h-36 relative mt-4 sm:mt-0 border-2 border-terra-500 rounded-lg text-sm font-medium text-slate-400 flex justify-center">
        <Link
          href="/"
          className={`${inter.className}  bg-terra-100  rounded-lg text-sm font-medium text-slate-400 hover:border-slate-400 hover:text-slate-500  flex   transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none`}
        >
          <Image
            // dynamic(() => import('../components/A'))
            src={typesTEST[0].imagePath}
            // src={verseuses}
            //   priority
            priority
            quality={100}
            //   fill
            width={500}
            height={500}
            sizes="100vw"
            alt="Verseuses"
            className="rounded"
            style={{
              objectFit: "cover",
              // width: "100%",
            }}
          />
        </Link>
        <Link
          href="/"
          className={`absolute top-1/2 text-5xl text-slate-300 ${amatic.className}`}
        >
          {typesTEST[0].name}
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
            width={500}
            height={500}
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
            width={500}
            height={500}
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
          className={`absolute top-1/2 text-5xl text-slate-300  ${amatic.className}`}
        >
          Truc
        </Link>
      </div> */}
    </header>
  );
}
