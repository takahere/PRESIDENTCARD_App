"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import type { ScreenTransition, ScreenPosition } from "@/lib/canvas/types";
import { calculateConnectionPath } from "@/lib/canvas/geometry";

interface TransitionArrowProps {
  transition: ScreenTransition;
  fromPosition: ScreenPosition;
  toPosition: ScreenPosition;
  isSelected: boolean;
  editMode: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

/**
 * スクリーン間の遷移を表す矢印
 */
export const TransitionArrow = memo(function TransitionArrow({
  transition,
  fromPosition,
  toPosition,
  isSelected,
  editMode,
  onSelect,
  onDelete,
}: TransitionArrowProps) {
  const { path, start, end } = calculateConnectionPath(fromPosition, toPosition);

  // 色の決定
  const isAuto = transition.type === "auto";
  const strokeColor = isAuto
    ? isSelected
      ? "#60a5fa" // blue-400
      : "#3b82f6" // blue-500
    : isSelected
    ? "#f97316" // orange-500
    : "#fb923c"; // orange-400

  const strokeWidth = isSelected ? 3 : 2;

  // ラベル位置（パスの中点付近）
  const labelX = (start.x + end.x) / 2;
  const labelY = (start.y + end.y) / 2 - 10;

  return (
    <g className="transition-arrow">
      {/* 矢印パス */}
      <motion.path
        d={path}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        markerEnd={`url(#arrow-${transition.type})`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          cursor: editMode ? "pointer" : "default",
          pointerEvents: editMode ? "stroke" : "none",
        }}
        onClick={(e) => {
          if (editMode) {
            e.stopPropagation();
            onSelect();
          }
        }}
      />

      {/* ヒットエリア（クリックしやすくするための透明パス） */}
      {editMode && (
        <path
          d={path}
          fill="none"
          stroke="transparent"
          strokeWidth={20}
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        />
      )}

      {/* ラベル */}
      {transition.label && (
        <g transform={`translate(${labelX}, ${labelY})`}>
          <rect
            x={-30}
            y={-10}
            width={60}
            height={20}
            rx={4}
            fill="rgba(0,0,0,0.7)"
          />
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize={10}
            fontFamily="system-ui"
          >
            {transition.label}
          </text>
        </g>
      )}

      {/* 選択時の削除ボタン */}
      {isSelected && editMode && (
        <g
          transform={`translate(${labelX + 40}, ${labelY})`}
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <circle r={12} fill="#ef4444" />
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize={14}
            fontWeight="bold"
          >
            ×
          </text>
        </g>
      )}
    </g>
  );
});
