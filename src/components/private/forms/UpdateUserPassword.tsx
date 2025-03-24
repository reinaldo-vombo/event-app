import { zodResolver } from '@hookform/resolvers/zod'
import { Eye } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { updatedPassworSchema } from '@/lib/validation/user'
import { initialState } from '@/constant/static-content'
import { updatePassword } from '@/lib/actions/users'
import { Button } from '@/components/ui/button'
import { IUser } from 'next-auth'

type TProps = {
   user: (IUser & {
      name?: string | null;
      email?: string | null;
      image?: string | null;
   }) | undefined
}

const UpdatedUserPassword = ({ user }: TProps) => {
   async function onSubmit(value: z.infer<typeof updatedPassworSchema>) {
      const result = await updatePassword(initialState, value);
      if (result.error) {
         toast.error(result.message)
      }
      if (result.success) {
         toast.success(result.message)
      }
      // Handle form submission
   }
   const form = useForm<z.infer<typeof updatedPassworSchema>>({
      resolver: zodResolver(updatedPassworSchema),
      defaultValues: {
         email: user?.email,
         name: user?.name,
         role: user?.role,
         userName: user?.username || "",
         old_password: "",
         new_password: ""
      }
   })

   return (
      <div className='space-y-8'>
         <Form {...form}>
            <form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
               <FormField
                  control={form.control}
                  name="old_password"
                  render={({ field }) => (
                     <FormItem className='w-full'>
                        <FormLabel className='text-slate-500'>Palavra-passe atual</FormLabel>
                        <FormControl>
                           <div className='relative'>
                              <Input type='password' placeholder='Palavra-passe' {...field} />
                              <Eye className='absolute right-[22px] top-[12px] text-slate-300' width={20} />
                           </div>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="new_password"
                  render={({ field }) => (
                     <FormItem className='w-full'>
                        <FormLabel className='text-slate-500'>Nova Palavra-passe</FormLabel>
                        <FormControl>
                           <div className='relative'>
                              <Input type='password' placeholder='Confirmar' {...field} />
                              <Eye className='absolute right-[22px] top-[12px] text-slate-300' width={20} />
                           </div>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <Button className='w-full' disabled={form.formState.isSubmitting}>Atualizar</Button>
            </form>
         </Form>
      </div>
   )
}

export default UpdatedUserPassword;
