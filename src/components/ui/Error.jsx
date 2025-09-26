import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-surface rounded-2xl p-12 shadow-sm text-center"
    >
      <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-error-500 to-error-600 rounded-full flex items-center justify-center">
        <ApperIcon name="AlertCircle" className="w-8 h-8 text-white" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        {message}
      </p>
      
      {onRetry && (
        <Button 
          onClick={onRetry}
          className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-3 rounded-xl font-medium transform hover:scale-105 transition-all duration-200"
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      )}
    </motion.div>
  )
}

export default Error