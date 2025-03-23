
import EventsSections from '@/components/private/layout/EventsSections'
import SearchContent from '@/components/shared/search-box/SearchContent'
import SheetModal from '@/components/shared/SheetModal'
import { getAllEvents } from '@/lib/db/querys'
import { Search } from 'lucide-react'

const page = async () => {
   const data = await getAllEvents()
   return (
      <section>
         <div className="container space-y-4 mx-auto">
            <div className='flex items-center justify-between mx-16'>
               <h2 className='font-semibold text-3xl'>O que está acontecendo</h2>
               <div className=''>
                  <SheetModal
                     side='top'
                     trigger={<Search />}
                     title='Buscar eventos'
                     description='Digite o nome do evento que deseja buscar'
                     label='Buscar eventos'>
                     <SearchContent events={data} />
                  </SheetModal>
               </div>
            </div>
            <EventsSections props={data} />
         </div>
      </section>
   )
}

export default page
