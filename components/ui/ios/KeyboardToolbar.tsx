"use client";

import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KeyboardToolbarProps {
  onDone?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  showNavigation?: boolean;
  doneLabel?: string;
  className?: string;
}

export function KeyboardToolbar({
  onDone,
  onPrevious,
  onNext,
  showNavigation = true,
  doneLabel = "完了",
  className,
}: KeyboardToolbarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between h-11 px-2 bg-[#D1D4D9] border-t border-gray-300",
        className
      )}
    >
      {/* Navigation Buttons */}
      {showNavigation ? (
        <div className="flex items-center gap-0">
          <button
            onClick={onPrevious}
            disabled={!onPrevious}
            className={cn(
              "w-11 h-11 flex items-center justify-center",
              onPrevious ? "text-blue-500 active:opacity-70" : "text-gray-400"
            )}
          >
            <ChevronUp size={24} />
          </button>
          <button
            onClick={onNext}
            disabled={!onNext}
            className={cn(
              "w-11 h-11 flex items-center justify-center",
              onNext ? "text-blue-500 active:opacity-70" : "text-gray-400"
            )}
          >
            <ChevronDown size={24} />
          </button>
        </div>
      ) : (
        <div />
      )}

      {/* Done Button */}
      <button
        onClick={onDone}
        className="px-3 py-1.5 text-[17px] font-semibold text-blue-500 font-sf-pro active:opacity-70"
      >
        {doneLabel}
      </button>
    </div>
  );
}
