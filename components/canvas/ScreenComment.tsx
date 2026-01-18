"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { MessageSquare, X } from "lucide-react";
import { useDebouncedCallback } from "@/lib/canvas/hooks";

interface ScreenCommentProps {
  screenPath: string;
  initialValue: string;
  onUpdate: (screenPath: string, content: string) => void;
  zoom: number;
}

/**
 * スクリーン下のコメント入力欄
 *
 * - クリックで展開
 * - デバウンスで自動保存
 * - 空になると折りたたむ
 */
export const ScreenComment = memo(function ScreenComment({
  screenPath,
  initialValue,
  onUpdate,
  zoom,
}: ScreenCommentProps) {
  const [isExpanded, setIsExpanded] = useState(!!initialValue);
  const [value, setValue] = useState(initialValue);

  // 外部からの初期値変更に対応
  useEffect(() => {
    setValue(initialValue);
    if (initialValue) {
      setIsExpanded(true);
    }
  }, [initialValue]);

  // デバウンスで保存（500ms）
  const debouncedSave = useDebouncedCallback(
    useCallback(
      (content: string) => {
        onUpdate(screenPath, content);
      },
      [screenPath, onUpdate]
    ),
    500
  );

  // 入力ハンドラ
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSave(newValue);
  };

  // クリア
  const handleClear = () => {
    setValue("");
    onUpdate(screenPath, "");
    setIsExpanded(false);
  };

  // 折りたたみ状態
  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-white/40 hover:text-white/70
                   bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-xs"
        style={{ transform: `scale(${Math.max(zoom, 0.5)})`, transformOrigin: "top center" }}
      >
        <MessageSquare size={12} />
        <span>コメントを追加</span>
      </button>
    );
  }

  // 展開状態
  return (
    <div
      className="relative"
      style={{
        width: 375 * zoom,
        transform: `scale(${Math.max(zoom, 0.5)})`,
        transformOrigin: "top center",
      }}
    >
      <textarea
        value={value}
        onChange={handleChange}
        placeholder="コメントを入力..."
        className="w-full min-h-[60px] px-3 py-2 pr-8
                   bg-white/5 hover:bg-white/10 focus:bg-white/10
                   border border-white/10 focus:border-white/20
                   rounded-lg text-sm text-white/80 placeholder:text-white/30
                   resize-none outline-none transition-colors"
        style={{
          fontSize: 12 / Math.max(zoom, 0.5),
        }}
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute top-2 right-2 p-1 text-white/30 hover:text-white/60 transition-colors"
          title="コメントを削除"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
});
