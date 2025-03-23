'use client'
import { Globe, Heart, MoreHorizontal, Share2 } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import EventCard from '@/components/shared/EventCard'
import { TEvent } from '../event/type'
// import { IUser } from 'next-auth'
// import { User } from '@/lib/auth/user'
type TProps = {
   events: TEvent[]
   creator: any
   // creator: IUser | null
}

const CreatorSection = ({ creator, events }: TProps) => {
   // const user = User()
   // const isFollowing = creator.followers.some(f => f.followerId === user?.id);
   return (
      <section className='padding'>
         <div className="relative h-48 md:h-64 w-full overflow-hidden">
            <Image
               src="/placeholder.svg?height=400&width=1500"
               alt="Profile banner"
               width={1500}
               height={400}
               className="w-full h-full object-cover"
               style={{
                  background: "linear-gradient(45deg, #ff9a9e, #fad0c4, #fad0c4, #a18cd1, #fbc2eb, #a6c1ee, #fbc2eb)",
               }}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20" />
            <Button variant="outline" className="absolute right-4 bottom-4 bg-white/80 backdrop-blur-sm hover:bg-white/90">
               Edit Profile
            </Button>
         </div>

         {/* Profile Info */}
         <div className="max-w-7xl mx-auto px-4 pb-6">
            <div className="flex flex-col md:flex-row gap-6 -mt-16 md:-mt-20 relative z-10">
               {/* Avatar */}
               <div className="flex-shrink-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden bg-white">
                     <Image
                        src={creator?.image || ''}
                        alt={creator?.username || ''}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                     />
                  </div>
               </div>

               {/* Profile Details */}
               <div className="flex-1 pt-4 md:pt-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                     <div>
                        <h1 className="text-2xl font-bold">{creator?.name}</h1>
                        <p className="text-gray-600">3D Illustrator</p>
                        <div className="flex items-center gap-1 mt-1 text-sm">
                           <span className="text-gray-500 font-mono">0xc1e16a45...b21a</span>
                        </div>
                     </div>
                     <div className="flex gap-2">
                        <Button className="bg-blue-500 hover:bg-blue-600">Follow</Button>
                        <Button variant="outline" size="icon">
                           <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                           <MoreHorizontal className="h-4 w-4" />
                        </Button>
                     </div>
                  </div>

                  <p className="mt-4 text-gray-600 max-w-2xl">
                     Creating After Effects templates for making an entire event promo, fashion promo and business
                     presentations.
                  </p>

                  <div className="mt-4 flex items-center text-sm text-gray-500">
                     <Globe className="h-4 w-4 mr-1" />
                     <a href="https://Morrison.com" className="text-blue-500 hover:underline">
                        https://Morrison.com
                     </a>
                  </div>

                  <div className="mt-4 flex gap-6">
                     <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">27</span>
                     </div>
                     <div className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path
                              d="M17 2H7C4.79086 2 3 3.79086 3 6V18C3 20.2091 4.79086 22 7 22H17C19.2091 22 21 20.2091 21 18V6C21 3.79086 19.2091 2 17 2Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                           />
                           <path
                              d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5932 15.1514 13.8416 15.5297C13.0901 15.9079 12.2385 16.0396 11.4078 15.9059C10.5771 15.7723 9.80977 15.3801 9.21485 14.7852C8.61993 14.1902 8.22774 13.4229 8.09408 12.5922C7.96042 11.7615 8.09208 10.9099 8.47034 10.1584C8.8486 9.40685 9.4542 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                           />
                        </svg>
                        <span className="text-sm">4</span>
                     </div>
                     <div className="text-sm text-gray-500">Member since Mar 25, 2022</div>
                  </div>
               </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="on-sale" className="mt-8">
               <TabsList className="border-b w-full justify-start rounded-none bg-transparent p-0 h-auto">
                  <TabsTrigger
                     value="on-sale"
                     className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-4 py-2"
                  >
                     On Sale
                  </TabsTrigger>
                  <TabsTrigger
                     value="collectibles"
                     className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-4 py-2"
                  >
                     Collectibles
                  </TabsTrigger>
                  <TabsTrigger
                     value="created"
                     className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-4 py-2"
                  >
                     Created
                  </TabsTrigger>
                  <TabsTrigger
                     value="likes"
                     className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-4 py-2"
                  >
                     Likes
                  </TabsTrigger>
                  <TabsTrigger
                     value="following"
                     className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-4 py-2"
                  >
                     Following
                  </TabsTrigger>
                  <TabsTrigger
                     value="followers"
                     className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-4 py-2"
                  >
                     Followers
                  </TabsTrigger>
               </TabsList>

               <TabsContent value="on-sale" className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                     {events.map((event) => (
                        <EventCard props={event} ownerId={creator?.id} key={event.id} />
                     ))}
                  </div>
               </TabsContent>

               <TabsContent value="collectibles">
                  <div className="flex items-center justify-center h-40 text-gray-500">No collectibles to display</div>
               </TabsContent>

               <TabsContent value="created">
                  <div className="flex items-center justify-center h-40 text-gray-500">No created items to display</div>
               </TabsContent>

               <TabsContent value="likes">
                  <div className="flex items-center justify-center h-40 text-gray-500">No liked items to display</div>
               </TabsContent>

               <TabsContent value="following">
                  <div className="flex items-center justify-center h-40 text-gray-500">Not following anyone</div>
               </TabsContent>

               <TabsContent value="followers">
                  <div className="flex items-center justify-center h-40 text-gray-500">No followers yet</div>
               </TabsContent>
            </Tabs>
         </div>
      </section >
   )
}

export default CreatorSection
