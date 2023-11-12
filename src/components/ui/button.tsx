import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "src/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-rhomdon tracking-widest transition duration-150 ease-linear select-none font-semibold ",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-br from-secondary-200 to-secondary-100 cursor-pointer hover:from-secondary-100 hover:to-secondary-200 active:scale-90",
        // destructive:
          // "bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
        outline:
          "cursor-pointer hover:border-secondary-200 hover:text-secondary-200 active:scale-90  border-2 md:border-[3px] border-secondary-100 text-secondary-100",
        // secondary:
          // "bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80",
        // ghost: "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        // link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",
        button: "px-3 py-2 lg:px-6 2xl:px-10 lg:py-3 2xl:py-5 text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-2xl rounded-full font-semibold bg-gradient-to-br from-secondary-200 to-secondary-100 cursor-pointer align-middle hover:from-secondary-100 hover:to-secondary-200 active:scale-90 transition duration-150 ease-linear select-none"
      },
      size: {
        default: "px-3 py-2 lg:px-6 2xl:px-10 lg:py-3 2xl:py-5 text-sm sm:text-sm md:text-base lg:text-lg 2xl:text-2xl",
        sm: "px-3 py-1 lg:px-4 2xl:px-6 lg:py-2 2xl:py-3 text-sm sm:text-sm md:text-sm lg:text-base 2xl:text-lg",
        // lg: "h-11 rounded-md px-8",
        // icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
