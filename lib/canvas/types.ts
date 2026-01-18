/**
 * Canvas機能の型定義
 *
 * 遷移図とスクリーンコメント機能で使用する型を定義
 */

// ============================================
// 遷移図機能
// ============================================

/**
 * 画面遷移のコネクション
 */
export interface ScreenTransition {
  id: string;
  fromPath: string;
  toPath: string;
  type: "auto" | "manual";
  label?: string;
}

/**
 * 遷移図の設定
 */
export interface FlowDiagramSettings {
  showAutoDetected: boolean;
  showManual: boolean;
  editMode: boolean;
}

/**
 * スクリーンの位置情報（矢印描画用）
 */
export interface ScreenPosition {
  path: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

// ============================================
// スクリーンコメント機能
// ============================================

/**
 * スクリーンに紐づくコメント
 */
export interface ScreenComment {
  id: string;
  screenPath: string;
  content: string;
  updatedAt: string;
}

// ============================================
// ストレージ
// ============================================

/**
 * localStorageに保存する全データ
 */
export interface CanvasStorageData {
  transitions: ScreenTransition[];
  comments: ScreenComment[];
  settings: FlowDiagramSettings;
}

/**
 * localStorageキー
 */
export const STORAGE_KEYS = {
  TRANSITIONS: "presidentcard_canvas_transitions",
  COMMENTS: "presidentcard_canvas_comments",
  SETTINGS: "presidentcard_canvas_settings",
} as const;
