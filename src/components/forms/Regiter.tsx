'use client'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, Mail, User } from 'lucide-react'
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
import { registerSchema } from '@/lib/validation/user'
import { initialState } from '@/constant/static-content'
import { Button } from '../ui/button'
import { registerUser } from '@/lib/actions/users'


const Register = () => {
   async function onSubmit(value: z.infer<typeof registerSchema>) {
      const result = await registerUser(initialState, value);
      if (result.error) {
         toast.error(result.message)
      }
      if (result.success) {
         toast.success(result.message)
      }
      // Handle form submission
   }
   const form = useForm<z.infer<typeof registerSchema>>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
         name: "",
         userName: "",
         role: "PARTICIPANT",
         email: "",
         password: "",
         confirmPassword: ""
      }
   })

   return (
      <div className='space-y-8'>
         <Form {...form}>
            <form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
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
                  name="password"
                  render={({ field }) => (
                     <FormItem className='w-full'>
                        <FormLabel className='text-slate-500'>Palavra-passe</FormLabel>
                        <FormControl>
                           <div className='relative'>
                              <Input type='password' placeholder='Palavra-passe' {...field} />
                              <Eye className='absolute right-[22px] top-[9px] text-slate-300' width={20} />
                           </div>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                     <FormItem className='w-full'>
                        <FormLabel className='text-slate-500'>Confirmar Palavra-passe</FormLabel>
                        <FormControl>
                           <div className='relative'>
                              <Input type='password' placeholder='Confirmar' {...field} />
                              <Eye className='absolute right-[22px] top-[9px] text-slate-300' width={20} />
                           </div>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <Button disabled={form.formState.isSubmitting}>Criar</Button>
            </form>
         </Form>
         <Separator />
         <div className='flex items-center justify-center gap-2 text-xs'>
            <span>Já tenho uma conta</span>
            <span className='text-alpha cursor-pointer'>Entrar</span>
         </div>
      </div>
   )
}

export default Register;