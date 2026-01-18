"use client";

import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  pressable?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * iOS-style card with dark theme
 * Surface color is slightly lighter than the background for depth
 */
export function Card({
  children,
  pressable = false,
  header,
  footer,
  className,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-upsider-surface rounded-xl",
        "shadow-lg shadow-black/20",
        pressable && "cursor-pointer active:opacity-90",
        className
      )}
    >
      {header && (
        <div className="px-4 py-3 border-b border-white/10">{header}</div>
      )}
      <div className="p-4">{children}</div>
      {footer && (
        <div className="px-4 py-3 border-t border-white/10">{footer}</div>
      )}
    </div>
  );
}

export default Card;
