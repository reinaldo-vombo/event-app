import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
type Card = {
   id: number;
   title: string;
   description: string;
};
const BackDrop = (props: { card: Card | null; onClick: () => void }) => {
   return (
      <>
         <AnimatePresence>
            {!!props.card && (
               <motion.div
                  className="fixed inset-0 flex items-center justify-center z-[10]"
                  initial={{ backdropFilter: "blur(0px)" }}
                  animate={{ backdropFilter: "blur(32px)" }}
                  exit={{ backdropFilter: "blur(0px)" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
               />
            )}
         </AnimatePresence>

         <AnimatePresence>
            {!!props.card && (
               <motion.div
                  className="fixed inset-0 z-10 flex flex-col justify-center"
                  onClick={props.onClick}
               >
                  <motion.div
                     className="p-8 max-w-[500px] mx-auto h-[400px] rounded-[30px] relative overflow-hidden flex items-center justify-center flex-col bg-black/20"
                     layoutId={`card-${props.card.id}`}
                  >
                     <div className="max-w-xl mx-auto">
                        <motion.p
                           className="text-white font-medium text-balance"
                           layoutId={`heading-${props.card.id}`}
                        >
                           {props.card.title}
                        </motion.p>
                        <motion.p
                           className="text-[#969799] font-medium text-[15px] mt-8"
                           layoutId={`description-${props.card.id}`}
                        >
                           {props.card.description}
                        </motion.p>
                     </div>
                     <Button className="absolute top-8 right-8">
                        <Plus className="rotate-45" />
                     </Button>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </>
   );
}
export default BackDrop;