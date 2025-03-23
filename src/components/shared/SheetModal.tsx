
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "../ui/sheet"
import { SheetProps } from "./type"

const SheetModal = ({ children, side, onClick, trigger, label, className, triggerClass, title, description }: SheetProps) => {
   return (
      <Sheet>
         <SheetTrigger aria-label={label} className={triggerClass} onClick={onClick && onClick}>
            {trigger}
         </SheetTrigger>
         <SheetDescription className="sr-only">
            {description}
         </SheetDescription>
         <SheetContent aria-describedby="deplay item" side={side} className={className}>
            <SheetTitle className="font-semibold text-center">{title ? title : 'Modal dialog'}</SheetTitle>
            {children}
         </SheetContent>
      </Sheet>
   )
}

export default SheetModal;