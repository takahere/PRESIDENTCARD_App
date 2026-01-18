"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "filled" | "outlined" | "text" | "elevated" | "tonal";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

/**
 * Material Design 3 Button Component
 *
 * Variants:
 * - filled: Primary action, high emphasis (default)
 * - outlined: Medium emphasis, secondary action
 * - text: Low emphasis, least prominent
 * - elevated: Elevated with shadow
 * - tonal: Filled tonal, medium emphasis
 */
export function Button({
  variant = "filled",
  size = "medium",
  fullWidth = false,
  startIcon,
  endIcon,
  children,
  className,
  disabled,
  type = "button",
  onClick,
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variantStyles = {
    filled: "bg-upsider-primary text-white active:bg-upsider-primary/90",
    outlined: "border-2 border-white/30 text-white bg-transparent active:bg-white/10",
    text: "text-upsider-primary bg-transparent active:bg-upsider-primary/10",
    elevated: "bg-upsider-surface text-white shadow-md active:shadow-lg",
    tonal: "bg-upsider-primary/20 text-upsider-primary active:bg-upsider-primary/30",
  };

  const sizeStyles = {
    small: "h-8 px-4 text-sm gap-2",
    medium: "h-10 px-6 text-base gap-2",
    large: "h-12 px-8 text-lg gap-3",
  };

  const disabledStyles = disabled
    ? "opacity-40 cursor-not-allowed"
    : "";

  return (
    <motion.button
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        disabledStyles,
        className
      )}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {startIcon && <span className="flex-shrink-0">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex-shrink-0">{endIcon}</span>}
    </motion.button>
  );
}
