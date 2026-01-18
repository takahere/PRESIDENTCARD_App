"use client";

import { useEffect, ReactNode } from "react";
import { X } from "lucide-react";

interface ShareItem {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

interface ShareSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  items: ShareItem[];
}

export function ShareSheet({
  open,
  onOpenChange,
  title = "共有",
  items,
}: ShareSheetProps) {
  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const handleBackdropClick = () => {
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={handleBackdropClick}
      />

      {/* Sheet */}
      <div className="relative w-full max-w-[500px] bg-white/95 backdrop-blur-xl rounded-t-2xl overflow-hidden safe-area-bottom">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <span className="text-[17px] font-semibold text-gray-900 font-sf-pro">
            {title}
          </span>
          <button
            onClick={() => onOpenChange(false)}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full active:bg-gray-200"
          >
            <X size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Share Grid */}
        <div className="p-4">
          <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  onOpenChange(false);
                }}
                className="flex flex-col items-center gap-2 min-w-[72px] active:opacity-70"
              >
                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-[11px] text-gray-600 font-sf-pro text-center">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Rows */}
        <div className="border-t border-gray-200">
          <button className="w-full px-4 py-3 flex items-center gap-3 active:bg-gray-50">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="text-[17px] text-gray-900 font-sf-pro">
              コピー
            </span>
          </button>
          <button className="w-full px-4 py-3 flex items-center gap-3 border-t border-gray-200 active:bg-gray-50">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>
            <span className="text-[17px] text-gray-900 font-sf-pro">
              ブックマークに追加
            </span>
          </button>
        </div>

        {/* Bottom padding for safe area */}
        <div className="h-6" />
      </div>
    </div>
  );
}
