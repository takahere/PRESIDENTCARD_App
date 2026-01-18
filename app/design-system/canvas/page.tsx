"use client";

import { useState, useRef, useCallback, useEffect, memo } from "react";
import { ChevronDown, MessageSquare, GitBranch, Pencil, Zap } from "lucide-react";
import { mainScreens, onboardingScreens } from "@/lib/screens";
import { useComments, useTransitions, useFlowDiagramSettings } from "@/lib/canvas/hooks";
import { ScreenComment } from "@/components/canvas/ScreenComment";
import { FlowDiagram } from "@/components/canvas/FlowDiagram";
import { getMainFlowTransitions, getOnboardingFlowTransitions } from "@/lib/canvas/auto-detect";

const zoomLevels = [
  { value: 0.25, label: "25%" },
  { value: 0.5, label: "50%" },
  { value: 0.75, label: "75%" },
  { value: 1, label: "100%" },
];

// iPhoneフレームのサイズ
const FRAME_WIDTH = 375;
const FRAME_HEIGHT = 812;
const BEZEL = 6;

interface ScreenPreviewProps {
  path: string;
  label: string;
  labelJa: string;
  zoom: number;
  comment: string;
  onCommentUpdate: (screenPath: string, content: string) => void;
  showComments: boolean;
  onFrameRef: (path: string, element: HTMLDivElement | null) => void;
}

