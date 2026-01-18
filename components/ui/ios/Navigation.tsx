"use client";

import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  title: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  transparent?: boolean;
  className?: string;
}

/**
 * iOS-style navigation header
 * Includes safe area padding for notch
 */
export function Navigation({
  title,
  onBack,
  rightAction,
  transparent = false,
  className,
}: NavigationProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 safe-area-top",
        !transparent && "bg-upsider-bg/95 backdrop-blur-lg border-b border-white/10",
        className
      )}
    >
      <div className="flex items-center h-14 px-4">
        {/* Back button */}
        <div className="w-12">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center text-upsider-primary -ml-2 p-2 min-w-[44px] min-h-[44px] active:opacity-70"
            >
              <ChevronLeft size={28} />
            </button>
          )}
        </div>

        {/* Title */}
        <h1 className="flex-1 text-center text-lg font-semibold text-white truncate">
          {title}
        </h1>

        {/* Right action */}
        <div className="w-12 flex justify-end">
          {rightAction}
        </div>
      </div>
    </header>
  );
}

export default Navigation;
