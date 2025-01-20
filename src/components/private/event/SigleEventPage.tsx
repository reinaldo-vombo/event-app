import Image from 'next/image'
import React from 'react'
import UsersGoing from './UsersGoing'
import Modal from '@/components/shared/animate-modal/Modal'
import SnapShots from '@/components/shared/Gallery'
import GuesViewer from '../ui/GuestCard'

const SigleEventPage = () => {
   return (
      <div className='space-y-5'>
         <div className='relative h-[30rem]'>
            <Image src='/avatar.jpg' className='object-cover rounded-lg' fill sizes='100%' alt='event' />
         </div>
         <div className='flex justify-between'>
            <div className='space-y-3'>
               <h2 className='text-3xl font-semibold'>Angola Open Source</h2>
               <ul className='space-y-4'>
                  <li><b>Preço:</b> 5000(kz)</li>
                  <li><b>Categoria:</b> Web shit</li>
                  <li><b>Localização:</b> Avenida Castro vandune</li>
                  <li><b>Data:</b> 19/01/2025</li>
               </ul>
            </div>
            <div className='space-y-6'>
               <h3 className='font-semibold text-3xl'>Pessoas que vão</h3>
               <UsersGoing />
               <div className='flex items-center'>
                  <div className='w-40 p-2 bg-indigo-500 rounded-lg'>
                     <Modal id={4} trigger={<span>Comprar bilhete</span>}>
                        payment
                     </Modal>
                  </div>
               </div>
            </div>
         </div>
         <div className='space-y-6'>
            <h4 className='font-semibold text-3xl'>Descrição</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum magni cum rerum sint quaerat corporis quisquam, qui soluta facere deserunt! Voluptate assumenda voluptatem quam impedit doloribus sit est ullam obcaecati quo, eligendi voluptates ex accusamus saepe eius, mollitia aliquid adipisci! Eligendi nam optio, cupiditate vitae aliquid laboriosam assumenda impedit, debitis, atque ut esse? Corporis explicabo deserunt delectus a autem aspernatur? Vel illum perferendis eos quis cupiditate, doloribus quam exercitationem. Veniam, cupiditate dolore ex magni itaque sapiente consequuntur laborum est dignissimos assumenda aspernatur, dolorem, totam molestias repellat ea? Laboriosam mollitia laborum maxime, voluptates architecto, quibusdam nihil at tempora animi culpa doloremque.</p>
         </div>
         <div className='space-y-6'>
            <h4 className='font-semibold text-3xl'>Covidados</h4>
            <div className='col-span-12'>
               <GuesViewer />
            </div>
         </div>
         <div className='space-y-6'>
            <h4 className='font-semibold text-3xl'>Galeria</h4>
            <div className='col-span-12'>
               <SnapShots />
            </div>
         </div>
      </div>
   )
}

export default SigleEventPage
