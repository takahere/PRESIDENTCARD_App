"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  href: string;
  badge?: number;
}

interface NavigationBarProps {
  items: NavigationItem[];
  className?: string;
}

/**
 * Material Design 3 Navigation Bar Component
 *
 * Bottom navigation for Android apps
 * - 3-5 destinations recommended
 * - Shows active indicator pill
 * - Supports badges
 */
export function NavigationBar({ items, className }: NavigationBarProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "bg-upsider-surface border-t border-white/10 safe-area-bottom",
        className
      )}
    >
      <div className="flex items-center h-20">
        {items.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              className="flex-1 flex flex-col items-center justify-center h-full relative"
            >
              {/* Active indicator pill */}
              <div className="relative">
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 -mx-4 -my-1 bg-upsider-primary/20 rounded-full"
                    style={{ width: "64px", height: "32px", left: "-16px", top: "-4px" }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}

                {/* Icon */}
                <div
                  className={cn(
                    "relative z-10 transition-colors",
                    isActive ? "text-upsider-primary" : "text-white/60"
                  )}
                >
                  {isActive && item.activeIcon ? item.activeIcon : item.icon}
                </div>

                {/* Badge */}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-[16px] h-4 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center px-1">
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  "text-xs mt-1 transition-colors",
                  isActive ? "text-upsider-primary font-medium" : "text-white/60"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
