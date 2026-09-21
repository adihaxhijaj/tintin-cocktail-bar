import Image, { type ImageProps } from "next/image";
import { blurData } from "@/lib/blur";

/**
 * next/image wrapper that auto-attaches the generated blur placeholder for a
 * given /img/<name>.webp source. `alt` stays required by ImageProps.
 */
export function Photo({ src, alt, ...rest }: ImageProps) {
  const key =
    typeof src === "string"
      ? src.replace(/^\/img\//, "").replace(/\.webp$/, "")
      : "";
  const blur = blurData[key];
  return (
    <Image
      src={src}
      alt={alt}
      placeholder={blur ? "blur" : "empty"}
      blurDataURL={blur}
      {...rest}
    />
  );
}
