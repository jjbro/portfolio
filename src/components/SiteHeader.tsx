import Link from "next/link";
import portfolioData from "@/data/portfolio.json";

const navigation = [
  { label: "소개", href: "/intro" },
  { label: "경력", href: "/experience" },
  { label: "프로젝트", href: "/projects" },
];

export default function SiteHeader() {
  const { intro } = portfolioData as { intro: { name: string } };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/intro" className="flex items-center gap-3">
          <div className="leading-tight">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-900">
              portfolio
            </p>
          </div>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
