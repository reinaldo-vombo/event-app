import { LeftSidebar } from '@/components/private/ui/LeftSidebar'
import { TLayout } from '@/lib/types'

export default function PrivateLayout({ children }: TLayout) {
   return (
      <div className='flex gap-3'>
         <aside className='w-20'>
            <LeftSidebar />
         </aside>
         <div className="container min-h-screen">
            {children}
         </div>
      </div>
   )
}
