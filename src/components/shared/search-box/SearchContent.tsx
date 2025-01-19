import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import SeachList from "./SeachList";
type Card = {
   id: number;
   title: string;
   description: string;
};
const obj = {
   id: '222',
   title: 'Angola Open sorce',
   thumbnail: '/avatar.jpg'
}
const SearchContent = (props: { card: Card | null; onClick: () => void }) => {
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
               <motion.div className="fixed inset-0 z-10 flex flex-col justify-center">
                  <motion.div className="p-8 max-w-[500px] mx-auto h-[400px] rounded-[30px] relative overflow-hidden flex items-center justify-center flex-col bg-black/20" layoutId={`card-${props.card.id}`}>
                     <div className="max-w-xl mx-auto">
                        <motion.div className="text-white font-medium text-balance relative" layoutId={`heading-${props.card.id}`}>
                           <Input type="search" className="border-slate-700" placeholder="Procuara evento..." />
                           <Search className="absolute right-3 top-[5px] text-slate-700" />
                        </motion.div>
                        <motion.div className="text-[#969799] w-[45rem] font-medium text-[15px] mt-8" layoutId={`description-${props.card.id}`}>
                           <SeachList props={obj} />
                        </motion.div>
                     </div>
                     <Button className="absolute top-8 right-8" onClick={props.onClick}>
                        <X />
                     </Button>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </>
   );
}
export default SearchContent;