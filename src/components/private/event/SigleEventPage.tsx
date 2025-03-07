'use client'
import Image from 'next/image'
import UsersGoing from './UsersGoing'
import SnapShots from '@/components/shared/Gallery'
import GuesViewer from '../ui/GuestCard'
import RegiterToEvent from './RegiterToEvent'
import SharedToSocialMedia from './SharedToSocialMedia'
import { TEvent } from './type'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { format } from 'date-fns'
type TProps = {
   props: TEvent
   guests: {
      id: string;
      name: string;
      avatar: string;
      eventId: string | null;
   }[]
}
const SigleEventPage = ({ props, guests }: TProps) => {
   console.log('gusrts', guests);

   const LocationMap = useMemo(() => dynamic(
      () => import('@/components/shared/map/LocationMap'),
      {
         loading: () => <div className="h-72 w-full flex items-center justify-center">O mapa está carregando</div>,
         ssr: false
      }
   ), [])
   const position = {
      lat: props.latitude,
      lng: props.longitude,
      name: props.locationName
   }

   return (
      <section className='space-y-5 py-10'>
         <div className='relative h-[30rem]'>
            <Image src={props.thumbnail} className='object-cover rounded-lg' fill sizes='100%' alt={props.slug} />
         </div>
         <div className='flex justify-between'>
            <div className='space-y-3'>
               <h2 className='text-3xl font-semibold'>{props.title}</h2>
               <ul className='space-y-4'>
                  <li><b>Preço:</b> 5000(kz)</li>
                  <li><b>Categoria:</b> {props.category}</li>
                  <li><b>Localização:</b> {props.locationName}</li>
                  <li><b>Data:</b> {format(props.startDate, "PPP")}</li>
                  <li><b>Hora:</b> {props.startDate.getHours()}</li>
               </ul>
               <SharedToSocialMedia
                  slug={props.slug}
                  title={props.title}
                  tags={props.tags}
               />
            </div>
            <div className='space-y-6'>
               <h3 className='font-semibold text-3xl'>Pessoas que vão</h3>
               <UsersGoing />
               <RegiterToEvent props={props} />
            </div>
         </div>
         <div className='space-y-6'>
            <h4 className='font-semibold text-3xl'>Descrição</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum magni cum rerum sint quaerat corporis quisquam, qui soluta facere deserunt! Voluptate assumenda voluptatem quam impedit doloribus sit est ullam obcaecati quo, eligendi voluptates ex accusamus saepe eius, mollitia aliquid adipisci! Eligendi nam optio, cupiditate vitae aliquid laboriosam assumenda impedit, debitis, atque ut esse? Corporis explicabo deserunt delectus a autem aspernatur? Vel illum perferendis eos quis cupiditate, doloribus quam exercitationem. Veniam, cupiditate dolore ex magni itaque sapiente consequuntur laborum est dignissimos assumenda aspernatur, dolorem, totam molestias repellat ea? Laboriosam mollitia laborum maxime, voluptates architecto, quibusdam nihil at tempora animi culpa doloremque.</p>
         </div>
         <div className="grid grid-cols-12 gap-4">
            <div className='space-y-6 col-span-6'>
               <h4 className='font-semibold text-3xl'>Covidados</h4>
               <div className='col-span-12'>
                  <GuesViewer />
               </div>
            </div>
            <div className='space-y-6 col-span-6'>
               <h4 className='font-semibold text-3xl'>Localização</h4>
               <div className='col-span-12'>
                  <LocationMap currentPosition={position} />
               </div>
            </div>
         </div>
         <div className='space-y-6'>
            <h4 className='font-semibold text-3xl'>Galeria</h4>
            <div className='col-span-12'>
               <SnapShots />
            </div>
         </div>
      </section>
   )
}

export default SigleEventPage;
