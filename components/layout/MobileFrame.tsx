"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { DesignSystemSidebar } from "@/components/design-system";
import { StatusBar } from "@/components/ui/ios";
import { StatusBarProvider, useStatusBar } from "./StatusBarContext";

interface MobileFrameProps {
  children: React.ReactNode;
}

// Context for portal container - allows BottomSheet/Dialog to render inside the frame
const PortalContainerContext = createContext<HTMLElement | null>(null);

export function usePortalContainer() {
  return useContext(PortalContainerContext);
}

// StatusBar wrapper that uses context
function StatusBarWithContext() {
  const { variant } = useStatusBar();
  return <StatusBar variant={variant} className="absolute top-0 left-0 right-0 z-40" />;
}

/**
 * MobileFrame - Device frame wrapper for desktop viewing
 *
 * On desktop (>=1024px): Shows iPhone bezel + Design System Sidebar
 * On tablet (768-1023px): Shows iPhone bezel only
 * On mobile (<768px): Full screen display (no bezel)
 *
 * CRITICAL: All UI (Dialog, BottomSheet, Toast) must render INSIDE the frame
 */
export function MobileFrame({ children }: MobileFrameProps) {
  const [viewMode, setViewMode] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkViewMode = () => {
      const width = window.innerWidth;
      const isTouch = "ontouchstart" in window;

      if (width < 768 || isTouch) {
        setViewMode("mobile");
      } else if (width < 1024) {
        setViewMode("tablet");
      } else {
        setViewMode("desktop");
      }
    };

    checkViewMode();
    window.addEventListener("resize", checkViewMode);
    return () => window.removeEventListener("resize", checkViewMode);
  }, []);

  // On mobile devices, render children directly (full screen)
  if (viewMode === "mobile") {
    return (
      <StatusBarProvider>
        <PortalContainerContext.Provider value={null}>
          <div className="min-h-screen bg-upsider-bg relative">
            <StatusBarWithContext />
            <div className="pt-[54px]">
              {children}
            </div>
          </div>
        </PortalContainerContext.Provider>
      </StatusBarProvider>
    );
  }

  // On tablet/desktop, show iPhone frame (with sidebar on desktop)
  return (
    <StatusBarProvider>
      <div className="min-h-screen bg-[#F5F5F5] flex">
        {/* Main content area - centered iPhone frame */}
        <div className="flex-1 flex items-center justify-center p-8">
          {/* iPhone frame */}
          <div className="relative">
            {/* Device bezel */}
            <div
              className={cn(
                "relative bg-black rounded-[50px] p-3",
                "shadow-2xl shadow-black/50",
                "ring-1 ring-white/10"
              )}
            >
              {/* Screen area - THIS IS THE CONTAINMENT BOUNDARY */}
              <div
                ref={containerRef}
                data-mobile-frame
                className={cn(
                  "relative rounded-[38px]",
                  "bg-upsider-bg",
                  "w-[375px] h-[812px]",
                  // CRITICAL: overflow-hidden ensures all UI stays inside
                  "overflow-hidden"
                )}
                style={{
                  // Ensure this is the stacking context for all positioned children
                  isolation: "isolate",
                }}
              >
                {/* Status Bar - positioned at the very top */}
                <StatusBarWithContext />

                {/* Dynamic Island / Notch simulation */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50">
                  <div className="w-[126px] h-[35px] bg-black rounded-b-[20px] flex items-center justify-center">
                    {/* Camera */}
                    <div className="w-3 h-3 rounded-full bg-[#1a1a1a] ring-1 ring-white/10" />
                  </div>
                </div>

                {/* Content area - TabBar handles bottom safe area */}
                <PortalContainerContext.Provider value={containerRef.current}>
                  <div
                    className="h-full pt-[54px] overflow-hidden"
                    style={{
                      // Smooth scrolling for iOS-like feel
                      WebkitOverflowScrolling: "touch",
                    }}
                  >
                    {children}
                  </div>
                </PortalContainerContext.Provider>
              </div>
            </div>

            {/* Side buttons (decorative) */}
            <div className="absolute right-[-3px] top-[150px] w-[3px] h-[80px] bg-[#2a2a2a] rounded-l" />
            <div className="absolute left-[-3px] top-[120px] w-[3px] h-[30px] bg-[#2a2a2a] rounded-r" />
            <div className="absolute left-[-3px] top-[180px] w-[3px] h-[60px] bg-[#2a2a2a] rounded-r" />
            <div className="absolute left-[-3px] top-[260px] w-[3px] h-[60px] bg-[#2a2a2a] rounded-r" />
          </div>
        </div>

        {/* Design System Sidebar - only on desktop */}
        {viewMode === "desktop" && <DesignSystemSidebar />}
      </div>
    </StatusBarProvider>
  );
}

export default MobileFrame;
