'use client'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { registerSchema } from '@/lib/validation/user'
import { initialState, PRIVE_ROUTES } from '@/constant/static-content'
import { Button } from '../ui/button'
import { registerUser } from '@/lib/actions/users'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { generateUsername } from '@/lib/helper'

type TPost = {
   onChange: React.Dispatch<React.SetStateAction<boolean>>
}
const Register = ({ onChange }: TPost) => {
   const router = useRouter()
   async function onSubmit(value: z.infer<typeof registerSchema>) {
      const email = value.email;
      const password = value.password;
      const result = await registerUser(initialState, value);
      if (result.error) {
         toast.error(result.message)
      }
      if (result.success) {
         toast.success(result.message)
         await signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl: '/party-twon'
         })
         router.push(PRIVE_ROUTES.root);
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
      <Card className="w-full ">
         <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-bold">Cadastro</CardTitle>
            <CardDescription></CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
            <Form {...form}>
               <form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem className='w-full'>
                           <FormLabel className='text-slate-500'>Nome</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder='Nome' {...field}
                                 onChange={(e) => {
                                    field.onChange(e); // Update the title field
                                    form.setValue("userName", generateUsername(e.target.value)); // Generate slug dynamically
                                 }} />
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
                           <FormLabel className='text-slate-500'></FormLabel>
                           <FormControl>
                              <div className='relative'>
                                 <Input placeholder='Nome' type='hidden' {...field} />
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
                              <Input placeholder='Email' {...field} />
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
                              <Input type='password' placeholder='Palavra-passe' {...field} />
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
                              <Input type='password' placeholder='Confirmar' {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                     {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                     Entrar
                  </Button>
               </form>
            </Form>
         </CardContent>
         <CardFooter className="flex flex-wrap items-center justify-center gap-1">
            <Separator />
            <div className='flex items-center justify-center gap-2 text-xs'>
               <span>Já tenho uma conta?</span>
               <button onClick={() => onChange(false)} className='text-alpha cursor-pointer'>Entrar</button>
            </div>
         </CardFooter>
      </Card>

   )
}

export default Register;