'use client'
// import { PostCard } from '../event/PostCard'
import Image from 'next/image'
import { TEventProps } from '../event/type'
import Link from 'next/link'
import { PRIVE_ROUTES } from '@/constant/static-content'

const EventsSections = ({ props }: TEventProps) => {
   return (
      <div className='columns-7 max-w-7xl mx-auto space-y-4'>
         {props ? props.map((event) => (
            <div className='rounded-md overflow-hidden' key={event.id}>
               <Link href={`${PRIVE_ROUTES.root}/events/${event.slug}`}>
                  <Image src={event.thumbnail} width={500} height={300} alt={event.slug} />
               </Link>
            </div>
         )) : (<p>no events</p>)}
      </div>
   )
}

export default EventsSections;
