import { LeftSidebar } from '@/components/private/ui/LeftSidebar'
import { RightSidebar } from '@/components/private/ui/RightSidebar'
import { TLayout } from '@/lib/types'

export default function PrivateLayout({ children }: TLayout) {
   return (
      <div className='grid grid-cols-12 min-h-screen'>
         <div className='col-span-1'>
            <LeftSidebar />
         </div>
         <div className='col-span-8'>
            {children}
         </div>
         <div className='col-span-3 grid p-4'>
            <RightSidebar />
         </div>
      </div>
   )
}
