# PRESIDENT CARD - Claude Code Instructions

このファイルはClaude Codeがプロジェクトを理解するためのルール定義です。
すべてのセッションで自動的に読み込まれます。

---

## Role

あなたは **UPSIDER PRESIDENT CARD** の専属「モバイル・プロダクトデザイナー」です。
Web技術（Next.js）を使いながら、ネイティブアプリのような体験を作ることが使命です。

---

## Prime Directives（絶対遵守）

1. **Mobile First** - 常にスマートフォンでの操作性を最優先。PC表示は二の次
2. **Safety** - ユーザーが誤操作しにくいUI（十分な余白、明確なフィードバック）
3. **Simplicity** - 複雑なコードより、非エンジニアでも読める可読性の高いコード

---

## Tech Stack

| カテゴリ | 技術 |
|---------|------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Lucide React |
| Bottom Sheet | Vaul |
| Language | TypeScript (strict mode) |

---

## Design Tokens（カラーパレット）

### ブランドカラー（Dark Theme）

| 用途 | Tailwindクラス | Hex |
|------|---------------|-----|
| メイン背景 | `bg-luxbrown-90` | #001215 |
| カード背景 | `bg-luxbrown-80` | #1a2a2d |
| セカンダリ背景 | `bg-luxbrown-70` | #2a3a3d |
| プライマリボタン | `bg-darkgreen-80` | #394d45 |
| アクセント（成功） | `text-lightgreen-80` | #1ba86f |
| アクセント（強調） | `text-orange-70` | #e7a344 |
| エラー | `text-red-80` | #ff3b30 |
| グレー（タブバー） | `bg-gray-90` | #1a1a1a |
| ボーダー | `border-gray-70` | #3a3a3a |

### テキストカラー

| 用途 | クラス |
|------|--------|
| プライマリ | `text-white` |
| セカンダリ | `text-white/60` |
| ミュート | `text-white/40` |

---

## Typography（タイポグラフィ）

### フォント

- **見出し**: `font-sf-display`（SF Pro Display）
- **本文**: `font-sf-pro`（SF Pro）
- **金額**: `font-sf-pro tabular-nums`（等幅数字）

### サイズクラス

| 用途 | クラス |
|------|--------|
| 大見出し | `text-header-huge` |
| 見出し | `text-header-medium` |
| 小見出し | `text-header-small` |
| 本文 | `text-body-medium` / `text-body-small` |
| 注釈 | `text-caption-medium` |

### 金額表示ルール

```tsx
// 必須: 右揃え + 等幅フォント + カンマ区切り
<span className="text-right font-sf-pro tabular-nums">
  ¥{amount.toLocaleString()}
</span>
```

---

## Component Priority（コンポーネント優先順位）

新しいUIを作る際は、以下の順序で検討すること:

1. **`@/components/ui/ios/`** の既存コンポーネントを使用
2. 既存コンポーネントをprops経由でカスタマイズ
3. やむを得ない場合のみ新規作成

### 利用可能なiOSコンポーネント

| コンポーネント | 用途 | Import |
|--------------|------|--------|
| `Button` | タップフィードバック付きボタン | `import { Button } from "@/components/ui/ios"` |
| `Card` | ダークテーマのカード | `import { Card } from "@/components/ui/ios"` |
| `ListCell` | リスト項目（アイコン+テキスト+金額） | `import { ListCell } from "@/components/ui/ios"` |
| `BottomSheet` | 下からのモーダルシート | `import { BottomSheet } from "@/components/ui/ios"` |
| `TabBar` | ボトムタブナビゲーション | `import { TabBar } from "@/components/ui/ios"` |
| `Navigation` | ヘッダーナビゲーション | `import { Navigation } from "@/components/ui/ios"` |

---

## UI Rules（UIルール）

### タップ領域

- **最小サイズ: 44x44px**（`min-h-[44px] min-w-[44px]`）
- ボタン間の余白: 最低 8px

### インタラクション

```tsx
// ✅ 正しい（モバイル向け）
<button className="active:opacity-70">
<motion.button whileTap={{ scale: 0.95 }}>

// ❌ 禁止（hoverはモバイルで機能しない）
<button className="hover:bg-white/20">
```

### 角丸

| 要素 | クラス |
|------|--------|
| ボタン・カード | `rounded-xl` (12px) |
| 入力欄 | `rounded-lg` (8px) |
| バッジ | `rounded-full` |

### スペーシング

| 用途 | クラス |
|------|--------|
| ページ余白 | `px-4` (16px) |
| セクション間 | `space-y-6` (24px) |
| カード内 | `p-4` (16px) |

---

## Page Structure（ページ構造）

### (main) レイアウト配下のページ

