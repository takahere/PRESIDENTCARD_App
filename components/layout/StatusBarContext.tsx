"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type StatusBarVariant = "light" | "dark";

interface StatusBarContextType {
  variant: StatusBarVariant;
  setVariant: (variant: StatusBarVariant) => void;
}

const StatusBarContext = createContext<StatusBarContextType | null>(null);

interface StatusBarProviderProps {
  children: ReactNode;
  defaultVariant?: StatusBarVariant;
}

export function StatusBarProvider({
  children,
  defaultVariant = "light",
}: StatusBarProviderProps) {
  const [variant, setVariantState] = useState<StatusBarVariant>(defaultVariant);

  const setVariant = useCallback((newVariant: StatusBarVariant) => {
    setVariantState(newVariant);
  }, []);

  return (
    <StatusBarContext.Provider value={{ variant, setVariant }}>
      {children}
    </StatusBarContext.Provider>
  );
}

/**
 * useStatusBar - ステータスバーのバリアントを取得・設定するhook
 *
 * 使用例:
 * ```tsx
 * const { setVariant } = useStatusBar();
 *
 * useEffect(() => {
 *   setVariant("dark"); // 白い背景のページでは黒いステータスバー
 *   return () => setVariant("light"); // クリーンアップで元に戻す
 * }, [setVariant]);
 * ```
 */
export function useStatusBar() {
  const context = useContext(StatusBarContext);
  if (!context) {
    // コンテキストがない場合はデフォルト値を返す（エラーにしない）
    return {
      variant: "light" as StatusBarVariant,
      setVariant: () => {},
    };
  }
  return context;
}

export default StatusBarProvider;
