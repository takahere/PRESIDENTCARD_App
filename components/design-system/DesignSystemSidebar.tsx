"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Palette, Box, Image, ChevronRight, ExternalLink, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function NavItem({ href, icon, title, description }: NavItemProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
          "border border-transparent hover:border-white/10"
        )}
      >
        <div className="w-10 h-10 rounded-lg bg-upsider-surface flex items-center justify-center">
          <span className="text-white/60">{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white font-medium">{title}</div>
          <div className="text-xs text-white/50 truncate">{description}</div>
        </div>
        <ChevronRight size={16} className="text-white/30" />
      </motion.div>
    </Link>
  );
}

const navItems = [
  {
    href: "/design-system/foundation",
    icon: <Palette size={20} />,
    title: "Foundation",
    description: "Colors, Typography, Spacing",
  },
  {
    href: "/design-system/components",
    icon: <Box size={20} />,
    title: "Components",
    description: "Button, Card, ListCell...",
  },
  {
    href: "/design-system/assets",
    icon: <Image size={20} />,
    title: "Assets",
    description: "Images, Icons, Logos",
  },
  {
    href: "/design-system/canvas",
    icon: <LayoutGrid size={20} />,
    title: "Canvas",
    description: "All screens overview",
  },
];

export function DesignSystemSidebar() {
  return (
    <div className="w-80 h-screen bg-upsider-bg border-l border-white/10 overflow-y-auto hidden lg:block">
      {/* Header */}
      <div className="sticky top-0 bg-upsider-bg border-b border-white/10 px-4 py-4 z-10">
        <Link href="/design-system" className="block">
          <h2 className="text-lg font-semibold text-white hover:text-upsider-primary transition-colors">
            Design System
          </h2>
          <p className="text-sm text-white/60 mt-1">PRESIDENT CARD UI Kit</p>
        </Link>
      </div>

      {/* Navigation */}
      <div className="p-2 space-y-1">
        {navItems.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </div>

      {/* Open Full View */}
      <div className="px-4 py-3">
        <Link
          href="/design-system"
          className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-upsider-surface hover:bg-upsider-surface-light rounded-lg text-white/60 hover:text-white text-sm transition-colors"
        >
          <ExternalLink size={14} />
          Open Full Documentation
        </Link>
      </div>

    </div>
  );
}

export default DesignSystemSidebar;
