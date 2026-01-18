"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TimePickerProps {
  value: { hour: number; minute: number };
  onChange: (time: { hour: number; minute: number }) => void;
  minuteInterval?: 1 | 5 | 15 | 30;
}

interface WheelColumnProps {
  items: { value: number; label: string }[];
  selectedValue: number;
  onSelect: (value: number) => void;
}

function WheelColumn({ items, selectedValue, onSelect }: WheelColumnProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemHeight = 36;
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (containerRef.current && !isScrolling) {
      const index = items.findIndex((item) => item.value === selectedValue);
      if (index !== -1) {
        containerRef.current.scrollTop = index * itemHeight;
      }
    }
  }, [selectedValue, items, isScrolling]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    setIsScrolling(true);

    const scrollTop = containerRef.current.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    const clampedIndex = Math.max(0, Math.min(index, items.length - 1));
    const newValue = items[clampedIndex]?.value;

    if (newValue !== undefined && newValue !== selectedValue) {
      onSelect(newValue);
    }
  };

  const handleScrollEnd = () => {
    if (!containerRef.current) return;
    setIsScrolling(false);

    const scrollTop = containerRef.current.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    containerRef.current.scrollTo({
      top: index * itemHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative h-[180px] flex-1">
      {/* Selection indicator */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[36px] bg-gray-100 rounded-lg pointer-events-none z-0" />

      {/* Gradient overlays */}
      <div className="absolute left-0 right-0 top-0 h-[72px] bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
      <div className="absolute left-0 right-0 bottom-0 h-[72px] bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />

      {/* Scrollable container */}
      <div
        ref={containerRef}
        className="h-full overflow-y-scroll scrollbar-hide snap-y snap-mandatory"
        onScroll={handleScroll}
        onMouseUp={handleScrollEnd}
        onTouchEnd={handleScrollEnd}
        style={{
          paddingTop: itemHeight * 2,
          paddingBottom: itemHeight * 2,
        }}
      >
        {items.map((item) => (
          <div
            key={item.value}
            className={cn(
              "h-[36px] flex items-center justify-center text-[20px] font-sf-pro snap-center",
              item.value === selectedValue
                ? "text-gray-900 font-medium"
                : "text-gray-400"
            )}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TimePicker({
  value,
  onChange,
  minuteInterval = 1,
}: TimePickerProps) {
  // Generate hours (0-23)
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Generate minutes based on interval
  const minutes: number[] = [];
  for (let m = 0; m < 60; m += minuteInterval) {
    minutes.push(m);
  }

  const handleHourChange = (hour: number) => {
    onChange({ ...value, hour });
  };

  const handleMinuteChange = (minute: number) => {
    onChange({ ...value, minute });
  };

  const hourItems = hours.map((h) => ({
    value: h,
    label: h.toString().padStart(2, "0"),
  }));

  const minuteItems = minutes.map((m) => ({
    value: m,
    label: m.toString().padStart(2, "0"),
  }));

  return (
    <div className="bg-white rounded-2xl p-2">
      <div className="flex items-center gap-1">
        <WheelColumn
          items={hourItems}
          selectedValue={value.hour}
          onSelect={handleHourChange}
        />
        <span className="text-[20px] font-medium text-gray-900">:</span>
        <WheelColumn
          items={minuteItems}
          selectedValue={value.minute}
          onSelect={handleMinuteChange}
        />
      </div>
    </div>
  );
}
