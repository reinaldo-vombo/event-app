import { LeftSidebar } from '@/components/private/ui/LeftSidebar'
import { TLayout } from '@/lib/types'
import { Toaster } from 'sonner'

export default function PrivateLayout({ children }: TLayout) {
   return (
      <div className='flex gap-3'>
         <aside className='w-20'>
            <LeftSidebar />
         </aside>
         <div className="container min-h-screen">
            {children}
         </div>
         <Toaster richColors position='top-right' />
      </div>
   )
}
