"use client";

import { useState } from "react";
import { ChevronRight, Copy, Check } from "lucide-react";
import { formatYen } from "@/lib/utils";

// Mock user data
const mockUser = {
  company: "株式会社UPSIDER",
  name: "石井 孝幸",
  email: "takayuki.ishii@up-sider.com",
  availableLimit: 950000000,
  totalLimit: 1000000000,
};

// Section Header Component
function SectionHeader({ title }: { title: string }) {
  return (
    <p className="text-[17px] font-semibold text-white px-4 py-2">
      {title}
    </p>
  );
}

// List Item Component
function ListItem({
  title,
  subtitle,
  onClick,
  showBorder = true,
}: {
  title: string;
  subtitle?: string;
  onClick?: () => void;
  showBorder?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between pl-4 pr-4 h-14 active:opacity-70 ${
        showBorder ? "border-b border-white/30" : ""
      }`}
    >
      <div className="flex flex-col items-start">
        <span className="text-body-small text-white font-sf-pro">{title}</span>
        {subtitle && (
          <span className="text-caption-medium text-white/60 font-sf-pro">{subtitle}</span>
        )}
      </div>
      <ChevronRight size={17} className="text-white/40" />
    </button>
  );
}

// Info Row Component
function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between h-11 px-4">
      <span className="text-body-small text-white font-sf-pro">{label}</span>
      <span className="text-body-small font-semibold text-white font-sf-pro">{value}</span>
    </div>
  );
}

export default function AccountPage() {
  const [copied, setCopied] = useState(false);

  const handleLogout = () => {
    alert("ログアウトしました");
  };

  const handleCopyUserInfo = async () => {
    const userInfo = `会社名: ${mockUser.company}\n氏名: ${mockUser.name}\nメールアドレス: ${mockUser.email}`;
    await navigator.clipboard.writeText(userInfo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const progressPercentage = (mockUser.availableLimit / mockUser.totalLimit) * 100;

  return (
    <div className="min-h-full bg-luxbrown-90">
      {/* Header */}
      <div className="px-4 pt-8 space-y-4 ">
        <h1 className="text-header-medium font-semibold text-white font-sf-display">
          アカウント
        </h1>

        {/* Available Limit */}
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-caption-medium text-white/80 font-sf-pro tracking-wide">
              利用可能額
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-xl font-bold text-white font-sf-pro tabular-nums">
                {formatYen(mockUser.availableLimit)}
              </p>
              <p className="text-body-small text-white font-sf-pro">/</p>
              <p className="text-body-small text-white font-sf-pro tabular-nums">
                {formatYen(mockUser.totalLimit)}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-3.5">
            <div className="absolute inset-0 bg-white/20 rounded" />
            <div
              className="absolute inset-y-0 left-0 bg-lightgreen-70 rounded"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-8 pb-6">
        {/* User Info Card */}
        <div className="bg-luxbrown-80 rounded-xl py-1">
          <InfoRow label="会社名" value={mockUser.company} />
          <InfoRow label="氏名" value={mockUser.name} />
          <InfoRow label="メールアドレス" value={mockUser.email} />
        </div>

        {/* Card Management Section */}
        <div className="space-y-3">
          <SectionHeader title="カード管理" />
          <div className="bg-luxbrown-80 rounded-xl border border-gray-70 overflow-hidden">
            <ListItem title="お手元にカードが届いた方はこちら" />
            <ListItem title="追加カードの発行" />
            <ListItem title="各カードの詳細設定" />
            <ListItem title="カードグループの設定" showBorder={false} />
          </div>
        </div>

        {/* Login Section */}
        <div className="space-y-3">
          <SectionHeader title="ログイン" />
          <div className="bg-luxbrown-80 rounded-xl border border-gray-70 overflow-hidden">
            <ListItem title="生体認証" showBorder={false} />
          </div>
        </div>

        {/* Support Section */}
        <div className="space-y-3">
          <SectionHeader title="サポート" />
          <div className="bg-luxbrown-80 rounded-xl border border-gray-70 overflow-hidden">
            <ListItem title="よくある質問" />
            <ListItem title="お問い合わせ" showBorder={false} />
          </div>

          {/* Copy User Info */}
          <button
            onClick={handleCopyUserInfo}
            className="w-full bg-luxbrown-80 rounded-xl border border-gray-70 p-4 flex items-center gap-3 active:opacity-70"
          >
            <div className="size-6 flex items-center justify-center">
              {copied ? (
                <Check size={24} className="text-lightgreen-80" />
              ) : (
                <Copy size={24} className="text-white" />
              )}
            </div>
            <div className="text-left flex-1">
              <p className="text-body-small text-white font-sf-pro">
                ユーザー情報をコピーする
              </p>
              <p className="text-caption-medium text-white/60 font-sf-pro tracking-tight">
                問い合わせの際はこちらの情報を添付してください
              </p>
            </div>
          </button>

          {/* Additional Links */}
          <div className="bg-luxbrown-80 rounded-xl border border-gray-70 overflow-hidden">
            <ListItem title="ソフトウェアライセンス" />
            <ListItem title="アプリ利用規約" />
            <ListItem title="プライバシーポリシー" showBorder={false} />
          </div>
        </div>

        {/* Logout Button */}
        <div className="bg-gray-80 rounded-xl border border-gray-70 overflow-hidden">
          <button
            onClick={handleLogout}
            className="w-full py-3 text-center active:opacity-70"
          >
            <span className="text-body-medium text-red-80 font-sf-pro">ログアウト</span>
          </button>
        </div>

        {/* Account Deletion Link */}
        <div className="text-center">
          <button className="text-red-80 text-caption-medium underline">
            アカウント削除をリクエスト
          </button>
        </div>

        {/* Version */}
        <div className="text-center">
          <p className="text-caption-medium font-semibold text-[#979797]">
            バージョン 1.22.1
          </p>
        </div>
      </div>
    </div>
  );
}
