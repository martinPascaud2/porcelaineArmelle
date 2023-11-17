import { figtree } from "@/assets/fonts";

export default function Footer() {
  return (
    <div
      className={`border-t border-terra-800 bg-terra-100 flex justify-center p-5 ${figtree.className} font-light`}
    >
      Copyright 2023 – Atelier Pascaud
    </div>
  );
}
