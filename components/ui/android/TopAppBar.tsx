"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface TopAppBarProps {
  title: string;
  onBack?: () => void;
  actions?: React.ReactNode;
  variant?: "small" | "medium" | "large";
  className?: string;
}

/**
 * Material Design 3 Top App Bar Component
 *
 * Variants:
 * - small: Standard height, center aligned title
 * - medium: Larger title below the bar
 * - large: Even larger title, more padding
 */
export function TopAppBar({
  title,
  onBack,
  actions,
  variant = "small",
  className,
}: TopAppBarProps) {
  return (
    <header
      className={cn(
        "bg-upsider-bg",
        variant === "small" && "h-16",
        variant === "medium" && "pb-6",
        variant === "large" && "pb-8",
        className
      )}
    >
      {/* Main bar */}
      <div className="flex items-center h-16 px-1">
        {/* Navigation icon */}
        {onBack && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-12 h-12 flex items-center justify-center text-white/80 active:bg-white/10 rounded-full"
          >
            <ArrowBackIcon />
          </motion.button>
        )}

        {/* Title (only for small variant) */}
        {variant === "small" && (
          <h1 className="flex-1 text-xl font-medium text-white px-4 truncate">
            {title}
          </h1>
        )}

        {/* Spacer for other variants */}
        {variant !== "small" && <div className="flex-1" />}

        {/* Actions */}
        {actions && (
          <div className="flex items-center gap-1 px-1">
            {actions}
          </div>
        )}
      </div>

      {/* Large title for medium/large variants */}
      {variant !== "small" && (
        <div className="px-4">
          <h1
            className={cn(
              "font-medium text-white",
              variant === "medium" && "text-2xl",
              variant === "large" && "text-3xl"
            )}
          >
            {title}
          </h1>
        </div>
      )}
    </header>
  );
}
