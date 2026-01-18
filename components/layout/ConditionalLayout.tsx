"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { MobileFrame } from "./MobileFrame";
import { StatusBar } from "@/components/ui/ios";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

/**
 * ConditionalLayout - Route-based layout wrapper
 *
 * - /design-system/* routes: Full screen display (no MobileFrame)
 * - ?canvas=true parameter: Full screen display (for Canvas preview)
 * - All other routes: Wrapped in MobileFrame
 */
function ConditionalLayoutInner({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isCanvasMode = searchParams.get("canvas") === "true";

  // Design System routes are displayed full screen
  if (pathname.startsWith("/design-system")) {
    return <>{children}</>;
  }

  // Canvas mode: wrap with fixed height and StatusBar
  if (isCanvasMode) {
    return (
      <div className="h-screen flex flex-col bg-luxbrown-90">
        {/* StatusBar */}
        <StatusBar variant="light" className="shrink-0 px-4" />
        {/* Content area */}
        <div className="flex-1 min-h-0 overflow-hidden">
          {children}
        </div>
      </div>
    );
  }

  // All other routes are wrapped in MobileFrame
  return <MobileFrame>{children}</MobileFrame>;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  return (
    <Suspense fallback={<MobileFrame>{children}</MobileFrame>}>
      <ConditionalLayoutInner>{children}</ConditionalLayoutInner>
    </Suspense>
  );
}

export default ConditionalLayout;
