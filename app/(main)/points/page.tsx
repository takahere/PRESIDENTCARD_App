"use client";

import Link from "next/link";

// Mock points data
const mockPoints = {
  current: 81000,
  cumulative: 126482,
};

// Exchange options
const exchangeOptions = [
  {
    id: "jal",
    label: "JALマイル",
    href: "/points/jal",
    logo: "/images/jal-logo.png",
    bgColor: "bg-white",
  },
  {
    id: "amazon",
    label: "Amazonギフトカード",
    href: "/points/amazon",
    logo: "/images/amazon-logo.png",
    bgColor: "bg-white",
  },
  {
    id: "cashback",
    label: "キャッシュバック",
    href: "/points/cashback",
    logo: "/images/president-card-logo.png",
    bgColor: "bg-white",
  },
  {
    id: "fufu",
    label: "ふふ 宿泊",
    href: "/points/fufu",
    logo: "/images/fufu-logo.png",
    bgColor: "bg-white",
  },
];

// Benefits
const benefits = [
  {
    id: "lounge",
    label: "ラウンジパス",
    href: "/points/lounge",
    logo: "/images/dragonpass-logo.png",
    bgColor: "bg-white",
  },
];

export default function PointsPage() {
  return (
    <div className="min-h-full bg-luxbrown-90 pb-6">
      <div className="px-4 pt-8 space-y-8 ">
        {/* Points Card */}
        <div className="bg-luxbrown-80 rounded-xl p-4 space-y-4">
          <div className="space-y-1">
            <p className="text-header-medium font-semibold text-white font-sf-display">
              President Cardポイント
            </p>
            <p className="text-[40px] font-semibold text-white font-sf-display tabular-nums">
              {mockPoints.current.toLocaleString()}
            </p>
          </div>

          {/* Cumulative Points Badge */}
          <div className="inline-flex items-center gap-1 bg-luxbrown-70 px-3 py-2 rounded-full">
            <span className="text-[11px] font-semibold text-white tracking-wide">
              累計ポイント
            </span>
            <span className="text-[11px] font-semibold text-white tabular-nums">
              {mockPoints.cumulative.toLocaleString()}
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-60" />

          {/* Points History Link */}
          <Link
            href="/points/history"
            className="block text-body-medium font-medium text-lightgreen-90 tracking-tight"
          >
            ポイント履歴
          </Link>
        </div>

        {/* Points Exchange Section */}
        <div className="space-y-4">
          <h2 className="text-[16px] font-semibold text-white tracking-wide">
            ポイント交換
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {exchangeOptions.map((option) => (
              <Link key={option.id} href={option.href} className="space-y-2">
                <p className="text-[13px] font-semibold text-white tracking-wide">
                  {option.label}
                </p>
                <div className={`${option.bgColor} rounded-xl h-[108px] border border-gray-70 flex items-center justify-center`}>
                  {option.id === "jal" && (
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto flex items-center justify-center">
                        <svg viewBox="0 0 100 80" className="w-16 h-14">
                          <circle cx="50" cy="35" r="28" fill="#E60012" />
                          <text x="50" y="42" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">JAL</text>
                          <text x="50" y="70" textAnchor="middle" fill="#E60012" fontSize="8" fontWeight="500">JAPAN AIRLINES</text>
                        </svg>
                      </div>
                    </div>
                  )}
                  {option.id === "amazon" && (
                    <div className="text-center">
                      <svg viewBox="0 0 120 40" className="w-24 h-8">
                        <text x="60" y="25" textAnchor="middle" fill="#232F3E" fontSize="20" fontWeight="bold">amazon</text>
                        <path d="M15 32 Q60 45 105 32" stroke="#FF9900" strokeWidth="3" fill="none" />
                      </svg>
                    </div>
                  )}
                  {option.id === "cashback" && (
                    <div className="text-center">
                      <p className="text-[11px] font-semibold text-gray-90 tracking-wider">PRESIDENT CARD</p>
                    </div>
                  )}
                  {option.id === "fufu" && (
                    <div className="text-center">
                      <p className="text-[24px] font-light text-gray-90" style={{ fontFamily: "serif" }}>ふふ</p>
                      <p className="text-[8px] text-gray-60 tracking-widest">FUFU JAPAN</p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="space-y-4">
          <h2 className="text-[16px] font-semibold text-white tracking-wide">
            特典
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {benefits.map((benefit) => (
              <Link key={benefit.id} href={benefit.href} className="space-y-2">
                <p className="text-[13px] font-semibold text-white tracking-wide">
                  {benefit.label}
                </p>
                <div className={`${benefit.bgColor} rounded-xl h-[108px] border border-gray-70 flex items-center justify-center`}>
                  <p className="text-[16px] font-bold text-[#1E3A5F]">Dragonpass<span className="text-[#E60012]">.</span></p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
