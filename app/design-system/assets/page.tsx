"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Cloud,
  Megaphone,
  Train,
  Plane,
  Building2,
  UtensilsCrossed,
  ShoppingBag,
  Bell,
  Settings,
  Lock,
  Eye,
  Copy,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Minus,
  Search,
  Filter,
  Download,
  Upload,
  Share,
  Trash2,
  Edit,
  MoreHorizontal,
  User,
  Users,
  Home,
  Calendar,
  Clock,
  Wallet,
  CreditCard as CardIcon,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Info,
  HelpCircle,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface IconItemProps {
  icon: LucideIcon;
  name: string;
  usage?: string;
}

function IconItem({ icon: Icon, name, usage }: IconItemProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const importCode = `import { ${name} } from "lucide-react";`;
    await navigator.clipboard.writeText(importCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-lg transition-all",
        "bg-upsider-surface hover:bg-upsider-surface-light border border-white/10",
        copied && "border-green-400/50"
      )}
    >
      <Icon size={24} className="text-white/80" />
      <span className="text-xs text-white/60">{name}</span>
      {usage && <span className="text-[10px] text-white/40">{usage}</span>}
      {copied && <span className="text-[10px] text-green-400">Copied!</span>}
    </button>
  );
}

const vendorCategoryIcons: IconItemProps[] = [
  { icon: Cloud, name: "Cloud", usage: "SaaS/Cloud" },
  { icon: Megaphone, name: "Megaphone", usage: "Advertising" },
  { icon: Train, name: "Train", usage: "Transit" },
  { icon: Plane, name: "Plane", usage: "Airlines" },
  { icon: Building2, name: "Building2", usage: "Hotels" },
  { icon: UtensilsCrossed, name: "UtensilsCrossed", usage: "Dining" },
  { icon: ShoppingBag, name: "ShoppingBag", usage: "Shopping" },
  { icon: CreditCard, name: "CreditCard", usage: "Default" },
];

const navigationIcons: IconItemProps[] = [
  { icon: Bell, name: "Bell", usage: "Notifications" },
  { icon: Settings, name: "Settings", usage: "Settings" },
  { icon: Home, name: "Home", usage: "Home" },
  { icon: User, name: "User", usage: "Profile" },
  { icon: Users, name: "Users", usage: "Team" },
  { icon: Search, name: "Search", usage: "Search" },
  { icon: Filter, name: "Filter", usage: "Filter" },
  { icon: MoreHorizontal, name: "MoreHorizontal", usage: "Menu" },
];

const actionIcons: IconItemProps[] = [
  { icon: Plus, name: "Plus", usage: "Add" },
  { icon: Minus, name: "Minus", usage: "Remove" },
  { icon: Edit, name: "Edit", usage: "Edit" },
  { icon: Trash2, name: "Trash2", usage: "Delete" },
  { icon: Copy, name: "Copy", usage: "Copy" },
  { icon: Download, name: "Download", usage: "Download" },
  { icon: Upload, name: "Upload", usage: "Upload" },
  { icon: Share, name: "Share", usage: "Share" },
];

const statusIcons: IconItemProps[] = [
  { icon: Check, name: "Check", usage: "Success" },
  { icon: X, name: "X", usage: "Close/Error" },
  { icon: AlertCircle, name: "AlertCircle", usage: "Warning" },
  { icon: Info, name: "Info", usage: "Info" },
  { icon: HelpCircle, name: "HelpCircle", usage: "Help" },
  { icon: Lock, name: "Lock", usage: "Locked" },
  { icon: Eye, name: "Eye", usage: "Visible" },
  { icon: Clock, name: "Clock", usage: "Pending" },
];

const financeIcons: IconItemProps[] = [
  { icon: Wallet, name: "Wallet", usage: "Balance" },
  { icon: CardIcon, name: "CreditCard", usage: "Card" },
  { icon: TrendingUp, name: "TrendingUp", usage: "Income" },
  { icon: TrendingDown, name: "TrendingDown", usage: "Expense" },
  { icon: ArrowUpRight, name: "ArrowUpRight", usage: "Outgoing" },
  { icon: ArrowDownLeft, name: "ArrowDownLeft", usage: "Incoming" },
  { icon: Calendar, name: "Calendar", usage: "Date" },
  { icon: ChevronRight, name: "ChevronRight", usage: "Navigate" },
];

const vendors = [
  { name: "AWS", path: "/assets/vendors/aws.png", category: "SaaS" },
  { name: "Google Cloud", path: "/assets/vendors/google.png", category: "SaaS" },
  { name: "Meta", path: "/assets/vendors/meta.png", category: "Ads" },
  { name: "Salesforce", path: "/assets/vendors/salesforce.png", category: "SaaS" },
  { name: "Slack", path: "/assets/vendors/slack.png", category: "SaaS" },
  { name: "Notion", path: "/assets/vendors/notion.png", category: "SaaS" },
  { name: "JAL", path: "/assets/vendors/jal.png", category: "Travel" },
  { name: "ANA", path: "/assets/vendors/ana.png", category: "Travel" },
];

