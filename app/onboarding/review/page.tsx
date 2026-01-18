"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  FileCheck,
  Mail,
  CreditCard,
  Building2,
  User,
  MapPin,
  Briefcase,
  Check,
} from "lucide-react";
import { Button, Card } from "@/components/ui/ios";
import { useOnboarding } from "@/lib/onboarding";

// 業種ラベル
const BUSINESS_TYPE_LABELS: Record<string, string> = {
  it: "IT・通信",
  finance: "金融・保険",
  manufacturing: "製造業",
  retail: "小売・卸売",
  service: "サービス業",
  construction: "建設業",
  real_estate: "不動産業",
  other: "その他",
};

// 関係ラベル
const RELATIONSHIP_LABELS: Record<string, string> = {
  representative: "代表取締役",
  director: "取締役",
  shareholder: "株主",
  beneficial_owner: "実質的支配者",
};

interface SectionProps {
  title: string;
  icon: React.ElementType;
  onEdit?: () => void;
  children: React.ReactNode;
}

function Section({ title, icon: Icon, onEdit, children }: SectionProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon size={18} className="text-darkgreen-80" />
          <h3 className="text-body-medium font-semibold text-white">{title}</h3>
        </div>
        {onEdit && (
          <button
            onClick={onEdit}
            className="flex items-center gap-1 text-darkgreen-80 text-sm active:opacity-70"
          >
            <span>編集</span>
            <ChevronRight size={16} />
          </button>
        )}
      </div>
      {children}
    </Card>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex justify-between py-2 border-b border-white/5 last:border-b-0">
      <span className="text-white/50 text-sm">{label}</span>
      <span className="text-white text-sm text-right">{value || "-"}</span>
    </div>
  );
}

export default function ReviewPage() {
  const router = useRouter();
  const { state, submitReview, completeCurrentStep } = useOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { emailVerification, company } = state;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const success = await submitReview();
    setIsSubmitting(false);

    if (success) {
      completeCurrentStep();
      router.push("/onboarding/complete");
    }
  };

  const handleBack = () => {
    router.push("/onboarding/company");
  };

  // 住所を組み立て
  const fullAddress = [
    company.postalCode && `〒${company.postalCode}`,
    company.prefecture,
    company.city,
    company.address,
    company.building,
  ]
    .filter(Boolean)
    .join(" ");

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
        className="mb-6"
      >
        <div className="w-16 h-16 rounded-2xl bg-darkgreen-80/20 flex items-center justify-center mb-4">
          <FileCheck size={32} className="text-darkgreen-80" />
        </div>
        <h1 className="text-xl font-bold text-white mb-2">入力内容の確認</h1>
        <p className="text-white/60 text-sm">
          入力内容をご確認のうえ、審査を提出してください。
        </p>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex-1 space-y-4 overflow-y-auto"
      >
        {/* メールアドレス */}
        <Section
          title="メールアドレス"
          icon={Mail}
          onEdit={() => router.push("/onboarding/email-verification")}
        >
          <div className="flex items-center gap-2">
            <span className="text-white">{emailVerification.email}</span>
            {emailVerification.isVerified && (
              <span className="flex items-center gap-1 text-lightgreen-80 text-xs">
                <Check size={12} />
                認証済み
              </span>
            )}
          </div>
        </Section>

        {/* 本人確認 */}
        <Section
          title="本人確認"
          icon={CreditCard}
          onEdit={() => router.push("/onboarding/ekyc")}
        >
          <div className="space-y-1">
            <InfoRow label="氏名" value="山田 太郎" />
            <InfoRow label="生年月日" value="1985年3月15日" />
            <InfoRow label="住所" value="東京都渋谷区道玄坂1-2-3" />
          </div>
        </Section>

        {/* 会社基本情報 */}
        <Section
          title="会社情報"
          icon={Building2}
          onEdit={() => router.push("/onboarding/company")}
        >
          <div className="space-y-1">
            <InfoRow label="会社名" value={company.companyName} />
            <InfoRow label="代表者" value={company.representativeName} />
          </div>
        </Section>

        {/* 所在地 */}
        <Section
          title="所在地"
          icon={MapPin}
          onEdit={() => router.push("/onboarding/company")}
        >
          <p className="text-white text-sm">{fullAddress || "-"}</p>
        </Section>

        {/* 事業情報 */}
        <Section
          title="事業情報"
          icon={Briefcase}
          onEdit={() => router.push("/onboarding/company")}
        >
          <div className="space-y-1">
            <InfoRow
              label="業種"
              value={BUSINESS_TYPE_LABELS[company.businessType] || "-"}
            />
            <InfoRow label="従業員数" value={company.employeeCount || "-"} />
          </div>
        </Section>

        {/* 実質的支配者 */}
        <Section
          title="実質的支配者"
          icon={User}
          onEdit={() => router.push("/onboarding/company")}
        >
          {company.beneficialOwners.length === 0 ? (
            <p className="text-white/40 text-sm">登録なし</p>
          ) : (
            <div className="space-y-2">
              {company.beneficialOwners.map((owner) => (
                <div
                  key={owner.id}
                  className="py-2 border-b border-white/5 last:border-b-0"
                >
                  <p className="text-white text-sm">{owner.name}</p>
                  <p className="text-white/50 text-xs">
                    {RELATIONSHIP_LABELS[owner.relationship] || owner.relationship}
                    {owner.ownershipPercentage > 0 && ` (${owner.ownershipPercentage}%)`}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Section>
      </motion.div>

      {/* 注意事項 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4"
      >
        <div className="bg-orange-70/10 border border-orange-70/30 rounded-xl p-4">
          <p className="text-caption-medium text-white/60">
            審査には通常1〜3営業日かかります。審査結果はメールでお知らせします。
          </p>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="pb-8 mt-6"
      >
        <Button
          variant="primary"
          fullWidth
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          審査を提出する
        </Button>
      </motion.div>
    </div>
  );
}
