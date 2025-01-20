import { demo1, demo2, demo3, demo4, demo5 } from '@/assets/images';
import Image from 'next/image';
import React from 'react'
type TProps = {
   users: string[];
}
const images = [demo1, demo2, demo3, demo4, demo5]

const UsersGoing = ({ }) => {
   return (
      <div className="flex -space-x-4 rtl:space-x-reverse">
         {images.map((item, index) => (
            <Image key={index} className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src={item} alt="" />
         ))}
         {images.length > 4 && (
            <a className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" href="#">+99</a>
         )}
      </div>
   )
}

export default UsersGoing;
