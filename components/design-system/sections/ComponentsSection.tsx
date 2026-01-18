"use client";

import { useState } from "react";
import { CreditCard, Cloud, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/ios/Button";
import { Card } from "@/components/ui/ios/Card";
import { ListCell } from "@/components/ui/ios/ListCell";

interface ComponentDemoProps {
  title: string;
  children: React.ReactNode;
  code?: string;
}

function ComponentDemo({ title, children, code }: ComponentDemoProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h5 className="text-sm font-medium text-white">{title}</h5>
        {code && (
          <button
            onClick={() => setShowCode(!showCode)}
            className="text-xs text-white/50 hover:text-white/80 transition-colors"
          >
            {showCode ? "Hide" : "Code"}
          </button>
        )}
      </div>
      <div className="p-3 bg-upsider-surface rounded-lg">
        {children}
      </div>
      {showCode && code && (
        <pre className="text-xs bg-black/50 p-3 rounded-lg overflow-x-auto text-white/70">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}

export function ComponentsSection() {
  return (
    <div className="space-y-6">
      {/* Button */}
      <ComponentDemo
        title="Button"
        code={`<Button variant="primary">ボタン</Button>
<Button variant="secondary">セカンダリ</Button>
<Button variant="danger">削除</Button>
<Button variant="ghost">ゴースト</Button>`}
      >
        <div className="space-y-2">
          <Button variant="primary" fullWidth>
            Primary Button
          </Button>
          <Button variant="secondary" fullWidth>
            Secondary Button
          </Button>
          <div className="flex gap-2">
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>
      </ComponentDemo>

      {/* Card */}
      <ComponentDemo
        title="Card"
        code={`<Card>
  <p>Card Content</p>
</Card>

<Card pressable onClick={...}>
  <p>Pressable Card</p>
</Card>`}
      >
        <div className="space-y-3">
          <Card className="!bg-upsider-surface-light">
            <div className="text-white text-sm">Basic Card</div>
            <div className="text-white/60 text-xs mt-1">With dark surface background</div>
          </Card>
          <Card
            pressable
            className="!bg-upsider-surface-light"
            onClick={() => alert("Card tapped!")}
          >
            <div className="text-white text-sm">Pressable Card</div>
            <div className="text-white/60 text-xs mt-1">Tap for feedback animation</div>
          </Card>
        </div>
      </ComponentDemo>

      {/* ListCell */}
      <ComponentDemo
        title="ListCell"
        code={`<ListCell
  icon={Cloud}
  title="AWS Web Services"
  subtitle="確定"
  rightText="¥45,200,000"
  rightSubtext="今日"
  onClick={...}
/>`}
      >
        <div className="bg-upsider-surface-light rounded-lg overflow-hidden">
          <ListCell
            icon={Cloud}
            iconColor="text-orange-400"
            title="AWS Web Services"
            subtitle={<span className="text-green-400">確定</span>}
            rightText="¥45,200,000"
            rightSubtext="今日"
            showSeparator={true}
            onClick={() => {}}
          />
          <ListCell
            icon={CreditCard}
            iconColor="text-blue-400"
            title="Salesforce"
            subtitle={<span className="text-amber-400">処理中</span>}
            rightText="¥3,800,000"
            rightSubtext="昨日"
            showSeparator={false}
            onClick={() => {}}
          />
        </div>
      </ComponentDemo>

      {/* Navigation */}
      <ComponentDemo
        title="Navigation"
        code={`<Navigation
  title="ホーム"
  onBack={() => router.back()}
  rightAction={<Bell />}
/>`}
      >
        <div className="bg-upsider-surface-light rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <ChevronRight size={20} className="text-white/60 rotate-180" />
            <span className="text-white font-medium">ホーム</span>
            <div className="w-5" />
          </div>
        </div>
        <p className="text-xs text-white/50 mt-2">
          Sticky header with backdrop blur, safe area padding
        </p>
      </ComponentDemo>

      {/* BottomSheet */}
      <ComponentDemo
        title="BottomSheet"
        code={`<BottomSheet
  open={isOpen}
  onOpenChange={setIsOpen}
  title="カード詳細"
>
  <p>Sheet content...</p>
</BottomSheet>`}
      >
        <div className="text-center">
          <p className="text-xs text-white/50 mb-2">
            iOS-style bottom sheet using Vaul
          </p>
          <Button
            variant="secondary"
            onClick={() => alert("BottomSheet would open here.\nSee the main app for live demo.")}
          >
            Open Sheet Demo
          </Button>
        </div>
      </ComponentDemo>

      {/* Tap Feedback */}
      <div className="p-3 bg-upsider-surface rounded-lg">
        <h5 className="text-sm font-medium text-white mb-2">Tap Feedback</h5>
        <p className="text-xs text-white/60">
          All interactive elements use <code className="bg-white/10 px-1 rounded">whileTap={`{{ scale: 0.95 }}`}</code> for native-like feedback.
        </p>
      </div>
    </div>
  );
}

export default ComponentsSection;
