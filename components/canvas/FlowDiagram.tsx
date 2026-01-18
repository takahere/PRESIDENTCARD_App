"use client";

import { useState, useEffect, useCallback, useRef, memo } from "react";
import { TransitionArrow } from "./TransitionArrow";
import type { ScreenTransition, ScreenPosition, FlowDiagramSettings } from "@/lib/canvas/types";
import { collectScreenPositions } from "@/lib/canvas/geometry";

interface FlowDiagramProps {
  transitions: ScreenTransition[];
  settings: FlowDiagramSettings;
  containerRef: React.RefObject<HTMLElement>;
  screenRefs: Map<string, HTMLElement>;
  onDeleteTransition: (id: string) => void;
  onAddTransition: (fromPath: string, toPath: string) => void;
}

/**
 * 遷移図のSVGオーバーレイ
 *
 * - スクリーン間の矢印を描画
 * - 編集モードでは接続の追加・削除が可能
 */
export const FlowDiagram = memo(function FlowDiagram({
  transitions,
  settings,
  containerRef,
  screenRefs,
  onDeleteTransition,
  onAddTransition,
}: FlowDiagramProps) {
  const [positions, setPositions] = useState<Map<string, ScreenPosition>>(new Map());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [connectFrom, setConnectFrom] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // スクリーン位置を更新
  const updatePositions = useCallback(() => {
    if (!containerRef.current) return;
    const newPositions = collectScreenPositions(containerRef.current, screenRefs);
    setPositions(newPositions);
  }, [containerRef, screenRefs]);

  // 初期化とリサイズ対応
  useEffect(() => {
    updatePositions();

    const observer = new ResizeObserver(() => {
      updatePositions();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener("resize", updatePositions);
    window.addEventListener("scroll", updatePositions, true);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePositions);
      window.removeEventListener("scroll", updatePositions, true);
    };
  }, [updatePositions, containerRef]);

  // screenRefsが変更されたら位置を更新
  useEffect(() => {
    updatePositions();
  }, [screenRefs.size, updatePositions]);

  // 表示する遷移をフィルタリング
  const visibleTransitions = transitions.filter((t) => {
    if (t.type === "auto" && !settings.showAutoDetected) return false;
    if (t.type === "manual" && !settings.showManual) return false;
    return true;
  });

  // 選択解除
  const handleBackgroundClick = () => {
    setSelectedId(null);
    setConnectFrom(null);
  };

  // 接続モードのクリック処理
  const handleScreenClick = useCallback(
    (path: string) => {
      if (!settings.editMode) return;

      if (connectFrom === null) {
        // 接続開始
        setConnectFrom(path);
      } else if (connectFrom === path) {
        // 同じスクリーンをクリック→キャンセル
        setConnectFrom(null);
      } else {
        // 接続完了
        onAddTransition(connectFrom, path);
        setConnectFrom(null);
      }
    },
    [connectFrom, settings.editMode, onAddTransition]
  );

  // SVGのサイズを計算
  const svgWidth = containerRef.current?.scrollWidth || 0;
  const svgHeight = containerRef.current?.scrollHeight || 0;

  if (positions.size === 0) return null;

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        width: svgWidth,
        height: svgHeight,
        zIndex: 10,
      }}
      onClick={handleBackgroundClick}
    >
      {/* 矢印マーカー定義 */}
      <defs>
        <marker
          id="arrow-auto"
          viewBox="0 0 10 10"
          refX="10"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
        </marker>
        <marker
          id="arrow-manual"
          viewBox="0 0 10 10"
          refX="10"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#fb923c" />
        </marker>
      </defs>

      {/* 遷移矢印 */}
      {visibleTransitions.map((transition) => {
        const fromPos = positions.get(transition.fromPath);
        const toPos = positions.get(transition.toPath);

        if (!fromPos || !toPos) return null;

        return (
          <TransitionArrow
            key={transition.id}
            transition={transition}
            fromPosition={fromPos}
            toPosition={toPos}
            isSelected={selectedId === transition.id}
            editMode={settings.editMode}
            onSelect={() => setSelectedId(transition.id)}
            onDelete={() => {
              onDeleteTransition(transition.id);
              setSelectedId(null);
            }}
          />
        );
      })}

      {/* 接続モード中のハイライト */}
      {settings.editMode && connectFrom && (
        <>
          {/* 接続元のハイライト */}
          {positions.get(connectFrom) && (
            <rect
              x={positions.get(connectFrom)!.x - 4}
              y={positions.get(connectFrom)!.y - 4}
              width={positions.get(connectFrom)!.width + 8}
              height={positions.get(connectFrom)!.height + 8}
              rx={8}
              fill="none"
              stroke="#22c55e"
              strokeWidth={3}
              strokeDasharray="8 4"
              className="animate-pulse"
            />
          )}
          {/* 接続先候補のハイライト */}
          {Array.from(positions.entries()).map(([path, pos]) => {
            if (path === connectFrom) return null;
            return (
              <rect
                key={path}
                x={pos.x - 2}
                y={pos.y - 2}
                width={pos.width + 4}
                height={pos.height + 4}
                rx={6}
                fill="rgba(34, 197, 94, 0.1)"
                stroke="#22c55e"
                strokeWidth={1}
                strokeDasharray="4 2"
                style={{ pointerEvents: "auto", cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleScreenClick(path);
                }}
              />
            );
          })}
        </>
      )}

      {/* 編集モード中のクリック領域 */}
      {settings.editMode && !connectFrom && (
        <>
          {Array.from(positions.entries()).map(([path, pos]) => (
            <rect
              key={path}
              x={pos.x}
              y={pos.y}
              width={pos.width}
              height={pos.height}
              fill="transparent"
              style={{ pointerEvents: "auto", cursor: "crosshair" }}
              onClick={(e) => {
                e.stopPropagation();
                handleScreenClick(path);
              }}
            />
          ))}
        </>
      )}
    </svg>
  );
});

export default FlowDiagram;
