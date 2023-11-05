import Image from "next/image";
import terracotta_background from "../../public/terracotta_background7.jpg";
// import terracotta_background from "../../public/terracotta_background_original.jpg";

export default function Background() {
  return (
    // <Image
    //   alt="Terracotta Background"
    //   src={terracotta_background}
    //   placeholder="blur"
    //   quality={100}
    //   // fill
    //   sizes="100vw"
    //   style={{
    //     // objectFit: "fill",
    //     zIndex: -1,
    //     // width: "100%",
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
        // objectFit: "fill",
        zIndex: -1,
        // width: "100%",
        height: "100%",
        // position: "fixed",
      }}
      className="w-full h-auto"
    />
  );
}
