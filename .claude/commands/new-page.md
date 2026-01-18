# New Page

PRESIDENT CARDアプリの新しいページをテンプレートから生成するスキル。

## 使用方法

```
/new-page [ページパス] [ページタイトル]
```

例:
```
/new-page /settings/notifications 通知設定
```

## 処理フロー

### Step 1: ディレクトリ作成

`app/(main)/[path]/` ディレクトリを作成

### Step 2: ページファイル生成

以下のテンプレートで `page.tsx` を生成:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function [PageName]Page() {
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
        {/* Title */}
        <div className="text-center">
          <h1 className="text-header-medium font-semibold text-white font-sf-display">
            [ページタイトル]
          </h1>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          {/* ここにコンテンツを追加 */}
        </div>
      </div>
    </div>
  );
}
```

### Step 3: パス命名規則

| パス例 | 用途 |
|--------|------|
| `/points/[exchange]` | ポイント交換系 |
| `/settings/[feature]` | 設定系 |
| `/card/[action]` | カード操作系 |
| `/history/[filter]` | 履歴系 |

## ページ構造ルール

1. **ルートページ**: タブから直接アクセス（戻るボタンなし）
2. **詳細ページ**: 戻るボタン付き（ChevronLeft）
3. **モーダル的ページ**: BottomSheetを検討

## チェックリスト

- [ ] `"use client"` を先頭に記述
- [ ] `min-h-full bg-luxbrown-90` をルートdivに適用
- [ ] 戻るボタンは `-ml-1` で左端に揃える
- [ ] safe-area-topを適用
- [ ] TabBarはlayout.tsxで提供されるため不要
