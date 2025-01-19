import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
type Card = {
   id: number;
   title: string;
   description: string;
};

// const variants = {
//    list: 'p-4 w-auto h-auto',
//    card: 'h-60 w-64 py-8 px-7'
// }
const CardContent = (props: { card: Card; onClick: () => void }) => {
   return (
      <motion.li
         key={props.card.id}
         className="text-white p-4 w-auto h-auto rounded-[30px] bg-black/20 text-[21px] hover:brightness-125 flex justify-end flex-col text-balance cursor-pointer"
         layoutId={`card-1`}
         onClick={props.onClick}
      >
         <div className="flex justify-between items-center">
            <motion.p
               className="text-balance"
               layoutId={`heading-${props.card.id}`}
            >

            </motion.p>
            <Button className="bg-transparent">
               <Search className="size-4" />
            </Button>
         </div>
         <motion.span layoutId={`description-1`} />
      </motion.li>
   );
}
export default CardContent;