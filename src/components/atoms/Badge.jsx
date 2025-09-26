import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Badge = forwardRef(({ 
  className, 
  variant = "default", 
  children, 
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    high: "priority-high text-white",
    medium: "priority-medium text-white", 
    low: "priority-low text-white",
    success: "bg-gradient-to-r from-success-500 to-success-600 text-white",
    warning: "bg-gradient-to-r from-warning-500 to-warning-600 text-white",
    error: "bg-gradient-to-r from-error-500 to-error-600 text-white",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm",
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge