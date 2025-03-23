import React from 'react'
import { Button } from '../ui/button'
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
   return (
      <div className="rounded-xl overflow-hidden border border-gray-200 bg-white hover:shadow-md transition-shadow">
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
               <div>
                  <div className="text-sm text-gray-500">Preço</div>
                  <div className="flex items-center gap-1">
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                           d="M12 2L19.5 14H4.5L12 2Z"
                           stroke="currentColor"
                           strokeWidth="2"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                        <path
                           d="M12 22L4.5 10H19.5L12 22Z"
                           stroke="currentColor"
                           strokeWidth="2"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                     </svg>
                     <span className="font-medium">{price[0].price}</span>
                     <span className="text-xs text-gray-500"></span>
                  </div>
               </div>
               <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-xs">
                  Buy now
               </Button>
            </div>
            <div className='flex justify-between'>
               {organizerId && organizerId === ownerId ? (
                  <div>
                     <SheetModal
                        side='right'
                        trigger={<Eye />}
                        title={props.title}
                        description='View event details'
                        label='Event Details'>detais</SheetModal>
                     <SheetModal
                        side='right'
                        trigger={<Edit />}
                        title={props.title}
                        description='View event details'
                        label='Event Details'>detais</SheetModal>
                     <Modal title='Eliminar evento' trigger={<Trash />}>
                        delete
                     </Modal>
                  </div>
               ) : null}
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
