"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from "lucide-react";

type AlertType = "error" | "warning" | "success" | "info";

interface AlertBannerProps {
  type?: AlertType;
  message: string;
  title?: string;
  show: boolean;
  onDismiss?: () => void;
  dismissible?: boolean;
  className?: string;
}

const alertConfig: Record<
  AlertType,
  {
    icon: typeof AlertCircle;
    bgColor: string;
    borderColor: string;
    textColor: string;
    iconColor: string;
  }
> = {
  error: {
    icon: AlertCircle,
    bgColor: "bg-red-80/10",
    borderColor: "border-red-80/30",
    textColor: "text-red-80",
    iconColor: "text-red-80",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-orange-70/10",
    borderColor: "border-orange-70/30",
    textColor: "text-orange-70",
    iconColor: "text-orange-70",
  },
  success: {
    icon: CheckCircle,
    bgColor: "bg-lightgreen-80/10",
    borderColor: "border-lightgreen-80/30",
    textColor: "text-lightgreen-80",
    iconColor: "text-lightgreen-80",
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-400",
    iconColor: "text-blue-400",
  },
};

/**
 * iOSスタイルのアラートバナー
 */
export function AlertBanner({
  type = "error",
  message,
  title,
  show,
  onDismiss,
  dismissible = false,
  className = "",
}: AlertBannerProps) {
  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -10, height: 0 }}
          transition={{ duration: 0.2 }}
          className={`overflow-hidden ${className}`}
        >
          <div
            className={`
              px-4 py-3 rounded-lg border
              ${config.bgColor} ${config.borderColor}
              flex items-start gap-3
            `}
          >
            <Icon
              size={20}
              className={`${config.iconColor} shrink-0 mt-0.5`}
            />

            <div className="flex-1 min-w-0">
              {title && (
                <p className={`text-body-small font-semibold ${config.textColor}`}>
                  {title}
                </p>
              )}
              <p className={`text-body-small ${config.textColor}`}>
                {message}
              </p>
            </div>

            {dismissible && onDismiss && (
              <button
                onClick={onDismiss}
                className={`p-1 rounded-full active:opacity-70 ${config.iconColor}`}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
