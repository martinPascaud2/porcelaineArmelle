"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import limage from "/public/imageTEST.jpeg";
import "./Carousel.css";
import { amatic } from "@/assets/fonts";

import React from "react";

export const CarouselItem = ({ children, width }) => {
  return (
    <div className="carousel-item inline-flex" style={{ width: width }}>
      {children}
    </div>
    // <div className="carousel-item">{children}</div>
  );
};

const Carousel = ({ children, images }) => {
  console.log("images", images);
  const [activeIndex, setActiveIndex] = useState(0);
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
      // } else if (newIndex >= React.Children.count(children)) {
      //   newIndex = React.Children.count(children) - 1;
      // }
    } else if (newIndex >= images.length - 1) {
      newIndex = images.length - 1;
    }
    setActiveIndex(newIndex);
  };
  console.log("activeIndex", activeIndex);
  const carouselItems = images.map((image, i) => (
    <CarouselItem key={i}>
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
        </div>
      </div>
    </CarouselItem>
  ));

  console.log("carouselItems", carouselItems);
  return (
    <div className="carousel  self-center	w-1/4">
      {/* <div className="carousel  self-center"> */}
      <div
        className={`inner whitespace-nowrap	`}
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {/* {children} */}
        {/* <CarouselItem>
          <Image
            alt="Mountains"
            src={limage}
            // sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              // maxHeight: "40vh",
            }}
            priority
            className="rounded-t-lg"
          />
        </CarouselItem> */}

        {/* {images.map((image, i) => {
          return (
            <CarouselItem key={i}>
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
                className="rounded-t-lg"
              />
            </CarouselItem>
          );
        })} */}
        {React.Children.map(carouselItems, (item, index) => {
          return React.cloneElement(item, {
            width: "100%",
            key: index,
          });
        })}
      </div>
      <div className="indicators">
        <button onClick={() => updateIndex(activeIndex - 1)}>prev</button>
        <button onClick={() => updateIndex(activeIndex + 1)}>next</button>
      </div>
    </div>
  );
};

export default Carousel;
