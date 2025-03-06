'use client'
import { Hash, MessageCircle, Mail, Bookmark, HomeIcon, LogOut } from 'lucide-react'
import { cn } from "@/lib/utils"
import Link from 'next/link'
import Modal from '@/components/shared/animate-modal/Modal'
import Image from 'next/image'
import ProfileModal from '../profile/ProfileModal'
import { User } from '@/lib/auth/user'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { LogoIcon } from '@/assets/logo'

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
   const user = User()
   const router = useRouter()
   const loggout = () => {
      signOut()
      router.push('/')
   }
   return (
      <div className="flex fixed left-0 z-10 h-screen w-20 flex-col items-center border-r px-2 py-4">
         <LogoIcon className="h-8 w-8" />
         <nav className="mt-8 flex flex-1 flex-col items-center gap-4">
            <NavItem href='/' icon={<HomeIcon className="h-6 w-6" />} isActive />
            <NavItem href='/dashboard/create-event' icon={<Hash className="h-6 w-6" />} />
            <NavItem href='/' icon={<MessageCircle className="h-6 w-6" />} />
            <NavItem href='/' icon={<Mail className="h-6 w-6" />} />
            <NavItem href='/' icon={<Bookmark className="h-6 w-6" />} />
         </nav>
         <div className="mb-7">
            <Modal id={1} trigger={
               <Image
                  src={user?.avatar || '/avatar.jpg'}
                  className='rounded-full'
                  width={40}
                  height={40}
                  alt={user?.avatar || ''} />
            } >
               <ProfileModal user={user} />
            </Modal>
            <Button className='bg-transparent p-1' onClick={() => loggout()}>
               <LogOut className='text-red-500' />
            </Button>
         </div>
      </div>
   )
}

