import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@lib/utils/cn";
import { Button } from "@components/ui/button";
import { Calendar } from "@components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";

interface DatepickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder: string;
  className?: string;
}

export function DatePicker({ value, onChange, placeholder, className }: DatepickerProps) {
  return (
    <div className={`relative ${className}`}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-nunito flex h-14 w-full rounded-lg border border-gray-400 bg-background px-3 py-6 text-sm ring-offset-background outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-orange-500",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value || undefined}
            onSelect={(selectedDate) => {
              onChange(selectedDate || null);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <span
        className={cn(
          "absolute left-3 px-1 transition-all duration-500 font-nunito z-50",
          "top-0 left-2 -translate-y-1/2 text-orange-500 bg-white px-1 text-sm"
        )}
        style={{ pointerEvents: "none" }}
      >
        {placeholder}
      </span>
    </div>
  );
}
