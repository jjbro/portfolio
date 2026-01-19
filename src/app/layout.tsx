import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import portfolioData from "@/data/portfolio.json";
import "./globals.css";

export const metadata: Metadata = {
  title: "포트폴리오",
  description: "프론트엔드 포트폴리오",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { intro } = portfolioData as { intro: { email: string; phone: string } };

  return (
    <html lang="ko">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <div className="flex min-h-screen flex-col">
        <SiteHeader />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6 text-xs text-slate-500">
              <p>
                문의: {intro.email} · {intro.phone}
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
