import Button from "@/components/atoms/Button"
import { cn } from "@/utils/cn"

const FilterBar = ({ filters, activeFilter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={activeFilter === filter.value ? "primary" : "ghost"}
          size="sm"
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            "filter-button transition-all duration-200",
            activeFilter === filter.value && "active"
          )}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  )
}

export default FilterBar