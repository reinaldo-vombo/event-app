"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Upload } from 'lucide-react'

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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { slugify } from "@/lib/helper"

const formSchema = z.object({
   title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
   }),
   description: z.string().min(10, {
      message: "Description must be at least 10 characters.",
   }),
   slug: z.string().min(2, {
      message: "Slug must be at least 2 characters.",
   }).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must be lowercase letters, numbers, and hyphens only.",
   }),
   thumbnail: z.string().url({
      message: "Please enter a valid URL for the thumbnail.",
   }),
   gallery: z.array(z.string().url({
      message: "Please enter valid URLs for the gallery images.",
   })).min(1, {
      message: "Please add at least one gallery image.",
   }),
   url: z.string().url({
      message: "Please enter a valid URL for the event.",
   }),
   startDate: z.date({
      required_error: "Please select a start date.",
   }),
   endDate: z.date({
      required_error: "Please select an end date.",
   }),
}).refine((data) => data.endDate >= data.startDate, {
   message: "End date must be after start date.",
   path: ["endDate"],
})

export function CreateEventForm() {
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         title: "",
         description: "",
         slug: "",
         thumbnail: "",
         gallery: [""],
         url: "",
         startDate: new Date(),
         endDate: new Date(),
      },
   })

   function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
      // Here you would typically send the form data to your backend
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        <Textarea
                           placeholder="Describe your event"
                           className="resize-none"
                           {...field}
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
                        <Input placeholder="https://example.com/thumbnail.jpg" {...field} />
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
                        <div className="space-y-2">
                           {field.value.map((url, index) => (
                              <Input
                                 key={index}
                                 placeholder={`https://example.com/gallery-${index + 1}.jpg`}
                                 value={url}
                                 onChange={(e) => {
                                    const newUrls = [...field.value];
                                    newUrls[index] = e.target.value;
                                    field.onChange(newUrls);
                                 }}
                              />
                           ))}
                           <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => field.onChange([...field.value, ""])}
                           >
                              <Upload className="mr-2 h-4 w-4" />
                              Add Image URL
                           </Button>
                        </div>
                     </FormControl>
                     <FormDescription>
                        Add URLs for additional event images.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="url"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Event URL</FormLabel>
                     <FormControl>
                        <Input placeholder="https://example.com/event" {...field} />
                     </FormControl>
                     <FormDescription>
                        The website or page for your event.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="startDate"
               render={({ field }) => (
                  <FormItem className="flex flex-col">
                     <FormLabel>Start Date</FormLabel>
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
                        The start date of your event.
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
                     <FormLabel>End Date</FormLabel>
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
                        The end date of your event.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit">Create Event</Button>
         </form>
      </Form>
   )
}

