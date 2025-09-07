import type { Metadata } from "next";
import { Sora, Noto_Sans, DM_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { ErrorBoundary } from "@/components/providers/error-boundary";
import { WebSocketProvider } from "@/components/providers/websocket-provider";

// Headers - Geometric and clean
const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Body - Excellent readability with Japanese support
const notoSans = Noto_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-noto-sans",
  weight: ["300", "400", "500", "600", "700"],
});

// Monospace for stats and numbers
const dmMono = DM_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
});

// Accent font for CTAs and special elements
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Zervtek - Online Vehicle Auctions",
  description: "Your trusted platform for online vehicle auctions. Buy and sell cars with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.variable} ${sora.variable} ${dmMono.variable} ${manrope.variable} font-sans antialiased`}
      >
        <ErrorBoundary>
          <QueryProvider>
            <WebSocketProvider>
              {children}
            </WebSocketProvider>
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
