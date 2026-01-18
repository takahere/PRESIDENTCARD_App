/**
 * NFCスキャン モック実装
 *
 * 実際のNFC APIは使用せず、UIデモ用のモック実装
 */

export type NfcScanStatus = "idle" | "waiting" | "scanning" | "success" | "error";

export interface NfcScanResult {
  success: boolean;
  error?: string;
  data?: {
    name: string;
    birthDate: string;
    address: string;
  };
}

// スキャンステータスメッセージ
export const NFC_STATUS_MESSAGES: Record<NfcScanStatus, string> = {
  idle: "マイナンバーカードをスマートフォンにかざしてください",
  waiting: "カードを検出中...",
  scanning: "カード情報を読み取っています...",
  success: "読み取り完了",
  error: "読み取りに失敗しました",
};

// モックスキャン実行
export function simulateNfcScan(
  onStatusChange: (status: NfcScanStatus) => void,
  onComplete: (result: NfcScanResult) => void
): () => void {
  let isCancelled = false;

  const run = async () => {
    // ステップ1: 検出中
    onStatusChange("waiting");
    await sleep(1000);
    if (isCancelled) return;

    // ステップ2: スキャン中
    onStatusChange("scanning");
    await sleep(2000);
    if (isCancelled) return;

    // ステップ3: 結果（80%で成功）
    const isSuccess = Math.random() > 0.2;

    if (isSuccess) {
      onStatusChange("success");
      onComplete({
        success: true,
        data: {
          name: "山田 太郎",
          birthDate: "1985-03-15",
          address: "東京都渋谷区道玄坂1-2-3",
        },
      });
    } else {
      onStatusChange("error");
      onComplete({
        success: false,
        error: getRandomError(),
      });
    }
  };

  run();

  // キャンセル関数を返す
  return () => {
    isCancelled = true;
  };
}

// ランダムエラーメッセージ
function getRandomError(): string {
  const errors = [
    "カードの読み取りに失敗しました。もう一度お試しください。",
    "カードを正しい位置にかざしてください。",
    "カードの読み取りがタイムアウトしました。",
    "NFCの通信エラーが発生しました。",
  ];
  return errors[Math.floor(Math.random() * errors.length)];
}

// ユーティリティ
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// スキャンアニメーション用のパルス効果
export function getPulseAnimation(status: NfcScanStatus): string {
  switch (status) {
    case "waiting":
    case "scanning":
      return "animate-pulse";
    default:
      return "";
  }
}

// ステータスに応じた色
export function getStatusColor(status: NfcScanStatus): string {
  switch (status) {
    case "success":
      return "text-lightgreen-80";
    case "error":
      return "text-red-80";
    case "waiting":
    case "scanning":
      return "text-orange-70";
    default:
      return "text-white/60";
  }
}
