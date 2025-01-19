import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type TSerach = {
   props: {
      id: string;
      title: string;
      thumbnail: string;
   }
}

const SeachList = ({ props }: TSerach) => {
   const { id, thumbnail, title } = props;
   return (
      <div className="rounded-lg p-1 hover:bg-neutral-900 transition-colors">
         <Link href={`/evento/${id}`} className="flex gap-3">
            <div className="relative size-10 rounded-lg">
               <Image src={thumbnail} fill sizes="100%" alt={title} />
            </div>
            <h2 className="text-lg">{title}</h2>
            <ArrowRight className="ml-auto -rotate-45" />
         </Link>
      </div>
   )
}

export default SeachList
