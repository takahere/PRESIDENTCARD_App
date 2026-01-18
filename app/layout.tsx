import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";

export const metadata: Metadata = {
  title: "UPSIDER PRESIDENT CARD",
  description: "AI Playground - Mobile UI Prototyping Environment",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PRESIDENT CARD",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="font-sf-pro">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
