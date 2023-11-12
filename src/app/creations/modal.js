"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { amatic } from "@/assets/fonts";

const useSwipe = (activeIndex, updateIndex, maxIndex) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && activeIndex < maxIndex) {
      updateIndex(activeIndex + 1);
    }
    if (isRightSwipe) {
      updateIndex(activeIndex - 1);
    }
  };

  return { onTouchStart, onTouchMove, onTouchEnd };
};

export default function Modal({ name, imagesUrls, id }) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = useCallback(
    (newIndex) => {
      if (newIndex < 0) {
        newIndex = 0;
      } else if (newIndex >= imagesUrls.length - 1) {
        newIndex = imagesUrls.length - 1;
      }
      setActiveIndex(newIndex);
    },
    [imagesUrls.length]
  );

  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(
    activeIndex,
    updateIndex,
    imagesUrls.length - 1
  );

  const carouselItems = imagesUrls.map((image, i) => (
    <div key={i} className="inline-flex">
      <div className="carousel" />

      <div className="flex flex-col">
        <Image
          alt={`Image de ${name}`}
          src={image}
          sizes="100vw"
          width={1800}
          height={1125}
          className="rounded-t-lg border-t border-l border-r border-terra-500"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          priority
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
            {name}
          </h5>
          <div className="flex flex-row w-full place-content-between mb-3">
            <button
              onClick={router.back}
              className="ml-6 bg-terra-100 border border-1 border-slate-400 rounded-lg rounded-md px-3 py-2 text-sm font-medium text-slate-400 hover:border-slate-400 hover:text-slate-500 basis-20 flex justify-center shadow shadow-slate-400 transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none"
            >
              Retour
            </button>

            <Link
              href={`/contact?id=${id}`}
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
