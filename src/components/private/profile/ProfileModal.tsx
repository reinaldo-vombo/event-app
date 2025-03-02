

import Image from 'next/image';
import FormTabs from './UserTabs';
import { TUserProps } from '@/lib/types';

const ProfileModal = ({ user }: TUserProps) => {
   return (
      <div>
         <div className='flex items-center gap-4 mb-6'>
            <div className='relative size-24'>
               <Image src={user?.image || '/avatar.jpg'} className='rounded-full' fill sizes='100%' alt={user?.name || ''} />
            </div>
            <div>
               <ul>
                  <li>Nome: <b>{user?.name}</b></li>
                  <li>Email: <b>{user?.email}</b></li>
                  {/* <li>Localização: <b>{user?.}</b></li> */}
                  <li>Status: <b>{user?.role}</b></li>
                  <li>Eventos: <b>0</b></li>
               </ul>
            </div>
         </div>
         <FormTabs />
      </div>
   )
}

export default ProfileModal;
