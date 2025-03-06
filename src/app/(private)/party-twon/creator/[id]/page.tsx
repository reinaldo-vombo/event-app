import Image from 'next/image'

export default function CreatorPage() {
   return (
      <section className='padding'>
         <div className='grid grid-cols-12'>
            <div className='grid-cols-6'>
               <h2>Reginalde Baggele</h2>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil voluptatibus, corporis culpa facere nostrum placeat error vel fugit magnam maiores minima distinctio animi! Voluptatem eaque tempora reprehenderit aspernatur neque aperiam?</p>
            </div>
            <div className='grid-cols-6'>
               <div className='h-96'>
                  <Image src='/avatar.jpg' fill sizes='100%' alt='' />
               </div>
            </div>
         </div>
      </section>
   )
}
