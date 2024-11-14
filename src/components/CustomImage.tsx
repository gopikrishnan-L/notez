import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import { forwardRef, ReactNode } from "react";

const getImage = async (src: string) => {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    ...plaiceholder,
    img: { src, height, width },
  };
};

async function PlaiceHolderImage({ url, alt }: { url: string; alt: string }) {
  const { base64, img } = await getImage(url);
  return (
    <Image
      src={img.src}
      fill
      alt={alt}
      title="Photo from Unsplash"
      blurDataURL={base64}
      placeholder="blur"
      className="object-cover"
    />
  );
}

interface CustomImageProps {
  url: string | null;
  alt: string;
  fallbackIcon?: ReactNode;
}

const CustomImage = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CustomImageProps
>(({ className, url, alt, fallbackIcon = <ImageOff />, ...props }, ref) => {
  return (
    <div
      className={cn(
        "relative grid place-content-center overflow-clip bg-secondary",
        className
      )}
      {...props}
      ref={ref}
    >
      {url ? <PlaiceHolderImage url={url} alt={alt} /> : fallbackIcon}
    </div>
  );
});

CustomImage.displayName = "CustomImage";

export default CustomImage;
