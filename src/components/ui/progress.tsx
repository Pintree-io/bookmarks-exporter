import { cn } from "@/lib/utils"
import * as React from "react"

interface ProgressProps extends React.ComponentPropsWithoutRef<"div"> {
  value: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary-100",
        className
      )}
      {...props}>
      <div
        className="h-full w-full flex-1 rounded-full bg-primary transition-all duration-200 ease-in-out"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  )
)
Progress.displayName = "Progress"

export { Progress }
