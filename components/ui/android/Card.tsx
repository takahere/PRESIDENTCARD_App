"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  variant?: "elevated" | "filled" | "outlined";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Material Design 3 Card Component
 *
 * Variants:
 * - elevated: Default, with shadow (default)
 * - filled: Filled background, no shadow
 * - outlined: Border, no shadow
 */
export function Card({
  variant = "elevated",
  children,
  className,
  onClick,
}: CardProps) {
  const baseStyles = "rounded-xl overflow-hidden";

  const variantStyles = {
    elevated: "bg-upsider-surface shadow-md",
    filled: "bg-upsider-surface-light",
    outlined: "bg-transparent border border-white/20",
  };

  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={cn(
        baseStyles,
        variantStyles[variant],
        onClick && "cursor-pointer w-full text-left",
        className
      )}
    >
      {children}
    </Component>
  );
}
