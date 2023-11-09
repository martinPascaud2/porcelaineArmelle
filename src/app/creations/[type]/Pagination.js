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
      <div className="mt-8 flex flex-row gap-3 ">
        <div className={page === 1 ? "collapse" : ""}>
          <Link
            href={`/creations/${type}?page=${page - 1}`}
            className={`${inter.className} bg-terra-100 border border-terra-600  rounded-lg mx-4 my-2 px-3 py-2 text-sm font-medium text-terra-600 hover:border-terra-600  basis-20 flex justify-center shadow shadow-terra-600 transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none`}
          >
            <ArrowLeftIcon className="block h-8 w-8 " />
          </Link>
        </div>

        <div className="scale-[1.08] ">
          <div
            className={`${inter.className} bg-terra-100 border border-terra-600  rounded-lg mx-4 my-2 px-3 py-2 text-xl font-medium text-terra-600`}
          >
            <div className="block h-8 w-8 flex place-content-center pt-1">
              {page}
            </div>
          </div>
        </div>

        <div id="paginationNext" className={page >= pageMax ? "collapse" : ""}>
          <Link
            href={`/creations/${type}?page=${page + 1}`}
            className={`${inter.className} bg-terra-100 border border-terra-600  rounded-lg mx-4 my-2 px-3 py-2 text-sm font-medium text-terra-600 hover:border-terra-600  basis-20 flex justify-center shadow shadow-terra-600 transition-shadow	ease-in-out delay-0 duration-300 hover:shadow-none`}
          >
            <ArrowRightIcon className="block h-8 w-8" />
          </Link>
        </div>
      </div>

      <ScrollToTop />
    </>
  );
}
