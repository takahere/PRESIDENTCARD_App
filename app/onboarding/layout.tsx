"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { OnboardingProvider, ONBOARDING_STEPS, STEP_LABELS } from "@/lib/onboarding";

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

// パスからステップインデックスを取得
function getStepIndexFromPath(pathname: string): number {
  const pathMap: Record<string, number> = {
    "/onboarding": -1, // トップ画面
    "/onboarding/terms": 0,
    "/onboarding/email-verification": 1,
    "/onboarding/identity-preparation": 2,
    "/onboarding/ekyc": 3,
    "/onboarding/company": 4,
    "/onboarding/review": 5,
    "/onboarding/complete": 6,
  };
  return pathMap[pathname] ?? -1;
}

function OnboardingLayoutInner({ children }: OnboardingLayoutProps) {
  const pathname = usePathname();
  const currentStepIndex = getStepIndexFromPath(pathname);
  const totalSteps = ONBOARDING_STEPS.length;

  // トップ画面または完了画面ではプログレスを非表示
  const showProgress = currentStepIndex >= 0 && currentStepIndex < totalSteps - 1;

  return (
    <div className="min-h-full flex flex-col bg-luxbrown-90">
      {/* Progress Indicator */}
      {showProgress && (
        <div className="sticky top-0 z-10 bg-luxbrown-90/95 backdrop-blur-xl border-b border-white/10 safe-area-top">
          <div className="px-4 py-3">
            {/* Step Dots */}
            <div className="flex items-center justify-center gap-2 mb-2">
              {ONBOARDING_STEPS.slice(0, -1).map((step, index) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index <= currentStepIndex
                      ? "bg-darkgreen-80"
                      : "bg-white/20"
                  }`}
                />
              ))}
            </div>

            {/* Current Step Label */}
            <p className="text-center text-white/60 text-xs">
              {STEP_LABELS[ONBOARDING_STEPS[currentStepIndex]]}
              {` (${currentStepIndex + 1}/${totalSteps - 1})`}
            </p>
          </div>
        </div>
      )}

      {/* Content */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="flex-1 overflow-y-auto"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <OnboardingProvider>
      <OnboardingLayoutInner>{children}</OnboardingLayoutInner>
    </OnboardingProvider>
  );
}
