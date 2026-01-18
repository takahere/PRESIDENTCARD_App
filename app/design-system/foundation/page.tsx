"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorSwatchProps {
  name: string;
  tailwindClass: string;
  hex: string;
  description?: string;
}

function ColorSwatch({ name, tailwindClass, hex, description }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-upsider-surface rounded-xl p-4 border border-white/10">
      <div
        className={cn("w-full h-16 rounded-lg border border-white/20 mb-3", tailwindClass)}
      />
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="text-white font-medium text-sm">{name}</div>
          {description && (
            <div className="text-xs text-white/50 mt-0.5">{description}</div>
          )}
        </div>
      </div>
      <button
        onClick={handleCopy}
        className="text-xs bg-white/5 hover:bg-white/10 text-white/60 px-2 py-1.5 rounded font-mono transition-colors flex items-center gap-2 w-full justify-center"
      >
        {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
        {hex}
      </button>
    </div>
  );
}

// Semantic Colors - 用途別カラー
const semanticColors: ColorSwatchProps[] = [
  { name: "Primary", tailwindClass: "bg-[#394D45]", hex: "#394D45", description: "Primary Buttonのカラー" },
  { name: "Background", tailwindClass: "bg-[#001215]", hex: "#001215", description: "メイン背景" },
  { name: "Accent", tailwindClass: "bg-[#E7A344]", hex: "#E7A344", description: "Secondaryとして使用" },
  { name: "Primary Text", tailwindClass: "bg-[#1BA86F]", hex: "#1BA86F", description: "主にテキストに使用" },
  { name: "Error", tailwindClass: "bg-[#FF3B30]", hex: "#FF3B30", description: "警告ステータス" },
  { name: "Info", tailwindClass: "bg-[#3A82F7]", hex: "#3A82F7", description: "マイナンバースキャン用" },
  { name: "Card", tailwindClass: "bg-[#242424]", hex: "#242424", description: "カード/セル背景" },
  { name: "Card Border", tailwindClass: "bg-[#2F2F2F]", hex: "#2F2F2F", description: "カードボーダー" },
  { name: "Placeholder Text", tailwindClass: "bg-[#B9B7B6]", hex: "#B9B7B6", description: "プレースホルダー" },
  { name: "Text Gray", tailwindClass: "bg-[#717171]", hex: "#717171", description: "グレーテキスト" },
];

// Primitive Color Palettes
const primitiveColors = {
  darkgreen: {
    name: "Dark Green",
    description: "ブランドグリーン",
    colors: [
      { level: "00", hex: "#e3e6e5" },
      { level: "10", hex: "#dfe3e1" },
      { level: "20", hex: "#c8cdcb" },
      { level: "30", hex: "#b0b8b5" },
      { level: "40", hex: "#98a29e" },
      { level: "50", hex: "#808d88" },
      { level: "60", hex: "#697872" },
      { level: "70", hex: "#51625b" },
      { level: "80", hex: "#394d45" },
      { level: "90", hex: "#25322d" },
    ],
  },
  luxbrown: {
    name: "Lux Brown",
    description: "背景系カラー",
    colors: [
      { level: "00", hex: "#f2f3f3" },
      { level: "10", hex: "#d9dbdc" },
      { level: "20", hex: "#bfc4c5" },
      { level: "30", hex: "#a6acad" },
      { level: "40", hex: "#8c9496" },
      { level: "50", hex: "#737d7e" },
      { level: "60", hex: "#596567" },
      { level: "70", hex: "#334144" },
      { level: "80", hex: "#1a2a2d" },
      { level: "90", hex: "#001215" },
    ],
  },
  orange: {
    name: "Orange",
    description: "アクセントカラー",
    colors: [
      { level: "00", hex: "#fdf6ec" },
      { level: "10", hex: "#faedda" },
      { level: "20", hex: "#f8e3c7" },
      { level: "30", hex: "#f4d6ab" },
      { level: "40", hex: "#f2cc98" },
      { level: "50", hex: "#eebe7c" },
      { level: "60", hex: "#ecb569" },
      { level: "70", hex: "#e7a344" },
      { level: "80", hex: "#d69438" },
      { level: "90", hex: "#c78221" },
    ],
  },
  lightgreen: {
    name: "Light Green",
    description: "成功/確定ステータス",
    colors: [
      { level: "00", hex: "#dff3eb" },
      { level: "10", hex: "#dbf1e8" },
      { level: "20", hex: "#bfe7d7" },
      { level: "30", hex: "#a4dcc5" },
      { level: "40", hex: "#88d2b4" },
      { level: "50", hex: "#6dc7a3" },
      { level: "60", hex: "#52bd92" },
      { level: "70", hex: "#36b280" },
      { level: "80", hex: "#1ba86f" },
      { level: "90", hex: "#149662" },
    ],
  },
};

