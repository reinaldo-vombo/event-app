'use client'
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce';

const SearchInput = () => {
   const searchParams = useSearchParams();
   const pathname = usePathname();
   const { replace } = useRouter();

   const handleSearch = useDebouncedCallback((term) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
         params.set('query', term);
      } else {
         params.delete('query');
      }
      replace(`${pathname}?${params.toString()}`);
   }, 300);
   return (
      <div className='relative'>
         <Input type='search' placeholder='Pesquisar por #Ti, @user'
            onChange={(e) => {
               handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get('query')?.toString()} />
         <Search className='absolute top-[4px] right-3' />
      </div>
   )
}

export default SearchInput
