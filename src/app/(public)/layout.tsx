import { TLayout } from '@/lib/types'

export default function PublicLayout({ children }: TLayout) {
   return (
      <main>
         {children}
      </main>
   )
}
