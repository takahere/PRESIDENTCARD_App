"use client";

import { cn } from "@/lib/utils";
import { forwardRef, ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-darkgreen-80 text-white",
  secondary: "bg-luxbrown-70 text-white",
  danger: "bg-red-80 text-white",
  ghost: "bg-transparent text-white",
};

/**
 * iOS-style button
 * Minimum tap area: 44x44px for accessibility
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", fullWidth = false, loading = false, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          // Base styles
          "min-h-[44px] min-w-[44px] px-6 py-3",
          "rounded-xl font-medium",
          "transition-colors duration-150",
          "flex items-center justify-center gap-2",
          // Active state feedback
          "active:opacity-80",
          // Variant styles
          variantStyles[variant],
          // Full width option
          fullWidth && "w-full",
          // Disabled state
          (disabled || loading) && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {loading && <Loader2 size={18} className="animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
