import Image from "next/image";

import terracotta_background from "../../public/terracotta_background7.jpg";

export default function Background() {
  return (
    // <Image
    //   alt="Terracotta Background"
    //   src={terracotta_background}
    //   placeholder="blur"
    //   quality={100}
    //   sizes="100vw"
    //   style={{
    //     zIndex: -1,
    //     height: "100%",
    //     position: "fixed",
    //   }}
    //   className="w-full h-auto"
    // />
    <Image
      alt="Terracotta Background"
      src={terracotta_background}
      placeholder="blur"
      quality={100}
      fill
      sizes="100vw"
      style={{
        zIndex: -1,
        height: "100%",
      }}
      className="w-full h-auto"
    />
  );
}
