
import { motion } from "framer-motion";
import { ReactNode } from "react";
type Card = {
   id: number;
   title: string;
};
type TProps = {
   card: Card;
   onClick: () => void;
   className?: string;
   trigger: ReactNode
}

// const variants = {
//    list: 'p-4 w-auto h-auto',
//    card: 'h-60 w-64 py-8 px-7'
// }
const ModalTrigger = (props: TProps) => {
   return (
      <motion.li
         key={props.card.id}
         className={`${props.className} text-white flex justify-end flex-col text-balance cursor-pointer`}
         layoutId={`card-2`}
         onClick={props.onClick}
      >
         <div className="flex justify-center items-center">
            <motion.button className='' layoutId={`heading-${props.card.id}`}>
               {props.trigger}
            </motion.button>
         </div>
         <motion.span layoutId={`description-2`} />
      </motion.li>
   );
}
export default ModalTrigger;