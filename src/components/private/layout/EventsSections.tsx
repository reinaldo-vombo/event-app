import React from 'react'
import { PostCard } from '../event/PostCard'
// import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
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
         {/* <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            gutterBreakpoints={{ 350: "12px", 750: "16px", 900: "24px" }}
         >
            <Masonry>
               <div>1</div>
               <div>1</div>
               <div>1</div>
               <div>1</div>
            </Masonry>
         </ResponsiveMasonry> */}
      </div>
   )
}

export default EventsSections;
