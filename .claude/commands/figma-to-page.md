# Figma to Page

FigmaデザインからNext.jsページを生成するスキル。

## 使用方法

```
/figma-to-page [Figma URL] [ページパス]
```

例:
```
/figma-to-page https://www.figma.com/design/xxx?node-id=123-456 /points/ana
```

## 処理フロー

### Step 1: デザイン取得
$ARGUMENTS からFigma URLを抽出し、以下を実行:

1. `mcp__figma__get_design_context` でデザインコンテキスト取得
2. `mcp__figma__get_screenshot` でビジュアル確認

### Step 2: コンポーネントマッピング

取得したデザインを既存コンポーネントにマッピング:

| Figmaレイヤー | 変換先 |
|--------------|--------|
| Card / Container | `bg-luxbrown-80 rounded-xl` |
| Button | `bg-darkgreen-80 rounded-xl` |
| List Item | `ListCell` or カスタムdiv |
| Icon | Lucide React アイコン |
| Text/Heading | 適切なタイポグラフィクラス |

### Step 3: ページ生成

`app/(main)/[path]/page.tsx` を生成:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function GeneratedPage() {
  const router = useRouter();

  return (
    <div className="min-h-full bg-luxbrown-90">
      {/* Header */}
      <div className="px-4 pt-4 safe-area-top">
        <button
          onClick={() => router.back()}
          className="flex items-center text-white active:opacity-70 -ml-1"
        >
          <ChevronLeft size={24} strokeWidth={2} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pt-4 pb-6 space-y-6">
        {/* Figmaから抽出したコンテンツ */}
      </div>
    </div>
  );
}
```

### Step 4: 検証

- デザイントークンが正しく適用されているか
- タップ領域が44x44px以上か
- hover:ではなくactive:を使用しているか
- 金額表示が右揃え・等幅フォントか

## 注意事項

- TabBarはlayout.tsxで提供されるため、個別ページでは不要
- 色はハードコードせずデザイントークンを使用
- ダミーデータはPRESIDENT CARDらしい規模で作成
