"use client"

import LoginForm from "../forms/Login"
import Image from "next/image"

export default function TicketForm() {
   return (
      <div className="min-h-screen bg-[#1a1a1a]">
         <div className="w-full flex flex-col md:flex-row">
            <div className="relative h-screen md:w-1/2">
               <Image
                  src="/bg.jpg"
                  alt="Cosmic landscape with mountains and planet"
                  fill
                  className="object-cover"
                  priority
               />
            </div>
            <div className="relative md:w-1/2">
               <div className="relative h-full flex items-center justify-center">
                  <LoginForm />

               </div>
            </div>
         </div>
      </div>
   )
}

