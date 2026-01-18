"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

interface VerificationCodeInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

/**
 * 認証コード入力（6桁の個別ボックス）
 */
export function VerificationCodeInput({
  length = 6,
  value,
  onChange,
  error,
  disabled = false,
  autoFocus = false,
}: VerificationCodeInputProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(
    autoFocus ? 0 : null
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 入力値を配列として保持
  const digits = value.split("").concat(Array(length).fill("")).slice(0, length);

  // 入力処理
  const handleChange = useCallback(
    (index: number, inputValue: string) => {
      if (disabled) return;

      // 数字のみ許可
      const numericValue = inputValue.replace(/\D/g, "");

      if (numericValue.length === 0) {
        // 削除
        const newDigits = [...digits];
        newDigits[index] = "";
        onChange(newDigits.join(""));
        return;
      }

      if (numericValue.length === 1) {
        // 1文字入力
        const newDigits = [...digits];
        newDigits[index] = numericValue;
        onChange(newDigits.join(""));

        // 次のボックスへフォーカス
        if (index < length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
      } else if (numericValue.length === length) {
        // ペースト（6桁まとめて）
        onChange(numericValue);
        inputRefs.current[length - 1]?.focus();
      }
    },
    [digits, length, onChange, disabled]
  );

  // キーダウン処理
  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      if (e.key === "Backspace" && digits[index] === "" && index > 0) {
        // 空のボックスでBackspace → 前のボックスへ
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowRight" && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [digits, length, disabled]
  );

  // ペースト処理
  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (disabled) return;

      const pastedData = e.clipboardData.getData("text");
      const numericData = pastedData.replace(/\D/g, "").slice(0, length);

      if (numericData.length > 0) {
        onChange(numericData.padEnd(length, "").slice(0, length).replace(/ /g, ""));

        // 最後に入力された位置にフォーカス
        const lastFilledIndex = Math.min(numericData.length, length) - 1;
        inputRefs.current[lastFilledIndex]?.focus();
      }
    },
    [length, onChange, disabled]
  );

  // autoFocus対応
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  return (
    <div className="space-y-3">
      <div className="flex justify-center gap-2">
        {Array.from({ length }).map((_, index) => (
          <motion.div
            key={index}
            className={`
              w-12 h-14 rounded-lg overflow-hidden
              ${
                error
                  ? "border-2 border-red-80"
                  : focusedIndex === index
                  ? "border-2 border-white/60"
                  : "border-2 border-white/20"
              }
              ${disabled ? "opacity-50" : ""}
              transition-colors
            `}
            whileTap={disabled ? {} : { scale: 0.95 }}
          >
            <input
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={length}
              value={digits[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              disabled={disabled}
              className={`
                w-full h-full text-center text-2xl font-semibold
                bg-white/5 text-white
                focus:outline-none focus:bg-white/10
                ${disabled ? "cursor-not-allowed" : ""}
              `}
              autoComplete="one-time-code"
            />
          </motion.div>
        ))}
      </div>

      {error && (
        <p className="text-center text-caption-medium text-red-80">{error}</p>
      )}
    </div>
  );
}
