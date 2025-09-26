import { useState } from "react"
import { motion } from "framer-motion"
import Checkbox from "@/components/atoms/Checkbox"
import Button from "@/components/atoms/Button"
import PriorityBadge from "@/components/molecules/PriorityBadge"
import DueDateIndicator from "@/components/molecules/DueDateIndicator"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const TaskItem = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  isDragging = false 
}) => {
  const [isCompleting, setIsCompleting] = useState(false)

  const handleToggleComplete = async () => {
    setIsCompleting(true)
    setTimeout(() => {
      onToggleComplete(task.Id)
      setIsCompleting(false)
    }, 300)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className={cn(
        "task-item group bg-surface rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer",
        task.completed && "opacity-75",
        isCompleting && "task-complete",
        isDragging && "rotate-2 shadow-xl scale-105"
      )}
    >
      <div className="flex items-start space-x-4">
        <Checkbox
          checked={task.completed}
          onChange={handleToggleComplete}
          className="mt-0.5 flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={cn(
                "font-semibold text-gray-900 mb-1",
                task.completed && "line-through text-gray-500"
              )}>
                {task.title}
              </h3>
              {task.description && (
                <p className={cn(
                  "text-sm text-gray-600 mb-3",
                  task.completed && "line-through text-gray-400"
                )}>
                  {task.description}
                </p>
              )}
            </div>
            
            <div className="drag-handle ml-2 p-1 rounded cursor-move">
              <ApperIcon name="GripVertical" className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <PriorityBadge priority={task.priority} />
              <DueDateIndicator dueDate={task.dueDate} />
            </div>
            
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(task)}
                className="text-gray-400 hover:text-primary-500 p-2"
              >
                <ApperIcon name="Edit" className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task.Id)}
                className="text-gray-400 hover:text-error-500 p-2"
              >
                <ApperIcon name="Trash2" className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskItem