'use client'
import { useSearchParams } from 'next/navigation'
import SeachList from './SeachList'
import SearchInput from './SearchInput'
import { TEvent, } from '@/components/private/event/type'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

type TProps = {
   events: TEvent[]
}
const SearchContent = ({ events }: TProps) => {
   const searchParams = useSearchParams();
   const query = searchParams.get("query")?.toString() || "";
   const [recentSearches, setRecentSearches] = useState<string[]>([]);
   console.log('serach', recentSearches);

   useEffect(() => {
      const storedSearches = JSON.parse(localStorage.getItem("recentSearches") || "[]");
      setRecentSearches(storedSearches);
   }, []);

   useEffect(() => {
      if (query.trim()) {
         setRecentSearches((prev) => {
            const updatedSearches = [query, ...prev.filter((item) => item !== query)].slice(0, 5); // Limit to 5 searches
            localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
            return updatedSearches;
         });
      }
   }, [query]);
   const clearRecentSearch = (search: string) => {
      const updatedSearches = recentSearches.filter((item) => item !== search);
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
   };
   const handleRecentSearchClick = (search: string) => {
      window.history.pushState({}, "", `?query=${search}`);
      window.dispatchEvent(new Event("popstate")); // Force URL update in Next.js
   };

   const filteredEvents = query.trim()
      ? events.filter((p) =>
         p.title.toLowerCase().includes(query.toLowerCase())
      )
      : [];

   return (
      <div className='space-y-7'>
         <SearchInput />
         <h3 className='font-semibold'>Resultados: ({filteredEvents.length})</h3>
         <div>
            {filteredEvents.length > 0 ? (
               filteredEvents.map((event) => (
                  <SeachList key={event.id} props={event} />
               ))
            ) : (
               <div className="col-span-12">
                  <p className="text-gray-500">
                     Nenhum evento encontrado para <b>{query}</b>
                  </p>
                  <X className="text-gray-500 size-7" />
               </div>
            )}
         </div>
         {recentSearches.length > 0 && !query.trim() && (
            <div className="p-3 rounded-md">
               <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-700">Pesquisas recentes</h3>

               </div>
               <div className="flex gap-2 mt-2 flex-wrap">
                  {recentSearches.map((search, index) => (
                     <div key={index} className="flex items-center gap-2 bg-white border rounded-md px-2 py-1">
                        <button
                           onClick={() => handleRecentSearchClick(search)}
                           className="text-sm text-gray-600"
                        >
                           {search}
                        </button>
                        <button
                           onClick={() => clearRecentSearch(search)}
                           className="text-red-500 text-xs ml-1"
                        >
                           ✖
                        </button>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </div>
   )
}

export default SearchContent;
