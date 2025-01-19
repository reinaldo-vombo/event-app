import React from 'react'
import { PostCard } from '../event/PostCard'

const data = {
   id: 'ddd',
   slug: 'hello',
   thumbnail: '/Firefly.jpg',
   title: 'Angola Open Source',
   handle: '@eginalde',
   description: 'hello',
   comments: 5,
   retweets: 20,
   likes: 10,
   shared: 5

}
const EventsSections = () => {
   return (
      <div>
         <PostCard props={data} />
      </div>
   )
}

export default EventsSections
