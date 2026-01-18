"use client";

import { motion } from "framer-motion";
import { FlaskConical, Lightbulb, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/ios/Button";
import { Card } from "@/components/ui/ios/Card";
import { ListCell } from "@/components/ui/ios/ListCell";
import CloudIcon from "@mui/icons-material/Cloud";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import NotificationsIcon from "@mui/icons-material/Notifications";

/**
 * President Lab - 実験用サンドボックス
 *
 * 安全にUIパターンを試すための隔離環境。
 * 認証なし、ダミーデータのみ、本番に影響なし。
 */
export default function PresidentLabPage() {
  return (
    <div className="p-4 space-y-6">
      {/* ヘッダー */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-6"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/20 rounded-full mb-4">
          <FlaskConical className="w-8 h-8 text-amber-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">President Lab</h1>
        <p className="text-white/60 text-sm">
          安全な実験環境でUIパターンを試せます
        </p>
      </motion.div>

      {/* 特徴カード */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <div className="p-4 space-y-4">
            <h2 className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              Sandbox Features
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-green-500/20 rounded-lg mb-2">
                  <Shield className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-xs text-white/60">隔離環境</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-500/20 rounded-lg mb-2">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-xs text-white/60">即時反映</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-purple-500/20 rounded-lg mb-2">
                  <Lightbulb className="w-5 h-5 text-purple-400" />
                </div>
                <p className="text-xs text-white/60">実験自由</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* コンポーネントデモ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-xs font-semibold text-white/60 uppercase tracking-wider px-1">
          Component Demo
        </h2>

        {/* ボタンデモ */}
        <Card>
          <div className="p-4 space-y-3">
            <h3 className="text-sm font-medium text-white">Button Variants</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary">
                Primary
              </Button>
              <Button variant="secondary">
                Secondary
              </Button>
              <Button variant="danger">
                Danger
              </Button>
              <Button variant="ghost">
                Ghost
              </Button>
            </div>
          </div>
        </Card>

        {/* リストセルデモ */}
        <Card>
          <div className="p-4 space-y-3">
            <h3 className="text-sm font-medium text-white">ListCell Examples</h3>
          </div>
          <div className="border-t border-white/10">
            <ListCell
              icon={CloudIcon}
              iconColor="text-orange-400"
              title="AWS Web Services"
              subtitle={<span className="text-green-400">確定</span>}
              rightText="¥45,200,000"
              rightSubtext="Today"
              showSeparator
              onClick={() => {}}
            />
            <ListCell
              icon={CreditCardIcon}
              iconColor="text-blue-400"
              title="Salesforce"
              subtitle={<span className="text-amber-400">処理中</span>}
              rightText="¥3,800,000"
              rightSubtext="Yesterday"
              showSeparator
              onClick={() => {}}
            />
            <ListCell
              icon={NotificationsIcon}
              iconColor="text-purple-400"
              title="Notification Settings"
              subtitle="Manage alerts"
              showChevron
              onClick={() => {}}
            />
          </div>
        </Card>
      </motion.div>

      {/* 使い方 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <div className="p-4 space-y-3">
            <h2 className="text-sm font-medium text-white">使い方</h2>
            <ol className="text-sm text-white/60 space-y-2 list-decimal list-inside">
              <li>このページで新しいUIパターンを試す</li>
              <li>うまくいったらDesign Systemに追加</li>
              <li>本番画面に適用</li>
            </ol>
          </div>
        </Card>
      </motion.div>

      {/* フッター */}
      <div className="text-center py-4">
        <p className="text-xs text-white/40">
          この環境は本番データに影響しません
        </p>
      </div>
    </div>
  );
}
