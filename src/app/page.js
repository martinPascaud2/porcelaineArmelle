import Image from "next/image";
import limage from "/public/imageTEST.jpeg";
import limage2 from "/public/1.jpeg";
import limage3 from "/public/grande_motte.jpeg";
import limage4 from "/public/2.jpeg";
import { amatic } from "@/assets/fonts";
import Link from "next/link";

import Carousel, { CarouselItem } from "./components/Carousel/Carousel";
import { Container } from "postcss";

const Card = ({ image }) => {
  return (
    <div className="sm:mx-12 border border-terra-500 border rounded-lg max-w-sm w-full h-fit self-start ">
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
      <div className="p-5 rounded-b-lg border-t border-slate-400 bg-slate-100">
        <h5
          className={`${amatic.className} text-3xl font-normal text-terra-500 tracking-tight mb-6`}
        >
          Noteworthy technology acquisitions 2021
        </h5>
        {/* <p className={`text-sm font-normal text-terra-500 mb-3`}>
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p> */}
        <div className="flex flex-row space-x-4 sm:ml-4">
          <Link
            href="/contact"
            className="hidden sm:inline-flex bg-terra-100 border border-1 border-slate-300 rounded-lg rounded-md px-3 py-2 text-sm font-medium text-slate-400 hover:border-slate-400 hover:text-slate-500 basis-20 flex justify-center shadow shadow-slate-400 transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none"
          >
            Voir
          </Link>
          <Link
            href="/contact"
            className="bg-terra-100 border border-1 border-slate-300 rounded-lg rounded-md px-3 py-2 text-sm font-medium text-slate-400 hover:border-slate-400 hover:text-slate-500 basis-20 flex justify-center shadow shadow-slate-400 transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const carouselImages = [limage, limage2, limage4];
  return (
    <>
      {/* <main className="mt-3 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-18 gap-y-12">
          <Card image={limage2} />
          <Card image={limage4} />
          <Card image={limage2} />
          <Card image={limage4} />
          <Card image={limage2} />
          <Card image={limage2} />
        </div>
      </main> */}
      <main className="mt-3 flex justify-center">
        <Carousel images={carouselImages} className=" " />
      </main>
    </>
  );
}
