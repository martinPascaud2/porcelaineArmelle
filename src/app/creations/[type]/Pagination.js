"use client";

import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useSearchParams, useParams } from "next/navigation";

import { inter } from "@/assets/fonts";

export default function Pagination({ pageMax }) {
  console.log("pageMax pagination", pageMax);
  const params = useParams();
  console.log("params", params);
  const { type } = params;
  console.log("type", type);

  const searchParams = useSearchParams();
  console.log("searchParams", searchParams);
  const page = parseInt(searchParams.get("page"));
  console.log("page depuis searchparams", page);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="m-8 flex flex-row gap-3 ">
        <div className={page === 1 ? "collapse" : ""}>
          <Link
            href={`/creations/${type}?page=${page - 1}`}
            className={`${inter.className} bg-terra-100 border border-terra-600 rounded-lg rounded-md mx-4 my-2 px-3 py-2 text-sm font-medium text-slate-600 hover:border-terra-600 hover:text-slate-600 basis-20 flex justify-center shadow shadow-terra-800 transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none`}
          >
            <ArrowLeftIcon className="block h-8 w-8 " aria-hidden="true" />
          </Link>
        </div>
        <div className="scale-[1.08] ">
          <div
            className={`${inter.className} bg-terra-100 border border-terra-600 rounded-lg rounded-md mx-4 my-2 px-3 py-2 text-md font-medium text-slate-600 hover:border-slate-400 hover:text-slate-500 basis-20 flex justify-center`}
          >
            <div className="block h-8 w-8 flex place-content-center pt-1">
              {page}
            </div>
          </div>
        </div>
        <div id="paginationNext" className={page >= pageMax ? "collapse" : ""}>
          <Link
            href={`/creations/${type}?page=${page + 1}`}
            className={`${inter.className} bg-terra-100 border border-terra-600 rounded-lg rounded-md mx-4 my-2 px-3 py-2 text-sm font-medium text-slate-600 hover:border-terra-600 hover:text-slate-600 basis-20 flex justify-center shadow shadow-terra-800 transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none`}
          >
            <ArrowRightIcon className="block h-8 w-8 " aria-hidden="true" />
          </Link>
        </div>
      </div>
      <button onClick={scrollToTop} className="sm:hidden">
        scroll to top
      </button>
    </>
  );
}
