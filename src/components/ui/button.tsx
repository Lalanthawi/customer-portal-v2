import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/src/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA7921]/20 disabled:pointer-events-none disabled:opacity-50 transform active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-[#FA7921] text-white hover:bg-[#FA7921]/90 shadow-sm hover:shadow-md",
        primary: "bg-[#FA7921] text-white hover:bg-[#FA7921]/90 shadow-sm hover:shadow-md",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200",
        outline: "border-2 border-gray-200 bg-white hover:border-[#FA7921] hover:text-[#FA7921] hover:bg-[#FA7921]/5",
        ghost: "hover:bg-gray-100 text-gray-700 hover:text-gray-900",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm hover:shadow-md",
        success: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm hover:shadow-md",
        link: "text-[#FA7921] underline-offset-4 hover:underline p-0 h-auto",
        glass: "bg-white/80 backdrop-blur-sm border border-white/20 hover:bg-white/90 text-gray-900",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 py-2",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      rounded: {
        default: "rounded-xl",
        sm: "rounded-lg",
        md: "rounded-xl",
        lg: "rounded-2xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
      rounded: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, rounded, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, rounded, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }