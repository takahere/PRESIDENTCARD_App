"use client";

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  /** 現在のステップ (1-indexed) */
  currentStep: number;
  /** 総ステップ数 */
  totalSteps: number;
  /** タイトルを表示するか */
  showTitle?: boolean;
  /** カスタムクラス名 */
  className?: string;
}

/**
 * オンボーディング用の進捗バーコンポーネント
 * Figmaデザインに基づいた3段階の進捗表示
 */
export function ProgressBar({
  currentStep,
  totalSteps,
  showTitle = true,
  className,
}: ProgressBarProps) {
  const remainingSteps = totalSteps - currentStep;

  return (
    <div className={cn("w-full", className)}>
      {/* タイトル */}
      {showTitle && (
        <p className="text-center text-sm text-white/60 mb-2">
          あと{remainingSteps}ステップで登録完了
        </p>
      )}

      {/* 進捗バー */}
      <div className="flex gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors duration-300",
              index < currentStep
                ? "bg-darkgreen-80" // 完了したステップ
                : "bg-white/20" // 未完了のステップ
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default ProgressBar;
