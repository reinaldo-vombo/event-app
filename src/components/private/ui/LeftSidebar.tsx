import { Home, Hash, MessageCircle, Mail, Bookmark, HomeIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import Link from 'next/link'
import Modal from '@/components/shared/animate-modal/Modal'
import Image from 'next/image'

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
   return (
      <div className="flex fixed left-0 z-10 h-screen w-20 flex-col items-center border-r px-2 py-4">
         <HomeIcon className="h-8 w-8" />
         <nav className="mt-8 flex flex-1 flex-col items-center gap-4">
            <NavItem href='/' icon={<Home className="h-6 w-6" />} isActive />
            <NavItem href='/dashboard/create-event' icon={<Hash className="h-6 w-6" />} />
            <NavItem href='/' icon={<MessageCircle className="h-6 w-6" />} />
            <NavItem href='/' icon={<Mail className="h-6 w-6" />} />
            <NavItem href='/' icon={<Bookmark className="h-6 w-6" />} />
         </nav>
         <div className="mb-4">
            <Modal id={1} trigger={
               <Image src='/avatar.jpg' className='rounded-full' width={40} height={40} alt='user' />
            } >
               hello ther
            </Modal>
         </div>
      </div>
   )
}

