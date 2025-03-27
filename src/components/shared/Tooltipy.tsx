import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip"
type TProps = {
   title: string
   trigger: React.ReactNode
}

export default function Tooltipy({ title, trigger }: TProps) {
   return (
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger>{trigger}</TooltipTrigger>
            <TooltipContent>
               {title}
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   )
}
