"use client";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { cn } from "@/lib/utils";

interface ListCellProps {
  icon?: React.ElementType;
  iconColor?: string;
  title: string;
  subtitle?: React.ReactNode;
  rightText?: string;
  rightSubtext?: string;
  showChevron?: boolean;
  showSeparator?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * iOS-style list cell with icon, text, and optional chevron
 * Minimum tap area: 44px height for accessibility
 * Supports Material Icons and any React component as icon
 */
export function ListCell({
  icon: Icon,
  iconColor = "text-upsider-primary",
  title,
  subtitle,
  rightText,
  rightSubtext,
  showChevron = true,
  showSeparator = true,
  onClick,
  className,
}: ListCellProps) {
  const isClickable = !!onClick;

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center min-h-[56px] px-4 py-3",
        isClickable && "cursor-pointer active:bg-white/5",
        showSeparator && "border-b border-white/10",
        className
      )}
    >
      {/* Left icon */}
      {Icon && (
        <div className={cn("w-8 h-8 flex items-center justify-center mr-3", iconColor)}>
          <Icon className="w-5 h-5" />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="text-white font-medium truncate">{title}</div>
        {subtitle && (
          <div className="text-sm text-white/60 truncate">{subtitle}</div>
        )}
      </div>

      {/* Right content */}
      {(rightText || rightSubtext) && (
        <div className="text-right ml-3">
          {rightText && (
            <div className="text-white font-medium font-sf-pro tabular-nums">{rightText}</div>
          )}
          {rightSubtext && (
            <div className="text-sm text-white/60">{rightSubtext}</div>
          )}
        </div>
      )}

      {/* Chevron */}
      {showChevron && isClickable && (
        <ChevronRightIcon className="w-5 h-5 text-white/40 ml-2 flex-shrink-0" />
      )}
    </div>
  );
}

export default ListCell;
