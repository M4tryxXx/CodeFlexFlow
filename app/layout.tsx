import "@/app/ui/css/global.css";
import { lusitana } from "@/app/ui/fonts";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: "Eugen's Code",
  description:
    "Welcome to the next generation of Curicculkm Vitae, Code Flex Flow and more!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${lusitana.className} antialiased dark:bg-hero-background dark:bg-cover dark:bg-fixed dark:bg-no-repeat dark:bg-center p-0 m-0`}
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
