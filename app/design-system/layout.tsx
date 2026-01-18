"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Palette, Box, Image, ArrowLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DesignSystemLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { href: "/design-system/foundation", icon: Palette, label: "Foundation", description: "カラー・タイポグラフィ" },
  { href: "/design-system/components", icon: Box, label: "Components", description: "UIコンポーネント" },
  { href: "/design-system/assets", icon: Image, label: "Assets", description: "画像・アイコン" },
];

export default function DesignSystemLayout({ children }: DesignSystemLayoutProps) {
  const pathname = usePathname();
  const isTopPage = pathname === "/design-system";

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-upsider-bg border-r border-white/10 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4">
            <ArrowLeft size={16} />
            <span className="text-sm">アプリに戻る</span>
          </Link>
          <h1 className="text-lg font-semibold text-white">Design System</h1>
          <p className="text-sm text-white/60">PRESIDENT CARD UI Kit</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-upsider-primary text-white"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <item.icon size={20} />
                    <div className="flex-1">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs opacity-60">{item.description}</div>
                    </div>
                    <ChevronRight size={16} className="opacity-40" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
