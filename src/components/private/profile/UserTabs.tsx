import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from "@/components/ui/tabs"
import UpdatedUser from "../forms/UpdatedUser"
import { User } from "@/lib/auth/user"
import UpdatedUserPassword from "../forms/UpdateUserPassword"

const FormTabs = () => {
   const user = User()
   return (
      <Tabs defaultValue="account" className="w-[400px]">
         <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
         </TabsList>
         <TabsContent value="account">
            <Card>
               <CardHeader>
                  <CardTitle>Conta</CardTitle>
                  <CardDescription>
                     Faça alterações aqui e seguida. Clique em salvar.
                  </CardDescription>
               </CardHeader>
               <CardContent className="space-y-2">
                  <UpdatedUser user={user} />
               </CardContent>
               <CardFooter>

               </CardFooter>
            </Card>
         </TabsContent>
         <TabsContent value="password">
            <Card>
               <CardHeader>
                  <CardTitle>Palavra-passe</CardTitle>
                  <CardDescription>
                     {/* Change your password here. After saving, you'll be logged out. */}
                     Altera a sua palavra-passe aqui. Depois de salvar vai fazer o logged ou
                  </CardDescription>
               </CardHeader>
               <CardContent className="space-y-2">
                  <UpdatedUserPassword user={user} />
               </CardContent>
               <CardFooter>
               </CardFooter>
            </Card>
         </TabsContent>
      </Tabs>
   )
}
export default FormTabs;
