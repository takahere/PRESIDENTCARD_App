/**
 * 自動遷移検出
 *
 * コード内のLink/router.pushから遷移を検出
 *
 * 注意: ブラウザ環境ではファイルシステムにアクセスできないため、
 * 既知の遷移をハードコードしています。
 * 将来的にはAPIを通じてサーバーサイドで解析する方法に拡張可能です。
 */

import type { ScreenTransition } from "./types";

interface DetectedTransition {
  fromPath: string;
  toPath: string;
  label?: string;
}

/**
 * 既知の遷移一覧
 *
 * コードベースを解析して特定した遷移:
 * - TabBar.tsx: 各タブ間のLink
 * - points/page.tsx: ポイント関連画面へのLink
 * - home/page.tsx: 利用履歴へのrouter.push
 * - onboarding/*: 次画面へのrouter.push
 */
const KNOWN_TRANSITIONS: DetectedTransition[] = [
  // TabBar遷移
  { fromPath: "/home", toPath: "/points", label: "タブ" },
  { fromPath: "/home", toPath: "/account", label: "タブ" },
  { fromPath: "/points", toPath: "/home", label: "タブ" },
  { fromPath: "/points", toPath: "/account", label: "タブ" },
  { fromPath: "/account", toPath: "/home", label: "タブ" },
  { fromPath: "/account", toPath: "/points", label: "タブ" },

  // ホーム画面から
  { fromPath: "/home", toPath: "/history", label: "利用履歴" },

  // ポイント画面から
  { fromPath: "/points", toPath: "/points/history", label: "履歴" },
  { fromPath: "/points", toPath: "/points/jal", label: "JALマイル" },
  { fromPath: "/points", toPath: "/points/amazon", label: "Amazon" },
  { fromPath: "/points", toPath: "/points/cashback", label: "キャッシュバック" },

  // ポイント詳細から戻る
  { fromPath: "/points/history", toPath: "/points" },
  { fromPath: "/points/jal", toPath: "/points" },
  { fromPath: "/points/amazon", toPath: "/points" },
  { fromPath: "/points/cashback", toPath: "/points" },

  // オンボーディングフロー（順序通り）
  { fromPath: "/onboarding", toPath: "/onboarding/terms", label: "次へ" },
  { fromPath: "/onboarding/terms", toPath: "/onboarding/email-verification", label: "同意" },
  { fromPath: "/onboarding/email-verification", toPath: "/onboarding/identity-preparation", label: "確認完了" },
  { fromPath: "/onboarding/identity-preparation", toPath: "/onboarding/ekyc", label: "開始" },
  { fromPath: "/onboarding/ekyc", toPath: "/onboarding/company", label: "次へ" },
  { fromPath: "/onboarding/company", toPath: "/onboarding/review", label: "次へ" },
  { fromPath: "/onboarding/review", toPath: "/onboarding/complete", label: "提出" },
];

/**
 * 自動検出された遷移を取得
 */
export function getAutoDetectedTransitions(): Omit<ScreenTransition, "id" | "type">[] {
  return KNOWN_TRANSITIONS.map((t) => ({
    fromPath: t.fromPath,
    toPath: t.toPath,
    label: t.label,
  }));
}

/**
 * 特定のスクリーンからの遷移を取得
 */
export function getTransitionsFrom(fromPath: string): DetectedTransition[] {
  return KNOWN_TRANSITIONS.filter((t) => t.fromPath === fromPath);
}

/**
 * 特定のスクリーンへの遷移を取得
 */
export function getTransitionsTo(toPath: string): DetectedTransition[] {
  return KNOWN_TRANSITIONS.filter((t) => t.toPath === toPath);
}

/**
 * メインフロー（TabBar以外）の遷移のみを取得
 */
export function getMainFlowTransitions(): Omit<ScreenTransition, "id" | "type">[] {
  return KNOWN_TRANSITIONS.filter((t) => t.label !== "タブ").map((t) => ({
    fromPath: t.fromPath,
    toPath: t.toPath,
    label: t.label,
  }));
}

/**
 * オンボーディングフローの遷移のみを取得
 */
export function getOnboardingFlowTransitions(): Omit<ScreenTransition, "id" | "type">[] {
  return KNOWN_TRANSITIONS.filter(
    (t) => t.fromPath.startsWith("/onboarding") && t.toPath.startsWith("/onboarding")
  ).map((t) => ({
    fromPath: t.fromPath,
    toPath: t.toPath,
    label: t.label,
  }));
}
