'use client'

import Modal from "@/components/shared/animate-modal/Modal"
import EventTicket from "@/components/shared/checkout/EventTicket"
import ExpandabelCard from "@/components/ui/expandabel-card"
import Pill from "@/components/ui/pill"
import { TEvent } from "./type"
import { useState } from "react"
import { Button } from "@/components/ui/button"
type TProps = {
   props: TEvent
}
const RegiterToEvent = ({ props }: TProps) => {
   const [selectedPrice, setSelectedPrice] = useState(0)
   const date = new Date(props.startDate)
   const handleSelectPrice = (price: string) => {

      const convertPrice = parseInt(price)
      setSelectedPrice(convertPrice)
   }
   return (
      <div className="space-y-3">
         <div>
            <Pill />
         </div>
         {props.price && (
            <div className='flex items-center'>
               <ExpandabelCard title="Comprar bilhet">
                  <h4>Escolha o seu bilhete</h4>
                  <div className="mb-6 space-y-5">
                     {props.price.map((ticket) => {
                        const convertPrice = parseInt(ticket.price)
                        return (
                           <div
                              className={`flex justify-between border border-gray-700 cursor-pointer hover:bg-slate-400 p-1 rounded-md ${selectedPrice === convertPrice ? 'bg-slate-400' : ''}`}
                              key={ticket.title}
                              onClick={() => handleSelectPrice(ticket.price)}>
                              <div className='flex items-center gap-2'>
                                 <span>{ticket.title}</span>
                                 <b>{parseInt(ticket.price)}(kz)</b>
                              </div>
                              <div>quantity {selectedPrice}</div>
                           </div>
                        )
                     })}
                  </div>
                  <div>
                     {selectedPrice ? (
                        <Modal
                           id={3}
                           className="w-full rounded-lg"
                           trigger={<div className="bg-green-500 hover:bg-green-700 rounded-lg p-1"> <b>{selectedPrice || 0}(kz)</b> checkout</div>}>
                           <EventTicket
                              date={date.toDateString()}
                              image={props.thumbnail}
                              location={props.locationName}
                              price={selectedPrice}
                              title={props.title}
                              eventId={props.id}
                           />
                        </Modal>
                     ) : (
                        <Button className="w-full bg-green-500/85 hover:bg-green-700" disabled>Confirmar</Button>
                     )}
                  </div>
               </ExpandabelCard>
            </div>

         )}
      </div>
   )
}

export default RegiterToEvent
