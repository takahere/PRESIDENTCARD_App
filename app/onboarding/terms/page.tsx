"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { Button, Checkbox } from "@/components/ui/ios";
import { useOnboarding } from "@/lib/onboarding";

// 規約項目の定義（Figmaデザインに準拠）
const TERMS_ITEMS = [
  {
    key: "memberAgreement" as const,
    label: "PRESIDENT CLUB利用規約",
    linkUrl: "#",
  },
  {
    key: "personalInfo" as const,
    label: "PRESIDENTカード利用規約",
    linkUrl: "#",
  },
  {
    key: "electronicDelivery" as const,
    label: "PRESIDENTカードポイント利用規約",
    linkUrl: "#",
  },
  {
    key: "privacyPolicy" as const,
    label: "UPSIDER付帯サービス等基本規約",
    linkUrl: "#",
  },
  {
    key: "antiSocialForces" as const,
    label: "プライバシーポリシー",
    linkUrl: "#",
  },
];

export default function TermsPage() {
  const router = useRouter();
  const {
    state,
    setTermsAgreement,
    setAllTermsAgreed,
    isAllTermsAgreed,
    completeCurrentStep,
  } = useOnboarding();

  const handleNext = () => {
    if (isAllTermsAgreed) {
      completeCurrentStep();
      router.push("/onboarding/email-verification");
    }
  };

  const handleBack = () => {
    router.push("/onboarding");
  };

  // 全項目の同意状態を計算
  const checkedCount = Object.values(state.terms).filter(Boolean).length;
  const totalCount = TERMS_ITEMS.length;

  return (
    <div className="min-h-full flex flex-col px-4 py-6">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={handleBack}
        className="flex items-center gap-1 text-white/60 mb-4 min-h-[44px] self-start"
      >
        <ChevronLeft size={20} />
        <span className="text-sm">戻る</span>
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-xl font-bold text-white mb-2">利用規約をご確認ください</h1>
        <p className="text-white/60 text-sm">
          重要事項により必ずお読みください。
        </p>
      </motion.div>

      {/* 全て同意ボタン */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-6"
      >
        <button
          onClick={() => setAllTermsAgreed(!isAllTermsAgreed)}
          className={`
            w-full px-4 py-3 rounded-xl border-2 flex items-center justify-center gap-2
            transition-colors
            ${
              isAllTermsAgreed
                ? "bg-darkgreen-80/20 border-darkgreen-80 text-darkgreen-80"
                : "bg-white/5 border-white/20 text-white/80"
            }
          `}
        >
          <span className="font-medium">
            {isAllTermsAgreed ? "すべて同意済み" : "すべてに同意する"}
          </span>
          <span className="text-sm opacity-60">
            ({checkedCount}/{totalCount})
          </span>
        </button>
      </motion.div>

      {/* 規約項目リスト */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex-1 space-y-1"
      >
        {TERMS_ITEMS.map((item, index) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + index * 0.05 }}
            className="bg-white/5 rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <Checkbox
                checked={state.terms[item.key]}
                onChange={(checked) => setTermsAgreement(item.key, checked)}
              />
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => setTermsAgreement(item.key, !state.terms[item.key])}
                  className="text-left w-full"
                >
                  <span className="text-body-small text-white">
                    {item.label}
                  </span>
                </button>
              </div>
              <button
                onClick={() => {
                  // TODO: 規約詳細を表示
                }}
                className="p-2 -m-2 text-white/40 active:text-white/60"
              >
                <ExternalLink size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* 注意事項 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 mb-4"
      >
        <p className="text-caption-medium text-white/40 text-center">
          規約の詳細は各項目の
          <ExternalLink size={12} className="inline mx-1" />
          アイコンからご確認いただけます
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="pb-8"
      >
        <Button
          variant="primary"
          fullWidth
          onClick={handleNext}
          disabled={!isAllTermsAgreed}
        >
          同意してすすむ
        </Button>
      </motion.div>
    </div>
  );
}
