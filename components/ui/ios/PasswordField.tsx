"use client";

import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff, X } from "lucide-react";

interface PasswordFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> {
  label?: string;
  error?: string;
  hint?: string;
  onChange?: (value: string) => void;
}

/**
 * iOSスタイルのパスワード入力フィールド（表示トグル付き）
 */
export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField(
    {
      label,
      error,
      hint,
      onChange,
      value,
      disabled,
      className = "",
      ...props
    },
    ref
  ) {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
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
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            className={`
              w-full px-4 py-3 pr-20 rounded-lg
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

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {hasValue && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 rounded-full bg-white/20 active:bg-white/30"
              >
                <X size={14} className="text-white/60" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-2 active:opacity-70"
              disabled={disabled}
            >
              {showPassword ? (
                <EyeOff size={18} className="text-white/60" />
              ) : (
                <Eye size={18} className="text-white/60" />
              )}
            </button>
          </div>
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
