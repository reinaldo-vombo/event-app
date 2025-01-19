"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import BackDrop from "./BackDrop";
import CardContent from "./Card";

export const CARDS: Card[] = [
   {
      id: 1,
      title: "Some title here",
      description:
         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus doloremque optio recusandae dolorem ipsa odit perferendis, repellat rem corporis sit soluta beatae neque illum molestias ex quidem delectus adipisci. Laboriosam!",
   },
];

type Card = {
   id: number;
   title: string;
   description: string;
};

const Modal = () => {
   const [selectedCard, setSelectedCard] = useState<Card | null>(null);
   return (
      <>
         <main className="h-full center relative w-full">
            <motion.ul
               className='flex flex-wrap gap-4 justify-center items-center size-full flex-col'
               layout
               transition={{ duration: 0.5, ease: "easeInOut" }}
            >
               {CARDS.map((card) => (
                  <CardContent
                     key={card.id}
                     card={card}
                     onClick={() => setSelectedCard(card)}
                  />
               ))}
            </motion.ul>
         </main>
         <BackDrop card={selectedCard} onClick={() => setSelectedCard(null)} />
      </>
   );
};



export default Modal;
