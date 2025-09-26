import { cn } from "@/utils/cn"

const FormField = ({ 
  label, 
  children, 
  error, 
  required = false, 
  className,
  ...props 
}) => {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-sm text-error-500 font-medium">{error}</p>
      )}
    </div>
  )
}

export default FormField