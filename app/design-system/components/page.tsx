"use client";

import { useState } from "react";
import { Copy, Check, MessageCircle, Mail, Send } from "lucide-react";
import CloudIcon from "@mui/icons-material/Cloud";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import NotificationsIcon from "@mui/icons-material/Notifications";

// iOS Components
import { Button } from "@/components/ui/ios/Button";
import { Card } from "@/components/ui/ios/Card";
import { ListCell } from "@/components/ui/ios/ListCell";
import { BottomSheet } from "@/components/ui/ios/BottomSheet";

// Native UI Reference Components
import { SystemDialog } from "@/components/ui/ios/SystemDialog";
import { ActionSheet } from "@/components/ui/ios/ActionSheet";
import { DatePicker } from "@/components/ui/ios/DatePicker";
import { TimePicker } from "@/components/ui/ios/TimePicker";
import { ShareSheet } from "@/components/ui/ios/ShareSheet";
import { KeyboardToolbar } from "@/components/ui/ios/KeyboardToolbar";

interface CodeBlockProps {
  code: string;
}

function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <pre className="text-sm bg-black/50 p-4 rounded-lg overflow-x-auto text-white/80 font-mono">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-white/10 hover:bg-white/20 rounded transition-colors"
      >
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white/60" />}
      </button>
    </div>
  );
}

interface ComponentSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  code: string;
}

function ComponentSection({ title, description, children, code }: ComponentSectionProps) {
  return (
    <section className="bg-upsider-surface rounded-xl border border-white/10 overflow-hidden">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
        <p className="text-white/60 text-sm">{description}</p>
      </div>
      <div className="p-6 bg-upsider-bg/50">
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-4">プレビュー</h3>
        <div className="bg-upsider-surface rounded-lg p-6">{children}</div>
      </div>
      <div className="p-6 border-t border-white/10">
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-4">使用方法</h3>
        <CodeBlock code={code} />
      </div>
    </section>
  );
}

export default function ComponentsPage() {
  const [sheetOpen, setSheetOpen] = useState(false);

  // Native UI component states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionSheetOpen, setActionSheetOpen] = useState(false);
  const [shareSheetOpen, setShareSheetOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState({ hour: 12, minute: 0 });

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Components</h1>
        <p className="text-white/60">
          アプリで使用するUIコンポーネント。プラットフォーム共通の独自実装です。
        </p>
      </div>

      {/* Import Guide */}
      <div className="mb-8">
        <CodeBlock code={`import { Button, Card, ListCell, BottomSheet } from "@/components/ui/ios";

// Native UI Components
import { SystemDialog, ActionSheet, DatePicker, TimePicker, ShareSheet, KeyboardToolbar } from "@/components/ui/ios";`} />
      </div>

      {/* Components */}
      <div className="space-y-8">
        {/* Button */}
        <ComponentSection
          title="Button"
          description="タップ時にopacity変化でフィードバックするボタン。4つのvariantを提供。"
          code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="ghost">Ghost</Button>
<Button fullWidth>フルワイド</Button>`}
        >
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </ComponentSection>

        {/* Card */}
        <ComponentSection
          title="Card"
          description="ダークサーフェスのカードコンテナ。pressable オプションでタップ可能に。"
          code={`<Card>コンテンツ</Card>
<Card pressable onClick={handleClick}>
  タップ可能なカード
</Card>`}
        >
          <div className="space-y-4">
            <Card>
              <div className="text-white">基本カード</div>
            </Card>
            <Card pressable onClick={() => {}}>
              <div className="text-white">タップ可能なカード（タップしてみてください）</div>
            </Card>
          </div>
        </ComponentSection>

        {/* ListCell */}
        <ComponentSection
          title="ListCell"
          description="リスト行コンポーネント。アイコン、タイトル、サブテキスト、右側のテキストを表示。"
          code={`<ListCell
  icon={CloudIcon}
  iconColor="text-orange-400"
  title="AWS Web Services"
  subtitle={<span className="text-green-400">確定</span>}
  rightText="¥45,200,000"
  rightSubtext="Today"
  showSeparator
  onClick={() => {}}
/>`}
        >
          <div className="bg-upsider-bg rounded-lg overflow-hidden">
            <ListCell
              icon={CloudIcon}
              iconColor="text-orange-400"
              title="AWS Web Services"
              subtitle={<span className="text-green-400">確定</span>}
              rightText="¥45,200,000"
              rightSubtext="Today"
              showSeparator={true}
              onClick={() => {}}
            />
            <ListCell
              icon={CreditCardIcon}
              iconColor="text-blue-400"
              title="Salesforce"
              subtitle={<span className="text-amber-400">処理中</span>}
              rightText="¥3,800,000"
              rightSubtext="Yesterday"
              showSeparator={true}
              onClick={() => {}}
            />
            <ListCell
              icon={NotificationsIcon}
              iconColor="text-purple-400"
              title="通知設定"
              subtitle="アラートを管理"
              showChevron
              showSeparator={false}
              onClick={() => {}}
            />
          </div>
        </ComponentSection>

        {/* BottomSheet */}
        <ComponentSection
          title="BottomSheet"
          description="下からスライドして表示するシート。Vaulライブラリを使用。ドラッグで閉じることが可能。"
          code={`<BottomSheet
  open={open}
  onOpenChange={setOpen}
  title="詳細"
>
  コンテンツ...
</BottomSheet>`}
        >
          <div className="text-center">
            <Button variant="primary" onClick={() => setSheetOpen(true)}>
              BottomSheetを開く
            </Button>
          </div>
        </ComponentSection>
      </div>

      {/* Native Reference */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white mb-2">ネイティブUI参考</h2>
        <p className="text-white/60 text-sm mb-6">
          プラットフォームごとに異なるネイティブUI要素。参照用と実際のコンポーネントとして使用可能。
        </p>

        <div className="space-y-8">
          {/* SystemDialog */}
          <ComponentSection
            title="SystemDialog"
            description="iOS UIAlertController風のシステムダイアログ。確認・警告メッセージの表示に使用。"
            code={`<SystemDialog
  open={open}
  onOpenChange={setOpen}
  title="確認"
  message="この操作を実行しますか？"
  actions={[
    { label: "キャンセル", variant: "cancel", onClick: () => {} },
    { label: "実行", variant: "default", onClick: () => {} },
  ]}
/>`}
          >
            <div className="text-center">
              <Button variant="primary" onClick={() => setDialogOpen(true)}>
                SystemDialogを開く
              </Button>
            </div>
          </ComponentSection>

          {/* ActionSheet */}
          <ComponentSection
            title="ActionSheet"
            description="iOS風のアクションシート。複数のアクションを選択させる場合に使用。"
            code={`<ActionSheet
  open={open}
  onOpenChange={setOpen}
  title="写真を選択"
  actions={[
    { label: "カメラで撮影", onClick: () => {} },
    { label: "ライブラリから選択", onClick: () => {} },
    { label: "削除", variant: "destructive", onClick: () => {} },
  ]}
  cancelLabel="キャンセル"
/>`}
          >
            <div className="text-center">
              <Button variant="primary" onClick={() => setActionSheetOpen(true)}>
                ActionSheetを開く
              </Button>
            </div>
          </ComponentSection>

          {/* DatePicker */}
          <ComponentSection
            title="DatePicker"
            description="iOSのホイール式日付ピッカー。年・月・日をスクロールで選択。"
            code={`<DatePicker
  value={date}
  onChange={setDate}
  minDate={new Date(2020, 0, 1)}
  maxDate={new Date(2030, 11, 31)}
/>`}
          >
            <div className="flex justify-center">
              <DatePicker
                value={selectedDate}
                onChange={setSelectedDate}
              />
            </div>
          </ComponentSection>

          {/* TimePicker */}
          <ComponentSection
            title="TimePicker"
            description="iOSのホイール式時刻ピッカー。時・分をスクロールで選択。"
            code={`<TimePicker
  value={{ hour: 12, minute: 30 }}
  onChange={setTime}
  minuteInterval={5}
/>`}
          >
            <div className="flex justify-center">
              <TimePicker
                value={selectedTime}
                onChange={setSelectedTime}
                minuteInterval={5}
              />
            </div>
          </ComponentSection>

          {/* ShareSheet */}
          <ComponentSection
            title="ShareSheet"
            description="iOS風の共有シート。共有先アプリの選択に使用。"
            code={`<ShareSheet
  open={open}
  onOpenChange={setOpen}
  items={[
    { icon: <MessageIcon />, label: "メッセージ", onClick: () => {} },
    { icon: <MailIcon />, label: "メール", onClick: () => {} },
  ]}
/>`}
          >
            <div className="text-center">
              <Button variant="primary" onClick={() => setShareSheetOpen(true)}>
                ShareSheetを開く
              </Button>
            </div>
          </ComponentSection>

          {/* KeyboardToolbar */}
          <ComponentSection
            title="KeyboardToolbar"
            description="iOSのキーボード上部ツールバー。入力完了ボタンやフィールド移動ボタンを提供。"
            code={`<KeyboardToolbar
  onDone={() => {}}
  onPrevious={() => {}}
  onNext={() => {}}
  showNavigation={true}
  doneLabel="完了"
/>`}
          >
            <div className="max-w-md mx-auto">
              <KeyboardToolbar
                onDone={() => alert("完了")}
                onPrevious={() => alert("前へ")}
                onNext={() => alert("次へ")}
                showNavigation={true}
              />
            </div>
          </ComponentSection>
        </div>
      </section>

      {/* Platform Comparison Table */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white mb-2">プラットフォーム比較</h2>
        <p className="text-white/60 text-sm mb-6">
          iOS/Androidのネイティブ実装の違い一覧。
        </p>
        <div className="bg-upsider-surface rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/60 text-sm font-medium">要素</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">iOS</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Android</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="p-4 text-white">キーボード</td>
                <td className="p-4 text-white/60">iOS標準（Done/Return）</td>
                <td className="p-4 text-white/60">Gboard/標準</td>
              </tr>
              <tr>
                <td className="p-4 text-white">システムダイアログ</td>
                <td className="p-4 text-white/60">UIAlertController風</td>
                <td className="p-4 text-white/60">Material Dialog</td>
              </tr>
              <tr>
                <td className="p-4 text-white">日付ピッカー</td>
                <td className="p-4 text-white/60">ホイール式</td>
                <td className="p-4 text-white/60">カレンダー式</td>
              </tr>
              <tr>
                <td className="p-4 text-white">時刻ピッカー</td>
                <td className="p-4 text-white/60">ホイール式</td>
                <td className="p-4 text-white/60">時計式</td>
              </tr>
              <tr>
                <td className="p-4 text-white">アクションシート</td>
                <td className="p-4 text-white/60">下からスライド</td>
                <td className="p-4 text-white/60">BottomSheet</td>
              </tr>
              <tr>
                <td className="p-4 text-white">共有シート</td>
                <td className="p-4 text-white/60">UIActivityViewController</td>
                <td className="p-4 text-white/60">Share Sheet</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* BottomSheet Demo */}
      <BottomSheet open={sheetOpen} onOpenChange={setSheetOpen} title="カード詳細">
        <div className="space-y-4">
          <p className="text-white/60">BottomSheetのデモです。ドラッグで閉じることができます。</p>
          <Button fullWidth onClick={() => setSheetOpen(false)}>閉じる</Button>
        </div>
      </BottomSheet>

      {/* SystemDialog Demo */}
      <SystemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="確認"
        message="この操作を実行してもよろしいですか？"
        actions={[
          { label: "キャンセル", variant: "cancel", onClick: () => {} },
          { label: "実行", variant: "default", onClick: () => alert("実行しました") },
        ]}
      />

      {/* ActionSheet Demo */}
      <ActionSheet
        open={actionSheetOpen}
        onOpenChange={setActionSheetOpen}
        title="写真を選択"
        actions={[
          { label: "カメラで撮影", onClick: () => alert("カメラを起動") },
          { label: "ライブラリから選択", onClick: () => alert("ライブラリを開く") },
          { label: "削除", variant: "destructive", onClick: () => alert("削除") },
        ]}
      />

      {/* ShareSheet Demo */}
      <ShareSheet
        open={shareSheetOpen}
        onOpenChange={setShareSheetOpen}
        items={[
          {
            icon: <MessageCircle size={24} className="text-green-500" />,
            label: "メッセージ",
            onClick: () => alert("メッセージで共有"),
          },
          {
            icon: <Mail size={24} className="text-blue-500" />,
            label: "メール",
            onClick: () => alert("メールで共有"),
          },
          {
            icon: <Send size={24} className="text-purple-500" />,
            label: "LINE",
            onClick: () => alert("LINEで共有"),
          },
        ]}
      />
    </div>
  );
}
