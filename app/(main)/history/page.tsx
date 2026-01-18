"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Search, SlidersHorizontal, ShoppingBag } from "lucide-react";
import { formatYen } from "@/lib/utils";

// Mock data
const mockTransactions = [
  {
    id: "tx_001",
    vendor: "Amazon Web Service",
    date: "2024/08/28",
    time: "8/28 12:00",
    amount: 803100,
  },
  {
    id: "tx_002",
    vendor: "Amazon Web Service",
    date: "2024/08/28",
    time: "8/28 12:00",
    amount: 803100,
  },
  {
    id: "tx_003",
    vendor: "Amazon Web Service",
    date: "2024/08/28",
    time: "8/28 12:00",
    amount: 803100,
  },
  {
    id: "tx_004",
    vendor: "Amazon Web Service",
    date: "2024/08/28",
    time: "8/28 12:00",
    amount: 803100,
  },
  {
    id: "tx_005",
    vendor: "Amazon Web Service",
    date: "2024/08/28",
    time: "8/28 12:00",
    amount: 803100,
  },
  {
    id: "tx_006",
    vendor: "Amazon Web Service",
    date: "2024/08/28",
    time: "8/28 12:00",
    amount: 803100,
  },
  {
    id: "tx_007",
    vendor: "Amazon Web Service",
    date: "2024/08/28",
    time: "8/28 12:00",
    amount: 803100,
  },
  {
    id: "tx_008",
    vendor: "Amazon Web Service",
    date: "2024/08/28",
    time: "8/28 12:00",
    amount: 803100,
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

const totalAmount = 9420000;

export default function HistoryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth] = useState("2024年11月");

  return (
    <div className="min-h-full bg-luxbrown-90">
      {/* Header */}
      <div className="px-4 pt-4 space-y-2">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-white active:opacity-70 -ml-1"
        >
          <ChevronLeft size={24} strokeWidth={2} />
        </button>

        {/* Title Row */}
        <div className="flex items-center justify-between">
          <h1 className="text-header-medium font-semibold text-white font-sf-display">
            利用履歴
          </h1>
          <div className="flex items-center gap-2">
            {/* Month Selector */}
            <button className="text-lightgreen-90 text-body-small font-bold active:opacity-70">
              {selectedMonth} {">"}
            </button>
            {/* Filter */}
            <button className="flex items-center gap-2 active:opacity-70">
              <span className="text-lightgreen-90 text-body-small font-bold">フィルタ</span>
              <SlidersHorizontal size={18} className="text-lightgreen-90" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-5 pb-6">
        {/* Search Bar */}
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-90"
          />
          <input
            type="text"
            placeholder="取引先・金額で検索"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#e8e8e8] rounded-lg pl-12 pr-4 py-4 text-gray-90 placeholder:text-gray-20 text-paragraph-small font-sf-pro focus:outline-none focus:border-lightgreen-80"
          />
        </div>

        {/* Total Amount */}
        <div className="space-y-1">
          <p className="text-paragraph-small text-white font-sf-pro">ご利用金額</p>
          <p className="text-header-medium font-semibold text-white font-sf-display tabular-nums">
            ¥ {totalAmount.toLocaleString()}
          </p>
        </div>

        {/* Transaction List */}
        <div className="space-y-4">
          {Object.entries(groupedTransactions).map(([date, transactions]) => (
            <div key={date} className="space-y-2">
              {/* Date Header */}
              <div className="h-7 flex items-center">
                <p className="text-body-small font-bold text-white tracking-wide">{date}</p>
              </div>

              {/* Transactions */}
              <div className="space-y-2">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between py-px"
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingBag size={24} className="text-white/60" />
                      <div className="flex flex-col gap-1">
                        <span className="text-body-small text-white font-sf-pro">
                          {tx.vendor}
                        </span>
                        <span className="text-caption-medium text-white font-sf-pro">
                          {tx.time}
                        </span>
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
