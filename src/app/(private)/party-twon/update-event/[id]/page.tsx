import UpdatedEvent from '@/components/private/forms/UpdateEvent'
import { getEventById } from '@/lib/db/querys';
type TSearchParams = {
   params: Promise<{ id: string }>
   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function UpdateEventPage({ params }: TSearchParams) {
   const id = (await params).id;
   const event = await getEventById(id);
   return <UpdatedEvent props={event} />
}
