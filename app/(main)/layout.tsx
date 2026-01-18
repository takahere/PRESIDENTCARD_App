"use client";

import { TabBar } from "@/components/ui/ios";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="h-full flex flex-col bg-luxbrown-90">
      {/* Main Content Area - scrollable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
        {children}
      </div>

      {/* Bottom Tab Bar - fixed at bottom of mock container */}
      <TabBar />
    </div>
  );
}
