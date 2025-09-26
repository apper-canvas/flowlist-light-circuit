import { useState } from "react"
import ApperIcon from "@/components/ApperIcon"
import Input from "@/components/atoms/Input"

const SearchBar = ({ onSearch, placeholder = "Search tasks..." }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (value) => {
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <div className="relative">
      <ApperIcon 
        name="Search" 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" 
      />
      <Input
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className="search-input pl-12 bg-surface shadow-sm border-gray-200 focus:shadow-md"
      />
    </div>
  )
}

export default SearchBar