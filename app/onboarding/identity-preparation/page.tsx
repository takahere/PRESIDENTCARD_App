"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, Check, AlertTriangle, ExternalLink } from "lucide-react";
import { Button, ProgressBar } from "@/components/ui/ios";
import { useOnboarding } from "@/lib/onboarding";

// 準備物リスト
const PREPARATION_ITEMS = [
  {
    icon: "nfc",
    title: "タッチ決済や、Suicaなどの非接触決済ができる端末",
    subtitle: null,
  },
  {
    icon: "card",
    title: "マイナンバーカード",
    subtitle: "※マイナンバー通知カードは使用できません。",
  },
  {
    icon: "key",
    title: "署名用電子証明書パスワード",
    subtitle: "マイナンバーカード登録時に申請した半角英数6〜16文字",
  },
];

export default function IdentityPreparationPage() {
  const router = useRouter();
  const { completeCurrentStep } = useOnboarding();

  const handleNext = () => {
    completeCurrentStep();
    router.push("/onboarding/ekyc");
  };

  const handleBack = () => {
    router.push("/onboarding/representative");
  };

  return (
    <div className="min-h-full flex flex-col">
      {/* Header with Progress Bar */}
      <div className="px-4 pt-4">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-2">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleBack}
            className="flex items-center gap-1 text-white/60 min-h-[44px]"
          >
            <ChevronLeft size={20} />
          </motion.button>

          <div className="w-[44px]" /> {/* Spacer for alignment */}
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={3} totalSteps={3} showTitle={false} className="mb-6" />
      </div>

      {/* Content */}
      <div className="flex-1 px-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* タイトル */}
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              続いて、マイナンバーカードをご用意ください
            </h1>
            <p className="text-white/60 text-sm">
              マイナンバーカードのICチップを読み取り、署名用電子証明書の情報を利用して本人確認を行います。
            </p>
          </div>

          {/* 準備物リスト */}
          <div className="space-y-3">
            {PREPARATION_ITEMS.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="bg-luxbrown-80 rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  {/* チェックマークアイコン */}
                  <div className="w-8 h-8 rounded-full bg-darkgreen-80 flex items-center justify-center shrink-0">
                    <Check size={18} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">
                      {item.title}
                    </p>
                    {item.subtitle && (
                      <p className="text-white/50 text-xs mt-1">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* パスワード警告ボックス */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-orange-70/10 border border-orange-70/30 rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} className="text-orange-70 shrink-0 mt-0.5" />
              <div>
                <p className="text-orange-70 text-sm font-medium mb-1">
                  パスワードを3回連続で間違えると、ロックされます
                </p>
                <p className="text-white/60 text-xs">
                  パスワードを忘れた場合は、市区町村の窓口で再発行手続きが必要です。
                </p>
              </div>
            </div>
          </motion.div>

          {/* 説明文 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-luxbrown-80/50 rounded-xl p-4"
          >
            <p className="text-white/60 text-xs leading-relaxed">
              本人確認では、マイナンバーカードのICチップに記録された以下の情報を取得・照合します。
            </p>
            <ul className="text-white/60 text-xs mt-2 space-y-1 ml-3">
              <li>• 氏名</li>
              <li>• 生年月日</li>
              <li>• 住所</li>
              <li>• 顔写真</li>
            </ul>
            <p className="text-white/60 text-xs mt-3">
              ※マイナンバー（個人番号）は取得しません。
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="px-4 pb-4 pt-4">
        <Button
          variant="primary"
          fullWidth
          onClick={handleNext}
        >
          同意して本人確認を始める
        </Button>

        {/* お困りの場合はこちら */}
        <div className="mt-4 flex justify-center items-center gap-1">
          <span className="text-white/40 text-sm">お困りの場合はこちら</span>
          <ExternalLink size={14} className="text-white/40" />
        </div>
      </div>
    </div>
  );
}
