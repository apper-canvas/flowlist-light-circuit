import { format, isToday, isPast, isWithinInterval, addDays } from "date-fns"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const DueDateIndicator = ({ dueDate, className }) => {
  if (!dueDate) return null

  const date = new Date(dueDate)
  const now = new Date()
  const isOverdue = isPast(date) && !isToday(date)
  const isDueToday = isToday(date)
  const isUpcoming = isWithinInterval(date, {
    start: addDays(now, 1),
    end: addDays(now, 7)
  })

  let statusClass = "due-upcoming"
  let icon = "Calendar"
  
  if (isOverdue) {
    statusClass = "due-overdue"
    icon = "AlertCircle"
  } else if (isDueToday) {
    statusClass = "due-today"
    icon = "Clock"
  }

  return (
    <div className={cn("flex items-center space-x-1 text-sm", statusClass, className)}>
      <ApperIcon name={icon} className="w-4 h-4" />
      <span>{format(date, "MMM d")}</span>
    </div>
  )
}

export default DueDateIndicator