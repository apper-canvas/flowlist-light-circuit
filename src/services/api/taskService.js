import mockTasks from "@/services/mockData/tasks.json"

let tasks = [...mockTasks]

const taskService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...tasks].sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed - b.completed
      }
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    const task = tasks.find(t => t.Id === id)
    if (!task) {
      throw new Error("Task not found")
    }
    return { ...task }
  },

  create: async (taskData) => {
    await new Promise(resolve => setTimeout(resolve, 400))
    const newId = Math.max(...tasks.map(t => t.Id), 0) + 1
    const newTask = {
      Id: newId,
      ...taskData,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    tasks.push(newTask)
    return { ...newTask }
  },

  update: async (id, updateData) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const taskIndex = tasks.findIndex(t => t.Id === id)
    if (taskIndex === -1) {
      throw new Error("Task not found")
    }
    
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...updateData,
      Id: id,
      updatedAt: new Date()
    }
    
    return { ...tasks[taskIndex] }
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 250))
    const taskIndex = tasks.findIndex(t => t.Id === id)
    if (taskIndex === -1) {
      throw new Error("Task not found")
    }
    
    tasks.splice(taskIndex, 1)
    return true
  }
}

export default taskService