"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

/**
 * iOSスタイルのチェックボックス
 */
export function Checkbox({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = "md",
}: CheckboxProps) {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-7 h-7",
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  return (
    <label
      className={`flex items-start gap-3 cursor-pointer select-none ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <motion.div
        className={`
          ${sizeClasses[size]} rounded-md flex items-center justify-center shrink-0 mt-0.5
          ${
            checked
              ? "bg-darkgreen-80 border-darkgreen-80"
              : "bg-transparent border-2 border-white/30"
          }
          transition-colors
        `}
        whileTap={disabled ? {} : { scale: 0.9 }}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
        }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            if (!disabled) {
              onChange(e.target.checked);
            }
          }}
          disabled={disabled}
          className="sr-only"
        />
        {checked && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Check
              size={iconSizes[size]}
              className="text-white"
              strokeWidth={3}
            />
          </motion.div>
        )}
      </motion.div>

      {(label || description) && (
        <div className="flex-1 min-w-0">
          {label && (
            <span className="text-body-medium text-white leading-tight">
              {label}
            </span>
          )}
          {description && (
            <p className="text-caption-medium text-white/50 mt-1">
              {description}
            </p>
          )}
        </div>
      )}
    </label>
  );
}
