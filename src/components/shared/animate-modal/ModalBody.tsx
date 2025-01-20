import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { ReactNode } from "react";

type TProps = {
   onClick: () => void;
   selectedCard: boolean | null
   children: ReactNode;
   id: number
}


const BackDrop = (props: TProps) => {

   return (
      <>
         <AnimatePresence>
            {!!props.selectedCard && (
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
            {!!props.selectedCard && (
               <motion.div className="fixed inset-0 z-10 flex flex-col justify-center">
                  <motion.div
                     className="px-8 max-w-[500px] mx-auto py-12 rounded-[30px] relative overflow-hidden flex items-center justify-center flex-col bg-neutral-900"
                     layoutId={`card-${props.id}`}
                  >
                     <div className="max-w-xl mx-auto">
                        <motion.p
                           className="text-white font-medium text-balance"
                           layoutId={`heading-${props.id}`}
                        >
                        </motion.p>
                        <motion.div
                           className="text-[#969799] font-medium w-96 text-[15px] mt-8"
                           layoutId={`description-${props.id}`}
                        >
                           {props.children}
                        </motion.div>
                     </div>
                     <Button className="absolute top-8 right-8" onClick={props.onClick}>
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