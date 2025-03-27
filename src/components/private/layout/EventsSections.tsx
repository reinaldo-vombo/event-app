'use client'
// import { PostCard } from '../event/PostCard'
import Image from 'next/image'
import { TEventProps } from '../event/type'
import Link from 'next/link'
import { PRIVE_ROUTES } from '@/constant/static-content'
import UserAvatar from '@/components/shared/UserAvatar'

const EventsSections = ({ props }: TEventProps) => {

   return (
      <div className='columns-7 max-w-7xl mx-auto space-y-4'>
         {props ? props.map((event) => (
            <div className='rounded-md overflow-hidden' key={event.id}>
               <Link href={`${PRIVE_ROUTES.root}/events/${event.slug}`}>
                  <Image src={event.thumbnail} width={500} height={300} alt={event.slug} />
               </Link>
               {event.organizer && (
                  <Link href={`${PRIVE_ROUTES.creator}${event?.organizer.id}`} className='flex items-center gap-4 mt-3'>
                     <UserAvatar src={event.organizer.image} name={event.organizer.name} />
                     <p>{event.organizer.name}</p>
                  </Link>
               )}
            </div>
         )) : (<p>no events</p>)}
      </div>
   )
}

export default EventsSections;
