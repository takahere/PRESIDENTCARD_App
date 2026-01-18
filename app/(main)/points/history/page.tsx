"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

// Mock points history data
const mockPointsHistory = [
  {
    id: "pt_001",
    date: "2025/5/1",
    description: "Presidentカード9月利用に対するポイント付与",
    points: 803,
    type: "earn" as const,
  },
  {
    id: "pt_002",
    date: "2025/5/1",
    description: "Presidentカード9月利用に対するポイント付与",
    points: 803,
    type: "earn" as const,
  },
  {
    id: "pt_003",
    date: "2025/5/1",
    description: "Presidentカード9月利用に対するポイント付与",
    points: 803,
    type: "earn" as const,
  },
  {
    id: "pt_004",
    date: "2025/5/1",
    description: "Presidentカード9月利用に対するポイント付与",
    points: 803,
    type: "earn" as const,
  },
  {
    id: "pt_005",
    date: "",
    description: "ポイント還元的な文言を入れる",
    points: 803,
    type: "info" as const,
  },
];

const totalPoints = 166081000;

export default function PointsHistoryPage() {
  const router = useRouter();

  return (
    <div className="min-h-full bg-luxbrown-90">
      {/* Header */}
      <div className="px-4 pt-4 space-y-2 ">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-white active:opacity-70 -ml-1"
        >
          <ChevronLeft size={24} strokeWidth={2} />
        </button>

        {/* Title */}
        <h1 className="text-header-medium font-semibold text-white font-sf-display">
          ポイント実績
        </h1>
      </div>

      <div className="px-4 py-6 space-y-8 pb-6">
        {/* Points Summary */}
        <div className="flex items-center justify-between">
          <p className="text-paragraph-small font-semibold text-white font-sf-pro tracking-wide">
            Presidentポイント
          </p>
          <p className="text-header-medium font-semibold text-white font-sf-display tabular-nums">
            {totalPoints.toLocaleString()}
          </p>
        </div>

        {/* Points History List */}
        <div className="space-y-5">
          <h2 className="text-body-medium font-semibold text-white tracking-wide">
            ポイント履歴
          </h2>

          <div className="space-y-2">
            {mockPointsHistory.map((item) => (
              <div key={item.id} className="space-y-2">
                {item.date && (
                  <p className="text-body-small font-semibold text-white tracking-wide">
                    {item.date}
                  </p>
                )}
                <div className="space-y-2">
                  <p className="text-body-small text-white font-sf-pro">
                    {item.description}
                  </p>
                  <p
                    className={`text-body-medium font-bold text-right tabular-nums ${
                      item.type === "earn" ? "text-orange-70" : "text-white"
                    }`}
                  >
                    {item.type === "earn" ? " + " : ""}
                    {item.points.toLocaleString()}ポイント
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
