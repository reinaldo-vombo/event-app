'use client'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { PostCard } from '../event/PostCard'
import { IMAGE_GALLERY } from '@/constant/static-content'
import Image from 'next/image'
// import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
const data = {
   id: 'ddd',
   slug: 'hello',
   thumbnail: '/Firefly.jpg',
   title: 'Angola Open Source',
   handle: '@eginalde',
   description: 'hello',
   comments: 5,
   retweets: 20,
   likes: 10,
   shared: 5,
   category: 'hela'

}
const EventsSections = () => {
   return (
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
         <div className='grid gap-4'>
            {IMAGE_GALLERY.map((event) => (
               <div className='' key={event.id}>
                  <Image src={event.image} width={200} height={200} className='h-auto max-w-full' alt="" />
               </div>
            ))}
         </div>
      </div>
   )
}

export default EventsSections;
