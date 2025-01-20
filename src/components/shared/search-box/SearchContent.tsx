import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'
import SeachList from './SeachList'

const obj = {
   id: 'hhh',
   thumbnail: '/avatar.jpg',
   title: 'Angola open source'
}

const SearchContent = () => {
   return (
      <div className='space-y-7'>
         <div className='relative'>
            <Input type='search' placeholder='Pesquisar por #Ti, @user' />
            <Search className='absolute top-[4px] right-3' />
         </div>
         <h3 className='font-semibold'>Resultados: (1)</h3>
         <div>
            <SeachList props={obj} />
         </div>
      </div>
   )
}

export default SearchContent
