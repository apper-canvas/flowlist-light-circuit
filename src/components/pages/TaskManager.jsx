import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import Header from "@/components/organisms/Header"
import TaskList from "@/components/organisms/TaskList"
import TaskForm from "@/components/organisms/TaskForm"
import taskService from "@/services/api/taskService"
import { toast } from "react-toastify"

const TaskManager = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [tasksCount, setTasksCount] = useState(0)
  const [refreshKey, setRefreshKey] = useState(0)

  const loadTasksCount = useCallback(async () => {
    try {
      const tasks = await taskService.getAll()
      setTasksCount(tasks.length)
    } catch (err) {
      console.error("Failed to load tasks count:", err)
    }
  }, [])

  useEffect(() => {
    loadTasksCount()
  }, [loadTasksCount, refreshKey])

  const handleAddTask = () => {
    setEditingTask(null)
    setIsFormOpen(true)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingTask(null)
  }

  const handleSubmitTask = async (taskData) => {
    try {
      if (editingTask) {
        await taskService.update(editingTask.Id, {
          ...taskData,
          updatedAt: new Date()
        })
        toast.success("Task updated successfully! ✨")
      } else {
        await taskService.create({
          ...taskData,
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        toast.success("Task created successfully! 🎉")
      }
      
      setRefreshKey(prev => prev + 1)
      loadTasksCount()
    } catch (err) {
      toast.error(editingTask ? "Failed to update task" : "Failed to create task")
    }
  }

  const handleSearch = useCallback((query) => {
    setSearchQuery(query)
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background"
    >
      <Header
        onAddTask={handleAddTask}
        onSearch={handleSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        tasksCount={tasksCount}
      />

      <main className="max-w-4xl mx-auto px-6 py-8">
        <TaskList
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          onTaskEdit={handleEditTask}
          refresh={refreshKey}
        />
      </main>

      <TaskForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitTask}
        task={editingTask}
      />
    </motion.div>
  )
}

export default TaskManager