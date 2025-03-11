
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Image from 'next/image'
import { TEvent, } from './type'
type TProps = {
   props: TEvent
}

export function PostCard({ props }: TProps) {
   const { title, thumbnail, } = props;
   return (
      <Card className="border-0 w-full relative flex flex-col shadow-none text-white">
         <Image src={thumbnail} fill alt="Post image" className="w-full object-cover rounded-lg" />
         <div className='absolute inset-0 bg-black/10' />
         <CardHeader className="flex-row items-start gap-4 space-y-0 pb-2 relative z-0">
            <Image src='/avatar.jpg' className="h-10 w-10 rounded-full" width={40} height={40} alt='user' />
            <div className="flex-1 space-y-1">
               <div className="flex items-center gap-2">
                  <div className='flex gap-2'>
                     <span className="font-semibold">Reginalde</span>
                     <span className="text-muted-foreground">17 Jan</span>
                  </div>
               </div>

               <span className="text-muted-foreground">·</span>
            </div>
         </CardHeader>
         <CardContent className="pb-2 relative z-10 mt-auto">
            <h2 className='text-xl font-semibold'>{title}</h2>
            <div className="mt-3 overflow-hidden rounded-xl">
            </div>
         </CardContent>
         <CardFooter className="justify-between gap-4 pb-4 relative">
         </CardFooter>
      </Card>
   )
}

