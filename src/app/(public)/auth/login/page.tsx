'use client'

import LoginForm from '@/components/forms/Login'
import { PRIVE_ROUTES } from '@/constant/static-content'
import { User } from '@/lib/auth/user'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
   const router = useRouter()
   const user = User()
   if (user) {
      router.push(PRIVE_ROUTES.root)
   }

   return (
      <section>
         <LoginForm />
      </section>
   )
}
