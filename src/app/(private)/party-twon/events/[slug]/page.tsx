import SigleEvent from '@/components/private/event/SigleEventPage'
import { getEventBySlug } from '@/lib/db/querys';
import { Metadata, ResolvingMetadata } from 'next';
type TSearchParams = {
   params: Promise<{ slug: string }>
   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export async function generateMetadata(
   { params }: TSearchParams,
   parent: ResolvingMetadata
): Promise<Metadata> {
   // read route params
   const { slug } = await params

   // fetch data
   const event = await getEventBySlug(slug)

   // optionally access and extend (rather than replace) parent metadata
   const previousImages = (await parent).openGraph?.images || []

   return {
      title: event.title,
      openGraph: {
         images: [event.thumbnail, ...previousImages],
      },
   }
}
export default async function SigleEventPage({ params }: TSearchParams) {
   const slug = (await params).slug;
   const data = await getEventBySlug(slug)
   return <SigleEvent props={data} />
}
