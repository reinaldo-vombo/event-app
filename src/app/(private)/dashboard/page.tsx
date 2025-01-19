
import EventsSections from '@/components/private/layout/EventsSections'
import SearchModal from '@/components/shared/search-box/SearchModal'
import React from 'react'

const page = () => {
   return (
      <section className='pt-[100px]'>
         <div className="container space-y-4">
            <div className='flex items-center justify-between'>
               <h2 className='font-semibold text-3xl'>O que está acontecendo</h2>
               <SearchModal />
            </div>
            <EventsSections />
         </div>
      </section>
   )
}

export default page
