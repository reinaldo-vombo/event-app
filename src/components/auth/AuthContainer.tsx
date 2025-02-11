"use client"

import { useState } from "react"
import { Plus, Minus, ArrowRight, X } from "lucide-react"

export default function TicketForm() {
   const [quantity, setQuantity] = useState(1)
   const [formData, setFormData] = useState({
      name: "",
      phone: "",
      email: "",
   })

   const handleQuantityChange = (change: number) => {
      setQuantity((prev) => Math.max(1, Math.min(10, prev + change)))
   }

   return (
      <div className="min-h-screen bg-[#ff4747] flex items-center justify-center p-4">
         <div className="w-full max-w-4xl bg-[#1a1a1a] rounded-lg overflow-hidden flex flex-col md:flex-row">
            {/* Left Section */}
            <div className="relative p-8 md:p-12 md:w-1/2 text-white z-10">
               <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-none">
                  Buy
                  <br />
                  tickets
               </h1>
               <div className="space-y-1 text-gray-300 text-sm">
                  <p>6—8 Dec 2023 11:00</p>
                  <p>Schaperstraße 24, 10719 Berlin, Germany</p>
               </div>
            </div>

            {/* Right Section */}
            <div className="relative md:w-1/2">
               {/* Curved Background */}
               <div className="absolute inset-0 bg-[#ff4747] rounded-tl-[80px] -left-10" />

               <div className="relative p-8 md:p-12">
                  <div className="flex justify-between items-start mb-8">
                     <h2 className="text-white text-lg">The Book Festival</h2>
                     <button className="text-white/80 hover:text-white">
                        <X className="w-5 h-5" />
                     </button>
                  </div>

                  <form className="space-y-6">
                     <div className="space-y-4">
                        <div className="border-b border-white/20">
                           <input
                              type="text"
                              placeholder="name"
                              className="w-full bg-transparent text-white placeholder-white/60 pb-2 focus:outline-none"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                           />
                        </div>
                        <div className="border-b border-white/20">
                           <input
                              type="tel"
                              placeholder="phone"
                              className="w-full bg-transparent text-white placeholder-white/60 pb-2 focus:outline-none"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                           />
                        </div>
                        <div className="border-b border-white/20">
                           <input
                              type="email"
                              placeholder="email"
                              className="w-full bg-transparent text-white placeholder-white/60 pb-2 focus:outline-none"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                           />
                        </div>
                     </div>

                     <div className="flex items-center space-x-4 border-b border-white/20 pb-2">
                        <span className="text-white/60">number</span>
                        <div className="flex items-center space-x-4">
                           <button
                              type="button"
                              onClick={() => handleQuantityChange(-1)}
                              className="text-white/80 hover:text-white"
                           >
                              <Minus className="w-4 h-4" />
                           </button>
                           <span className="text-white min-w-[1ch] text-center">{quantity}</span>
                           <button
                              type="button"
                              onClick={() => handleQuantityChange(1)}
                              className="text-white/80 hover:text-white"
                           >
                              <Plus className="w-4 h-4" />
                           </button>
                        </div>
                     </div>

                     <button
                        type="submit"
                        className="flex items-center justify-between w-full text-white hover:opacity-90 transition-opacity"
                     >
                        <span>check out $99</span>
                        <ArrowRight className="w-4 h-4" />
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}

