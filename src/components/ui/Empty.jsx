import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Empty = ({ title = "No tasks yet", description = "Create your first task to get started", onAction, actionText = "Add Task" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="empty-state rounded-2xl p-12 text-center"
    >
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
        <ApperIcon name="CheckSquare" className="w-10 h-10 text-white" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        {description}
      </p>
      
      {onAction && (
        <Button 
          onClick={onAction}
          className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-xl font-medium transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
          {actionText}
        </Button>
      )}
      
      <div className="mt-8 text-sm text-gray-500">
        <p>💡 Tip: Use drag and drop to reorder tasks</p>
      </div>
    </motion.div>
  )
}

export default Empty