"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { signIn } from "next-auth/react"
import { GoogleLogo } from "@/assets/logo"
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import { loginSchema } from "@/lib/validation/user"
import Register from "./Regiter"

export default function LoginForm() {
   const [showRegister, setShowRegister] = useState(false)
   const router = useRouter()
   const [isLoading, setIsLoading] = React.useState<boolean>(false)

   // Initialize react-hook-form
   const form = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         email: "",
         password: "",
         rememberMe: false,
      },
   })

   async function onSubmit(values: z.infer<typeof loginSchema>) {
      setIsLoading(true)
      const email = values.email
      const password = values.password

      try {
         const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl: '/party-twon'
         });

         if (result?.error) {
            toast.warning("Email ou Senha incorreta");
            setIsLoading(false)
         }
         if (result?.ok) {
            router.push("/party-twon");
            toast.success(`Let's party`);
            setIsLoading(false)
         }
      } catch (error) {
         console.error(error);
         toast.error("Ocorreu um erro ao fazer login.");
      }
   }

   return (
      <div className={`relative ${showRegister ? "hover-card-container" : ""}`}>
         <Card className="w-full ">
            <CardHeader className="space-y-1">
               <CardTitle className="text-2xl font-bold">Bem-vindo de volta</CardTitle>
               <CardDescription>Enter your email and password to login to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               {/* Google Login Button */}
               <Button variant="outline" type="button" className="w-full" onClick={() => signIn('google')}>
                  {isLoading ? (
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                     <GoogleLogo />
                  )}
                  Continuar com Google
               </Button>

               <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                     <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                     <span className="bg-background px-2 text-muted-foreground">Ou continue com</span>
                  </div>
               </div>

               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                     <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                 <Input placeholder="Email" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Palavra-passe</FormLabel>
                              <FormControl>
                                 <Input placeholder="Palavra-passe" type="password"  {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     {/* <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                      </FormControl>
                      <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Remember me
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <Button variant="link" className="px-0 font-normal" disabled={isLoading}>
                  Forgot password?
                </Button>
              </div> */}

                     <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Entrar
                     </Button>
                  </form>
               </Form>
            </CardContent>
            <CardFooter className="flex flex-wrap items-center justify-center gap-1">
               <span className="text-muted-foreground text-sm">Don&apos;t have an account?</span>
               <button type="button" className="p-0 font-normal" onClick={() => setShowRegister(true)}>
                  Criar conta
               </button>
            </CardFooter>
         </Card>
         <div className="absolute hover-card bg-black inset-0 transition-all ease-out delay-150">
            <Register onChange={setShowRegister} />
         </div>
      </div>
   )
}

