# Check UI

実装したUIがPRESIDENT CARDのデザインルールに準拠しているかチェックするスキル。

## 使用方法

```
/check-ui [ファイルパス]
```

例:
```
/check-ui app/(main)/points/jal/page.tsx
```

## チェック項目

### 1. カラートークン

```typescript
// ❌ ハードコードされた色
"bg-[#001215]"
"bg-[#394d45]"
"text-[#e7a344]"

// ✅ デザイントークン
"bg-luxbrown-90"
"bg-darkgreen-80"
"text-orange-70"
```

### 2. タップ領域

```typescript
// ❌ 小さすぎるタップ領域
<button className="p-1">
<button className="w-6 h-6">

// ✅ 適切なタップ領域 (44x44px以上)
<button className="min-h-[44px] min-w-[44px]">
<button className="p-3">
```

### 3. インタラクション

```typescript
// ❌ hover疑似クラス（モバイル非対応）
"hover:bg-white/20"
"hover:opacity-80"

// ✅ active疑似クラス
"active:opacity-70"
"active:scale-95"
```

### 4. 金額表示

```typescript
// ❌ 左揃え・プロポーショナル
<span>{amount}</span>

// ✅ 右揃え・等幅・カンマ区切り
<span className="text-right font-sf-pro tabular-nums">
  ¥{amount.toLocaleString()}
</span>
```

### 5. フォント

```typescript
// ❌ デフォルトフォント
<h1 className="text-2xl">

// ✅ SF Pro Display（見出し）
<h1 className="text-header-medium font-sf-display">

// ✅ SF Pro（本文）
<p className="text-body-medium font-sf-pro">
```

### 6. ページ構造

```typescript
// ❌ 背景色なし
<div>

// ✅ 適切な背景色
<div className="min-h-full bg-luxbrown-90">
```

### 7. スペーシング

```typescript
// ❌ 不適切な余白
<div className="p-2">
<div className="px-2">

// ✅ 適切な余白
<div className="px-4">      // ページ余白
<div className="space-y-6"> // セクション間
<div className="p-4">       // カード内
```

### 8. コンポーネント使用

既存コンポーネントが使用可能な場面で独自実装していないか:

- Button → `@/components/ui/ios/Button`
- Card → `@/components/ui/ios/Card`
- ListCell → `@/components/ui/ios/ListCell`
- BottomSheet → `@/components/ui/ios/BottomSheet`

## 出力形式

```
📋 UI Check Report: app/(main)/points/jal/page.tsx

✅ カラートークン: OK
⚠️ タップ領域: 1件の警告
   - Line 45: button要素のサイズが小さい可能性
✅ インタラクション: OK
✅ 金額表示: OK
✅ フォント: OK
✅ ページ構造: OK
⚠️ スペーシング: 1件の警告
   - Line 23: px-2 → px-4 を推奨

総合スコア: 85/100
```

## 自動修正

`--fix` オプションで自動修正を試みる:

```
/check-ui app/(main)/points/jal/page.tsx --fix
```

修正可能な項目:
- hover: → active:
- ハードコード色 → デザイントークン
- tabular-nums の追加
