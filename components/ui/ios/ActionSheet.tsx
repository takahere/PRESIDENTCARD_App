"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface ActionSheetAction {
  label: string;
  variant?: "default" | "destructive";
  onClick: () => void;
}

interface ActionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message?: string;
  actions: ActionSheetAction[];
  cancelLabel?: string;
}

export function ActionSheet({
  open,
  onOpenChange,
  title,
  message,
  actions,
  cancelLabel = "キャンセル",
}: ActionSheetProps) {
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

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={handleBackdropClick}
      />

      {/* Sheet Container */}
      <div className="relative w-full max-w-[400px] px-2 pb-2 safe-area-bottom">
        {/* Actions Group */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl overflow-hidden mb-2">
          {/* Header */}
          {(title || message) && (
            <div className="px-4 py-3 text-center border-b border-gray-200">
              {title && (
                <p className="text-[13px] font-semibold text-gray-500 font-sf-pro">
                  {title}
                </p>
              )}
              {message && (
                <p className="text-[13px] text-gray-500 font-sf-pro mt-1">
                  {message}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                action.onClick();
                onOpenChange(false);
              }}
              className={cn(
                "w-full py-4 text-[20px] font-sf-pro active:bg-gray-100 transition-colors",
                index > 0 && "border-t border-gray-200",
                action.variant === "destructive"
                  ? "text-red-500"
                  : "text-blue-500"
              )}
            >
              {action.label}
            </button>
          ))}
        </div>

        {/* Cancel Button */}
        <button
          onClick={handleCancel}
          className="w-full py-4 text-[20px] font-semibold text-blue-500 font-sf-pro bg-white rounded-2xl active:bg-gray-100 transition-colors"
        >
          {cancelLabel}
        </button>
      </div>
    </div>
  );
}
