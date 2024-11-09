import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
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

export default async function CustomImage({
  url,
  alt,
}: {
  url: string;
  alt: string;
}) {
  const { base64, img } = await getImage(url);
  return (
    <Image
      //   src={img.src}
      //   fill
      {...img}
      alt={alt}
      title="Photo from Unsplash"
      blurDataURL={base64}
      placeholder="blur"
    />
  );
}
