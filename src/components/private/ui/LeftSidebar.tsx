import { Home, Hash, MessageCircle, Mail, Bookmark, HomeIcon } from 'lucide-react'
import { cn } from "@/lib/utils"

interface NavItemProps {
   icon: React.ReactNode
   isActive?: boolean
}

function NavItem({ icon, isActive }: NavItemProps) {
   return (
      <button
         className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full hover:bg-accent",
            isActive && "text-primary"
         )}
      >
         {icon}
      </button>
   )
}

export function LeftSidebar() {
   return (
      <div className="flex h-screen w-20 flex-col items-center border-r px-2 py-4">
         <HomeIcon className="h-8 w-8" />
         <nav className="mt-8 flex flex-1 flex-col items-center gap-4">
            <NavItem icon={<Home className="h-6 w-6" />} isActive />
            <NavItem icon={<Hash className="h-6 w-6" />} />
            <NavItem icon={<MessageCircle className="h-6 w-6" />} />
            <NavItem icon={<Mail className="h-6 w-6" />} />
            <NavItem icon={<Bookmark className="h-6 w-6" />} />
         </nav>
         <div className="mb-4">
            <div className="h-10 w-10 rounded-full bg-blue-500 p-2">
               <span className="text-sm font-medium text-white">M.</span>
            </div>
         </div>
      </div>
   )
}

