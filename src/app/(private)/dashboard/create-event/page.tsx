import { CreateEventForm } from "@/components/private/event/CreateEventForm";

export default function page() {
   return (
      <section>
         <div className="mb-6">
            <h2 className="text-white font-semibold text-2xl">Cria Evento</h2>
         </div>
         <CreateEventForm />
      </section>
   )
}
