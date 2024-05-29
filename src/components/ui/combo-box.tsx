import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select"
import { cn } from "@lib/utils/cn";

interface ComboboxProp {
  value: string | undefined,
  onChange: (option : String | undefined) => void;
  placeholder: String,
  items: string[] | null,
  itemTitle: string
}

export function Combobox({value, onChange, placeholder, items, itemTitle}: ComboboxProp) {
  const [focused, setFocused] = React.useState(false);

  return (

    <Select value={value} onValueChange={onChange}>
      <SelectTrigger  className="w-full h-full relative" onClick={()=>{setFocused(true)}} onFocus={()=>{setFocused(true)}} onBlur={()=>{setFocused(false)}}>
      <span
          className={cn(
            "absolute left-3 px-1 transition-all duration-300 font-nunito z-3 text-ellipsis overflow-hidden max-h-6",
            {
              "top-[28%] opacity-50 text-black": !focused && (!value || value === ''),
              "top-0 left-2 -translate-y-1/2 text-orange-500 bg-white px-1 text-sm":
                focused || value,
            },
            
          )}
          style={{ pointerEvents: "none" }}
        >
          {placeholder}
        </span>
        <SelectValue />

      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{itemTitle}</SelectLabel>
          {items?.map((item) => (
            <SelectItem value={item}>{item}</SelectItem>
          ))}
          {/* <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
