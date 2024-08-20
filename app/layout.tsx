import "@/app/ui/global.css";
import { lusitana } from "@/app/ui/fonts";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <body
        className={`${lusitana.className} antialiased dark:bg-[url('./images/herobg.png')] dark:bg-cover dark:bg-fixed dark:bg-no-repeat dark:bg-center`}
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
