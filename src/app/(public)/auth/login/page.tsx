'use client'

import LoginForm from '@/components/forms/Login'
import { User } from '@/lib/auth/user'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
   const router = useRouter()
   const user = User()
   if (user) {
      router.push('/dashboard')
   }

   return (
      <section>
         <LoginForm />
      </section>
   )
}
