import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, User } from 'lucide-react'
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
import { updatedUserSchema } from '@/lib/validation/user'
import { initialState, ROLE } from '@/constant/static-content'
import { updateUser } from '@/lib/actions/users'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/shared/file-uploade/FileUpload'
import { TUserProps } from '@/lib/types'
import Selector from '@/components/shared/Selector'

const UpdatedUser = ({ user }: TUserProps) => {
   async function onSubmit(value: z.infer<typeof updatedUserSchema>) {
      const result = await updateUser(initialState, value);
      if (result.error) {
         toast.error(result.message)
      }
      if (result.success) {
         toast.success(result.message)
      }
      // Handle form submission
   }
   const form = useForm<z.infer<typeof updatedUserSchema>>({
      resolver: zodResolver(updatedUserSchema),
      defaultValues: {
         name: user?.name,
         userName: user?.username,
         role: user?.role || "PARTICIPANT",
         email: user?.email,
         avatar: [],
         bio: user?.bio || "",
         location: {
            lat: user?.lat || 0,
            lng: user?.lng || 0
         }
      }
   })
   const onInvalid = (errors: unknown) => {
      //This helpe me fix a two week form not submiting god kwon's way bug
      console.error("Validation Errors:", errors);
   };
   return (
      <div className='space-y-8'>
         <Form {...form}>
            <form className='space-y-5' onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
               <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                     <FormItem className='w-full'>
                        <FormLabel className='text-slate-500'>Avatar</FormLabel>
                        <FormControl>
                           <FileUpload formField={field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                     <FormItem className='w-full'>
                        <FormLabel className='text-slate-500'>Nome</FormLabel>
                        <FormControl>
                           <div className='relative'>
                              <Input placeholder='Nome' {...field} />
                              <User className='absolute right-[22px] top-[9px] text-slate-300' width={20} />
                           </div>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                     <FormItem className='w-full'>
                        <FormLabel className='text-slate-500'>Nome de utilizador</FormLabel>
                        <FormControl>
                           <div className='relative'>
                              <Input placeholder='Nome' {...field} />
                              <User className='absolute right-[22px] top-[9px] text-slate-300' width={20} />
                           </div>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                     <FormItem className='w-full'>
                        <FormLabel className='text-slate-500'>Email</FormLabel>
                        <FormControl>
                           <div className='relative'>
                              <Input placeholder='Email' {...field} />
                              <Mail className='absolute right-[22px] top-[9px] text-slate-300' width={20} />
                           </div>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                     <FormItem className='w-full'>
                        <FormLabel className='text-slate-500'>Posição</FormLabel>
                        <FormControl>
                           <Selector formField={field} options={ROLE} placeholder='Tipo' />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <Button className='w-full' disabled={form.formState.isSubmitting}>Atualisar</Button>
            </form>
         </Form>
      </div>
   )
}

export default UpdatedUser;
