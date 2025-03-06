'use client'
import { useSearchParams } from 'next/navigation'
import SeachList from './SeachList'
import SearchInput from './SearchInput'
import { TEvent, } from '@/components/private/event/type'

type TProps = {
   events: TEvent[]
}
const SearchContent = ({ events }: TProps) => {
   const searchParams = useSearchParams();
   const query = searchParams.get("query")?.toString() || "";
   const filteredEvents = events.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
   );
   return (
      <div className='space-y-7'>
         <SearchInput />
         <h3 className='font-semibold'>Resultados: ({filteredEvents.length})</h3>
         <div>
            {filteredEvents ? filteredEvents.map((event) => (
               <SeachList key={event.id} props={event} />
            )) : <p>Não há eventos</p>}
         </div>
      </div>
   )
}

export default SearchContent;
