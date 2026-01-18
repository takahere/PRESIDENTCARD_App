"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface StatusBarProps {
  variant?: "light" | "dark";
  className?: string;
}

/**
 * StatusBar - iOSスタイルのステータスバー
 *
 * variant:
 * - "light": 白いテキスト/アイコン（暗い背景用）
 * - "dark": 黒いテキスト/アイコン（明るい背景用）
 */
export function StatusBar({ variant = "light", className }: StatusBarProps) {
  const [time, setTime] = useState("9:41");

  useEffect(() => {
    // 現在時刻を表示
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const textColor = variant === "light" ? "text-white" : "text-black";
  const fillColor = variant === "light" ? "white" : "black";

  return (
    <div
      className={cn(
        "h-[54px] w-full flex items-center justify-between px-6",
        className
      )}
    >
      {/* Time - Left side */}
      <div className="flex-1">
        <span
          className={cn(
            "text-[17px] font-semibold font-sf-pro",
            textColor
          )}
        >
          {time}
        </span>
      </div>

      {/* Icons - Right side */}
      <div className="flex items-center gap-[6px]">
        {/* Cellular Signal */}
        <svg
          width="19"
          height="12"
          viewBox="0 0 19 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0" y="8" width="3" height="4" rx="0.5" fill={fillColor} />
          <rect x="4" y="5" width="3" height="7" rx="0.5" fill={fillColor} />
          <rect x="8" y="2" width="3" height="10" rx="0.5" fill={fillColor} />
          <rect x="12" y="0" width="3" height="12" rx="0.5" fill={fillColor} />
        </svg>

        {/* WiFi */}
        <svg
          width="17"
          height="12"
          viewBox="0 0 17 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.5 2.5C10.9 2.5 13.1 3.4 14.7 4.9L16 3.6C14 1.7 11.4 0.5 8.5 0.5C5.6 0.5 3 1.7 1 3.6L2.3 4.9C3.9 3.4 6.1 2.5 8.5 2.5Z"
            fill={fillColor}
          />
          <path
            d="M8.5 5.5C10.1 5.5 11.6 6.1 12.7 7.1L14 5.8C12.5 4.4 10.6 3.5 8.5 3.5C6.4 3.5 4.5 4.4 3 5.8L4.3 7.1C5.4 6.1 6.9 5.5 8.5 5.5Z"
            fill={fillColor}
          />
          <path
            d="M8.5 8.5C9.4 8.5 10.2 8.8 10.8 9.4L12 8.2C11.1 7.3 9.9 6.5 8.5 6.5C7.1 6.5 5.9 7.3 5 8.2L6.2 9.4C6.8 8.8 7.6 8.5 8.5 8.5Z"
            fill={fillColor}
          />
          <circle cx="8.5" cy="11" r="1.5" fill={fillColor} />
        </svg>

        {/* Battery */}
        <div className="flex items-center gap-[2px]">
          <div
            className={cn(
              "w-[25px] h-[12px] rounded-[4px] border-[1.5px]",
              variant === "light" ? "border-white/40" : "border-black/40"
            )}
          >
            <div
              className={cn(
                "w-[21px] h-[8px] rounded-[2px] ml-[0.5px] mt-[0.5px]",
                variant === "light" ? "bg-white" : "bg-black"
              )}
            />
          </div>
          <div
            className={cn(
              "w-[2px] h-[5px] rounded-r-[1px]",
              variant === "light" ? "bg-white/40" : "bg-black/40"
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default StatusBar;