function PrimitivePalette({ paletteName, palette }: { paletteName: string; palette: typeof primitiveColors.darkgreen }) {
  const [expanded, setExpanded] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = async (hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="bg-upsider-surface rounded-xl border border-white/10 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5">
            {palette.colors.slice(0, 5).map((c) => (
              <div key={c.level} className="w-4 h-4 rounded-sm" style={{ backgroundColor: c.hex }} />
            ))}
          </div>
          <div>
            <div className="text-white font-medium text-sm">{palette.name}</div>
            <div className="text-xs text-white/50">{palette.description}</div>
          </div>
        </div>
        {expanded ? <ChevronDown size={16} className="text-white/40" /> : <ChevronRight size={16} className="text-white/40" />}
      </button>
      {expanded && (
        <div className="border-t border-white/10 p-4">
          <div className="grid grid-cols-5 gap-2">
            {palette.colors.map((c) => (
              <button
                key={c.level}
                onClick={() => handleCopy(c.hex)}
                className="group"
              >
                <div
                  className="w-full h-12 rounded-lg mb-1 border border-white/10"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="text-xs text-white/60 font-mono flex items-center justify-center gap-1">
                  {copiedHex === c.hex ? (
                    <Check size={10} className="text-green-400" />
                  ) : null}
                  {c.level}
                </div>
              </button>
            ))}
          </div>
          <div className="mt-3 text-xs text-white/40 text-center">
            クリックでカラーコードをコピー
          </div>
        </div>
      )}
    </div>
  );
}

