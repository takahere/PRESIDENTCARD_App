"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface DialogAction {
  label: string;
  variant?: "default" | "destructive" | "cancel";
  onClick: () => void;
}

interface SystemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message?: string;
  actions: DialogAction[];
}

export function SystemDialog({
  open,
  onOpenChange,
  title,
  message,
  actions,
}: SystemDialogProps) {
  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        const cancelAction = actions.find((a) => a.variant === "cancel");
        if (cancelAction) {
          cancelAction.onClick();
        }
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange, actions]);

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

  const hasMultipleActions = actions.length > 2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Dialog */}
      <div className="relative w-[270px] bg-white/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl">
        {/* Content */}
        <div className="px-4 pt-5 pb-4 text-center">
          <h2 className="text-[17px] font-semibold text-gray-900 font-sf-pro">
            {title}
          </h2>
          {message && (
            <p className="mt-2 text-[13px] text-gray-600 font-sf-pro">
              {message}
            </p>
          )}
        </div>

        {/* Actions */}
        <div
          className={cn(
            "border-t border-gray-200",
            hasMultipleActions ? "flex flex-col" : "flex"
          )}
        >
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                action.onClick();
                onOpenChange(false);
              }}
              className={cn(
                "flex-1 py-3 text-[17px] font-sf-pro active:bg-gray-100 transition-colors",
                !hasMultipleActions &&
                  index > 0 &&
                  "border-l border-gray-200",
                hasMultipleActions && index > 0 && "border-t border-gray-200",
                action.variant === "destructive" && "text-red-500",
                action.variant === "cancel" && "font-semibold text-blue-500",
                action.variant === "default" && "text-blue-500"
              )}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
