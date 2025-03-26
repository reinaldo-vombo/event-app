import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
type TProps = {
   src: string | null
   name: string
}
const UserAvatar = ({ name, src }: TProps) => {
   const initials = name
      .split(" ") // Split name into words
      .map(word => word[0]) // Get first letter of each word
      .join("") // Join them together
      .toUpperCase();
   return (
      <Avatar>
         <AvatarImage src={src || '/no-user.jpg'} />
         <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
   )
}

export default UserAvatar
