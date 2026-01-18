/**
 * Centralized Screen Configuration
 *
 * このファイルはアプリ内のすべての画面定義を一元管理します。
 * 新しい画面を追加する場合は、このファイルに追加するだけで
 * Canvas、TabBar、Onboarding Progress などに自動的に反映されます。
 */

import { Home, Gift, User, type LucideIcon } from "lucide-react";

// 画面定義の型
export interface Screen {
  path: string;
  label: string;
  labelJa: string;
}

// TabBar用の拡張型
export interface TabBarScreen extends Screen {
  id: string;
  icon: LucideIcon;
}

/**
 * メイン画面（TabBarあり）
 *
 * 新しい画面を追加する場合:
 * 1. app/(main)/ 配下にページを作成
 * 2. この配列に追加
 */
export const mainScreens: Screen[] = [
  { path: "/home", label: "Home", labelJa: "ホーム" },
  { path: "/points", label: "Points", labelJa: "ポイント" },
  { path: "/points/history", label: "Point History", labelJa: "ポイント履歴" },
  { path: "/points/jal", label: "JAL Miles", labelJa: "JALマイル" },
  { path: "/points/amazon", label: "Amazon Gift", labelJa: "Amazonギフト" },
  { path: "/points/cashback", label: "Cashback", labelJa: "キャッシュバック" },
  { path: "/history", label: "History", labelJa: "利用履歴" },
  { path: "/account", label: "Account", labelJa: "アカウント" },
];

/**
 * オンボーディング画面
 *
 * 新しいステップを追加する場合:
 * 1. app/onboarding/ 配下にページを作成
 * 2. この配列に順番通りに追加
 */
export const onboardingScreens: Screen[] = [
  { path: "/onboarding", label: "Start", labelJa: "開始" },
  { path: "/onboarding/terms", label: "Terms", labelJa: "利用規約" },
  { path: "/onboarding/email-verification", label: "Email", labelJa: "メール認証" },
  { path: "/onboarding/identity-preparation", label: "Identity Prep", labelJa: "本人確認準備" },
  { path: "/onboarding/ekyc", label: "eKYC", labelJa: "本人確認" },
  { path: "/onboarding/company", label: "Company", labelJa: "会社情報" },
  { path: "/onboarding/review", label: "Review", labelJa: "審査提出" },
  { path: "/onboarding/complete", label: "Complete", labelJa: "完了" },
];

/**
 * TabBar に表示する画面
 * メイン画面のうち、TabBarに表示するものを定義
 */
export const tabBarScreens: TabBarScreen[] = [
  { id: "home", path: "/home", label: "Home", labelJa: "ホーム", icon: Home },
  { id: "points", path: "/points", label: "Points", labelJa: "特典・ポイント", icon: Gift },
  { id: "account", path: "/account", label: "Account", labelJa: "アカウント", icon: User },
];

/**
 * パスからアクティブなTabを取得
 */
export function getActiveTabId(pathname: string): string {
  if (pathname.startsWith("/home")) return "home";
  if (pathname.startsWith("/points")) return "points";
  if (pathname.startsWith("/history")) return "points"; // historyはpointsタブ配下
  if (pathname.startsWith("/account")) return "account";
  return "home";
}

/**
 * すべての画面を取得（Canvas用）
 */
export function getAllScreens() {
  return {
    main: mainScreens,
    onboarding: onboardingScreens,
  };
}

/**
 * パスから画面情報を取得
 */
export function getScreenByPath(path: string): Screen | undefined {
  return [...mainScreens, ...onboardingScreens].find((s) => s.path === path);
}

/**
 * オンボーディングの現在のステップインデックスを取得
 */
export function getOnboardingStepIndex(pathname: string): number {
  return onboardingScreens.findIndex((step) => step.path === pathname);
}
