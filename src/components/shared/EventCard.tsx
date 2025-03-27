import React from 'react'
import Image from 'next/image'
import { Edit, Eye, Heart, Trash } from 'lucide-react'
import { TEvent } from '../private/event/type'
import SheetModal from './SheetModal'
import Modal from './Modal'

type TProps = {
   props: TEvent
   ownerId?: string
}
const EventCard = ({ props, ownerId }: TProps) => {
   const { title, thumbnail, price, organizerId } = props
   console.log(organizerId === ownerId);


   const coverteCurrency = (price: string) => {
      const convertedPrice = parseInt(price)
      if (typeof window === 'undefined') return convertedPrice
      const currency = Intl.NumberFormat('AOA', { style: 'currency', currency: 'AOA' }).format(convertedPrice)
      return currency
   }
   return (
      <div className="rounded-xl overflow-hidden border border-neutral-800 hover:shadow-md transition-shadow">
         <div className="relative aspect-square">

            <Image
               src={thumbnail}
               alt={title}
               fill
               className="object-cover"
               style={{
                  background: "linear-gradient(45deg, #a18cd1, #fbc2eb, #a6c1ee)",
               }}
            />
            <button className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white">
               <Heart className="h-4 w-4" />
            </button>
         </div>
         <div className="p-4">
            <h3 className="font-medium">{title}</h3>
            <div className="flex justify-between items-center mt-2">
               <div className='flex gap-2 items-center'>
                  <div className="text-sm text-gray-500">Preço</div>
                  <span className="font-medium">{coverteCurrency(price[0].price)}</span>
               </div>
               {organizerId !== ownerId ? (
                  <div>
                     <SheetModal
                        side='right'
                        trigger={<Eye />}
                        title={props.title}
                        description='View event details'
                        label='Event Details'>detais</SheetModal>
                     <SheetModal
                        side='right'
                        trigger={<Edit className='text-green-500' />}
                        title={props.title}
                        description='View event details'
                        label='Event Details'>detais</SheetModal>
                     <Modal trigger={<Trash className='text-red-500' />}>
                        delete
                     </Modal>
                  </div>
               ) : null}
            </div>
            <div className='flex justify-between'>

               <div className="flex items-center mt-3 -space-x-2">
                  <div className="w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                     <Image src="/placeholder.svg?height=24&width=24" alt="User" width={24} height={24} />
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                     <Image src="/placeholder.svg?height=24&width=24" alt="User" width={24} height={24} />
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                     <Image src="/placeholder.svg?height=24&width=24" alt="User" width={24} height={24} />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default EventCard
