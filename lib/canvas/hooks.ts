/**
 * Canvas機能のReactフック
 *
 * 遷移図とコメントの状態管理
 */

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  type ScreenTransition,
  type ScreenComment,
  type FlowDiagramSettings,
} from "./types";
import {
  getTransitions,
  saveTransitions,
  addTransition as addTransitionToStorage,
  deleteTransition as deleteTransitionFromStorage,
  getComments,
  upsertComment,
  deleteComment as deleteCommentFromStorage,
  getSettings,
  updateSettings,
} from "./storage";

// ============================================
// 遷移図フック
// ============================================

export function useTransitions() {
  const [transitions, setTransitions] = useState<ScreenTransition[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 初期ロード
  useEffect(() => {
    setTransitions(getTransitions());
    setIsLoading(false);
  }, []);

  // 遷移を追加
  const addTransition = useCallback(
    (fromPath: string, toPath: string, label?: string) => {
      const newTransition: ScreenTransition = {
        id: `trans_${Date.now()}`,
        fromPath,
        toPath,
        type: "manual",
        label,
      };
      const updated = addTransitionToStorage(newTransition);
      setTransitions(updated);
      return newTransition;
    },
    []
  );

  // 遷移を削除
  const removeTransition = useCallback((id: string) => {
    const updated = deleteTransitionFromStorage(id);
    setTransitions(updated);
  }, []);

  // 自動検出結果をマージ
  const mergeAutoDetected = useCallback(
    (autoTransitions: Omit<ScreenTransition, "id" | "type">[]) => {
      const current = getTransitions();
      // 既存の手動遷移を保持
      const manualOnly = current.filter((t) => t.type === "manual");

      // 自動検出結果を追加（重複除外）
      const autoWithIds: ScreenTransition[] = autoTransitions
        .filter(
          (auto) =>
            !manualOnly.some(
              (m) => m.fromPath === auto.fromPath && m.toPath === auto.toPath
            )
        )
        .map((auto, i) => ({
          ...auto,
          id: `auto_${i}_${auto.fromPath}_${auto.toPath}`.replace(/\//g, "_"),
          type: "auto" as const,
        }));

      const merged = [...manualOnly, ...autoWithIds];
      saveTransitions(merged);
      setTransitions(merged);
    },
    []
  );

  // すべてクリア
  const clearAll = useCallback(() => {
    saveTransitions([]);
    setTransitions([]);
  }, []);

  return {
    transitions,
    isLoading,
    addTransition,
    removeTransition,
    mergeAutoDetected,
    clearAll,
  };
}

// ============================================
// コメントフック
// ============================================

export function useComments() {
  const [comments, setComments] = useState<ScreenComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 初期ロード
  useEffect(() => {
    setComments(getComments());
    setIsLoading(false);
  }, []);

  // コメントを取得（特定スクリーン）
  const getComment = useCallback(
    (screenPath: string): string => {
      const comment = comments.find((c) => c.screenPath === screenPath);
      return comment?.content || "";
    },
    [comments]
  );

  // コメントを更新（デバウンス用のrefを使用）
  const updateComment = useCallback(
    (screenPath: string, content: string) => {
      const updated = upsertComment(screenPath, content);
      setComments(updated);
    },
    []
  );

  // コメントを削除
  const removeComment = useCallback((screenPath: string) => {
    const updated = deleteCommentFromStorage(screenPath);
    setComments(updated);
  }, []);

  return {
    comments,
    isLoading,
    getComment,
    updateComment,
    removeComment,
  };
}

// ============================================
// 設定フック
// ============================================

export function useFlowDiagramSettings() {
  const [settings, setSettings] = useState<FlowDiagramSettings>({
    showAutoDetected: true,
    showManual: true,
    editMode: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  // 初期ロード
  useEffect(() => {
    setSettings(getSettings());
    setIsLoading(false);
  }, []);

  // 設定を更新
  const update = useCallback((partial: Partial<FlowDiagramSettings>) => {
    const updated = updateSettings(partial);
    setSettings(updated);
  }, []);

  // トグル関数
  const toggleAutoDetected = useCallback(() => {
    update({ showAutoDetected: !settings.showAutoDetected });
  }, [settings.showAutoDetected, update]);

  const toggleManual = useCallback(() => {
    update({ showManual: !settings.showManual });
  }, [settings.showManual, update]);

  const toggleEditMode = useCallback(() => {
    update({ editMode: !settings.editMode });
  }, [settings.editMode, update]);

  return {
    settings,
    isLoading,
    update,
    toggleAutoDetected,
    toggleManual,
    toggleEditMode,
  };
}

// ============================================
// デバウンスフック（コメント入力用）
// ============================================

export function useDebouncedCallback<T extends (...args: Parameters<T>) => void>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}
