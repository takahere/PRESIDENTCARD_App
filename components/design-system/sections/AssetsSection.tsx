"use client";

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
} from "lucide-react";

interface IconItemProps {
  icon: React.ReactNode;
  name: string;
}

function IconItem({ icon, name }: IconItemProps) {
  return (
    <div className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 transition-colors">
      <div className="text-white/80">{icon}</div>
      <span className="text-[10px] text-white/50 text-center">{name}</span>
    </div>
  );
}

const vendorIcons = [
  { icon: <Cloud size={20} />, name: "SaaS" },
  { icon: <Megaphone size={20} />, name: "Ads" },
  { icon: <Train size={20} />, name: "Transit" },
  { icon: <Plane size={20} />, name: "Airlines" },
  { icon: <Building2 size={20} />, name: "Hotels" },
  { icon: <UtensilsCrossed size={20} />, name: "Dining" },
  { icon: <ShoppingBag size={20} />, name: "Shopping" },
  { icon: <CreditCard size={20} />, name: "Other" },
];

const uiIcons = [
  { icon: <Bell size={20} />, name: "Bell" },
  { icon: <Settings size={20} />, name: "Settings" },
  { icon: <Lock size={20} />, name: "Lock" },
  { icon: <Eye size={20} />, name: "Eye" },
  { icon: <Copy size={20} />, name: "Copy" },
  { icon: <Check size={20} />, name: "Check" },
  { icon: <X size={20} />, name: "Close" },
  { icon: <ChevronRight size={20} />, name: "Right" },
  { icon: <ChevronLeft size={20} />, name: "Left" },
  { icon: <ArrowUpRight size={20} />, name: "Outgoing" },
  { icon: <ArrowDownLeft size={20} />, name: "Incoming" },
];

export function AssetsSection() {
  return (
    <div className="space-y-6">
      {/* Card Images */}
      <div>
        <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
          Card Images
        </h4>
        <div className="space-y-3">
          {/* Virtual Card Placeholder */}
          <div className="aspect-[1.586/1] bg-gradient-to-br from-upsider-primary to-upsider-surface-light rounded-xl flex items-center justify-center relative overflow-hidden">
            <CreditCard size={32} className="text-white/30" />
            <div className="absolute bottom-3 left-4 text-white/50 text-xs font-mono">
              **** **** **** 4242
            </div>
            <div className="absolute top-3 right-4">
              <span className="text-[10px] text-white/40 bg-white/10 px-2 py-0.5 rounded-full">
                Virtual
              </span>
            </div>
          </div>
          <p className="text-xs text-white/50">
            Path: <code className="bg-white/10 px-1 rounded">/assets/cards/virtual-card.png</code>
          </p>

          {/* Real Card Placeholder */}
          <div className="aspect-[1.586/1] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center relative overflow-hidden">
            <CreditCard size={32} className="text-white/30" />
            <div className="absolute bottom-3 left-4 text-white/50 text-xs font-mono">
              **** **** **** 8888
            </div>
            <div className="absolute top-3 right-4">
              <span className="text-[10px] text-white/40 bg-white/10 px-2 py-0.5 rounded-full">
                Real
              </span>
            </div>
          </div>
          <p className="text-xs text-white/50">
            Path: <code className="bg-white/10 px-1 rounded">/assets/cards/real-card.png</code>
          </p>
        </div>
      </div>

      {/* Vendor Icons */}
      <div>
        <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
          Vendor Category Icons
        </h4>
        <div className="grid grid-cols-4 gap-1">
          {vendorIcons.map((item) => (
            <IconItem key={item.name} {...item} />
          ))}
        </div>
        <p className="text-xs text-white/50 mt-2">
          Use Lucide icons for vendor categories when logos unavailable
        </p>
      </div>

      {/* UI Icons */}
      <div>
        <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
          Common UI Icons
        </h4>
        <div className="grid grid-cols-4 gap-1">
          {uiIcons.map((item) => (
            <IconItem key={item.name} {...item} />
          ))}
        </div>
      </div>

      {/* Icon Sizes */}
      <div>
        <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
          Icon Sizes
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between text-white/80">
            <span>Navigation</span>
            <code className="text-xs bg-white/10 px-2 py-1 rounded">24px</code>
          </div>
          <div className="flex items-center justify-between text-white/80">
            <span>List Items</span>
            <code className="text-xs bg-white/10 px-2 py-1 rounded">20px</code>
          </div>
          <div className="flex items-center justify-between text-white/80">
            <span>Buttons</span>
            <code className="text-xs bg-white/10 px-2 py-1 rounded">16px</code>
          </div>
          <div className="flex items-center justify-between text-white/80">
            <span>Badges</span>
            <code className="text-xs bg-white/10 px-2 py-1 rounded">12px</code>
          </div>
        </div>
      </div>

      {/* Vendor Logo Paths */}
      <div>
        <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
          Vendor Logo Paths
        </h4>
        <div className="space-y-1 text-xs text-white/60">
          <div className="flex justify-between">
            <span>AWS</span>
            <code className="bg-white/10 px-1 rounded">/assets/vendors/aws.png</code>
          </div>
          <div className="flex justify-between">
            <span>Google</span>
            <code className="bg-white/10 px-1 rounded">/assets/vendors/google.png</code>
          </div>
          <div className="flex justify-between">
            <span>Meta</span>
            <code className="bg-white/10 px-1 rounded">/assets/vendors/meta.png</code>
          </div>
          <div className="flex justify-between">
            <span>Default</span>
            <code className="bg-white/10 px-1 rounded">/assets/vendors/default.svg</code>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetsSection;
