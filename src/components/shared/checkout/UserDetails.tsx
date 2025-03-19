"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { paymentSchema } from "@/lib/validation/payment"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { byEventTicke } from "@/lib/actions/sales"
import { initialState } from "@/constant/static-content"
import { toast } from "sonner"

interface UserDetailsProps {
   userDetails: {
      name: string
      email: string
      address: string
      city: string
      zipCode: string
      country: string
   }
   onChange: (details: any) => void
   onBack: () => void
   onComplete: () => void
   ticketInfo: any
}

export function UserDetails({ userDetails, onChange, onBack, ticketInfo }: UserDetailsProps) {
   const form = useForm<z.infer<typeof paymentSchema>>({
      resolver: zodResolver(paymentSchema),
      defaultValues: {
         eventId: ticketInfo.eventId,
         amount: ticketInfo.price,

      },
   })

   async function onSubmit(values: z.infer<typeof paymentSchema>) {
      console.log(values);
      try {
         const results = await byEventTicke(initialState, values);
         if (results?.error) {
            toast.error(results.message)
            console.log(results.message);
         }
         if (results?.success) {
            toast.success(results.message)
         }

      } catch (error) {
         console.log(error);

      }
   }

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      onChange({ ...userDetails, [name]: value })
   }

   const handleCountryChange = (value: string) => {
      onChange({ ...userDetails, country: value })
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
               <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                     id="name"
                     name="name"
                     value={userDetails.name}
                     onChange={handleChange}
                     placeholder="John Doe"
                     required
                  />
               </div>

               <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                     id="email"
                     name="email"
                     type="email"
                     value={userDetails.email}
                     onChange={handleChange}
                     placeholder="john@example.com"
                     required
                  />
               </div>

               <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                     id="address"
                     name="address"
                     value={userDetails.address}
                     onChange={handleChange}
                     placeholder="123 Main St"
                     required
                  />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                     <Label htmlFor="city">City</Label>
                     <Input
                        id="city"
                        name="city"
                        value={userDetails.city}
                        onChange={handleChange}
                        placeholder="New York"
                        required
                     />
                  </div>
                  <div className="grid gap-2">
                     <Label htmlFor="zipCode">Zip Code</Label>
                     <Input
                        id="zipCode"
                        name="zipCode"
                        value={userDetails.zipCode}
                        onChange={handleChange}
                        placeholder="10001"
                        required
                     />
                  </div>
               </div>

               <div className="grid gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Select value={userDetails.country} onValueChange={handleCountryChange} required>
                     <SelectTrigger id="country">
                        <SelectValue placeholder="Select country" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="fr">France</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
            </div>

            <div className="flex gap-4 pt-4">
               <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                  Back
               </Button>
               <Button type="submit" className="flex-1" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Processing..." : "Complete Purchase"}
               </Button>
            </div>
         </form>
      </Form>
   )
}

