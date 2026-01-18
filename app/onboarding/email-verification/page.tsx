"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { Button, TextField, VerificationCodeInput, AlertBanner, ProgressBar } from "@/components/ui/ios";
import { useOnboarding, isValidEmail } from "@/lib/onboarding";

export default function EmailVerificationPage() {
  const router = useRouter();
  const {
    state,
    setEmail,
    setVerificationCode,
    sendCode,
    verifyCode,
    completeCurrentStep,
  } = useOnboarding();

  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const { email, verificationCode, isCodeSent, isVerified, error } = state.emailVerification;

  // メール送信処理
  const handleSendCode = async () => {
    if (!isValidEmail(email)) {
      setLocalError("正しいメールアドレスを入力してください");
      return;
    }

    setLocalError(null);
    setIsLoading(true);

    // モック: 1秒後に送信完了
    await new Promise((resolve) => setTimeout(resolve, 1000));
    sendCode();
    setIsLoading(false);
  };

  // 認証処理
  const handleVerify = async () => {
    if (verificationCode.length !== 6) {
      return;
    }

    setIsLoading(true);
    const success = await verifyCode();
    setIsLoading(false);

    if (success) {
      completeCurrentStep();
      router.push("/onboarding/representative");
    }
  };

  // 戻る処理
  const handleBack = () => {
    router.push("/onboarding/terms");
  };

  // 再送信処理
  const handleResend = async () => {
    setIsLoading(true);
    setVerificationCode("");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const displayError = localError || error;

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

          <p className="text-sm text-white/60">あと2ステップで登録完了</p>

          <div className="w-[44px]" /> {/* Spacer for alignment */}
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={1} totalSteps={3} showTitle={false} className="mb-6" />
      </div>

      {/* Content */}
      <div className="flex-1 px-4">
        {/* エラー表示 */}
        <AlertBanner
          type="error"
          message={displayError || ""}
          show={!!displayError}
          onDismiss={() => setLocalError(null)}
          dismissible
          className="mb-4"
        />

        <motion.div
          key={isCodeSent ? "code" : "email"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {!isCodeSent ? (
            // メールアドレス入力画面
            <>
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  メールアドレスをご入力ください
                </h1>
                <p className="text-white/60 text-sm">
                  ログインに使用するメールアドレスをご入力ください。確認コードをメールでお送りします。
                </p>
              </div>

              <TextField
                value={email}
                onChange={setEmail}
                placeholder="president@sample.com"
                type="email"
                autoComplete="email"
                error={localError && !isValidEmail(email) ? localError : undefined}
              />
            </>
          ) : (
            // 認証コード入力画面
            <>
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  認証コードをお送りしました
                </h1>
                <p className="text-white/60 text-sm">
                  {email}宛てに本人確認メールをお送りしました。メール内のURLをタップするか、メール内に記載されている6桁の番号をご入力ください。
                </p>
              </div>

              <VerificationCodeInput
                value={verificationCode}
                onChange={setVerificationCode}
                error={error || undefined}
                autoFocus
              />

              {/* 再送信リンク */}
              <div className="text-center">
                <button
                  onClick={handleResend}
                  disabled={isLoading}
                  className="text-darkgreen-80 text-sm active:opacity-70 disabled:opacity-50"
                >
                  届かない場合は、認証コードを再送します
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="px-4 pb-4">
        {!isCodeSent ? (
          <Button
            variant="primary"
            fullWidth
            onClick={handleSendCode}
            disabled={!email || isLoading}
            loading={isLoading}
          >
            確認メールを送信
          </Button>
        ) : (
          <Button
            variant="primary"
            fullWidth
            onClick={handleVerify}
            disabled={verificationCode.length !== 6 || isLoading}
            loading={isLoading}
          >
            認証する
          </Button>
        )}

        {/* お困りの場合はこちら */}
        <div className="mt-4 flex justify-center items-center gap-1">
          <span className="text-white/40 text-sm">お困りの場合はこちら</span>
          <ExternalLink size={14} className="text-white/40" />
        </div>
      </div>
    </div>
  );
}
