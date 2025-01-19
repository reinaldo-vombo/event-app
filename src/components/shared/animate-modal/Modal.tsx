"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import ModalBody from "./ModalBody";
import ModalTrigger from "./ModalTrigger";

const CARDS: Card[] = [
   {
      id: 2,
      title: "Some title here",
   },
];
type TModalProps = {
   className?: string;
   children: ReactNode;
   trigger: ReactNode

}

type Card = {
   id: number;
   title: string;
};

const Modal = ({ className, children, trigger }: TModalProps) => {
   const [selectedCard, setSelectedCard] = useState<Card | null>(null);
   return (
      <>
         <div className="h-full relative w-full">
            <motion.ul
               className='flex flex-wrap gap-4 justify-center items-center size-full flex-col'
               layout
               transition={{ duration: 0.5, ease: "easeInOut" }}
            >
               {CARDS.map((card) => (
                  <ModalTrigger
                     key={card.id}
                     card={card}
                     trigger={trigger}
                     className={className}
                     onClick={() => setSelectedCard(card)}
                  />
               ))}
            </motion.ul>
         </div>
         <ModalBody card={selectedCard} onClick={() => setSelectedCard(null)}>
            {children}
         </ModalBody>
      </>
   );
};



export default Modal;
