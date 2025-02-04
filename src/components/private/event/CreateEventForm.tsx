"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Cat, Dog, Fish, Rabbit, Turtle, X } from 'lucide-react'

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
import { eventSchema } from "@/lib/validation/event"
import { MultiSelect } from "@/components/ui/multi-select"
import { FileUpload } from "@/components/ui/file-upload"
import dynamic from "next/dynamic"
// import { Card } from "@/components/ui/card"
const LocationMap = dynamic(
   () => import('../shared/LocationMap'),
   { ssr: false }
);

const frameworksList = [
   { value: "react", label: "React", icon: Turtle },
   { value: "angular", label: "Angular", icon: Cat },
   { value: "vue", label: "Vue", icon: Dog },
   { value: "svelte", label: "Svelte", icon: Rabbit },
   { value: "ember", label: "Ember", icon: Fish },
];
const CreateEventForm = () => {
   const form = useForm<z.infer<typeof eventSchema>>({
      resolver: zodResolver(eventSchema),
      defaultValues: {
         title: "",
         description: "",
         slug: "",
         thumbnail: [],
         gallery: [],
         tags: ["react", "angular"],
         category: "",
         price: [{ price: "", title: "" }],
         status: "Publico",
         tickets: "",
         latitude: 0,
         longitude: 0,
         guests: [{ url: "", name: "", avatar: "" }],
         startDate: new Date(),
         endDate: new Date(),
      },
   })
   const { control } = form;
   const { fields, append, remove } = useFieldArray({
      control,
      name: 'price',
   })
   // const type = form.watch("status");
   const handleLocationSelect = (lat: number, lng: number) => {
      form.setValue("latitude", lat);
      form.setValue("longitude", lng);
   };
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
                     <FormDescription>Esté é titulo do seu evento.</FormDescription>
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
                           formField={field} />
                     </FormControl>
                     <FormDescription>
                        Descrição do evento.
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
                     <FormLabel>Thumbnail do evento</FormLabel>
                     <FormControl>
                        <FileUpload formField={field} />
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
                     <FormLabel>Imagems da Gallery</FormLabel>
                     <FormControl>
                        <FileUpload formField={field} multiple={true} maxFiles={5} />
                     </FormControl>
                     <FormDescription>
                        Adicione imagems do eventos.
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
                  <div className="rounded-lg border border-neutral-800 flex items-center justify-center">
                     <LocationMap onLocationSelect={handleLocationSelect} />
                  </div>
               </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
               <div className="col-span-6 space-y-6">
                  <FormField
                     control={form.control}
                     name="tags"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Tags</FormLabel>
                           <FormControl>
                              <MultiSelect
                                 field={field}
                                 options={frameworksList}
                                 defaultValue={field.value}
                                 placeholder="Selecione tags"
                                 variant="inverted"
                                 animation={2}
                                 maxCount={3}
                              />
                           </FormControl>
                           <FormDescription>
                              Adicione tags relacionados ao teu evento.
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  {fields.map((price, index) => (
                     <div key={index} className="flex items-center gap-4">
                        <FormField
                           control={control}
                           name={`price.${index}.title`}
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Tipo de bilhete</FormLabel>
                                 <FormControl>
                                    <Input
                                       placeholder="ex: Vip, Normal"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormDescription>Nome do tipo do bilhete.</FormDescription>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={control}
                           name={`price.${index}.price`}
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Preço do bilhete</FormLabel>
                                 <FormControl>
                                    <Input
                                       placeholder="preço"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormDescription>Preço do bilhete.</FormDescription>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <Button className="bg-red-500" onClick={() => remove(index)}><X /></Button>
                     </div>
                  ))}
                  <Button
                     type="button"
                     className='bg-green-500 transition-colors hover:bg-green-600 w-full'
                     onClick={() => append({ price: '', title: "" })}
                  >
                     Adicionar bilhete
                  </Button>
               </div>
               <div className="col-span-6 space-y-4">
                  <FormField
                     control={form.control}
                     name="category"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Categoria</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="Categoria"
                                 {...field}
                              />
                           </FormControl>
                           <FormDescription>Esté é categoria do seu evento.</FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="status"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Tipo de evento</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="Publico, privado"
                                 {...field}
                              />
                           </FormControl>
                           <FormDescription>Defina se evento sera pago ou gratis.</FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
            </div>

            <Button type="submit" disabled={form.formState.isSubmitting}>Criar Evento</Button>
         </form>
      </Form>
   )
}

export default CreateEventForm;
