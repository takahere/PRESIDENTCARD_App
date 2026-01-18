"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, CreditCard, Package, Clock, Bell } from "lucide-react";
import { Button, Card } from "@/components/ui/ios";
import { formatYen } from "@/lib/utils";
import { useOnboarding } from "@/lib/onboarding";

const timeline = [
  {
    icon: CheckCircle,
    title: "申し込み完了",
    description: "本人確認・会社情報の審査を開始します",
    status: "complete",
  },
  {
    icon: Clock,
    title: "審査中",
    description: "通常1〜3営業日で完了します",
    status: "current",
  },
  {
    icon: CreditCard,
    title: "与信枠付与",
    description: "審査完了後、与信枠が決定されます",
    status: "pending",
  },
  {
    icon: Package,
    title: "カード発送",
    description: "プラスチックカードをお届けします",
    status: "pending",
  },
];

export default function CompletePage() {
  const router = useRouter();
  const { state } = useOnboarding();

  const handleGoHome = () => {
    router.push("/home");
  };

  return (
    <div className="min-h-full flex flex-col px-4 py-8">
      {/* Success Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="w-24 h-24 rounded-full bg-lightgreen-80/20 flex items-center justify-center mx-auto mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <CheckCircle size={48} className="text-lightgreen-80" />
          </motion.div>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">
          審査を提出しました
        </h1>
        <p className="text-white/60">
          ご登録いただきありがとうございます。
          <br />
          審査完了後、メールにてお知らせいたします。
        </p>
      </motion.div>

      {/* Virtual Card Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <Card className="overflow-hidden p-0">
          <div className="relative h-[180px] bg-gradient-to-br from-darkgreen-80 to-luxbrown-70 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <CreditCard size={64} className="text-white/10" />
            </div>
            <div className="absolute top-4 left-4">
              <span className="text-xs text-white/60 font-medium">
                PRESIDENT CARD
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <span className="text-xs text-orange-70 bg-orange-70/10 px-2 py-1 rounded-full">
                審査中
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white/40 text-sm">
                バーチャルカード（審査完了後に有効化）
              </p>
            </div>
          </div>
          <div className="p-4 text-center bg-luxbrown-80">
            <p className="text-white/60 text-sm mb-1">想定与信枠（審査により決定）</p>
            <p className="text-2xl font-bold text-white font-sf-pro tabular-nums">
              最大 {formatYen(1000000000)}
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex-1"
      >
        <h2 className="text-lg font-semibold text-white mb-4">今後の流れ</h2>
        <div className="space-y-0">
          {timeline.map((item, index) => (
            <div key={item.title} className="flex gap-4">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    item.status === "complete"
                      ? "bg-lightgreen-80/20"
                      : item.status === "current"
                      ? "bg-orange-70/20"
                      : "bg-white/10"
                  }`}
                >
                  <item.icon
                    size={20}
                    className={
                      item.status === "complete"
                        ? "text-lightgreen-80"
                        : item.status === "current"
                        ? "text-orange-70"
                        : "text-white/40"
                    }
                  />
                </div>
                {index < timeline.length - 1 && (
                  <div className="w-0.5 h-12 bg-white/10" />
                )}
              </div>

              {/* Content */}
              <div className="pb-6">
                <p
                  className={`font-medium ${
                    item.status === "complete"
                      ? "text-lightgreen-80"
                      : item.status === "current"
                      ? "text-orange-70"
                      : "text-white/50"
                  }`}
                >
                  {item.title}
                </p>
                <p className="text-white/40 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 通知バナー */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-4"
      >
        <div className="bg-darkgreen-80/20 border border-darkgreen-80/30 rounded-xl p-4 flex items-start gap-3">
          <Bell size={20} className="text-darkgreen-80 shrink-0 mt-0.5" />
          <div>
            <p className="text-white text-sm font-medium mb-1">
              審査完了通知を受け取る
            </p>
            <p className="text-white/50 text-xs">
              {state.emailVerification.email} に審査結果をお送りします
            </p>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="pb-8"
      >
        <Button variant="primary" fullWidth onClick={handleGoHome}>
          ホームへ戻る
        </Button>
      </motion.div>
    </div>
  );
}
