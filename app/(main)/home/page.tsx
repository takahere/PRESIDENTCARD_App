"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CreditCard, Info, Lock, ChevronRight, Receipt } from "lucide-react";
import { Card } from "@/components/ui/ios";
import { formatYen } from "@/lib/utils";
import { useStatusBar } from "@/components/layout/StatusBarContext";

// Mock data
const mockCardData = {
  availableLimit: 1000000000,
  usedAmount: 9420000,
  points: 26309,
};

const mockTransactions = [
  {
    id: "tx_001",
    vendor: "Amazon Web Service",
    date: "2024/08/28",
    time: "8/28 12:00",
    amount: 803100,
    hasReceipt: false,
  },
  {
    id: "tx_002",
    vendor: "Amazon Web Service",
    date: "2024/08/28",
    time: "8/28 12:00",
    amount: 803100,
    hasReceipt: false,
  },
  {
    id: "tx_003",
    vendor: "Amazon Web Service",
    date: "2024/08/28",
    time: "8/28 12:00",
    amount: 803100,
    hasReceipt: false,
  },
  {
    id: "tx_004",
    vendor: "Amazon Web Service",
    date: "2024/08/28",
    time: "8/28 12:00",
    amount: 803100,
    hasReceipt: true,
  },
];

// Group transactions by date
const groupedTransactions = mockTransactions.reduce((acc, tx) => {
  if (!acc[tx.date]) {
    acc[tx.date] = [];
  }
  acc[tx.date].push(tx);
  return acc;
}, {} as Record<string, typeof mockTransactions>);

// PRESIDENT CARD Logo component
function PresidentCardLogo() {
  return (
    <svg width="166" height="14" viewBox="0 0 166 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text
        x="0"
        y="11"
        fill="black"
        fontFamily="SF Pro Display, system-ui, sans-serif"
        fontSize="14"
        fontWeight="600"
        letterSpacing="0.5"
      >
        PRESIDENT CARD
      </text>
    </svg>
  );
}

// Receipt icon component
function ReceiptIcon({ checked = false }: { checked?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z"
        fill={checked ? "#1BA86F" : "rgba(255,255,255,0.6)"}
      />
      {checked && (
        <circle cx="18" cy="18" r="5" fill="#1BA86F" stroke="#001215" strokeWidth="2"/>
      )}
    </svg>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [currentCardIndex] = useState(0);
  const { setVariant } = useStatusBar();

  // 白いヘッダーに合わせて黒いステータスバーを使用
  useEffect(() => {
    setVariant("dark");
    return () => setVariant("light"); // クリーンアップで元に戻す
  }, [setVariant]);

  const handleHistoryClick = () => {
    router.push("/history");
  };

  return (
    <div className="min-h-full bg-luxbrown-90">
      {/* White Header Area (Logo) */}
      <div className="bg-white px-4 pt-4 pb-4">
        <PresidentCardLogo />
      </div>

      <div className="px-4 py-3 space-y-3 pb-6">
        {/* Card Carousel */}
        <div className="flex flex-col items-center gap-3">
          {/* Dark rounded frame around card */}
          <div className="w-full bg-black rounded-[16px] p-3">
            {/* Card Image - maintain aspect ratio */}
            <div className="relative w-full">
              <Image
                src="/assets/cards/card_PRESIDENT.png"
                alt="PRESIDENT CARD"
                width={361}
                height={223}
                className="w-full h-auto rounded-xl"
                priority
              />
              {/* Available limit overlay on card */}
              <div className="absolute bottom-6 left-4">
                <p className="text-caption-medium text-black/80 font-sf-pro tracking-wide">利用可能額</p>
                <p className="text-xl font-bold text-black font-sf-pro tabular-nums">
                  {formatYen(mockCardData.availableLimit)}
                </p>
              </div>
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-1.5">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`w-[7px] h-[7px] rounded-full ${
                  index === currentCardIndex ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions - 3 Icon Buttons */}
        <div className="flex justify-center gap-8 py-2">
          <button className="flex flex-col items-center gap-1.5 w-16 active:opacity-70">
            <div className="w-12 h-12 rounded-full bg-luxbrown-70 flex items-center justify-center">
              <CreditCard size={24} className="text-white" />
            </div>
            <span className="text-caption-medium text-white/90 text-center leading-normal font-sf-pro tracking-tight">
              新規カード発行
            </span>
          </button>

          <button className="flex flex-col items-center gap-1.5 w-16 active:opacity-70">
            <div className="w-12 h-12 rounded-full bg-luxbrown-70 flex items-center justify-center">
              <Info size={24} className="text-white" />
            </div>
            <span className="text-caption-medium text-white/90 text-center leading-normal font-sf-pro tracking-tight">
              カードの
              <br />
              情報を表示
            </span>
          </button>

          <button className="flex flex-col items-center gap-1.5 w-16 active:opacity-70">
            <div className="w-12 h-12 rounded-full bg-luxbrown-70 flex items-center justify-center">
              <Lock size={24} className="text-white" />
            </div>
            <span className="text-caption-medium text-white/90 text-center leading-normal font-sf-pro tracking-tight">
              カードの
              <br />
              一時ロック
            </span>
          </button>
        </div>

        {/* Usage Amount Card */}
        <div className="bg-luxbrown-80 rounded-xl px-4 py-4">
          <div className="space-y-4">
            {/* Amount Section */}
            <div className="space-y-1">
              <p className="text-paragraph-small text-white font-sf-pro">ご利用金額</p>
              <p className="text-header-medium font-semibold text-white font-sf-display tabular-nums">
                ¥ {mockCardData.usedAmount.toLocaleString()}
              </p>

              {/* Points Row */}
              <div className="flex items-center justify-between py-2">
                <span className="text-body-small text-white font-sf-pro tracking-wide">PRESIDENT CARDポイント</span>
                <span className="text-body-medium font-bold text-white font-sf-pro tabular-nums">
                  {mockCardData.points.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-60" />

            {/* History Link */}
            <button
              onClick={handleHistoryClick}
              className="flex items-center justify-between w-full active:opacity-70"
            >
              <span className="text-body-medium font-medium text-lightgreen-80 font-sf-pro">ご利用履歴</span>
              <ChevronRight size={16} className="text-white/40" />
            </button>
          </div>
        </div>

        {/* Transaction List */}
        <div className="space-y-2">
          {Object.entries(groupedTransactions).map(([date, transactions]) => (
            <div key={date}>
              {/* Date Header */}
              <p className="text-body-medium font-semibold text-white mb-2 tracking-wide">{date}</p>

              {/* Transactions */}
              <div className="space-y-2">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between py-2 px-0 rounded-xl"
                  >
                    <div className="flex items-center gap-2">
                      <ReceiptIcon checked={tx.hasReceipt} />
                      <div className="flex flex-col gap-1">
                        <span className="text-body-small text-white font-sf-pro">{tx.vendor}</span>
                        <span className="text-caption-medium text-white font-sf-pro">{tx.time}</span>
                      </div>
                    </div>
                    <span className="text-body-medium font-semibold text-white font-sf-pro tabular-nums tracking-wide">
                      {formatYen(tx.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
