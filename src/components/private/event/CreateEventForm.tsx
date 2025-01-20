"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { slugify } from "@/lib/helper"
import TextEditor from "../shared/text-editor/TextEditor"
import FileUploader from "../shared/File-uploade/FileUploader"
import { eventSchema } from "@/lib/validation/event"
import LocationMap from "../shared/LocationMap"
// import { useState } from "react"
// import { Card } from "@/components/ui/card"

export function CreateEventForm() {
   const form = useForm<z.infer<typeof eventSchema>>({
      resolver: zodResolver(eventSchema),
      defaultValues: {
         title: "",
         description: "",
         slug: "",
         thumbnail: [],
         gallery: [],
         url: "",
         latitude: 0,
         longitude: 0,
         guests: [{ url: "", name: "", avatar: "" }],
         startDate: new Date(),
         endDate: new Date(),
      },
   })
   // const handleLocationSelect = (lat: number, lng: number) => {
   //    form.setValue("latitude", lat);
   //    form.setValue("longitude", lng);
   // };
   // const { fields, append, remove } = useFieldArray({
   //    control: form.control,
   //    name: "guests",
   // });
   // const [isLoading, setIsLoading] = useState(false);

   // const handleScrape = async (index: number, url: string) => {
   //    setIsLoading(true);
   //    try {
   //       const response = await fetch("/api/scrape", {
   //          method: "POST",
   //          headers: {
   //             "Content-Type": "application/json",
   //          },
   //          body: JSON.stringify({ url }),
   //       });

   //       if (!response.ok) {
   //          throw new Error("Failed to scrape metadata");
   //       }

   //       const data = await response.json();
   //       console.log(data);
   //       // Update the form fields with the fetched metadata
   //       form.setValue(`guests.${index}.name`, data.name || "");
   //       form.setValue(`guests.${index}.avatar`, data.avatar || "");
   //    } catch (err) {
   //       console.error(err);
   //    } finally {
   //       setIsLoading(false);
   //    }
   // };

   function onSubmit(values: z.infer<typeof eventSchema>) {
      console.log(values)
      // Here you would typically send the form data to your backend
   }
   const onInvalid = (errors: unknown) => {
      //This helpe me fix a two week form not submiting god kwon's way bug
      console.error("Validation Errors:", errors);
   };
   console.log(form.getValues());


   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-8">
            <FormField
               control={form.control}
               name="title"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Title</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Event Title"
                           {...field}
                           onChange={(e) => {
                              field.onChange(e); // Update the title field
                              form.setValue("slug", slugify(e.target.value)); // Generate slug dynamically
                           }}
                        />
                     </FormControl>
                     <FormDescription>This is the title of your event.</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />

            {/* Slug Field */}
            <FormField
               control={form.control}
               name="slug"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Slug</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="event-title"
                           {...field}
                           disabled
                        />
                     </FormControl>
                     <FormDescription>
                        This is the URL-friendly version of your title.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="description"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Description</FormLabel>
                     <FormControl>
                        <TextEditor
                           formField={field}
                        />
                     </FormControl>
                     <FormDescription>
                        Provide a detailed description of your event.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="thumbnail"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Thumbnail URL</FormLabel>
                     <FormControl>
                        <FileUploader formField={field} />
                     </FormControl>
                     <FormDescription>
                        Provide a URL for the event thumbnail image.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="gallery"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Gallery URLs</FormLabel>
                     <FormControl>
                        <FileUploader formField={field} maxFiles={9} />
                     </FormControl>
                     <FormDescription>
                        Add URLs for additional event images.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <div className="grid grid-cols-12 gap-2">
               <div className="col-span-6 flex gap-3">
                  <FormField
                     control={form.control}
                     name="startDate"
                     render={({ field }) => (
                        <FormItem className="flex flex-col">
                           <FormLabel>Data do inicio</FormLabel>
                           <Popover>
                              <PopoverTrigger asChild>
                                 <FormControl>
                                    <Button
                                       variant={"outline"}
                                       className={cn(
                                          "w-[240px] pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                       )}
                                    >
                                       {field.value ? (
                                          format(field.value, "PPP")
                                       ) : (
                                          <span>Pick a date</span>
                                       )}
                                       <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                 </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                 <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                       date < new Date(new Date().setHours(0, 0, 0, 0))
                                    }
                                    initialFocus
                                 />
                              </PopoverContent>
                           </Popover>
                           <FormDescription>
                              A data do inicio do evento.
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="endDate"
                     render={({ field }) => (
                        <FormItem className="flex flex-col">
                           <FormLabel>Data do enceramento</FormLabel>
                           <Popover>
                              <PopoverTrigger asChild>
                                 <FormControl>
                                    <Button
                                       variant={"outline"}
                                       className={cn(
                                          "w-[240px] pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                       )}
                                    >
                                       {field.value ? (
                                          format(field.value, "PPP")
                                       ) : (
                                          <span>Pick a date</span>
                                       )}
                                       <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                 </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                 <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                       date < new Date(new Date().setHours(0, 0, 0, 0))
                                    }
                                    initialFocus
                                 />
                              </PopoverContent>
                           </Popover>
                           <FormDescription>
                              Data do enceramento.
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <div className="col-span-6">
                  <div className="rounded-lg border border-slate-500 flex items-center justify-center">
                     {/* <LocationMap onLocationSelect={handleLocationSelect} /> */}
                  </div>
               </div>
            </div>

            <Button type="submit" disabled={form.formState.isSubmitting}>Criar Evento</Button>
         </form>
      </Form>
   )
}

