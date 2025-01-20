import Modal from "@/components/shared/animate-modal/Modal";
import { X } from "lucide-react";
import Image from "next/image";

type TProps = {
   files: (File & {
      preview: string;
   })[];
   setFiles: React.Dispatch<React.SetStateAction<(File & {
      preview: string;
   })[]>>
}

const MultipleImageView = ({ files }: TProps) => {
   return (
      <div className="flex items-center justify-center gap-4">
         {files.map((url) => (
            <div className="size-40 relative" key={url.name}>
               <Modal trigger={
                  <Image src={url.preview} className="rounded-lg" fill sizes="100%" alt={url.name} />
               }>
                  <div className="relative h-52">
                     <Image src={url.preview} className="object-cover rounded-lg" fill sizes="100%" alt={url.name} />
                     <button className="absolute top-2 right-2 rounded-full bg-red-500"><X /></button>
                  </div>
               </Modal>
            </div>
         ))}
      </div>
   )
}

export default MultipleImageView;
