'use client'

import Modal from "@/components/shared/animate-modal/Modal"
import ExpandabelCard from "@/components/ui/expandabel-card"
import Pill from "@/components/ui/pill"
type TProps = {
   tickests: {
      id: string;
      name: string;
      price: number;
      quantity: number;
   }[]
}
const RegiterToEvent = ({ tickests }: TProps) => {
   return (
      <div className="space-y-3">
         <div>
            <Pill />
         </div>
         <div className='flex items-center'>
            <ExpandabelCard title="Comprar bilhet">
               <h4>Escolha o seu bilhete</h4>
               <div className="mb-6 space-y-5">
                  {tickests.map((ticket) => (
                     <div className='flex justify-between border border-gray-700 cursor-pointer hover:bg-slate-400 p-1 rounded-md' key={ticket.id}>
                        <div className='flex items-center gap-2'>
                           <span>{ticket.name}</span>
                           <b>{ticket.price}(kz)</b>
                        </div>
                        <div>quantity</div>
                     </div>
                  ))}
               </div>
               <div>
                  <Modal id={3} className="w-full rounded-lg" trigger={<div className="bg-green-500 hover:bg-green-700 rounded-lg p-1"> <b>5000(kz)</b> checkout</div>}>
                     hell</Modal>
               </div>
            </ExpandabelCard>
         </div>
      </div>
   )
}

export default RegiterToEvent
