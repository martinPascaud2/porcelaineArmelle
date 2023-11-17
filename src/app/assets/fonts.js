import { Inter, Amatic_SC, IBM_Plex_Serif, Figtree } from "next/font/google";

export const inter = Inter({ subsets: ["latin"], display: "swap" });

export const amatic = Amatic_SC({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const ibm = IBM_Plex_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  display: "swap",
});

export const ibmNotItalic = IBM_Plex_Serif({
  weight: ["500", "700"],
  style: "normal",
  subsets: ["latin"],
  display: "swap",
});

export const figtree = Figtree({
  weight: ["300", "400", "500"],
  style: "normal",
  subsets: ["latin"],
  display: "swap",
});
