"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckoutBottomSheet } from "@/components/shared/checkout/CheckoutBottomSheet"

interface EventTicketProps {
   title: string
   date: string
   location: string
   price: number
   image: string
}

export default function EventTicket({ title, date, location, price, image }: EventTicketProps) {
   const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

   return (
      <>
         <Card className="w-full max-w-md overflow-hidden">
            <div className="relative w-full h-48">
               <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
            </div>
            <CardHeader>
               <CardTitle className="text-xl md:text-2xl">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{date}</span>
               </div>
               <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{location}</span>
               </div>
               <div className="mt-6">
                  <p className="text-2xl font-bold">${price.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground mt-1">All taxes included</p>
               </div>
            </CardContent>
            <CardFooter>
               <Button className="w-full" size="lg" onClick={() => setIsCheckoutOpen(true)}>
                  Buy Ticket
               </Button>
            </CardFooter>
         </Card>

         <CheckoutBottomSheet
            open={isCheckoutOpen}
            onOpenChange={setIsCheckoutOpen}
            ticketInfo={{
               title,
               date,
               location,
               price,
            }}
         />
      </>
   )
}

