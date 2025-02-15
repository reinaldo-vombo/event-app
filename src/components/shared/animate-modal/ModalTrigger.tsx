
import { motion } from "framer-motion";
import { ReactNode } from "react";

type TProps = {
   onClick: () => void;
   className?: string;
   trigger: ReactNode
   selectedCard: boolean | null
   id: number
}

// const variants = {
//    list: 'p-4 w-auto h-auto',
//    card: 'h-60 w-64 py-8 px-7'
// }
const ModalTrigger = (props: TProps) => {
   return (
      <motion.li
         className={`${props.className} text-white flex justify-end flex-col text-balance cursor-pointer`}
         layoutId={`card-${props.id}`}
         onClick={props.onClick}
      >
         <div className="flex justify-center items-center">
            <motion.button className={props.className} layoutId={`heading-${props.id}`}>
               {props.trigger}
            </motion.button>
         </div>
         <motion.span layoutId={`description-${props.id}`} />
      </motion.li>
   );
}
export default ModalTrigger;