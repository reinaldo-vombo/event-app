'use client'
import { MessageCircle, Mail, Bookmark, HomeIcon, LogOut, Plus } from 'lucide-react'
import { cn } from "@/lib/utils"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { LogoIcon } from '@/assets/logo'
import { PRIVE_ROUTES } from '@/constant/static-content'
import Tooltipy from '@/components/shared/Tooltipy'


interface NavItemProps {
   icon: React.ReactNode
   isActive?: boolean
   href: string
}

function NavItem({ icon, isActive, href }: NavItemProps) {
   return (
      <Link href={href}
         className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full hover:bg-accent",
            isActive && "text-primary"
         )}
      >
         {icon}
      </Link>
   )
}

export function LeftSidebar() {
   const router = useRouter()

   const loggout = () => {
      signOut()
      router.push('/')
   }
   return (
      <div className="flex fixed left-0 z-10 h-screen w-20 flex-col items-center border-r px-2 py-4">
         <Link href={PRIVE_ROUTES.root} className="flex items-center gap-2">
            <LogoIcon className="size-40" />
         </Link>
         <nav className="mt-6 flex flex-1 flex-col items-center gap-4">
            <NavItem href='/' icon={<HomeIcon className="h-6 w-6" />} isActive />
            <Tooltipy title='Criar Evento' trigger={<NavItem href={PRIVE_ROUTES.create_event} icon={<Plus className="h-6 w-6" />} />} />

            <NavItem href='/' icon={<MessageCircle className="h-6 w-6" />} />
            <NavItem href='/' icon={<Mail className="h-6 w-6" />} />
            <NavItem href='/' icon={<Bookmark className="h-6 w-6" />} />
         </nav>
         <div className="mb-7">
            <Button className='bg-transparent p-1' onClick={() => loggout()}>
               <LogOut className='text-red-500' />
            </Button>
         </div>
      </div>
   )
}

