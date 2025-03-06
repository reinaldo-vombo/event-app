import { CheckCircle2, Calendar, MapPin, User, Mail } from "lucide-react"

import { Separator } from "@/components/ui/separator"

type TicketInfo = {
   title: string
   date: string
   location: string
   price: number
}

type UserDetails = {
   name: string
   email: string
   address: string
   city: string
   zipCode: string
   country: string
}

interface ConfirmationProps {
   ticketInfo: TicketInfo
   userDetails: UserDetails
   timeLeft: number
   isCompleted: boolean
}

export function Confirmation({ ticketInfo, userDetails, timeLeft, isCompleted }: ConfirmationProps) {
   const { title, date, location } = ticketInfo
   const { name, email } = userDetails

   // Generate a random confirmation number
   const confirmationNumber = `EVT-${Math.floor(100000 + Math.random() * 900000)}`

   return (
      <div className="flex flex-col items-center text-center space-y-6">
         <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-primary" />
         </div>

         <div className="space-y-2">
            <h2 className="text-2xl font-bold">Thank You!</h2>
            <p className="text-muted-foreground">Your ticket purchase was successful</p>
            {isCompleted && (
               <p className="text-sm text-muted-foreground">
                  This window will close in {timeLeft} second{timeLeft !== 1 ? "s" : ""}
               </p>
            )}
         </div>

         <div className="w-full max-w-md bg-muted/30 rounded-lg p-4 text-left space-y-4">
            <div>
               <h3 className="font-semibold text-lg">{title}</h3>
               <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Calendar className="h-4 w-4" />
                  <span>{date}</span>
               </div>
               <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{location}</span>
               </div>
            </div>

            <Separator />

            <div className="space-y-2">
               <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{name}</span>
               </div>
               <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{email}</span>
               </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
               <span className="text-sm text-muted-foreground">Confirmation #:</span>
               <span className="font-mono">{confirmationNumber}</span>
            </div>
         </div>

         <div className="pt-4 text-sm text-muted-foreground">
            <p>A confirmation email has been sent to your email address.</p>
            <p className="mt-1">Please check your inbox for ticket details.</p>
         </div>
      </div>
   )
}

