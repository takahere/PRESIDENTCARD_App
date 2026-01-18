"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, CreditCard, Smartphone, Check, X, Loader2 } from "lucide-react";
import { Button, PasswordField, AlertBanner } from "@/components/ui/ios";
import { useOnboarding, isValidPassword } from "@/lib/onboarding";
import { simulateNfcScan, NFC_STATUS_MESSAGES, type NfcScanStatus } from "@/lib/onboarding/nfc-mock";

export default function EkycPage() {
  const router = useRouter();
  const {
    state,
    setPassword,
    setConfirmPassword,
    startNfcScan,
    resetNfc,
    completeCurrentStep,
  } = useOnboarding();

  const { password, confirmPassword, nfcStatus, nfcError, isComplete } = state.ekyc;

  const [showNfcModal, setShowNfcModal] = useState(false);
  const [localNfcStatus, setLocalNfcStatus] = useState<NfcScanStatus>("idle");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // パスワードバリデーション
  const validatePasswords = (): boolean => {
    if (!password) {
      setPasswordError("パスワードを入力してください");
      return false;
    }
    if (!isValidPassword(password)) {
      setPasswordError("パスワードは6〜16桁の数字で入力してください");
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError("パスワードが一致しません");
      return false;
    }
    setPasswordError(null);
    return true;
  };

  // NFCスキャン開始
  const handleStartNfc = () => {
    if (!validatePasswords()) {
      return;
    }

    setShowNfcModal(true);
    setLocalNfcStatus("idle");

    // 少し遅延してからスキャン開始
    setTimeout(() => {
      simulateNfcScan(
        (status) => setLocalNfcStatus(status),
        async (result) => {
          if (result.success) {
            // 成功時は少し待ってからモーダルを閉じる
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setShowNfcModal(false);
            await startNfcScan(); // これで成功状態に
          }
        }
      );
    }, 500);
  };

  // リトライ
  const handleRetry = () => {
    setLocalNfcStatus("idle");
    setTimeout(() => {
      simulateNfcScan(
        (status) => setLocalNfcStatus(status),
        async (result) => {
          if (result.success) {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setShowNfcModal(false);
            await startNfcScan();
          }
        }
      );
    }, 500);
  };

  // 次へ
  const handleNext = () => {
    if (isComplete) {
      completeCurrentStep();
      router.push("/onboarding/company");
    }
  };

  const handleBack = () => {
    router.push("/onboarding/identity-preparation");
  };

  const canProceed = password && confirmPassword && password === confirmPassword && isValidPassword(password);

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
        <div className="w-16 h-16 rounded-2xl bg-darkgreen-80/20 flex items-center justify-center mb-4">
          <CreditCard size={32} className="text-darkgreen-80" />
        </div>
        <h1 className="text-xl font-bold text-white mb-2">本人確認（eKYC）</h1>
        <p className="text-white/60 text-sm">
          マイナンバーカードを読み取って本人確認を行います。
          署名用電子証明書のパスワードを入力してください。
        </p>
      </motion.div>

      {/* Error Banner */}
      <AlertBanner
        type="error"
        message={passwordError || ""}
        show={!!passwordError}
        onDismiss={() => setPasswordError(null)}
        dismissible
        className="mb-4"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex-1 space-y-6"
      >
        {/* パスワード入力 */}
        {!isComplete ? (
          <>
            <PasswordField
              label="署名用電子証明書のパスワード"
              value={password}
              onChange={setPassword}
              placeholder="6〜16桁の数字"
              hint="マイナンバーカード取得時に設定した数字のパスワードです"
            />

            <PasswordField
              label="パスワード（確認）"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="パスワードを再入力"
            />

            {/* 注意事項 */}
            <div className="bg-orange-70/10 border border-orange-70/30 rounded-xl p-4">
              <p className="text-caption-medium text-orange-70 font-medium mb-2">
                パスワードについて
              </p>
              <ul className="text-caption-medium text-white/60 space-y-1">
                <li>• 署名用電子証明書のパスワードは6〜16桁の数字です</li>
                <li>• 5回連続で間違えるとロックされます</li>
                <li>• ロック解除は市区町村窓口で手続きが必要です</li>
              </ul>
            </div>
          </>
        ) : (
          // 完了状態
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-lightgreen-80/10 border border-lightgreen-80/30 rounded-xl p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-lightgreen-80/20 flex items-center justify-center">
                <Check size={24} className="text-lightgreen-80" />
              </div>
              <div>
                <p className="text-lightgreen-80 font-semibold">本人確認が完了しました</p>
                <p className="text-white/50 text-sm">マイナンバーカードの情報を取得しました</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-white/50 text-sm">氏名</span>
                <span className="text-white text-sm">山田 太郎</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50 text-sm">生年月日</span>
                <span className="text-white text-sm">1985年3月15日</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50 text-sm">住所</span>
                <span className="text-white text-sm text-right">東京都渋谷区...</span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="pb-8 mt-6"
      >
        {!isComplete ? (
          <Button
            variant="primary"
            fullWidth
            onClick={handleStartNfc}
            disabled={!canProceed}
          >
            <Smartphone size={20} className="mr-2" />
            マイナンバーカードを読み取る
          </Button>
        ) : (
          <Button variant="primary" fullWidth onClick={handleNext}>
            次へ
          </Button>
        )}
      </motion.div>

      {/* NFC Modal */}
      <AnimatePresence>
        {showNfcModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            onClick={(e) => {
              if (e.target === e.currentTarget && localNfcStatus === "error") {
                setShowNfcModal(false);
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-luxbrown-80 rounded-2xl p-6 mx-4 max-w-sm w-full"
            >
              {/* Close button (error時のみ) */}
              {localNfcStatus === "error" && (
                <button
                  onClick={() => setShowNfcModal(false)}
                  className="absolute top-4 right-4 p-2 text-white/40"
                >
                  <X size={20} />
                </button>
              )}

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center ${
                    localNfcStatus === "success"
                      ? "bg-lightgreen-80/20"
                      : localNfcStatus === "error"
                      ? "bg-red-80/20"
                      : "bg-darkgreen-80/20"
                  }`}
                >
                  {localNfcStatus === "success" ? (
                    <Check size={48} className="text-lightgreen-80" />
                  ) : localNfcStatus === "error" ? (
                    <X size={48} className="text-red-80" />
                  ) : (
                    <motion.div
                      animate={
                        localNfcStatus === "waiting" || localNfcStatus === "scanning"
                          ? { scale: [1, 1.1, 1] }
                          : {}
                      }
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <CreditCard
                        size={48}
                        className={
                          localNfcStatus === "waiting" || localNfcStatus === "scanning"
                            ? "text-orange-70"
                            : "text-darkgreen-80"
                        }
                      />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Status Text */}
              <div className="text-center mb-6">
                <p
                  className={`font-semibold mb-2 ${
                    localNfcStatus === "success"
                      ? "text-lightgreen-80"
                      : localNfcStatus === "error"
                      ? "text-red-80"
                      : "text-white"
                  }`}
                >
                  {NFC_STATUS_MESSAGES[localNfcStatus]}
                </p>
                {(localNfcStatus === "waiting" || localNfcStatus === "scanning") && (
                  <p className="text-white/50 text-sm">
                    スマートフォンをカードの上に置いてください
                  </p>
                )}
              </div>

              {/* Loading indicator */}
              {(localNfcStatus === "waiting" || localNfcStatus === "scanning") && (
                <div className="flex justify-center">
                  <Loader2 size={24} className="text-orange-70 animate-spin" />
                </div>
              )}

              {/* Error actions */}
              {localNfcStatus === "error" && (
                <div className="space-y-3">
                  <Button variant="primary" fullWidth onClick={handleRetry}>
                    もう一度試す
                  </Button>
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={() => setShowNfcModal(false)}
                  >
                    キャンセル
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
