"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

// Helper to generate year/month/day arrays
function generateYears(min: number, max: number): number[] {
  const years: number[] = [];
  for (let y = min; y <= max; y++) {
    years.push(y);
  }
  return years;
}

function generateMonths(): number[] {
  return Array.from({ length: 12 }, (_, i) => i + 1);
}

function generateDays(year: number, month: number): number[] {
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
}

interface WheelColumnProps {
  items: { value: number; label: string }[];
  selectedValue: number;
  onSelect: (value: number) => void;
}

function WheelColumn({ items, selectedValue, onSelect }: WheelColumnProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemHeight = 36;
  const visibleItems = 5;
  const [isScrolling, setIsScrolling] = useState(false);

  // Scroll to selected item on mount and when value changes
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

    // Snap to nearest item
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

export function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
}: DatePickerProps) {
  const currentYear = new Date().getFullYear();
  const minYear = minDate?.getFullYear() ?? currentYear - 50;
  const maxYear = maxDate?.getFullYear() ?? currentYear + 10;

  const years = generateYears(minYear, maxYear);
  const months = generateMonths();
  const days = generateDays(value.getFullYear(), value.getMonth() + 1);

  const handleYearChange = (year: number) => {
    const newDate = new Date(value);
    newDate.setFullYear(year);
    // Adjust day if needed
    const daysInMonth = new Date(year, newDate.getMonth() + 1, 0).getDate();
    if (newDate.getDate() > daysInMonth) {
      newDate.setDate(daysInMonth);
    }
    onChange(newDate);
  };

  const handleMonthChange = (month: number) => {
    const newDate = new Date(value);
    newDate.setMonth(month - 1);
    // Adjust day if needed
    const daysInMonth = new Date(
      newDate.getFullYear(),
      month,
      0
    ).getDate();
    if (newDate.getDate() > daysInMonth) {
      newDate.setDate(daysInMonth);
    }
    onChange(newDate);
  };

  const handleDayChange = (day: number) => {
    const newDate = new Date(value);
    newDate.setDate(day);
    onChange(newDate);
  };

  const yearItems = years.map((y) => ({ value: y, label: `${y}年` }));
  const monthItems = months.map((m) => ({ value: m, label: `${m}月` }));
  const dayItems = days.map((d) => ({ value: d, label: `${d}日` }));

  return (
    <div className="bg-white rounded-2xl p-2">
      <div className="flex gap-1">
        <WheelColumn
          items={yearItems}
          selectedValue={value.getFullYear()}
          onSelect={handleYearChange}
        />
        <WheelColumn
          items={monthItems}
          selectedValue={value.getMonth() + 1}
          onSelect={handleMonthChange}
        />
        <WheelColumn
          items={dayItems}
          selectedValue={value.getDate()}
          onSelect={handleDayChange}
        />
      </div>
    </div>
  );
}
