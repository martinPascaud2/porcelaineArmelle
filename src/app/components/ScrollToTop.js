"use client";

import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";

export default function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      onClick={scrollToTop}
      className="sm:hidden mb-4 border border-slate-800 shadow shadow-slate-800 bg-slate-100 text-slate-800 rounded-full"
    >
      <ChevronDoubleUpIcon className="block m-4 h-6 w-6 " />
    </button>
  );
}
