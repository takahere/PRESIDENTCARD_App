"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

// Mock data
const mockAvailablePoints = 166081000;

const giftCardOptions = [
  { id: "10000", label: "10,000円分ギフトカード", points: 10000 },
  { id: "50000", label: "50,000円分ギフトカード", points: 50000 },
  { id: "100000", label: "100,000円分ギフトカード", points: 100000 },
];

export default function AmazonExchangePage() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className="min-h-full bg-luxbrown-90">
      {/* Header */}
      <div className="px-4 pt-4 ">
        <button
          onClick={() => router.back()}
          className="flex items-center text-white active:opacity-70 -ml-1"
        >
          <ChevronLeft size={24} strokeWidth={2} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pt-4 pb-6 space-y-6">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-header-medium font-semibold text-white font-sf-display">
            Amazonギフトカードに交換
          </h1>
          <p className="text-[13px] text-orange-70">
            {mockAvailablePoints.toLocaleString()} PRESIDENT ポイント分交換可能
          </p>
        </div>

        {/* Exchange Icons */}
        <div className="flex items-center justify-center gap-10">
          {/* President Points */}
          <div className="flex flex-col items-center gap-2 w-20">
            <div className="size-16 rounded-[10px] bg-luxbrown-90 border border-gray-70 flex items-center justify-center overflow-hidden">
              <div className="w-10 h-6 bg-gradient-to-br from-gray-300 to-gray-400 rounded-sm transform -rotate-[15deg]" />
            </div>
            <div className="text-center">
              <p className="text-[11px] font-semibold text-white">PRESIDENT</p>
              <p className="text-[11px] font-semibold text-white">ポイント</p>
            </div>
          </div>

          {/* Arrow */}
          <div className="text-white text-2xl">→</div>

          {/* Amazon */}
          <div className="flex flex-col items-center gap-2 w-20">
            <div className="size-16 rounded-xl bg-white flex items-center justify-center">
              <svg viewBox="0 0 120 40" className="w-12 h-4">
                <text x="60" y="25" textAnchor="middle" fill="#232F3E" fontSize="18" fontWeight="bold">amazon</text>
                <path d="M15 32 Q60 42 105 32" stroke="#FF9900" strokeWidth="3" fill="none" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-[11px] font-semibold text-white">Amazon</p>
              <p className="text-[11px] font-semibold text-white">ギフトカード</p>
            </div>
          </div>
        </div>

        {/* Gift Card Options */}
        <div className="space-y-4">
          {giftCardOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`w-full bg-luxbrown-80 border rounded-[10px] px-4 py-4 text-left active:opacity-70 ${
                selectedOption === option.id ? "border-lightgreen-80" : "border-gray-70"
              }`}
            >
              <span className="text-[14px] font-semibold text-white">
                {option.label}
              </span>
            </button>
          ))}
        </div>

        {/* Info Card */}
        <div className="bg-luxbrown-80 rounded-xl py-1">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-[13px] text-white">10,000ポイント</span>
            <span className="text-[13px] font-semibold text-white">10,000円分</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-[13px] text-white">移行完了までの所要日数</span>
            <span className="text-[13px] font-semibold text-white">通常5営業日以内</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-[13px] text-white">最小移行ポイント数</span>
            <span className="text-[13px] font-semibold text-white">10,000ポイント</span>
          </div>
        </div>

        {/* Terms Link */}
        <div className="text-center">
          <button className="text-[13px] text-white underline">
            Amazonギフトカード交換規約
          </button>
        </div>
      </div>
    </div>
  );
}
