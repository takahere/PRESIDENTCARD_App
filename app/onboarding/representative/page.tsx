"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronDown, ExternalLink } from "lucide-react";
import { Button, TextField, ProgressBar, BottomSheet } from "@/components/ui/ios";
import { useOnboarding } from "@/lib/onboarding";

// 利用金額の選択肢
const CREDIT_LIMIT_OPTIONS = [
  { value: "500", label: "〜500万円" },
  { value: "1000", label: "〜1,000万円" },
  { value: "3000", label: "〜3,000万円" },
  { value: "5000", label: "〜5,000万円" },
  { value: "10000", label: "〜1億円" },
  { value: "over", label: "1億円以上" },
];

export default function RepresentativePage() {
  const router = useRouter();
  const {
    state,
    setRepresentativeInfo,
    isRepresentativeComplete,
    completeCurrentStep,
  } = useOnboarding();

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { name, phoneNumber, desiredCreditLimit } = state.representative;

  // 選択された金額のラベルを取得
  const getSelectedLabel = () => {
    const option = CREDIT_LIMIT_OPTIONS.find((opt) => opt.value === desiredCreditLimit);
    return option?.label || "";
  };

  // 次へ進む処理
  const handleNext = () => {
    completeCurrentStep();
    router.push("/onboarding/identity-preparation");
  };

  // 戻る処理
  const handleBack = () => {
    router.push("/onboarding/email-verification");
  };

  // 金額選択処理
  const handleSelectCreditLimit = (value: string) => {
    setRepresentativeInfo("desiredCreditLimit", value);
    setIsSheetOpen(false);
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

          <p className="text-sm text-white/60">あと1ステップで登録完了</p>

          <div className="w-[44px]" /> {/* Spacer for alignment */}
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={2} totalSteps={3} showTitle={false} className="mb-6" />
      </div>

      {/* Content */}
      <div className="flex-1 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* タイトル */}
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              あなたについて教えてください
            </h1>
            <p className="text-white/60 text-sm">
              PRESIDENT CARDの申込者は、代表者（法人を代表する権限を有する役員として登記されている）に限られます。
            </p>
          </div>

          {/* フォーム */}
          <div className="space-y-4">
            {/* 氏名 */}
            <div>
              <label className="block text-white/60 text-sm mb-2">氏名</label>
              <TextField
                value={name}
                onChange={(value) => setRepresentativeInfo("name", value)}
                placeholder="山田 太郎"
                autoComplete="name"
              />
            </div>

            {/* 電話番号 */}
            <div>
              <label className="block text-white/60 text-sm mb-2">代表者の電話番号</label>
              <TextField
                value={phoneNumber}
                onChange={(value) => setRepresentativeInfo("phoneNumber", value)}
                placeholder="090-1234-5678"
                type="tel"
                autoComplete="tel"
              />
            </div>

            {/* ご希望のカード利用金額 */}
            <div>
              <label className="block text-white/60 text-sm mb-2">ご希望のカード利用金額</label>
              <button
                type="button"
                onClick={() => setIsSheetOpen(true)}
                className="w-full min-h-[48px] px-4 py-3 bg-luxbrown-80 border border-gray-70 rounded-lg text-left flex items-center justify-between active:opacity-70"
              >
                <span className={desiredCreditLimit ? "text-white" : "text-white/40"}>
                  {desiredCreditLimit ? getSelectedLabel() : "選択してください"}
                </span>
                <ChevronDown size={20} className="text-white/60" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="px-4 pb-4">
        <Button
          variant="primary"
          fullWidth
          onClick={handleNext}
          disabled={!isRepresentativeComplete}
        >
          本人確認にすすむ
        </Button>

        {/* お困りの場合はこちら */}
        <div className="mt-4 flex justify-center items-center gap-1">
          <span className="text-white/40 text-sm">お困りの場合はこちら</span>
          <ExternalLink size={14} className="text-white/40" />
        </div>
      </div>

      {/* 利用金額選択シート */}
      <BottomSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        title="ご希望のカード利用金額"
      >
        <div className="space-y-1">
          {CREDIT_LIMIT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelectCreditLimit(option.value)}
              className={`w-full min-h-[48px] px-4 py-3 rounded-lg text-left active:opacity-70 ${
                desiredCreditLimit === option.value
                  ? "bg-darkgreen-80 text-white"
                  : "bg-luxbrown-80 text-white hover:bg-luxbrown-70"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
}
