
import { TEventProps } from '../event/type'

export default function Events({ props }: TEventProps) {
   return (
      <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 lg:grid-cols-2">
         {props ? props.map((event) => (
            <div
               key={event.id}
               className="flex events-end overflow-hidden bg-cover rounded-lg h-96"
               style={{ backgroundImage: `url(${event.thumbnail})` }}
            >
               <div className="w-full px-8 py-4 backdrop-blur-sm rounded-b-lg bg-white/60 dark:bg-gray-800/60">
                  <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize dark:text-white">
                     {event.title}
                  </h2>
                  <p className="mt-2 text-lg tracking-wider text-blue-500 uppercase dark:text-blue-400">
                     {event.category}
                  </p>
               </div>
            </div>
         )) : (<p>Não teis nenhum evento</p>)}

      </div>
   )
}
