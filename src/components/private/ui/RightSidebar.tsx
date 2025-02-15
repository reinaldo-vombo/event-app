import { Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import FollowSuggestion from './FollowSuggestion'
import { FOLLOW_SUGGESTION } from '@/constant/static-content'
import { demo1 } from '@/assets/images'

export function RightSidebar() {
   return (
      <aside className="w-96 fixed right-0 space-y-4 bg-background p-4 rounded-2xl">
         <Card className="border-0 bg-muted">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
               <CardTitle className="text-sm font-semibold text-slate-400">Who to follow</CardTitle>
               <Button variant="ghost" size="icon" className="h-8 w-8 border rounded-full">
                  <Settings className="h-4 w-4" />
               </Button>
            </CardHeader>
            <CardContent className="space-y-5">
               {FOLLOW_SUGGESTION.length > 0 ? FOLLOW_SUGGESTION.map((follower) => (
                  <FollowSuggestion
                     key={follower.id}
                     name={follower.name}
                     handle={follower.handle}
                     avatar={follower.avatar}
                  />
               )) : (<p>No seguestion..</p>)}
               <Button variant="secondary" className="w-full bg-slate-300 rounded-full hover:bg-black hover:text-white">
                  Mostrar mais
               </Button>
            </CardContent>
         </Card>

         <Card className="overflow-hidden relative">
            <div className="relative h-56">
               <Image
                  src={demo1}
                  alt="Rashford"
                  fill
                  sizes='100%'
                  className="object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
               <div className="absolute inset-0 p-3 flex flex-col">
                  <div>
                     <h3 className="text-xl font-bold text-white">Rashford</h3>
                     <p className="text-sm text-white/80">216,582 people tweeting about him</p>
                  </div>
                  <div className="w-full text-white mt-auto h-16 rounded-full bg-slate-500/20 backdrop-blur-md flex justify-between items-center px-4">
                     <span>Tweet about him</span>
                     <span className='bg-blue-500 rounded-full size-10'></span>
                  </div>
               </div>
            </div>
         </Card>

         <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6">
               <h3 className="text-xl font-bold">Twitter Redesigned!</h3>
               <p className="mt-2 text-primary-foreground/80">{"We've changed many things."}</p>
               <Button variant="secondary" className="mt-4">
                  Check it out
               </Button>
            </CardContent>
         </Card>
      </aside>
   )
}

