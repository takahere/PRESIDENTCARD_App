"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SnackbarProps {
  open: boolean;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose: () => void;
  duration?: number;
  className?: string;
}

/**
 * Material Design 3 Snackbar Component
 *
 * Brief message at bottom of screen
 * - Auto-dismisses after duration (default 4s)
 * - Optional action button
 * - Appears from bottom with animation
 */
export function Snackbar({
  open,
  message,
  action,
  onClose,
  duration = 4000,
  className,
}: SnackbarProps) {
  useEffect(() => {
    if (open && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [open, duration, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
          className={cn(
            "fixed bottom-20 left-4 right-4 z-50 mx-auto max-w-md",
            className
          )}
        >
          <div className="flex items-center gap-4 bg-[#323232] text-white px-4 py-3 rounded-lg shadow-lg">
            <p className="flex-1 text-sm">{message}</p>
            {action && (
              <button
                onClick={action.onClick}
                className="text-upsider-primary font-medium text-sm active:opacity-70"
              >
                {action.label}
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