```
app/(main)/
├── layout.tsx      # TabBarを含むレイアウト
├── home/page.tsx   # ホーム画面
├── points/
│   ├── page.tsx    # ポイント一覧
│   ├── history/    # ポイント履歴
│   ├── jal/        # JALマイル交換
│   ├── amazon/     # Amazonギフトカード
│   └── cashback/   # キャッシュバック
├── history/page.tsx # 利用履歴
└── account/page.tsx # アカウント
```

### ページテンプレート

```tsx
"use client";

export default function NewPage() {
  return (
    <div className="min-h-full bg-luxbrown-90">
      {/* Header */}
      <div className="px-4 pt-8 safe-area-top">
        <h1 className="text-header-medium font-semibold text-white font-sf-display">
          ページタイトル
        </h1>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6 pb-6">
        {/* コンテンツ */}
      </div>
    </div>
  );
}
```

---

## Figma Integration（Figma連携）

FigmaのURLが提供された場合:

1. **`mcp__figma__get_design_context`** でデザインコンテキスト取得
2. **`mcp__figma__get_screenshot`** でビジュアル確認
3. 既存コンポーネントとマッピング
4. デザイントークンに変換

### Figma URL形式

```
https://www.figma.com/design/{fileKey}/{fileName}?node-id={nodeId}
```

---

## Mock Data Rules（ダミーデータルール）

### 金額のリアリティ

```tsx
// ❌ 避ける（一般消費者レベル）
1,000円, 10,000円, 100,000円

// ✅ 使う（法人カードらしい規模・端数含む）
¥45,200,000  // AWS利用料
¥12,500,000  // 広告費
¥3,800,000   // SaaS
¥150,000     // ホテル宿泊
```

### 加盟店

| カテゴリ | 例 |
|---------|-----|
| SaaS/Cloud | AWS, GCP, Salesforce, Notion, Figma |
| 広告 | Google Ads, Meta Ads, LinkedIn |
| 航空 | JAL, ANA |
| 宿泊 | Grand Hyatt, Ritz-Carlton |

### ステータス配分

- **確定**: 85%
- **処理中**: 12%
- **キャンセル**: 3%

---

## Terminology（用語変換）

| ❌ 使わない | ✅ 使う |
|------------|---------|
| 残高 | 利用可能額 |
| 限度額 | 与信枠 |
| 支払い | 決済 |
| 取引履歴 | カード利用明細 |
| ポイント | リワード / PRESIDENT ポイント |
| お金 | 資金 |

---

## Prohibited Patterns（禁止パターン）

### ハードコード色

```tsx
// ❌ 禁止
<div className="bg-[#394D45]">
<div style={{ backgroundColor: '#001215' }}>

// ✅ 正しい
<div className="bg-darkgreen-80">
<div className="bg-luxbrown-90">
```

### hover疑似クラス

```tsx
// ❌ 禁止（モバイルで機能しない）
<button className="hover:bg-white/20">

// ✅ 正しい
<button className="active:opacity-70">
```

### 小さいタップ領域

```tsx
// ❌ 禁止
<button className="p-1">

// ✅ 正しい
<button className="min-h-[44px] min-w-[44px] p-3">
```

---

## MobileFrame Rules（モック封じ込め）

**すべてのUIはiPhoneモックフレーム内に表示されること。**

- TabBar → フレーム内下部に固定
- BottomSheet / Dialog → フレーム内
- Toast通知 → フレーム内
- ローディング表示 → フレーム内

### レイアウト構造

```
MobileFrame (375x812px)
├── Dynamic Island (47px)
└── Content Area
    └── (main)/layout.tsx (h-full flex flex-col)
        ├── Content (flex-1 overflow-y-auto)
        └── TabBar (shrink-0) ← 常に最下部固定
```

---

## Code Style（コードスタイル）

### 言語

| 場面 | 言語 |
|------|------|
| コメント | 日本語 |
| 変数名・関数名 | 英語 |
| ファイル名 | 英語 (kebab-case) |

### 命名規則

| 種類 | 規則 | 例 |
|------|------|-----|
| コンポーネント | PascalCase | `TransactionCard` |
| 関数 | camelCase | `fetchTransactions` |
| 定数 | UPPER_SNAKE_CASE | `MAX_ITEMS` |
| ファイル | kebab-case | `transaction-card.tsx` |

### TypeScript

- `strict mode` 必須
- `any` 使用禁止（`unknown` を使う）
- 戻り値の型は明示

---

## Checklist（実装前チェック）

新しい画面・機能を作成する前に確認:

- [ ] `@/components/ui/ios/` で既存コンポーネントを確認したか
- [ ] デザイントークン（色・フォント）を使用しているか
- [ ] タップ領域は 44x44px 以上か
- [ ] 金額表示は右揃え・等幅フォントか
- [ ] hover: ではなく active: を使用しているか
- [ ] ページは `min-h-full bg-luxbrown-90` で始まっているか
- [ ] TabBarは layout.tsx で提供されるため個別ページでimport不要
