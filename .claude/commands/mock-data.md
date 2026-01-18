# Mock Data Generator

PRESIDENT CARDアプリ用のリアルなダミーデータを生成するスキル。

## 使用方法

```
/mock-data [データ種類] [件数]
```

例:
```
/mock-data transactions 10
/mock-data points-history 5
/mock-data cards 3
```

## データ種類

### 1. transactions（決済履歴）

```typescript
interface Transaction {
  id: string;           // "tx_001"
  vendor: string;       // "Amazon Web Services"
  category: "saas" | "ads" | "travel" | "dining" | "other";
  amount: number;       // 45200000 (端数含む)
  status: "confirmed" | "pending" | "cancelled";
  date: string;         // "2025/5/1"
  time: string;         // "12:00"
  cardLast4: string;    // "4242"
}
```

**加盟店プール:**
- SaaS: AWS, GCP, Azure, Salesforce, Slack, Notion, Figma, Zoom
- 広告: Google Ads, Meta Ads, X Ads, LinkedIn
- 航空: JAL, ANA
- 宿泊: Grand Hyatt, Ritz-Carlton, ふふ
- 交通: JR東日本, Uber

**金額レンジ:**
- SaaS: ¥50,000 〜 ¥50,000,000
- 広告: ¥100,000 〜 ¥15,000,000
- 航空: ¥50,000 〜 ¥3,000,000
- 宿泊: ¥30,000 〜 ¥500,000

**ステータス配分:**
- confirmed: 85%
- pending: 12%
- cancelled: 3%

### 2. points-history（ポイント履歴）

```typescript
interface PointsHistory {
  id: string;
  date: string;
  description: string;  // "Presidentカード9月利用に対するポイント付与"
  points: number;
  type: "earn" | "use" | "expire";
}
```

### 3. cards（カード情報）

```typescript
interface Card {
  id: string;
  name: string;         // "石井 孝幸"
  last4: string;        // "4242"
  type: "virtual" | "physical";
  status: "active" | "frozen" | "cancelled";
  limit: number;        // 100000000
  used: number;
}
```

## 生成ルール

### 金額

```typescript
// ❌ 避ける（キリの良い数字）
1000, 10000, 100000, 1000000

// ✅ 使う（端数を含むリアルな金額）
1245390, 89760, 3456789, 12340, 567890
```

### 日付表示

```typescript
// 今日/昨日: 相対表示
"今日", "昨日"

// 1週間以内: 相対表示
"3日前"

// 1週間以上: 日付表示
"12月25日"

// 年が異なる: 年月日表示
"2024年12月25日"
```

## 出力形式

```typescript
// 例: /mock-data transactions 3

const mockTransactions = [
  {
    id: "tx_001",
    vendor: "Amazon Web Services",
    category: "saas",
    amount: 45203400,
    status: "confirmed",
    date: "2025/1/14",
    time: "12:34",
    cardLast4: "4242",
  },
  {
    id: "tx_002",
    vendor: "Meta Ads",
    category: "ads",
    amount: 12567800,
    status: "confirmed",
    date: "2025/1/13",
    time: "09:15",
    cardLast4: "4242",
  },
  {
    id: "tx_003",
    vendor: "Grand Hyatt Tokyo",
    category: "dining",
    amount: 156780,
    status: "pending",
    date: "2025/1/12",
    time: "19:30",
    cardLast4: "8901",
  },
];
```

## 注意事項

- 一般消費者レベルの少額決済は避ける（コンビニ500円など）
- 法人カードらしいスケール感を維持
- 日本語の加盟店名は正式名称を使用