export default function AssetsPage() {
  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Assets</h1>
        <p className="text-white/60">
          Images, icons, and visual resources for PRESIDENT CARD UI.
        </p>
      </motion.div>

      {/* Card Images */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-white mb-4">Card Images</h2>
        <p className="text-white/60 text-sm mb-6">
          Credit card visuals for the app. Use placeholders during development.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Virtual Card */}
          <div className="bg-upsider-surface rounded-xl border border-white/10 p-6">
            <div className="aspect-[1.586/1] bg-gradient-to-br from-upsider-primary to-upsider-surface-light rounded-xl flex items-center justify-center relative overflow-hidden mb-4">
              <CreditCard size={48} className="text-white/20" />
              <div className="absolute bottom-4 left-4 text-white/50 text-sm font-mono">
                **** **** **** 4242
              </div>
              <div className="absolute top-4 right-4">
                <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded-full">
                  Virtual
                </span>
              </div>
            </div>
            <h3 className="text-white font-medium mb-2">Virtual Card</h3>
            <code className="text-xs bg-white/10 px-2 py-1 rounded text-white/60">
              /assets/cards/virtual-card.png
            </code>
          </div>

          {/* Physical Card */}
          <div className="bg-upsider-surface rounded-xl border border-white/10 p-6">
            <div className="aspect-[1.586/1] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center relative overflow-hidden mb-4">
              <CreditCard size={48} className="text-white/20" />
              <div className="absolute bottom-4 left-4 text-white/50 text-sm font-mono">
                **** **** **** 8888
              </div>
              <div className="absolute top-4 right-4">
                <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded-full">
                  Physical
                </span>
              </div>
            </div>
            <h3 className="text-white font-medium mb-2">Physical Card</h3>
            <code className="text-xs bg-white/10 px-2 py-1 rounded text-white/60">
              /assets/cards/physical-card.png
            </code>
          </div>
        </div>
      </motion.section>

      {/* Vendor Logos */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-white mb-4">Vendor Logos</h2>
        <p className="text-white/60 text-sm mb-6">
          Common merchants for PRESIDENT CARD transactions. Store in /assets/vendors/.
        </p>
        <div className="bg-upsider-surface rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/60 text-sm font-medium">Vendor</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Category</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Path</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {vendors.map((vendor) => (
                <tr key={vendor.name}>
                  <td className="p-4 text-white">{vendor.name}</td>
                  <td className="p-4 text-white/60">{vendor.category}</td>
                  <td className="p-4">
                    <code className="text-xs bg-white/10 px-2 py-1 rounded text-green-400">
                      {vendor.path}
                    </code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-white/50 text-sm mt-4">
          Fallback: Use <code className="bg-white/10 px-1 rounded">/assets/vendors/default.svg</code> when logo is unavailable
        </p>
      </motion.section>

      {/* Icons - Lucide React */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-white mb-4">Icons (Lucide React)</h2>
        <p className="text-white/60 text-sm mb-6">
          Click any icon to copy its import statement.
        </p>

        <div className="space-y-8">
          {/* Vendor Category Icons */}
          <div>
            <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">
              Vendor Categories
            </h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {vendorCategoryIcons.map((item) => (
                <IconItem key={item.name} {...item} />
              ))}
            </div>
          </div>

          {/* Navigation Icons */}
          <div>
            <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {navigationIcons.map((item) => (
                <IconItem key={item.name} {...item} />
              ))}
            </div>
          </div>

          {/* Action Icons */}
          <div>
            <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">
              Actions
            </h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {actionIcons.map((item) => (
                <IconItem key={item.name} {...item} />
              ))}
            </div>
          </div>

          {/* Status Icons */}
          <div>
            <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">
              Status
            </h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {statusIcons.map((item) => (
                <IconItem key={item.name} {...item} />
              ))}
            </div>
          </div>

          {/* Finance Icons */}
          <div>
            <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">
              Finance
            </h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {financeIcons.map((item) => (
                <IconItem key={item.name} {...item} />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Icon Sizes */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-white mb-4">Icon Sizes</h2>
        <div className="bg-upsider-surface rounded-xl border border-white/10 p-6">
          <div className="flex items-end gap-8">
            <div className="flex flex-col items-center gap-2">
              <Bell size={32} className="text-white" />
              <span className="text-white text-sm">32px</span>
              <span className="text-white/40 text-xs">Hero</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Bell size={24} className="text-white" />
              <span className="text-white text-sm">24px</span>
              <span className="text-white/40 text-xs">Navigation</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Bell size={20} className="text-white" />
              <span className="text-white text-sm">20px</span>
              <span className="text-white/40 text-xs">List Items</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Bell size={16} className="text-white" />
              <span className="text-white text-sm">16px</span>
              <span className="text-white/40 text-xs">Buttons</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Bell size={12} className="text-white" />
              <span className="text-white text-sm">12px</span>
              <span className="text-white/40 text-xs">Badges</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Usage */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-white mb-4">Usage</h2>
        <div className="bg-upsider-surface rounded-xl border border-white/10 p-6">
          <pre className="text-sm bg-black/50 p-4 rounded-lg overflow-x-auto text-white/80 font-mono">
{`// Import icons from lucide-react
import { Bell, Settings, CreditCard } from "lucide-react";

// Use with size prop
<Bell size={24} className="text-white" />

// Use with custom color
<Bell size={20} className="text-upsider-primary" />

// Use in ListCell
<ListCell
  icon={Cloud}
  iconColor="text-orange-400"
  title="AWS Web Services"
  ...
/>`}
          </pre>
        </div>
      </motion.section>
    </div>
  );
}
