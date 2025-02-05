
import EventsSections from '@/components/private/layout/EventsSections'
import Modal from '@/components/shared/animate-modal/Modal'
import SearchContent from '@/components/shared/search-box/SearchContent'
import { Search } from 'lucide-react'
import React from 'react'

const page = () => {
   return (
      <section>
         <div className="container space-y-4">
            <div className='flex items-center justify-between'>
               <h2 className='font-semibold text-3xl'>O que está acontecendo</h2>
               <div className='size-7'>
                  <Modal id={3} trigger={
                     <Search />
                  } ><SearchContent /></Modal>
               </div>
            </div>
            <EventsSections />
         </div>
      </section>
   )
}

export default page
