"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FABProps {
  icon: React.ReactNode;
  label?: string;
  variant?: "surface" | "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  className?: string;
}

/**
 * Material Design 3 Floating Action Button (FAB)
 *
 * Variants:
 * - surface: Default surface color
 * - primary: Primary color (default)
 * - secondary: Secondary color
 * - tertiary: Tertiary color
 *
 * Sizes:
 * - small: 40x40px
 * - medium: 56x56px (default)
 * - large: 96x96px
 */
export function FAB({
  icon,
  label,
  variant = "primary",
  size = "medium",
  onClick,
  className,
}: FABProps) {
  const variantStyles = {
    surface: "bg-upsider-surface text-upsider-primary shadow-lg",
    primary: "bg-upsider-primary text-white shadow-lg",
    secondary: "bg-upsider-surface-light text-white shadow-lg",
    tertiary: "bg-upsider-primary/20 text-upsider-primary shadow-md",
  };

  const sizeStyles = {
    small: "w-10 h-10 rounded-xl",
    medium: "w-14 h-14 rounded-2xl",
    large: "w-24 h-24 rounded-[28px]",
  };

  const iconSizeStyles = {
    small: "[&>svg]:w-5 [&>svg]:h-5",
    medium: "[&>svg]:w-6 [&>svg]:h-6",
    large: "[&>svg]:w-9 [&>svg]:h-9",
  };

  // Extended FAB (with label)
  if (label) {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={cn(
          "inline-flex items-center gap-3 px-4 h-14 rounded-2xl shadow-lg",
          variantStyles[variant],
          className
        )}
      >
        <span className={iconSizeStyles[size]}>{icon}</span>
        <span className="font-medium">{label}</span>
      </motion.button>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={cn(
        "flex items-center justify-center",
        variantStyles[variant],
        sizeStyles[size],
        iconSizeStyles[size],
        className
      )}
    >
      {icon}
    </motion.button>
  );
}
