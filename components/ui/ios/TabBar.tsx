"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { tabBarScreens, getActiveTabId } from "@/lib/screens";

export function TabBar() {
  const pathname = usePathname();
  const activeTab = getActiveTabId(pathname);

  return (
    <nav className="shrink-0">
      {/* Tab Bar Content */}
      <div className="bg-gray-90 border-t border-gray-70">
        <div className="flex items-center justify-around h-[60px] px-6">
          {tabBarScreens.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <Link
                key={tab.id}
                href={tab.path}
                className="flex-1 flex flex-col items-center justify-center h-full px-2.5"
              >
                <div className="flex flex-col items-center gap-1.5">
                  <Icon
                    size={24}
                    className={cn(
                      "transition-colors",
                      isActive ? "text-white" : "text-white/40"
                    )}
                  />
                  <span
                    className={cn(
                      "text-[10px] font-semibold transition-colors tracking-wide",
                      isActive ? "text-white" : "text-white/40"
                    )}
                  >
                    {tab.labelJa}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {/* Home Indicator Area - extends gray background to bottom */}
      <div className="bg-gray-90 h-[21px] safe-area-bottom">
        <div className="flex items-center justify-center pt-2">
          <div className="w-[139px] h-[5px] bg-white rounded-full" />
        </div>
      </div>
    </nav>
  );
}

export default TabBar;
