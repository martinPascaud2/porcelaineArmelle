import Image from "next/image";
import limage from "/public/imageTEST.jpeg";
import limage2 from "/public/1.jpeg";
import limage3 from "/public/grande_motte.jpeg";
import limage4 from "/public/2.jpeg";
import { amatic, inter, roboto, ibm } from "@/assets/fonts";
import Link from "next/link";

import Carousel from "./components/Carousel";
import { Container } from "postcss";

export default function Home() {
  const carouselImages = [limage, limage2, limage4, limage2];
  return (
    <>
      <main>
        <div>Home</div>
      </main>
    </>
  );
}
