"use client";

import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";

export default function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      onClick={scrollToTop}
      className="sm:hidden mb-4 border border-terra-800 shadow shadow-terra-700 bg-terra-100 text-terra-800 rounded-full"
    >
      <ChevronDoubleUpIcon className="block m-4 h-6 w-6 " />
    </button>
  );
}
