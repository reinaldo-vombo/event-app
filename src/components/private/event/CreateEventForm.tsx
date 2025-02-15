"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { CalendarIcon, Cat, Dog, Fish, Plus, Rabbit, Turtle, X } from 'lucide-react'
import { FileUpload } from "@/components/shared/file-uploade/FileUpload"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import * as z from "zod"
import { format } from "date-fns"

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
import { TimePeriodSelect } from "@/components/ui/time-period-select"
import { SubmitButton } from "@/components/shared/SubmitButton"
import { CATEGORYS, STATUS } from "@/constant/static-content"
import TextEditor from "../../shared/text-editor/TextEditor"
import { MultiSelect } from "@/components/ui/multi-select"
import TimePicker from "@/components/shared/TimeInput"
import { eventSchema } from "@/lib/validation/event"
import { Calendar } from "@/components/ui/calendar"
import Selector from "@/components/shared/Selector"
import Modal from "@/components/shared/Modal"
import { Input } from "@/components/ui/input"
import { slugify } from "@/lib/helper"
import dynamic from "next/dynamic"
import AddGuestButton from "./AddGuestButton"

// import { Card } from "@/components/ui/card"

const frameworksList = [
   { value: "react", label: "React", icon: Turtle },
   { value: "angular", label: "Angular", icon: Cat },
   { value: "vue", label: "Vue", icon: Dog },
   { value: "svelte", label: "Svelte", icon: Rabbit },
   { value: "ember", label: "Ember", icon: Fish },
];
const CreateEventForm = () => {
   const LocationMap = useMemo(() => dynamic(
      () => import('../../shared/map/LocationMap'),
      {
         loading: () => <div className="h-72 w-full flex items-center justify-center">O mapa está carregando</div>,
         ssr: false
      }
   ), [])
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
            lat: -8.880950326777082,
            lng: 13.252440889759589,
            name: ""
         },
         guests: [{ name: "", avatar: [] }],
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

   // const type = form.watch("status");

   function onSubmit(values: z.infer<typeof eventSchema>) {
      console.log(values)
      // Here you would typically send the form data to your backend
   }
   const onInvalid = (errors: unknown) => {
      //This helpe me fix a two week form not submiting god kwon's way bug
      console.error("Validation Errors:", errors);
   };
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-8 mx-auto">
            <FormField
               control={form.control}
               name="title"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Titulo</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Titulo do Evento"
                           {...field}
                           onChange={(e) => {
                              field.onChange(e); // Update the title field
                              form.setValue("slug", slugify(e.target.value)); // Generate slug dynamically
                           }}
                        />
                     </FormControl>
                     <FormDescription className="capitalize">Esté é titulo do seu evento.</FormDescription>
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
                     <FormDescription className="capitalize">
                        Esté é versão url-amigavel do seu titulo
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
                           placeholder="Número de bilhetes"
                           {...field}
                        />
                     </FormControl>
                     <FormDescription className="capitalize">Número de bilhetes disponivel.</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="description"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Descrição</FormLabel>
                     <FormControl>
                        <TextEditor
                           formField={field} />
                     </FormControl>
                     <FormDescription className="capitalize">
                        Descrição detalhada do seu evento.
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
                     <FormDescription className="capitalize">
                        Adicione a imagem do seu evento.
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
                     <FormLabel>Galeria</FormLabel>
                     <FormControl>
                        <FileUpload formField={field} multiple={true} maxFiles={5} />
                     </FormControl>
                     <FormDescription className="capitalize">
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
                              <FormDescription className="capitalize">
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
                              <FormDescription className="capitalize">
                                 Data do enceramento, <b>opcional</b> .
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
                                    placeholder="Selecione uma categoria"
                                    formField={field}
                                 />
                              </FormControl>
                              <FormDescription className="capitalize">
                                 Esté é categoria do seu evento.
                              </FormDescription>
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
                              <FormDescription className="capitalize">Defina se evento sera pago ou gratis.</FormDescription>
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
                              <FormDescription className="capitalize">
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
                                    <FormDescription className="capitalize">Nome do tipo do bilhete.</FormDescription>
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
                                    <FormDescription className="capitalize">Preço do bilhete.</FormDescription>
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
                           <FormItem className="w-full">
                              <FormLabel>Localização do evento</FormLabel>
                              <FormControl>
                                 <LocationMap currentPosition={field.value} formField={field} />
                              </FormControl>
                              <FormDescription>
                                 Localização: <b className="text-green-500">{field.value.name}</b>
                              </FormDescription>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <div className="mt-14 flex flex-col">
                     <Modal title="" trigger={<AddGuestButton />} className="mx-auto">
                        {guestFields.map((guest, index) => (
                           <div key={index} className="space-y-6">
                              <div className="flex items-center">
                                 <FormField
                                    control={form.control}
                                    name={`guests.${index}.avatar`}
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Foto do convidado</FormLabel>
                                          <FormControl>
                                             <FileUpload formField={field} multiple={true} maxFiles={5} />
                                          </FormControl>
                                          <FormDescription>
                                             Foto do convidado.
                                          </FormDescription>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              <div className="flex items-center gap-4">
                                 <FormField
                                    control={form.control}
                                    name={`guests.${index}.name`}
                                    render={({ field }) => (
                                       <FormItem className="w-full">
                                          <FormLabel>Nome do convidado</FormLabel>
                                          <FormControl>
                                             <Input
                                                placeholder="Nome do convidado"
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormDescription>
                                             Nome do convidado.
                                          </FormDescription>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <Button className="bg-red-500" onClick={() => removeGuest(index)}><X /></Button>

                              </div>
                           </div>
                        ))}
                        <Button
                           type="button"
                           className='bg-green-500 transition-colors hover:bg-green-600 w-full mt-7'
                           onClick={() => appendGuest({ name: '', avatar: [] })}
                        >
                           <Plus />
                        </Button>
                     </Modal>
                  </div>
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
