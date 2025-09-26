import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Checkbox = forwardRef(({ 
  className, 
  ...props 
}, ref) => {
  return (
    <input
      type="checkbox"
      className={cn(
        "task-checkbox w-5 h-5 rounded border-2 border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-2 cursor-pointer",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox