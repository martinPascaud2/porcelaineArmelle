"use client";

import Link from "next/link";
import { useSearchParams, useParams } from "next/navigation";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

import { inter } from "@/assets/fonts";

import ScrollToTop from "@/components/ScrollToTop";

export default function Pagination({ pageMax }) {
  const params = useParams();
  const { type } = params;

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page"));

  return (
    <>
      <div className="m-4 flex flex-row gap-3 ">
        <div className={page === 1 ? "collapse" : ""}>
          <Link
            href={`/creations/${type}?page=${page - 1}`}
            className="bg-slate-100 border border-slate-800 rounded-lg mx-2 my-2 px-3 py-2 text-sm font-medium text-slate-800 basis-20 flex justify-center shadow shadow-slate-500 transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none"
          >
            <ArrowLeftIcon className="block h-8 w-8 " />
          </Link>
        </div>

        <div className="scale-[1.08] ">
          <div className="bg-terra-100 border border-terra-800 rounded-lg mx-2 my-2 px-3 py-2 text-2xl font-medium text-terra-800">
            <div className="block h-8 w-8 flex place-content-center">
              {page}
            </div>
          </div>
        </div>

        <div id="paginationNext" className={page >= pageMax ? "collapse" : ""}>
          <Link
            href={`/creations/${type}?page=${page + 1}`}
            className="bg-slate-100 border border-slate-800 rounded-lg mx-2 my-2 px-3 py-2 text-sm font-medium text-slate-800 basis-20 flex justify-center shadow shadow-slate-500 transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none"
          >
            <ArrowRightIcon className="block h-8 w-8" />
          </Link>
        </div>
      </div>

      <ScrollToTop />
    </>
  );
}
