import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { TSelectProps } from "./type";

const Selector = ({ options, placeholder, className, formField, }: TSelectProps) => {

   const onChange = (value: string) => {
      formField.onChange(value); // For single select
   };

   return (
      <Select onValueChange={onChange} value={formField.value}>
         <SelectTrigger ref={formField.ref} className={`${className ? className : 'w-[180px]'}`}>
            <SelectValue placeholder={placeholder} />
         </SelectTrigger>
         <SelectContent>
            {options.map((item,) => (
               <SelectItem value={item.value} key={item.id}>{item.label}</SelectItem>
            ))}
         </SelectContent>
      </Select>

   )
}

export default Selector;