export default function FoundationPage() {
  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Foundation</h1>
        <p className="text-white/60">
          デザインの基盤となるカラー、タイポグラフィ、スペーシングの定義
        </p>
      </motion.div>

      {/* Semantic Colors */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-white mb-2">Semantic Colors</h2>
        <p className="text-white/60 text-sm mb-6">
          用途別に定義されたカラー。UIを構築する際はこれらを使用してください。
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {semanticColors.map((color) => (
            <ColorSwatch key={color.name} {...color} />
          ))}
        </div>
      </motion.section>

      {/* Primitive Colors */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-white mb-2">Primitive Colors</h2>
        <p className="text-white/60 text-sm mb-6">
          Figmaで定義されたカラーパレット。詳細な調整が必要な場合に使用。
        </p>
        <div className="space-y-3">
          {Object.entries(primitiveColors).map(([key, palette]) => (
            <PrimitivePalette key={key} paletteName={key} palette={palette} />
          ))}
        </div>
      </motion.section>

      {/* Typography */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-white mb-2">Typography</h2>
        <p className="text-white/60 text-sm mb-4">
          全てのテキストに SF Pro フォントを使用。見出しには SF Pro Display を使用。
        </p>

        {/* Font Rule Card */}
        <div className="bg-upsider-primary/20 border border-upsider-primary/40 rounded-xl p-4 mb-6">
          <h4 className="text-upsider-primary-text font-semibold text-sm mb-2">グローバルフォント設定</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <code className="text-xs bg-white/10 px-2 py-1 rounded text-green-400">font-sf-pro</code>
              <span className="text-white/60">— 本文、ラベル、金額表示（デフォルト）</span>
            </div>
            <div className="flex items-center gap-2">
              <code className="text-xs bg-white/10 px-2 py-1 rounded text-green-400">font-sf-display</code>
              <span className="text-white/60">— 見出し（Header）</span>
            </div>
            <div className="flex items-center gap-2">
              <code className="text-xs bg-white/10 px-2 py-1 rounded text-green-400">tabular-nums</code>
              <span className="text-white/60">— 金額表示時に追加（等幅数字）</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">Header</h3>
          <div className="space-y-3">
            <div className="bg-upsider-surface rounded-xl p-5 border border-white/10">
              <div className="text-xs text-white/40 mb-2 font-mono">text-header-huge (40px/48px)</div>
              <div className="text-header-huge text-white font-sf-display">利用可能額</div>
            </div>
            <div className="bg-upsider-surface rounded-xl p-5 border border-white/10">
              <div className="text-xs text-white/40 mb-2 font-mono">text-header-large (32px/38.4px)</div>
              <div className="text-header-large text-white font-sf-display">与信枠</div>
            </div>
            <div className="bg-upsider-surface rounded-xl p-5 border border-white/10">
              <div className="text-xs text-white/40 mb-2 font-mono">text-header-medium (24px/36px)</div>
              <div className="text-header-medium text-white font-sf-display">カード利用明細</div>
            </div>
            <div className="bg-upsider-surface rounded-xl p-5 border border-white/10">
              <div className="text-xs text-white/40 mb-2 font-mono">text-header-small (20px/24px)</div>
              <div className="text-header-small text-white font-sf-display">決済履歴</div>
            </div>
          </div>
        </div>

        {/* Paragraph */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">Paragraph</h3>
          <div className="space-y-3">
            <div className="bg-upsider-surface rounded-xl p-5 border border-white/10">
              <div className="text-xs text-white/40 mb-2 font-mono">text-paragraph-medium (17px/25.5px)</div>
              <div className="text-paragraph-medium text-white">PRESIDENT CARDは、成長企業の経営者に最適な法人カードです。</div>
            </div>
            <div className="bg-upsider-surface rounded-xl p-5 border border-white/10">
              <div className="text-xs text-white/40 mb-2 font-mono">text-paragraph-small (16px/22.4px)</div>
              <div className="text-paragraph-small text-white">最大10億円の与信枠で、ビジネスの成長を加速させます。</div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">Body</h3>
          <div className="space-y-3">
            <div className="bg-upsider-surface rounded-xl p-5 border border-white/10">
              <div className="text-xs text-white/40 mb-2 font-mono">text-body-medium (14px/22.4px)</div>
              <div className="text-body-medium text-white">AWS Web Services • 確定</div>
            </div>
            <div className="bg-upsider-surface rounded-xl p-5 border border-white/10">
              <div className="text-xs text-white/40 mb-2 font-mono">text-body-small (13px/22.1px)</div>
              <div className="text-body-small text-white/60">2024年1月15日 14:32</div>
            </div>
          </div>
        </div>

        {/* Caption */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">Caption</h3>
          <div className="space-y-3">
            <div className="bg-upsider-surface rounded-xl p-5 border border-white/10">
              <div className="text-xs text-white/40 mb-2 font-mono">text-caption-medium (12px/20.4px)</div>
              <div className="text-caption-medium text-white/60">カード番号下4桁: 1234</div>
            </div>
            <div className="bg-upsider-surface rounded-xl p-5 border border-white/10">
              <div className="text-xs text-white/40 mb-2 font-mono">text-caption-small (11px/13.2px)</div>
              <div className="text-caption-small text-white/40">最終更新: 1分前</div>
            </div>
          </div>
        </div>

        {/* Numbers */}
        <div>
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">Numbers（金額表示）</h3>
          <div className="bg-upsider-surface rounded-xl p-5 border border-white/10">
            <div className="text-xs text-white/40 mb-2 font-mono">font-sf-pro tabular-nums（SF Pro + 等幅数字）</div>
            <div className="text-4xl font-sf-pro tabular-nums text-white">¥45,200,000</div>
            <div className="text-xs text-white/40 mt-3">
              金額はSF Proフォントを使用し、tabular-numsで等幅数字に。右揃え・桁区切りはカンマを使用。
            </div>
          </div>
        </div>
      </motion.section>

      {/* Spacing */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-white mb-2">Spacing</h2>
        <p className="text-white/60 text-sm mb-6">
          レイアウトとコンポーネントで使用するスペーシング値
        </p>
        <div className="bg-upsider-surface rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/60 text-sm font-medium">用途</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Tailwind Class</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">値</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="p-4 text-white">ページパディング</td>
                <td className="p-4"><code className="text-xs bg-white/10 px-2 py-1 rounded text-green-400">px-4</code></td>
                <td className="p-4 text-white/60">16px</td>
              </tr>
              <tr>
                <td className="p-4 text-white">セクション間隔</td>
                <td className="p-4"><code className="text-xs bg-white/10 px-2 py-1 rounded text-green-400">space-y-6</code></td>
                <td className="p-4 text-white/60">24px</td>
              </tr>
              <tr>
                <td className="p-4 text-white">カード内パディング</td>
                <td className="p-4"><code className="text-xs bg-white/10 px-2 py-1 rounded text-green-400">p-4</code></td>
                <td className="p-4 text-white/60">16px</td>
              </tr>
              <tr>
                <td className="p-4 text-white">角丸（カード）</td>
                <td className="p-4"><code className="text-xs bg-white/10 px-2 py-1 rounded text-green-400">rounded-xl</code></td>
                <td className="p-4 text-white/60">12px</td>
              </tr>
              <tr>
                <td className="p-4 text-white">角丸（入力欄）</td>
                <td className="p-4"><code className="text-xs bg-white/10 px-2 py-1 rounded text-green-400">rounded-lg</code></td>
                <td className="p-4 text-white/60">8px</td>
              </tr>
              <tr>
                <td className="p-4 text-white">最小タップ領域</td>
                <td className="p-4"><code className="text-xs bg-white/10 px-2 py-1 rounded text-green-400">min-w-[44px] min-h-[44px]</code></td>
                <td className="p-4 text-white/60">44×44px</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
}
