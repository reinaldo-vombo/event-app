import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import Image, { StaticImageData } from "next/image";
import { IMAGE_GALLERY } from "@/constant/static-content";

const firstRow = IMAGE_GALLERY.slice(0, IMAGE_GALLERY.length / 2);
const secondRow = IMAGE_GALLERY.slice(IMAGE_GALLERY.length / 2);

const ReviewCard = ({ image }: { image: StaticImageData; }) => {
   return (
      <figure
         className={cn(
            "relative h-40 w-96 cursor-pointer overflow-hidden rounded-xl border p-4",
            // light styles
            "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
            // dark styles
            "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
         )}
      >
         <Image className="object-cover" fill sizes="100%" alt="demo image" src={image} />
      </figure>
   );
};

const MarqueeVertical = () => {
   return (
      <div className="relative flex h-screen w-full flex-row items-center justify-center overflow-hidden rounded-lg border bg-neutral-900 md:shadow-xl">
         <Marquee pauseOnHover vertical className="[--duration:20s]">
            {firstRow.map((review) => (
               <ReviewCard key={review.id} {...review} />
            ))}
         </Marquee>
         <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
            {secondRow.map((review) => (
               <ReviewCard key={review.id} {...review} />
            ))}
         </Marquee>
         <Marquee pauseOnHover vertical className="[--duration:20s]">
            {secondRow.map((review) => (
               <ReviewCard key={review.id} {...review} />
            ))}
         </Marquee>
         <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
            {secondRow.map((review) => (
               <ReviewCard key={review.id} {...review} />
            ))}
         </Marquee>
         <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black dark:from-background"></div>
         <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black dark:from-background"></div>
      </div>
   );
}

export default MarqueeVertical;
