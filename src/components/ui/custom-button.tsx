import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ComponentProps } from "react"

interface CustomButtonProps extends ComponentProps<typeof Button> {
  children: React.ReactNode
}

export function CustomButton({ children, className, ...props }: CustomButtonProps) {
  return (
    <Button
      className={cn(
        "relative overflow-hidden group bg-primary text-background hover:bg-primary/90 transition-all duration-300",
        "before:absolute before:inset-0 before:bg-background/10 before:translate-x-[-100%] before:transition-transform",
        "hover:before:translate-x-0 before:duration-300",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </Button>
  )
}

