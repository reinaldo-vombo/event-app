import { Users } from 'lucide-react'

const AddGuestButton = () => {
   return (
      <div className='rounded-lg border border-neutral-800 flex p-4 transition-colors hover:bg-neutral-900'>
         <div>
            <Users className='m-auto' />
            <h2>Adicionar convidado</h2>
         </div>
      </div>
   )
}

export default AddGuestButton;
