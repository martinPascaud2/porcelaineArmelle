"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import limage from "/public/imageTEST.jpeg";
import { amatic } from "@/assets/fonts";

import React from "react";
import Link from "next/link";

export default function Carousel({ children, images }) {
  console.log("images", images);
  const [activeIndex, setActiveIndex] = useState(0);
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= images.length - 1) {
      newIndex = images.length - 1;
    }
    setActiveIndex(newIndex);
  };
  console.log("activeIndex", activeIndex);

  const carouselItems = images.map((image, i) => (
    <div key={i} className="inline-flex">
      <div className="flex flex-col">
        <Image
          alt="Mountains"
          src={image}
          // sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
            // maxHeight: "40vh",
          }}
          priority
          className="rounded-t-lg border-t border-l border-r border-terra-500"
        />
        <div className="p-5 rounded-b-lg border border-t-slate-400 border-b-terra-500 border-l-terra-500 border-r-terra-500 bg-slate-100">
          <h5
            className={`${amatic.className} text-3xl font-normal text-terra-500 tracking-tight mb-6`}
          >
            Noteworthy technology acquisitions 2021
          </h5>
          <div className="flex flex-row space-x-4 sm:ml-4 place-content-around">
            <div className="flex flex-row basis-3/4 gap-5">
              <button
                onClick={() => updateIndex(activeIndex - 1)}
                className="bg-terra-100 border border-1 border-slate-300 rounded-lg rounded-md px-3 py-2 text-sm font-medium text-slate-500 hover:border-slate-400 hover:text-slate-500 basis-20 flex justify-center shadow shadow-slate-400 transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none"
              >
                {"<"}
              </button>
              <button
                onClick={() => updateIndex(activeIndex + 1)}
                className="bg-terra-100 border border-1 border-slate-300 rounded-lg rounded-md px-3 py-2 text-sm font-medium text-slate-500 hover:border-slate-400 hover:text-slate-500 basis-20 flex justify-center shadow shadow-slate-400 transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none"
              >
                {">"}
              </button>
            </div>
            <Link
              href="#"
              className="basis-1/4 bg-terra-100 border border-1 border-slate-300 rounded-lg rounded-md px-3 py-2 text-sm font-medium text-slate-400 hover:border-slate-400 hover:text-slate-500 basis-20 flex justify-center shadow shadow-slate-400 transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  ));

  console.log("carouselItems", carouselItems);
  return (
    <div className="w-full sm:w-full md:w-5/6 lg:w-1/4 xl:w-1/3 overflow-hidden self-center mx-auto ">
      {/* <div className="carousel  self-center"> */}
      <div
        className={`inner whitespace-nowrap  duration-300 `}
        style={{
          transform: `translateX(-${activeIndex * 100}%) translateZ(0)`,
        }}
      >
        {carouselItems}
      </div>
    </div>
  );
}
