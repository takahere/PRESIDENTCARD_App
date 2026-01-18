/**
 * Canvas機能のlocalStorage操作
 *
 * SSR対応のストレージユーティリティ
 */

import {
  STORAGE_KEYS,
  type ScreenTransition,
  type ScreenComment,
  type FlowDiagramSettings,
} from "./types";

// SSR対応: クライアントサイドかどうかを判定
const isClient = typeof window !== "undefined";

// ============================================
// 汎用ストレージ操作
// ============================================

/**
 * localStorageから値を取得（SSR対応）
 */
function getStoredValue<T>(key: string, defaultValue: T): T {
  if (!isClient) return defaultValue;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * localStorageに値を保存
 */
function setStoredValue<T>(key: string, value: T): void {
  if (!isClient) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to save to localStorage: ${key}`, error);
  }
}

// ============================================
// 遷移図データ
// ============================================

/**
 * 遷移データを取得
 */
export function getTransitions(): ScreenTransition[] {
  return getStoredValue<ScreenTransition[]>(STORAGE_KEYS.TRANSITIONS, []);
}

/**
 * 遷移データを保存
 */
export function saveTransitions(transitions: ScreenTransition[]): void {
  setStoredValue(STORAGE_KEYS.TRANSITIONS, transitions);
}

/**
 * 遷移を追加
 */
export function addTransition(transition: ScreenTransition): ScreenTransition[] {
  const current = getTransitions();
  // 重複チェック（同じfrom/toの組み合わせ）
  const exists = current.some(
    (t) => t.fromPath === transition.fromPath && t.toPath === transition.toPath
  );
  if (exists) return current;

  const updated = [...current, transition];
  saveTransitions(updated);
  return updated;
}

/**
 * 遷移を削除
 */
export function deleteTransition(id: string): ScreenTransition[] {
  const current = getTransitions();
  const updated = current.filter((t) => t.id !== id);
  saveTransitions(updated);
  return updated;
}

// ============================================
// コメントデータ
// ============================================

/**
 * コメントデータを取得
 */
export function getComments(): ScreenComment[] {
  return getStoredValue<ScreenComment[]>(STORAGE_KEYS.COMMENTS, []);
}

/**
 * コメントデータを保存
 */
export function saveComments(comments: ScreenComment[]): void {
  setStoredValue(STORAGE_KEYS.COMMENTS, comments);
}

/**
 * コメントを追加または更新
 */
export function upsertComment(
  screenPath: string,
  content: string
): ScreenComment[] {
  const current = getComments();
  const existingIndex = current.findIndex((c) => c.screenPath === screenPath);
  const now = new Date().toISOString();

  if (existingIndex >= 0) {
    // 更新
    if (content.trim() === "") {
      // 空の場合は削除
      const updated = current.filter((_, i) => i !== existingIndex);
      saveComments(updated);
      return updated;
    }
    const updated = [...current];
    updated[existingIndex] = {
      ...updated[existingIndex],
      content,
      updatedAt: now,
    };
    saveComments(updated);
    return updated;
  } else if (content.trim() !== "") {
    // 新規追加（空でない場合のみ）
    const newComment: ScreenComment = {
      id: `comment_${screenPath.replace(/\//g, "_")}_${Date.now()}`,
      screenPath,
      content,
      updatedAt: now,
    };
    const updated = [...current, newComment];
    saveComments(updated);
    return updated;
  }

  return current;
}

/**
 * コメントを削除
 */
export function deleteComment(screenPath: string): ScreenComment[] {
  const current = getComments();
  const updated = current.filter((c) => c.screenPath !== screenPath);
  saveComments(updated);
  return updated;
}

/**
 * 特定スクリーンのコメントを取得
 */
export function getCommentByPath(screenPath: string): ScreenComment | undefined {
  const comments = getComments();
  return comments.find((c) => c.screenPath === screenPath);
}

// ============================================
// 設定データ
// ============================================

const DEFAULT_SETTINGS: FlowDiagramSettings = {
  showAutoDetected: true,
  showManual: true,
  editMode: false,
};

/**
 * 設定を取得
 */
export function getSettings(): FlowDiagramSettings {
  return getStoredValue<FlowDiagramSettings>(
    STORAGE_KEYS.SETTINGS,
    DEFAULT_SETTINGS
  );
}

/**
 * 設定を保存
 */
export function saveSettings(settings: FlowDiagramSettings): void {
  setStoredValue(STORAGE_KEYS.SETTINGS, settings);
}

/**
 * 設定を更新
 */
export function updateSettings(
  partial: Partial<FlowDiagramSettings>
): FlowDiagramSettings {
  const current = getSettings();
  const updated = { ...current, ...partial };
  saveSettings(updated);
  return updated;
}
