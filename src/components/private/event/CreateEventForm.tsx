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
import TimePicker from "@/components/shared/TimeInput"
import { TimePeriodSelect } from "@/components/ui/time-period-select"
import Selector from "@/components/shared/Selector"
import { CATEGORYS, STATUS } from "@/constant/static-content"
import { SubmitButton } from "@/components/shared/SubmitButton"
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
         location: {
            latitude: 51.505,
            longitude: -0.09,
         },
         guests: [{ url: "", name: "", avatar: "" }],
         startDate: new Date(),
         endDate: new Date(),
      },
   })
   const { control } = form;
   const { fields: priceFields, append: appendPrice, remove: removePrice } = useFieldArray({
      control,
      name: "price",
   });

   // Guest field array
   const { fields: guestFields, append: appendGuest, remove: removeGuest } = useFieldArray({
      control,
      name: "guests",
   });

   const { fields, append, remove } = useFieldArray({
      control,
      name: 'price',
   })
   // const type = form.watch("status");
   // const handleLocationSelect = (lat: number, lng: number) => {
   //    form.setValue("location.latitude", lat);
   //    form.setValue("location.longitude", lng);
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
               name="tickets"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Número de bilhetes</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Event Title"
                           {...field}
                        />
                     </FormControl>
                     <FormDescription>Número de bilhetes disponivel.</FormDescription>
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
            <div className="grid grid-cols-12 gap-6">
               <div className="col-span-6 flex flex-col gap-3 space-y-6">
                  <div className="flex items-center gap-3">
                     <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                           <FormItem className="flex flex-col w-full">
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
                                    <div className="p-3 border-t border-border flex items-center gap-4 ">
                                       <TimePicker
                                          setDate={field.onChange}
                                          date={field.value}
                                       />
                                       <TimePeriodSelect
                                          period="AM"
                                          setPeriod={field.onChange}
                                          setDate={field.onChange}
                                          date={field.value} />
                                    </div>
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
                           <FormItem className="flex flex-col w-full">
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
                                 Data do enceramento, opcional.
                              </FormDescription>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <div className="flex items-center gap-3">
                     <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                           <FormItem className="w-full">
                              <FormLabel>Categoria</FormLabel>
                              <FormControl>
                                 <Selector
                                    className="w-full"
                                    options={CATEGORYS}
                                    placeholder="Selecione categoria"
                                    formField={field}
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
                           <FormItem className="w-full">
                              <FormLabel>Tipo de evento</FormLabel>
                              <FormControl>
                                 <Selector
                                    options={STATUS}
                                    className="w-full"
                                    placeholder="Tipo de evento"
                                    formField={field}
                                 />
                              </FormControl>
                              <FormDescription>Defina se evento sera pago ou gratis.</FormDescription>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <div className="space-y-6">
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
                     {priceFields.map((price, index) => (
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
                           <Button className="bg-red-500" onClick={() => removePrice(index)}><X /></Button>
                        </div>
                     ))}
                     <Button
                        type="button"
                        className='bg-green-500 transition-colors hover:bg-green-600 w-full'
                        onClick={() => appendPrice({ price: '', title: "" })}
                     >
                        Adicionar bilhete
                     </Button>
                  </div>
               </div>
               <div className="col-span-6">
                  <div className="rounded-lg border h-72 w-full border-neutral-800 flex items-center justify-center">
                     <FormField
                        control={control}
                        name="location"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Preço do bilhete</FormLabel>
                              <FormControl>
                                 <LocationMap currentPosition={field.value} formField={field} />
                              </FormControl>
                              <FormDescription>Localização</FormDescription>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <div></div>
               </div>
            </div>
            <SubmitButton
               type="submit"
               sucess={form.formState.isSubmitSuccessful || undefined}
               error={form.formState.isDirty}
               disabled={form.formState.isSubmitting} />
         </form>
      </Form>
   )
}

export default CreateEventForm;
