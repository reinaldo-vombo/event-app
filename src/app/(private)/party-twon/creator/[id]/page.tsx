import CreatorSection from "@/components/private/layout/CreatorSection";
import { getEventsByOrganizer, getUserById } from "@/lib/db/querys";
import { Metadata, ResolvingMetadata } from "next";
type TSearchParams = {
   params: Promise<{ id: string }>
   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export async function generateMetadata(
   { params }: TSearchParams,
   parent: ResolvingMetadata
): Promise<Metadata> {
   // read route params
   const { id } = await params

   // fetch data
   const user = await getUserById(id)
   const image = user?.image ? user.image : ''

   // optionally access and extend (rather than replace) parent metadata
   const previousImages = (await parent).openGraph?.images || []

   return {
      title: user?.name,
      description: user?.bio,
      openGraph: {
         images: [image, ...previousImages],
      },
   }
}
export default async function CreatorPage({ params }: TSearchParams) {
   const id = (await params).id;
   const [events, creator] = await Promise.all([
      getEventsByOrganizer(id),
      getUserById(id)
   ]);
   return <CreatorSection events={events} creator={creator} />
}
