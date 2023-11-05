"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import limage from "/public/imageTEST.jpeg";
import { amatic } from "@/assets/fonts";

import React from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";

// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

const useSwipe = (activeIndex, updateIndex, maxIndex) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  console.log("maxIndex", maxIndex);

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
    if (isLeftSwipe && activeIndex < maxIndex) {
      updateIndex(activeIndex + 1);
    }
    if (isRightSwipe) {
      updateIndex(activeIndex - 1);
    }

    // add your conditional logic here
  };
  return { onTouchStart, onTouchMove, onTouchEnd };
};

export default function Modal({ images, imagesUrls }) {
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
    updateIndex,
    imagesUrls.length - 1
  );
  // console.log("article modal", article);
  // const imagesUrls = article.imageList.map((image) => {
  //   const cloudUrl = cloudinary.url(image.url);
  //   return cloudUrl;
  // });
  // console.log(imagesUrls);

  const carouselItems = imagesUrls.map((image, i) => (
    <div key={i} className="inline-flex">
      <div className="carousel" />
      <div className=" flex flex-col">
        <Image
          alt="Mountains"
          src={image}
          sizes="100vw"
          // fill
          width={1800}
          height={1125}
          style={
            {
              // width: "100%",
              // height: "auto",
              // maxHeight: "40vh",
            }
          }
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
                activeIndex === 0 ? "collapse" : "visible"
              } bg-terra-100 border border-1 border-slate-400 rounded-lg rounded-md px-3 py-0 text-lg font-medium text-slate-500 hover:border-slate-400 hover:text-slate-500 basis-24 sm:basis-32 flex justify-center shadow shadow-slate-400 transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none`}
            >
              {"<"}
            </button>
            <button
              onClick={() => updateIndex(activeIndex + 1)}
              className={`${
                activeIndex === imagesUrls.length - 1 ? "collapse" : "visible"
              } bg-terra-100 border border-1 border-slate-400 rounded-lg rounded-md px-3 py-0 text-lg font-medium text-slate-500 hover:border-slate-400 hover:text-slate-500 basis-24 sm:basis-32 flex justify-center shadow shadow-slate-400  transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none`}
            >
              {">"}
            </button>
          </div>
        </div>
        <div className="flex flex-col py-5 rounded-b-lg border border-t-slate-400 border-b-terra-500 border-l-terra-500 border-r-terra-500 bg-slate-100">
          <h5
            className={`${amatic.className} text-3xl font-bold text-terra-500 self-center mb-6`}
          >
            Noteworthy technology acquisitions 2021
          </h5>
          <div className="flex flex-row w-full place-content-between mb-3">
            <button
              onClick={router.back}
              className="ml-6 bg-terra-100 border border-1 border-slate-400 rounded-lg rounded-md px-3 py-2 text-sm font-medium text-slate-400 hover:border-slate-400 hover:text-slate-500 basis-20 flex justify-center shadow shadow-slate-400 transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none"
            >
              Retour
            </button>

            <Link
              href="#"
              className="mr-6 bg-terra-100 border border-1 border-slate-400 rounded-lg rounded-md px-3 py-2 text-sm font-medium text-slate-400 hover:border-slate-400 hover:text-slate-500 basis-20 flex justify-center shadow shadow-slate-400 transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none"
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
      <div className="grid grid-cols-1 justify-end  w-full sm:w-full md:w-5/6 lg:w-1/4 xl:w-1/3 overflow-hidden self-center sm:self-end mx-auto">
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
