import portfolioData from "@/data/portfolio.json";

type PortfolioData = {
  experiences: {
    company: string;
    role: string;
    period: string;
    summary: string;
    highlights: string[];
  }[];
};

export default function ExperiencePage() {
  const { experiences } = portfolioData as PortfolioData;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-12">
      <section>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">경력</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-950">
              경험 요약
            </h1>
          </div>
          <span className="text-xs font-medium text-slate-500">
            총 {experiences.length}개
          </span>
        </div>
        <div className="space-y-4">
          {experiences.map((experience) => (
            <article
              key={`${experience.company}-${experience.period}`}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {experience.company}
                  </h2>
                  <p className="text-sm font-medium text-slate-600">
                    {experience.role}
                  </p>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {experience.period}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {experience.summary}
              </p>
              <ul className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                {experience.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
