import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Textarea from "@/components/atoms/Textarea"
import Select from "@/components/atoms/Select"
import FormField from "@/components/molecules/FormField"
import ApperIcon from "@/components/ApperIcon"
import { format } from "date-fns"
import { toast } from "react-toastify"

// Initialize ApperClient for Edge function calls
const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});
const TaskForm = ({ isOpen, onClose, onSubmit, task = null }) => {
const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: ""
  })
  const [generating, setGenerating] = useState(false)
  
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "medium",
        dueDate: task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd") : ""
      })
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: ""
      })
    }
    setErrors({})
  }, [task, isOpen])
const generateDescription = async () => {
    if (!formData.title.trim()) {
      toast.error("Please enter a task title first")
      return
    }

    setGenerating(true)
    
    try {
      const result = await apperClient.functions.invoke(import.meta.env.VITE_GENERATE_TASK_DESCRIPTION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: formData.title })
      })

      if (result.success && result.data?.description) {
        setFormData(prev => ({ ...prev, description: result.data.description }))
        toast.success("Description generated successfully! ✨")
      } else {
        console.info(`apper_info: An error was received in this function: ${import.meta.env.VITE_GENERATE_TASK_DESCRIPTION}. The response body is: ${JSON.stringify(result)}.`)
        toast.error(result.error || "Failed to generate description")
      }
    } catch (error) {
      console.info(`apper_info: An error was received in this function: ${import.meta.env.VITE_GENERATE_TASK_DESCRIPTION}. The error is: ${error.message}`)
      toast.error("Failed to generate description. Please try again.")
    } finally {
      setGenerating(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = {}
    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const taskData = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : null
    }

    onSubmit(taskData)
    onClose()
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-surface rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {task ? "Edit Task" : "Create New Task"}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20 rounded-lg"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <FormField label="Task Title" required error={errors.title}>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter task title"
                error={!!errors.title}
              />
            </FormField>

<FormField label="Description">
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Add a description (optional)"
                    className="min-h-[100px] flex-1"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateDescription}
                  disabled={generating || !formData.title.trim()}
                  className="w-full sm:w-auto"
                >
                  {generating ? (
                    <>
                      <ApperIcon name="Loader2" size={16} className="animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Sparkles" size={16} className="mr-2" />
                      Generate Description
                    </>
                  )}
                </Button>
              </div>
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Priority">
                <Select
                  value={formData.priority}
                  onChange={(e) => handleInputChange("priority", e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </FormField>

              <FormField label="Due Date">
                <Input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange("dueDate", e.target.value)}
                />
              </FormField>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
              >
                <ApperIcon name={task ? "Save" : "Plus"} className="w-4 h-4 mr-2" />
                {task ? "Save Changes" : "Create Task"}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default TaskForm