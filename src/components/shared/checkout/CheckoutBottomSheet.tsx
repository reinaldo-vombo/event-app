"use client"

import { useState, useEffect } from "react"
import { Check, ChevronLeft, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { OrderSummary } from "./OrderSummary"
import { UserDetails } from "./UserDetails"
import { Confirmation } from "./Confirmation"

type TicketInfo = {
   title: string
   date: string
   location: string
   price: number
   image: string
}

interface CheckoutBottomSheetProps {
   open: boolean
   onOpenChange: (open: boolean) => void
   ticketInfo: TicketInfo
}

export function CheckoutBottomSheet({ open, onOpenChange, ticketInfo, }: CheckoutBottomSheetProps) {
   const [step, setStep] = useState(1)
   const [userDetails, setUserDetails] = useState({
      name: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
      country: "",
   })
   const [timeLeft, setTimeLeft] = useState(5)
   const [isCompleted, setIsCompleted] = useState(false)

   // Reset state when modal is closed
   useEffect(() => {
      if (!open) {
         setTimeout(() => {
            setStep(1)
            setIsCompleted(false)
            setTimeLeft(5)
         }, 300)
      }
   }, [open])

   // Timer for auto-closing after completion
   useEffect(() => {
      if (isCompleted && timeLeft > 0) {
         const timer = setTimeout(() => {
            setTimeLeft((prev) => prev - 1)
         }, 1000)
         return () => clearTimeout(timer)
      } else if (isCompleted && timeLeft === 0) {
         onOpenChange(false)
      }
   }, [isCompleted, timeLeft, onOpenChange])

   const handleNext = () => {
      if (step < 3) {
         setStep((prev) => prev + 1)
      }
   }

   const handleBack = () => {
      if (step > 1) {
         setStep((prev) => prev - 1)
      }
   }

   const handleComplete = () => {
      setStep(3)
      setIsCompleted(true)
   }

   const handleUserDetailsChange = (details: typeof userDetails) => {
      setUserDetails(details)
   }

   return (
      <Sheet open={open} onOpenChange={onOpenChange}>
         <SheetContent side="bottom" className="h-[90vh] sm:h-[85vh] p-0 rounded-t-xl">
            <div className="flex flex-col h-full">
               {/* Header */}
               <SheetHeader className="px-4 py-3 border-b flex-shrink-0 flex flex-row items-center justify-between">
                  <div className="flex items-center">
                     {step < 3 && (
                        <Button variant="ghost" size="icon" onClick={handleBack} disabled={step === 1} className="mr-2">
                           <ChevronLeft className="h-4 w-4" />
                        </Button>
                     )}
                     <SheetTitle>
                        {step === 1 && "Order Summary"}
                        {step === 2 && "Your Details"}
                        {step === 3 && "Thank You!"}
                     </SheetTitle>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
                     <X className="h-4 w-4" />
                  </Button>
               </SheetHeader>

               {/* Content */}
               <div className="flex-grow overflow-auto px-4 py-6">
                  {step === 1 && <OrderSummary ticketInfo={ticketInfo} onNext={handleNext} />}
                  {step === 2 && (
                     <UserDetails
                        userDetails={userDetails}
                        onChange={handleUserDetailsChange}
                        onBack={handleBack}
                        onComplete={handleComplete}
                     />
                  )}
                  {step === 3 && (
                     <Confirmation
                        ticketInfo={ticketInfo}
                        userDetails={userDetails}
                        timeLeft={timeLeft}
                        isCompleted={isCompleted}
                     />
                  )}
               </div>

               {/* Progress indicator */}
               <div className="px-4 py-3 border-t flex-shrink-0">
                  <div className="flex justify-between items-center w-full max-w-xs mx-auto">
                     <div className="flex flex-col items-center">
                        <div
                           className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                        >
                           {step > 1 ? <Check className="h-4 w-4" /> : 1}
                        </div>
                        <span className="text-xs mt-1">Summary</span>
                     </div>
                     <div className="flex-1 h-1 bg-muted mx-2">
                        <div className={`h-full bg-primary ${step >= 2 ? "w-full" : "w-0"}`} />
                     </div>
                     <div className="flex flex-col items-center">
                        <div
                           className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                        >
                           {step > 2 ? <Check className="h-4 w-4" /> : 2}
                        </div>
                        <span className="text-xs mt-1">Details</span>
                     </div>
                     <div className="flex-1 h-1 bg-muted mx-2">
                        <div className={`h-full bg-primary ${step >= 3 ? "w-full" : "w-0"}`} />
                     </div>
                     <div className="flex flex-col items-center">
                        <div
                           className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                        >
                           {step > 3 ? <Check className="h-4 w-4" /> : 3}
                        </div>
                        <span className="text-xs mt-1">Complete</span>
                     </div>
                  </div>
               </div>
            </div>
         </SheetContent>
      </Sheet>
   )
}

