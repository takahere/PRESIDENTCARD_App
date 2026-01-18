"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Palette, Box, Image, ArrowRight } from "lucide-react";

const categories = [
  {
    href: "/design-system/foundation",
    icon: Palette,
    title: "Foundation",
    description: "Brand colors, typography, and spacing system",
    items: ["Brand Colors", "Text Colors", "Typography Scale", "Spacing"],
  },
  {
    href: "/design-system/components",
    icon: Box,
    title: "Components",
    description: "iOS-style reusable UI components",
    items: ["Button", "Card", "ListCell", "Navigation", "BottomSheet"],
  },
  {
    href: "/design-system/assets",
    icon: Image,
    title: "Assets",
    description: "Images, icons, and visual resources",
    items: ["Card Images", "Vendor Logos", "Lucide Icons"],
  },
];

export default function DesignSystemPage() {
  return (
    <div className="p-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          PRESIDENT CARD Design System
        </h1>
        <p className="text-lg text-white/60 max-w-2xl">
          AI-driven prototyping environment for rapid UI/UX validation.
          Build native-feeling mobile experiences using web technologies.
        </p>
      </motion.div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={category.href}>
              <div className="bg-upsider-surface rounded-xl p-6 h-full border border-white/10 hover:border-upsider-primary/50 transition-all group">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-upsider-primary/20 flex items-center justify-center mb-4 group-hover:bg-upsider-primary/30 transition-colors">
                  <category.icon size={24} className="text-upsider-primary" />
                </div>

                {/* Title */}
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-semibold text-white">
                    {category.title}
                  </h2>
                  <ArrowRight size={16} className="text-white/40 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Description */}
                <p className="text-white/60 text-sm mb-4">
                  {category.description}
                </p>

                {/* Items */}
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs bg-white/5 text-white/60 px-2 py-1 rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Start */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 bg-upsider-surface rounded-xl p-6 border border-white/10"
      >
        <h2 className="text-xl font-semibold text-white mb-4">Quick Start</h2>
        <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
          <div className="text-white/60">{`// Import iOS-style components`}</div>
          <div className="text-green-400">{`import { Button, Card, ListCell } from "@/components/ui/ios";`}</div>
          <br />
          <div className="text-white/60">{`// Use in your component`}</div>
          <div className="text-white">{`<Button variant="primary">Action</Button>`}</div>
        </div>
      </motion.div>

      {/* Design Principles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="p-4 border border-white/10 rounded-lg">
          <h3 className="text-white font-medium mb-2">Mobile First</h3>
          <p className="text-white/60 text-sm">
            Prioritize smartphone operability. Minimum tap area 44x44px.
          </p>
        </div>
        <div className="p-4 border border-white/10 rounded-lg">
          <h3 className="text-white font-medium mb-2">Dark Theme</h3>
          <p className="text-white/60 text-sm">
            Professional dark UI with UPSIDER brand colors.
          </p>
        </div>
        <div className="p-4 border border-white/10 rounded-lg">
          <h3 className="text-white font-medium mb-2">iOS Feel</h3>
          <p className="text-white/60 text-sm">
            Tap feedback, smooth animations, native-like interactions.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
