import Image from "next/image";
import Link from "next/link";

import home from "/public/home3.jpg";
import { amatic, ibm } from "./assets/fonts";

export default function Home() {
  return (
    <main className="relative flex flex-col justify-center items-center">
      <Image
        src={home}
        alt="Bannière de la page d'accueil"
        className="absolute top-0 z-0 border-y border-terra-800 brightness-[.70]"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        priority
      />

      <div className="z-10 text-slate-100 flex flex-col items-center">
        <div className="">
          <svg
            version="1.0"
            className="h-20 w-20"
            style={{
              filter:
                "invert(94%) sepia(2%) saturate(1074%) hue-rotate(189deg) brightness(105%) contrast(95%)",
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 286.000000 286.000000"
          >
            <g
              transform="translate(0.000000,238.000000) scale(0.100000,-0.100000)"
              stroke="currentColor"
              strokeWidth="0"
            >
              <path
                d="M400 2299 c-121 -24 -246 -126 -303 -246 l-32 -68 -3 -785 c-2 -528
        1 -801 8 -835 22 -104 110 -224 205 -279 99 -59 59 -57 1171 -54 l1019 3 69
        34 c87 43 164 120 207 207 l34 69 0 825 0 825 -29 60 c-44 88 -131 175 -219
        216 l-72 34 -1005 2 c-554 0 -1025 -3 -1050 -8z m2123 -83 c68 -35 134 -102
        174 -177 l28 -54 0 -815 0 -815 -24 -50 c-37 -75 -121 -157 -194 -191 l-62
        -29 -1025 0 -1025 0 -60 29 c-77 38 -153 114 -191 191 l-29 60 -3 763 c-2 493
        1 783 7 819 22 117 104 221 215 274 l61 29 1035 -2 1035 -3 58 -29z"
              />
              <path
                d="M782 1963 c-6 -10 -130 -337 -277 -727 -244 -649 -265 -710 -251
        -725 12 -12 21 -13 33 -5 9 6 71 155 141 342 l125 332 214 2 c117 1 238 2 269
        3 l56 0 37 -90 c21 -49 71 -169 111 -265 144 -347 134 -325 160 -325 16 0 26
        7 28 18 2 9 -55 158 -127 330 -72 172 -131 318 -131 323 0 13 619 30 630 17 4
        -4 45 -80 90 -168 46 -88 97 -187 115 -220 17 -33 60 -115 95 -183 53 -103 67
        -122 84 -120 16 2 57 65 163 248 79 135 175 301 215 369 86 149 86 156 -18
        155 -38 0 -212 -1 -388 -3 l-319 -3 -57 108 c-31 60 -96 185 -144 277 -48 93
        -95 171 -103 174 -8 3 -21 -1 -29 -9 -18 -18 -25 -3 145 -331 62 -120 112
        -219 110 -221 -2 -2 -144 -7 -315 -10 l-311 -7 -31 78 c-27 67 -173 421 -246
        593 -25 59 -56 77 -74 43z m97 -266 c118 -281 182 -439 179 -442 -6 -6 -478
        -18 -478 -12 0 3 24 70 54 149 29 79 80 214 112 300 33 87 61 158 64 158 3 0
        34 -69 69 -153z m1574 -634 c-46 -82 -126 -219 -176 -305 -50 -87 -91 -157
        -92 -155 -4 4 -104 195 -190 362 -48 94 -96 184 -107 202 l-19 32 103 4 c57 1
        207 4 335 5 l232 2 -86 -147z"
              />
            </g>
          </svg>
        </div>
        <div className={`${amatic.className} text-6xl text-slate-100`}>
          Atelier Pascaud
        </div>
      </div>
      <Link
        href={`${process.env.NEXT_PUBLIC_APP_URL}/creations`}
        className={`z-10 px-4 py-3 border-2 rounded-lg border-terra-800 bg-slate-100 text-6xl ${ibm.className} text-terra-800 mt-3`}
      >
        Découvrir
      </Link>
    </main>
  );
}
