"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface ListItemProps {
  leadingIcon?: React.ReactNode;
  headline: string;
  supportingText?: string;
  trailingText?: string;
  trailingSupportingText?: string;
  trailingIcon?: React.ReactNode;
  showChevron?: boolean;
  divider?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Material Design 3 List Item Component
 *
 * Structure:
 * [Leading Icon] [Headline + Supporting Text] [Trailing Content] [Chevron]
 */
export function ListItem({
  leadingIcon,
  headline,
  supportingText,
  trailingText,
  trailingSupportingText,
  trailingIcon,
  showChevron = false,
  divider = false,
  onClick,
  className,
}: ListItemProps) {
  const Component = onClick ? motion.button : "div";

  return (
    <Component
      whileTap={onClick ? { scale: 0.98, backgroundColor: "rgba(255,255,255,0.05)" } : {}}
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 px-4 py-3 min-h-[56px] w-full text-left",
        onClick && "cursor-pointer active:bg-white/5",
        divider && "border-b border-white/10",
        className
      )}
    >
      {/* Leading Icon */}
      {leadingIcon && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60">
          {leadingIcon}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-base text-white truncate">{headline}</p>
        {supportingText && (
          <p className="text-sm text-white/60 truncate">{supportingText}</p>
        )}
      </div>

      {/* Trailing Content */}
      {(trailingText || trailingIcon) && (
        <div className="flex-shrink-0 text-right">
          {trailingText && (
            <p className="text-base font-sf-pro tabular-nums text-white">
              {trailingText}
            </p>
          )}
          {trailingSupportingText && (
            <p className="text-sm text-white/60">{trailingSupportingText}</p>
          )}
          {trailingIcon && <div className="text-white/60">{trailingIcon}</div>}
        </div>
      )}

      {/* Chevron */}
      {showChevron && (
        <ChevronRightIcon className="flex-shrink-0 text-white/40" />
      )}
    </Component>
  );
}
