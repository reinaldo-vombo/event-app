import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Users } from 'lucide-react'
import UpcomingEvents from "./upcoming-events"
import EventStats from "./event-stats"

// This would typically come from a database or API
const user = {
   name: "Jane Doe",
   username: "janedoe",
   avatar: "/placeholder.svg?height=100&width=100",
   bio: "Event planner extraordinaire. Making your special moments unforgettable.",
   location: "New York, NY",
   eventsPlanned: 47,
   attendees: 1200
}

export default function ProfilePage() {
   return (
      <div className="container p-4">
         <Card className="mb-8">
            <CardContent className="pt-6">
               <div className="flex flex-col md:flex-row items-center gap-6">
                  <Avatar className="w-32 h-32">
                     <AvatarImage src={user.avatar} alt={user.name} />
                     <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center md:text-left">
                     <h1 className="text-3xl font-bold">{user.name}</h1>
                     <p className="text-xl text-muted-foreground">@{user.username}</p>
                     <p className="mt-2 max-w-md">{user.bio}</p>
                     <div className="flex items-center justify-center md:justify-start mt-2 gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{user.location}</span>
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>

         <div className="grid md:grid-cols-2 gap-8">
            <Card>
               <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
               </CardHeader>
               <CardContent>
                  <UpcomingEvents />
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>Event Statistics</CardTitle>
               </CardHeader>
               <CardContent>
                  <EventStats eventsPlanned={user.eventsPlanned} attendees={user.attendees} />
               </CardContent>
            </Card>
         </div>
      </div>
   )
}

