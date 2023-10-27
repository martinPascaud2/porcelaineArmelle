import Image from "next/image";
import terracotta_background from "../../public/terracotta_background5.jpg";

export default function Background() {
  return (
    <Image
      alt="Terracotta Background"
      src={terracotta_background}
      placeholder="blur"
      quality={100}
      fill
      style={{
        objectFit: "fill",
        zIndex: -1,
      }}
    />
  );
}
