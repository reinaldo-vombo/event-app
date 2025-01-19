'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { CalendarDays, ChevronRight, Users } from 'lucide-react'

const events = [
   { id: 1, name: "Summer Music Festival", date: "2025-07-15", attendees: 5000 },
   { id: 2, name: "Tech Conference 2025", date: "2025-09-22", attendees: 1200 },
   { id: 3, name: "Annual Charity Gala", date: "2025-11-05", attendees: 300 },
]

export default function UpcomingEvents() {
   const [expandedEvent, setExpandedEvent] = useState<number | null>(null)

   return (
      <ul className="space-y-4">
         {events.map((event) => (
            <li key={event.id} className="border rounded-lg p-4">
               <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{event.name}</h3>
                  <Button variant="ghost" size="sm" onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}>
                     <ChevronRight className={`w-4 h-4 transition-transform ${expandedEvent === event.id ? 'rotate-90' : ''}`} />
                  </Button>
               </div>
               {expandedEvent === event.id && (
                  <div className="mt-2 space-y-2">
                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                     </div>
                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees} attendees</span>
                     </div>
                  </div>
               )}
            </li>
         ))}
      </ul>
   )
}

