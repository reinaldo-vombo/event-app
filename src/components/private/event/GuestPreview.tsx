import Image from 'next/image';
import React from 'react'
type TProps = {
   guests: {
      name: string;
      avatar: File[]
   }[]
}

const GuestPreview = ({ guests }: TProps) => {

   return (
      <div className='flex items-center gap-4 mt-9'>
         {guests && guests.map((guest) => {
            const urlPreview = URL.createObjectURL(guest.avatar[0])
            return (
               <div key={guest.name} className='relative size-11 rounded-lg'>
                  <Image src={urlPreview} className='rounded-lg' fill sizes='100%' alt={guest.name} />
               </div>
            )
         })}
      </div>
   )
}

export default GuestPreview
