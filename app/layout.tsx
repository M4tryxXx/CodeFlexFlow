import "@/app/ui/global.css";
import { lusitana } from "@/app/ui/fonts";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";
import Head from "next/head";
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${lusitana.className} antialiased dark:bg-[url('./images/herobg.png')] dark:bg-cover dark:bg-fixed dark:bg-no-repeat dark:bg-center p-0 m-0`}
        suppressHydrationWarning={true}
      >
        <Providers>
          {children}
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}