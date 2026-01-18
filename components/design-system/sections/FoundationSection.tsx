"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorSwatchProps {
  name: string;
  tailwindClass: string;
  hex: string;
}

function ColorSwatch({ name, tailwindClass, hex }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="group flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors w-full text-left"
    >
      <div
        className={cn("w-10 h-10 rounded-lg border border-white/20", tailwindClass)}
      />
      <div className="flex-1 min-w-0">
        <div className="text-sm text-white font-medium truncate">{name}</div>
        <div className="text-xs text-white/50 font-mono">{hex}</div>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        {copied ? (
          <Check size={14} className="text-green-400" />
        ) : (
          <Copy size={14} className="text-white/40" />
        )}
      </div>
    </button>
  );
}

const brandColors: ColorSwatchProps[] = [
  { name: "Primary", tailwindClass: "bg-upsider-primary", hex: "#394D45" },
  { name: "Background", tailwindClass: "bg-upsider-bg", hex: "#001215" },
  { name: "Surface", tailwindClass: "bg-upsider-surface", hex: "#0a1f24" },
  { name: "Surface Light", tailwindClass: "bg-upsider-surface-light", hex: "#132a30" },
];

const textColors: ColorSwatchProps[] = [
  { name: "Primary Text", tailwindClass: "bg-white", hex: "#FFFFFF" },
  { name: "Secondary Text", tailwindClass: "bg-white/60", hex: "rgba(255,255,255,0.6)" },
  { name: "Muted Text", tailwindClass: "bg-white/40", hex: "rgba(255,255,255,0.4)" },
];

const statusColors: ColorSwatchProps[] = [
  { name: "Success", tailwindClass: "bg-green-400", hex: "#4ADE80" },
  { name: "Warning", tailwindClass: "bg-amber-400", hex: "#FBBF24" },
  { name: "Error", tailwindClass: "bg-red-400", hex: "#F87171" },
];

export function FoundationSection() {
  return (
    <div className="space-y-6">
      {/* Colors */}
      <div>
        <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
          Brand Colors
        </h4>
        <div className="space-y-1">
          {brandColors.map((color) => (
            <ColorSwatch key={color.name} {...color} />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
          Text Colors
        </h4>
        <div className="space-y-1">
          {textColors.map((color) => (
            <ColorSwatch key={color.name} {...color} />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
          Status Colors
        </h4>
        <div className="space-y-1">
          {statusColors.map((color) => (
            <ColorSwatch key={color.name} {...color} />
          ))}
        </div>
      </div>

      {/* Typography */}
      <div>
        <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
          Typography
        </h4>
        <div className="space-y-4">
          <div className="p-3 bg-upsider-surface rounded-lg">
            <div className="text-xs text-white/50 mb-1">Heading / font-bold</div>
            <div className="text-2xl font-bold text-white">利用可能額</div>
          </div>
          <div className="p-3 bg-upsider-surface rounded-lg">
            <div className="text-xs text-white/50 mb-1">Body / font-medium</div>
            <div className="text-base font-medium text-white">カード利用明細</div>
          </div>
          <div className="p-3 bg-upsider-surface rounded-lg">
            <div className="text-xs text-white/50 mb-1">Numbers / font-sf-pro tabular-nums</div>
            <div className="text-xl font-sf-pro tabular-nums text-white">¥45,200,000</div>
          </div>
          <div className="p-3 bg-upsider-surface rounded-lg">
            <div className="text-xs text-white/50 mb-1">Caption / text-sm text-white/60</div>
            <div className="text-sm text-white/60">AWS Web Services • 確定</div>
          </div>
        </div>
      </div>

      {/* Spacing */}
      <div>
        <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
          Spacing
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between text-white/80">
            <span>Page Padding</span>
            <code className="text-xs bg-white/10 px-2 py-1 rounded">px-4 (16px)</code>
          </div>
          <div className="flex items-center justify-between text-white/80">
            <span>Section Gap</span>
            <code className="text-xs bg-white/10 px-2 py-1 rounded">space-y-6 (24px)</code>
          </div>
          <div className="flex items-center justify-between text-white/80">
            <span>Card Padding</span>
            <code className="text-xs bg-white/10 px-2 py-1 rounded">p-4 (16px)</code>
          </div>
          <div className="flex items-center justify-between text-white/80">
            <span>Tap Area Min</span>
            <code className="text-xs bg-white/10 px-2 py-1 rounded">44x44px</code>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoundationSection;
