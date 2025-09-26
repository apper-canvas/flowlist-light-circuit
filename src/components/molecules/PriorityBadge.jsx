import Badge from "@/components/atoms/Badge"

const PriorityBadge = ({ priority }) => {
  const priorityConfig = {
    high: { label: "High", variant: "high" },
    medium: { label: "Medium", variant: "medium" },
    low: { label: "Low", variant: "low" }
  }

  const config = priorityConfig[priority] || priorityConfig.low

  return (
    <Badge variant={config.variant} className="text-xs">
      {config.label}
    </Badge>
  )
}

export default PriorityBadge