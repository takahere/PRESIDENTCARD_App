"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/ios";

export default function OnboardingStartPage() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/onboarding/terms");
  };

  const handleLogin = () => {
    // TODO: ログイン画面への遷移
    router.push("/");
  };

  return (
    <div className="min-h-full flex flex-col">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-12"
      >
        {/* Title */}
        <h1 className="text-2xl font-bold text-white tracking-wider mb-1">
          PRESIDENT CARD
        </h1>
        <p className="text-white/60 text-sm mb-12">
          経営者を豊かにするカード
        </p>

        {/* Card Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative w-[280px] h-[175px] mx-auto mb-12"
        >
          {/* Card Shadow */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-100 rounded-2xl transform translate-y-2 blur-md opacity-30" />

          {/* Card */}
          <div className="relative w-full h-full bg-gradient-to-br from-gray-200 via-white to-gray-100 rounded-2xl shadow-lg overflow-hidden">
            {/* Card Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              {/* Top: PRESIDENT Logo */}
              <div className="flex items-start">
                <span className="text-gray-600 font-semibold text-sm tracking-widest">
                  PRESIDENT
                </span>
              </div>

              {/* Bottom: VISA Logo */}
              <div className="flex justify-end items-end">
                <span className="text-gray-600 font-bold text-lg italic tracking-wide">
                  VISA
                </span>
              </div>
            </div>

            {/* Subtle shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-50" />
          </div>
        </motion.div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-4 pb-8 space-y-4"
      >
        <Button variant="primary" fullWidth onClick={handleStart}>
          新規アカウント開設
        </Button>

        <button
          onClick={handleLogin}
          className="w-full py-3 text-center text-white/60 text-sm active:opacity-70"
        >
          ログインはこちら
        </button>
      </motion.div>
    </div>
  );
}
