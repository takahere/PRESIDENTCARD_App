"use client";

import Link from "next/link";
import { ArrowLeft, FlaskConical } from "lucide-react";

interface PlaygroundLayoutProps {
  children: React.ReactNode;
}

/**
 * President Lab Layout
 *
 * 実験用サンドボックス環境のレイアウト
 * - 認証ロジックなし
 * - ダミーデータのみで動作
 * - 本番環境から完全隔離
 */
export default function PlaygroundLayout({ children }: PlaygroundLayoutProps) {
  return (
    <div className="min-h-screen bg-upsider-bg">
      {/* 実験環境ヘッダー */}
      <header className="sticky top-0 z-50 bg-amber-500/10 border-b border-amber-500/30 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Exit Lab</span>
          </Link>

          <div className="flex items-center gap-2 text-amber-400">
            <FlaskConical size={16} />
            <span className="text-xs font-medium uppercase tracking-wider">
              Sandbox Mode
            </span>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main>{children}</main>
    </div>
  );
}
