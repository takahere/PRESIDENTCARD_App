"use client";

import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { cn } from "@/lib/utils";

interface BottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title?: string;
  snapPoints?: (string | number)[];
  /** Container element for the portal - if not provided, uses document.body */
  container?: HTMLElement | null;
}

/**
 * iOS-style bottom sheet using Vaul
 * Slides up from bottom with handle bar
 *
 * IMPORTANT: Use the `container` prop to render inside a specific element
 * (e.g., the iPhone frame) instead of document.body
 */
export function BottomSheet({
  open,
  onOpenChange,
  children,
  title,
  snapPoints,
  container,
}: BottomSheetProps) {
  // Find the closest container for the portal
  // This ensures the BottomSheet renders inside the iPhone frame on desktop
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (container) {
      setPortalContainer(container);
    } else {
      // Try to find the mobile frame container
      const frameContainer = document.querySelector('[data-mobile-frame]') as HTMLElement;
      setPortalContainer(frameContainer || null);
    }
  }, [container]);

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} snapPoints={snapPoints}>
      <Drawer.Portal container={portalContainer}>
        <Drawer.Overlay
          className={cn(
            "bg-black/60 z-40",
            // Position relative to container, not viewport
            portalContainer ? "absolute inset-0" : "fixed inset-0"
          )}
        />
        <Drawer.Content
          className={cn(
            "z-50",
            "bg-upsider-surface rounded-t-2xl",
            "flex flex-col max-h-[96vh]",
            "focus:outline-none",
            // Position relative to container, not viewport
            portalContainer
              ? "absolute bottom-0 left-0 right-0"
              : "fixed bottom-0 left-0 right-0"
          )}
        >
          {/* Handle bar */}
          <div className="flex justify-center pt-4 pb-2">
            <div className="w-10 h-1 rounded-full bg-white/30" />
          </div>

          {/* Title */}
          {title && (
            <Drawer.Title className="px-4 pb-4 text-lg font-semibold text-white text-center">
              {title}
            </Drawer.Title>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 pb-8 safe-area-bottom">
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

/**
 * Trigger component to open the bottom sheet
 */
export function BottomSheetTrigger({ children }: { children: React.ReactNode }) {
  return <Drawer.Trigger asChild>{children}</Drawer.Trigger>;
}

export default BottomSheet;
