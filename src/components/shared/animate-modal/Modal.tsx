"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import ModalBody from "./ModalBody";
import ModalTrigger from "./ModalTrigger";

type TModalProps = {
   className?: string;
   children: ReactNode;
   trigger: ReactNode
   id: number

}


const Modal = ({ className, children, trigger, id }: TModalProps) => {
   const [selectedCard, setSelectedCard] = useState<boolean | null>(null);
   return (
      <>
         <div className="h-full relative w-full">
            <motion.ul
               className='flex flex-wrap gap-4 justify-center items-center size-full flex-col'
               layout
               transition={{ duration: 0.5, ease: "easeInOut" }}
            >
               <ModalTrigger
                  selectedCard={selectedCard}
                  id={id}
                  trigger={trigger}
                  className={className}
                  onClick={() => setSelectedCard(true)}
               />
            </motion.ul>
         </div>
         <ModalBody id={id} selectedCard={selectedCard} onClick={() => setSelectedCard(null)}>
            {children}
         </ModalBody>
      </>
   );
};



export default Modal;
