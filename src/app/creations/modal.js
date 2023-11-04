"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import limage from "/public/imageTEST.jpeg";
import { amatic } from "@/assets/fonts";

import React from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";

const useSwipe = (activeIndex, updateIndex) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    // if (isLeftSwipe || isRightSwipe)
    //   console.log("swipe", isLeftSwipe ? "left" : "right");
    if (isLeftSwipe) {
      updateIndex(activeIndex + 1);
    }
    if (isRightSwipe) {
      updateIndex(activeIndex - 1);
    }

    // add your conditional logic here
  };
  return { onTouchStart, onTouchMove, onTouchEnd };
};

export default function Modal({ children, images }) {
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(0);
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= images.length - 1) {
      newIndex = images.length - 1;
    }
    setActiveIndex(newIndex);
  };

  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(
    activeIndex,
    updateIndex
  );

  const carouselItems = images.map((image, i) => (
    <div key={i} className="inline-flex">
      <div className="scroll" />
      <div className="relative flex flex-col">
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
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        />

        <div className="absolute bottom-36 w-full ">
          <div className="flex flex-row justify-between sm:justify-center gap-8">
            <button
              onClick={() => updateIndex(activeIndex - 1)}
              className={`${
                activeIndex === 0 ? "invisible sm:hidden" : "visible"
              } bg-terra-100 border border-1 border-slate-300 rounded-lg rounded-md px-3 py-0 text-lg font-medium text-slate-500 hover:border-slate-400 hover:text-slate-500 basis-24 sm:basis-32 flex justify-center shadow shadow-slate-500 transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none`}
            >
              {"<"}
            </button>
            <button
              onClick={() => updateIndex(activeIndex + 1)}
              className={`${
                activeIndex === images.length - 1
                  ? "invisible sm:hidden"
                  : "visible"
              } bg-terra-100 border border-1 border-slate-300 rounded-lg rounded-md px-3 py-0 text-lg font-medium text-slate-500 hover:border-slate-400 hover:text-slate-500 basis-24 sm:basis-32 flex justify-center shadow shadow-slate-500  transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none`}
            >
              {">"}
            </button>
          </div>
        </div>
        <div className="flex flex-col  p-5 rounded-b-lg border border-t-slate-400 border-b-terra-500 border-l-terra-500 border-r-terra-500 bg-slate-100">
          <h5
            className={`${amatic.className} text-3xl font-normal text-terra-500 tracking-tight mt-3 mb-6`}
          >
            Noteworthy technology acquisitions 2021
          </h5>
          <div className="flex flex-row w-full place-content-between">
            <button
              onClick={router.back}
              className="mx-3 bg-terra-100 border border-1 border-slate-300 rounded-lg rounded-md px-3 py-2 text-sm font-medium text-slate-400 hover:border-slate-400 hover:text-slate-500 basis-20 flex justify-center shadow shadow-slate-500 transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none"
            >
              Retour
            </button>

            <Link
              href="#"
              className="mx-3 bg-terra-100 border border-1 border-slate-300 rounded-lg rounded-md px-3 py-2 text-sm font-medium text-slate-400 hover:border-slate-400 hover:text-slate-500 basis-20 flex justify-center shadow shadow-slate-500 transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="flex ">
      <div className="grid grid-cols-1 justify-end w-full sm:w-full md:w-5/6 lg:w-1/4 xl:w-1/3 overflow-hidden self-center mx-auto">
        {/* <div className="carousel  self-center"> */}
        <div
          className={`inner whitespace-nowrap duration-300`}
          style={{
            transform: `translateX(-${activeIndex * 100}%) translateZ(0)`,
          }}
        >
          {carouselItems}
        </div>
      </div>
    </div>
  );
}
