"use client";

import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { X } from "lucide-react";

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  error?: string;
  hint?: string;
  showClearButton?: boolean;
  onChange?: (value: string) => void;
}

/**
 * iOSスタイルのテキスト入力フィールド
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      label,
      error,
      hint,
      showClearButton = true,
      onChange,
      value,
      disabled,
      className = "",
      ...props
    },
    ref
  ) {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value !== undefined && value !== "";

    const handleClear = () => {
      onChange?.("");
    };

    return (
      <div className={`space-y-2 ${className}`}>
        {label && (
          <label className="block text-caption-medium text-white/60 font-medium">
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            className={`
              w-full px-4 py-3 rounded-lg
              bg-white/5 text-white placeholder:text-white/30
              border-2 transition-colors
              ${
                error
                  ? "border-red-80"
                  : isFocused
                  ? "border-white/40"
                  : "border-white/10"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              text-body-medium
              focus:outline-none
            `}
            {...props}
          />

          {showClearButton && hasValue && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/20 active:bg-white/30"
            >
              <X size={14} className="text-white/60" />
            </button>
          )}
        </div>

        {error && (
          <p className="text-caption-medium text-red-80">{error}</p>
        )}

        {hint && !error && (
          <p className="text-caption-medium text-white/40">{hint}</p>
        )}
      </div>
    );
  }
);
