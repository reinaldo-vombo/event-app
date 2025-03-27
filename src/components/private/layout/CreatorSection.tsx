'use client'
import { Check, ChevronDown } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import EventCard from '@/components/shared/EventCard'
import { TEvent } from '../event/type'
import Modal from '@/components/shared/animate-modal/Modal'
import ProfileModal from '../profile/ProfileModal'
import { User } from '@/lib/auth/user'
// import { IUser } from 'next-auth'
// import { User } from '@/lib/auth/user'
type TProps = {
   events: TEvent[]
   creator: any
   // creator: IUser
}

const CreatorSection = ({ creator, events }: TProps) => {
   const user = User()
   // const isFollowing = creator.followers.some(f => f.followerId === user?.id);
   return (
      <>
         <div className="relative h-64 bg-gradient-to-r from-gray-900 to-purple-900 overflow-hidden">
            <div className="absolute top-6 left-6 w-16 h-16 rounded-full bg-yellow-400"></div>
            <div className="absolute top-10 right-10 w-12 h-12 rounded-full bg-green-400"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 text-white">
               <h2 className="text-3xl font-bold mb-1">Your tasks</h2>
               <p className="text-gray-300 mb-4">Create, manage and organize your tasks</p>
               <div className="flex items-center gap-2 mb-3">
                  <div className="bg-gray-700/80 rounded-lg p-2 flex-1">
                     <div className="flex items-center justify-between">
                        <span>Upcoming</span>
                        <div className="flex items-center gap-1">
                           <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                           <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                           <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="bg-gray-700/80 rounded-lg p-2 mb-2">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center">
                           <Check className="w-3 h-3 text-gray-500" />
                        </div>
                        <span>Prepare design feedback</span>
                     </div>
                     <Button className="bg-blue-500 text-white rounded-full h-6 px-3 text-xs">Done</Button>
                  </div>
               </div>
            </div>
         </div>


         <div className="flex items-start px-6 pt-6 pb-4 border-b relative">
            <div className="absolute -top-12 w-24 h-24 rounded-full border-4 border-white overflow-hidden">
               <Image
                  src={creator.image || '/avatar.jpg'}
                  alt={creator.name}
                  width={96}
                  height={96}
                  className="object-cover"
               />
            </div>
            <div className="ml-28 flex-1">
               <div className="flex items-center gap-1 mb-1">
                  <h1 className="text-xl font-bold">{creator.name}</h1>
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                     <Check className="w-2.5 h-2.5 text-white" />
                  </div>
               </div>
               <p className="text-gray-500 text-sm">{creator.username}</p>
            </div>
            <div className="flex items-center gap-2">
               <Button variant={'outline'} className="p-1.5 hover:bg-red-500">
                  Seguir
               </Button>
               {creator.id === user?.id && (
                  <Modal id={1} trigger={
                     <div className='p-1 rounded-md border border-neutral-800'>Edit profile</div>
                  } >
                     <ProfileModal user={creator} />
                  </Modal>
               )}
            </div>
         </div>

         {/* Tabs and Content */}
         <div className="px-6">
            <div className="flex justify-between items-center">
               <Tabs defaultValue="products" className="w-full">
                  <TabsList className="bg-transparent p-0 h-12 gap-6">
                     <TabsTrigger
                        value="products"
                        className="px-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-red-500 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none h-12"
                     >
                        Products
                     </TabsTrigger>
                     <TabsTrigger
                        value="followers"
                        className="px-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-red-500 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none h-12"
                     >
                        Followers
                     </TabsTrigger>
                     <TabsTrigger
                        value="following"
                        className="px-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-red-500 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none h-12"
                     >
                        Following
                     </TabsTrigger>
                  </TabsList>

                  <div className="flex justify-end py-4">
                     <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Most recent</span>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                        <Button variant="outline" size="icon" className="h-8 w-8 ml-2">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                           >
                              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
                           </svg>
                        </Button>
                     </div>
                  </div>

                  <TabsContent value="products" className="mt-0">
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-6">
                        {events.length > 0 ? events.map((event) => (
                           <EventCard key={event.id} ownerId={creator.id} props={event} />
                        )) : (<p>Não teis nenhum evento</p>)}
                     </div>
                  </TabsContent>

                  <TabsContent value="followers" className="mt-0">
                     <div className="py-12 text-center text-gray-500">No followers to display</div>
                  </TabsContent>

                  <TabsContent value="following" className="mt-0">
                     <div className="py-12 text-center text-gray-500">Not following anyone</div>
                  </TabsContent>
               </Tabs>
            </div>
         </div>
      </>
   )
}

export default CreatorSection;
