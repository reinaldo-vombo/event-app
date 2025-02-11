"use client"

import { Plane } from "lucide-react"

export default function BoardingPass() {
   return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
         <div className="relative w-full max-w-[400px] aspect-[1/1.8] rounded-lg overflow-hidden">
            {/* Holographic overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-400 opacity-90" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3Atb3BhY2l0eT0iLjEiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1vcGFjaXR5PSIuMSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1vcGFjaXR5PSIuMSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGZpbGw9InVybCgjZykiIGQ9Ik0wIDBoMjAwdjIwMEgweiIvPjwvc3ZnPg==')] opacity-30" />

            {/* Perforated edges */}
            <div className="absolute left-0 top-0 bottom-0 w-4 flex flex-col justify-between py-4">
               {[...Array(12)].map((_, i) => (
                  <div key={i} className="h-2 w-2 bg-black rounded-full" />
               ))}
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-4 flex flex-col justify-between py-4">
               {[...Array(12)].map((_, i) => (
                  <div key={i} className="h-2 w-2 bg-black rounded-full" />
               ))}
            </div>

            {/* Content */}
            <div className="relative h-full px-8 py-6 flex flex-col">
               {/* Top section */}
               <div className="space-y-2">
                  <div className="flex justify-between items-start">
                     <div className="bg-black text-white px-2 py-1 text-sm font-bold">X3A</div>
                     <div className="w-24 h-12 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=')] bg-contain bg-no-repeat" />
                  </div>
                  <div className="text-3xl font-bold tracking-wider">438948</div>
               </div>

               {/* Middle section */}
               <div className="flex-1 flex flex-col justify-center space-y-4">
                  <div className="space-y-1">
                     <div className="text-5xl font-bold tracking-widest">
                        DRA
                        <br />
                        MA
                     </div>
                     <div className="text-sm italic">BOARDING PASS*</div>
                  </div>

                  <div className="text-sm space-y-4 mt-4">
                     <div className="flex justify-between">
                        <div>
                           <div className="text-black/60">DATE</div>
                           <div>08/04</div>
                        </div>
                        <div className="text-right">
                           <div className="text-black/60">CABIN</div>
                           <div>TOURIST CLASS</div>
                        </div>
                     </div>
                     <div>
                        <div className="text-black/60">PASSENGER</div>
                        <div>SFT</div>
                     </div>
                  </div>
               </div>

               {/* Bottom section */}
               <div className="space-y-2">
                  <div className="flex justify-between items-center">
                     <div className="text-xs">New Year 2022</div>
                     <Plane className="w-4 h-4" />
                  </div>
                  <div className="w-full h-16 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=')] bg-contain bg-no-repeat" />
               </div>
            </div>
         </div>
      </div>
   )
}