const ScreenPreview = memo(function ScreenPreview({
  path,
  label,
  labelJa,
  zoom,
  comment,
  onCommentUpdate,
  showComments,
  onFrameRef,
}: ScreenPreviewProps) {
  // フレームサイズにベゼル分を追加
  const frameWidth = (FRAME_WIDTH + BEZEL * 2) * zoom;
  const frameHeight = (FRAME_HEIGHT + BEZEL * 2) * zoom;
  // スクリーンサイズ
  const screenWidth = FRAME_WIDTH * zoom;
  const screenHeight = FRAME_HEIGHT * zoom;

  return (
    <div className="flex flex-col items-center gap-3 flex-shrink-0">
      {/* ラベル */}
      <div className="text-center">
        <div className="text-sm font-medium text-white">{label}</div>
        <div className="text-xs text-white/50">{labelJa}</div>
      </div>

      {/* iPhoneフレーム */}
      <div
        ref={(el) => onFrameRef(path, el)}
        className="relative bg-black shadow-2xl"
        style={{
          width: frameWidth,
          height: frameHeight,
          borderRadius: 50 * zoom,
        }}
      >
        {/* Dynamic Island */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bg-black rounded-full z-10"
          style={{
            top: BEZEL * zoom + 8 * zoom,
            width: 126 * zoom,
            height: 35 * zoom,
          }}
        />

        {/* Screen content */}
        <div
          className="absolute overflow-hidden bg-luxbrown-90"
          style={{
            top: BEZEL * zoom,
            left: BEZEL * zoom,
            width: screenWidth,
            height: screenHeight,
            borderRadius: 44 * zoom,
          }}
        >
          <iframe
            key={path}
            src={`${path}?canvas=true`}
            className="border-0"
            style={{
              width: FRAME_WIDTH,
              height: FRAME_HEIGHT,
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
            }}
            title={label}
          />
        </div>

        {/* Home indicator */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bg-white/80 rounded-full"
          style={{
            bottom: BEZEL * zoom + 4 * zoom,
            width: 134 * zoom,
            height: 5 * zoom,
          }}
        />
      </div>

      {/* コメント欄 */}
      {showComments && (
        <div className="mt-2">
          <ScreenComment
            screenPath={path}
            initialValue={comment}
            onUpdate={onCommentUpdate}
            zoom={zoom}
          />
        </div>
      )}
    </div>
  );
});

export default function CanvasPage() {
  const [zoom, setZoom] = useState(0.5);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [showFlowDiagram, setShowFlowDiagram] = useState(true);

  // コメント機能
  const { getComment, updateComment } = useComments();

  // 遷移図機能
  const { transitions, addTransition, removeTransition, mergeAutoDetected } = useTransitions();
  const { settings, toggleEditMode, toggleAutoDetected } = useFlowDiagramSettings();

  // 初回ロード時に自動検出を実行
  useEffect(() => {
    const autoTransitions = [
      ...getMainFlowTransitions(),
      ...getOnboardingFlowTransitions(),
    ];
    mergeAutoDetected(autoTransitions);
  }, [mergeAutoDetected]);

  // スクリーン位置追跡用のref
  const containerRef = useRef<HTMLDivElement>(null);
  const screenRefsMap = useRef<Map<string, HTMLElement>>(new Map());

  // スクリーンのref登録
  const handleFrameRef = useCallback((path: string, element: HTMLDivElement | null) => {
    if (element) {
      screenRefsMap.current.set(path, element);
    } else {
      screenRefsMap.current.delete(path);
    }
  }, []);

  const currentZoomLabel = zoomLevels.find((z) => z.value === zoom)?.label || "50%";

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-neutral-900/95 backdrop-blur border-b border-white/10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">Canvas</h1>
            <p className="text-sm text-white/50">All screens overview</p>
          </div>

          <div className="flex items-center gap-3">
            {/* 遷移図表示トグル */}
            <button
              onClick={() => setShowFlowDiagram(!showFlowDiagram)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                showFlowDiagram
                  ? "bg-white/20 text-white"
                  : "bg-white/5 text-white/50 hover:bg-white/10"
              }`}
            >
              <GitBranch size={16} />
              <span>遷移図</span>
            </button>

            {/* 自動検出トグル */}
            {showFlowDiagram && (
              <button
                onClick={toggleAutoDetected}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  settings.showAutoDetected
                    ? "bg-blue-500/30 text-blue-400 border border-blue-500/50"
                    : "bg-white/5 text-white/50 hover:bg-white/10"
                }`}
              >
                <Zap size={16} />
                <span>自動</span>
              </button>
            )}

            {/* 編集モードトグル */}
            {showFlowDiagram && (
              <button
                onClick={toggleEditMode}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  settings.editMode
                    ? "bg-orange-500/30 text-orange-400 border border-orange-500/50"
                    : "bg-white/5 text-white/50 hover:bg-white/10"
                }`}
              >
                <Pencil size={16} />
                <span>編集</span>
              </button>
            )}

            {/* コメント表示トグル */}
            <button
              onClick={() => setShowComments(!showComments)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                showComments
                  ? "bg-white/20 text-white"
                  : "bg-white/5 text-white/50 hover:bg-white/10"
              }`}
            >
              <MessageSquare size={16} />
              <span>コメント</span>
            </button>

            {/* Zoom Control */}
            <div className="relative">
              <button
                onClick={() => setIsZoomOpen(!isZoomOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors"
              >
              <span>{currentZoomLabel}</span>
              <ChevronDown size={16} className={`transition-transform ${isZoomOpen ? "rotate-180" : ""}`} />
            </button>

            {isZoomOpen && (
              <div className="absolute right-0 mt-2 py-1 bg-neutral-800 rounded-lg shadow-xl border border-white/10 min-w-[100px]">
                {zoomLevels.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => {
                      setZoom(level.value);
                      setIsZoomOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                      zoom === level.value
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            )}
            </div>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div ref={containerRef} className="relative py-6 space-y-12">
        {/* 遷移図オーバーレイ */}
        {showFlowDiagram && (
          <FlowDiagram
            transitions={transitions}
            settings={settings}
            containerRef={containerRef as React.RefObject<HTMLElement>}
            screenRefs={screenRefsMap.current}
            onDeleteTransition={removeTransition}
            onAddTransition={addTransition}
          />
        )}

        {/* Main Screens */}
        <section>
          <h2 className="text-lg font-medium text-white mb-6 px-4">Main Screens</h2>
          <div className="flex gap-8 pb-4 px-4 overflow-x-auto scrollbar-hide">
            {mainScreens.map((screen) => (
              <ScreenPreview
                key={screen.path}
                {...screen}
                zoom={zoom}
                comment={getComment(screen.path)}
                onCommentUpdate={updateComment}
                showComments={showComments}
                onFrameRef={handleFrameRef}
              />
            ))}
            {/* Right padding spacer */}
            <div className="shrink-0 w-px" />
          </div>
        </section>

        {/* Onboarding Flow */}
        <section>
          <h2 className="text-lg font-medium text-white mb-6 px-4">Onboarding Flow</h2>
          <div className="flex gap-8 pb-4 px-4 overflow-x-auto scrollbar-hide">
            {onboardingScreens.map((screen) => (
              <ScreenPreview
                key={screen.path}
                {...screen}
                zoom={zoom}
                comment={getComment(screen.path)}
                onCommentUpdate={updateComment}
                showComments={showComments}
                onFrameRef={handleFrameRef}
              />
            ))}
            {/* Right padding spacer */}
            <div className="shrink-0 w-px" />
          </div>
        </section>

        {/* 編集モード時のヒント */}
        {settings.editMode && showFlowDiagram && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-lg text-orange-400 text-sm">
            スクリーンをクリックして接続を開始 → 別のスクリーンをクリックして接続
          </div>
        )}
      </div>
    </div>
  );
}
