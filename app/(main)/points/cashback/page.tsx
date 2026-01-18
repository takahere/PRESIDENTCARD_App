"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

// Mock data
const mockAvailablePoints = 166081000;

export default function CashbackExchangePage() {
  const router = useRouter();
  const [inputPoints, setInputPoints] = useState("80,000");

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
            キャッシュバック
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
            <p className="text-[20px] font-semibold text-white font-sf-display tabular-nums">
              1,000,000,000
            </p>
          </div>

          {/* Arrow */}
          <div className="text-white text-2xl">→</div>

          {/* Cashback */}
          <div className="flex flex-col items-center gap-2 w-20">
            <div className="size-16 rounded-[10px] bg-white flex items-center justify-center">
              <p className="text-[8px] font-semibold text-gray-90 tracking-wider">PRESIDENT CARD</p>
            </div>
            <div className="text-center">
              <p className="text-[11px] font-semibold text-white">キャッシュ</p>
              <p className="text-[11px] font-semibold text-white">バック</p>
            </div>
            <p className="text-[20px] font-semibold text-white font-sf-display tabular-nums">
              1,000,000,000
            </p>
          </div>
        </div>

        {/* Input Section */}
        <div className="space-y-2">
          <p className="text-[14px] font-semibold text-white tracking-wide">
            交換ポイント数
          </p>
          <div className="bg-white border border-[#e8e8e8] rounded-lg p-4">
            <input
              type="text"
              value={inputPoints}
              onChange={(e) => setInputPoints(e.target.value)}
              className="w-full text-[16px] text-luxbrown-90 font-sf-pro focus:outline-none"
            />
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-luxbrown-80 rounded-xl py-1">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-[13px] text-white">1000ポイント</span>
            <span className="text-[13px] font-semibold text-white">＝ 1000円</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-[13px] text-white">充当されるタイミング</span>
            <span className="text-[13px] font-semibold text-white">翌月の請求</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-[13px] text-white">最小移行ポイント数</span>
            <span className="text-[13px] font-semibold text-white">1000ポイント</span>
          </div>
        </div>

        {/* Terms Link */}
        <div className="text-center">
          <button className="text-[13px] text-white underline">
            キャッシュバック交換規約
          </button>
        </div>

        {/* Bottom Button */}
        <div className="bg-[#160e0b] -mx-4 p-4">
          <button className="w-full bg-darkgreen-80 text-white text-[17px] font-semibold py-3.5 rounded-xl active:opacity-80">
            交換する
          </button>
        </div>
      </div>
    </div>
  );
}
