import Image from "next/image"
import { Calendar, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type TicketInfo = {
   title: string
   date: string
   location: string
   price: number
}

interface OrderSummaryProps {
   ticketInfo: TicketInfo
   onNext: () => void
}

export function OrderSummary({ ticketInfo, onNext }: OrderSummaryProps) {
   const { title, date, location, price } = ticketInfo
   const serviceFee = price * 0.1 // 10% service fee
   const total = price + serviceFee

   return (
      <div className="space-y-6">
         <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-32 h-24 rounded-md overflow-hidden flex-shrink-0">
               <Image src="/placeholder.svg?height=200&width=300" alt={title} fill className="object-cover" />
            </div>
            <div className="flex-1">
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
         </div>

         <Separator />

         <div className="space-y-3">
            <h3 className="font-semibold">Price Details</h3>
            <div className="flex justify-between">
               <span>Ticket Price</span>
               <span>${price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
               <span>Service Fee</span>
               <span>${serviceFee.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
               <span>Total</span>
               <span>${total.toFixed(2)}</span>
            </div>
         </div>

         <div className="pt-4">
            <Button onClick={onNext} className="w-full" size="lg">
               Continue to Details
            </Button>
         </div>
      </div>
   )
}

