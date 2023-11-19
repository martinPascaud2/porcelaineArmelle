"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { amatic } from "@/assets/fonts";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

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
          className="rounded-t-lg border border-terra-800"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          priority
        />

        <div className="absolute bottom-32 w-full ">
          <div className="flex flex-row justify-between sm:justify-center gap-28">
            <button
              onClick={() => updateIndex(activeIndex - 1)}
              className={`${
                activeIndex === 0 ? "collapse" : "visible"
              } h-6 bg-slate-100 border border-1 border-slate-800 rounded-md px-0 pt-0.5 text-lg text-slate-800 basis-24 sm:basis-28 flex justify-center shadow shadow-slate-500 transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none`}
            >
              <ChevronLeftIcon className="block h-5 w-6" />
            </button>
            <button
              onClick={() => updateIndex(activeIndex + 1)}
              className={`${
                activeIndex === imagesUrls.length - 1 ? "collapse" : "visible"
              } h-6 bg-slate-100 border border-1 border-slate-800 rounded-md px-0 pt-0.5 text-lg text-slate-800 basis-24 sm:basis-28 flex justify-center shadow shadow-slate-500  transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none`}
            >
              <ChevronRightIcon className="block h-5 w-6 " />
            </button>
          </div>
        </div>

        <div className="flex flex-col py-4 rounded-b-lg border-t-0 border-b border-x border-terra-800 bg-terra-100">
          <h5
            className={`${amatic.className} text-2xl tracking-wide font-bold text-terra-800 self-center mb-6`}
          >
            {name}
          </h5>
          <div className="flex flex-row w-full place-content-between mb-3">
            <button
              onClick={router.back}
              className="ml-8 bg-slate-100 border border-1 border-slate-800 rounded-lg rounded-md px-2 py-1 text-sm font-normal text-slate-800 basis-20 flex justify-center shadow shadow-slate-500 transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none"
            >
              Retour
            </button>

            <Link
              href={`/contact?id=${id}`}
              className="mr-8 bg-slate-100 border border-1 border-slate-800 rounded-lg rounded-md px-2 py-1 text-sm font-normal text-slate-800 basis-20 flex justify-center shadow shadow-slate-500 transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none"
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
