import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
   DialogDescription
} from "@/components/ui/dialog"
import { TModalProps } from "./type"

const Modal = ({ trigger, children, title, className }: TModalProps) => {
   return (
      <Dialog>
         <DialogTrigger className={className}>{trigger}</DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            {children}
         </DialogContent>
         <DialogDescription>{title}</DialogDescription>
      </Dialog>

   )
}

export default Modal