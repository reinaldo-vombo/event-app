import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Image from "next/image"

type TProps = {
   name: string
   handle: string
   avatar: string
}
const FollowSuggestion = ({ name, handle, avatar, }: TProps) => {
   return (
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-2">
            <Image src={avatar} className="h-10 w-10 rounded-full" width={40} height={40} alt='user' />
            <div>
               <p className="text-sm font-semibold leading-none">{name}</p>
               <p className="text-sm text-muted-foreground">@{handle}</p>
            </div>
         </div>
         <Button size="sm" className="h-8 rounded-lg bg-blue-500">
            <Plus />
         </Button>
      </div>
   )
}

export default FollowSuggestion;