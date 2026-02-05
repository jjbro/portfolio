import portfolioData from "@/data/portfolio.json";

type PortfolioData = {
  intro: {
    name: string;
    role: string;
    summary: string;
    location: string;
    email: string;
    phone?: string;
    totalExperience?: string;
    leadership?: string[];
    majorProjects?: { title: string; description: string }[];
    interests?: string[];
    education?: {
      school: string;
      department: string;
      period: string;
      status: string;
      major: string;
    }[];
    awards?: { title: string; date: string; type: string; note: string }[];
    links: { label: string; href: string }[];
    tags: string[];
  };
};

export default function IntroPage() {
  const { intro } = portfolioData as unknown as PortfolioData;
  const summaryLines = intro.summary
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^-+\s*/, ""));

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-12">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-sm font-semibold text-blue-600">소개</p>
          <div className="space-y-3">
            <p className="text-base font-medium text-slate-700 sm:text-lg">
              {intro.role}
              <span className="block">{intro.name} 입니다.</span>
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:border-slate-300 hover:bg-slate-50/60">
            <p className="text-base font-semibold text-slate-900">주요 역량</p>
            <div className="mt-4 space-y-2 text-sm leading-5 text-slate-600">
              {summaryLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {intro.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>

          {intro.leadership?.length ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:border-slate-300 hover:bg-slate-50/60">
              <p className="text-base font-semibold text-slate-900">리더십</p>
              <div className="mt-4 space-y-2 text-sm leading-5 text-slate-600">
                {intro.leadership.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:border-slate-300 hover:bg-slate-50/60">
            <p className="text-base font-semibold text-slate-900">기본 정보</p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              {intro.location ? (
                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-500">지역</span>
                  <span className="font-medium text-slate-800">
                    {intro.location}
                  </span>
                </div>
              ) : null}
              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-500">이메일</span>
                <a
                  className="font-medium text-blue-600 hover:text-blue-700"
                  href={`mailto:${intro.email}`}
                >
                  {intro.email}
                </a>
              </div>
              {intro.phone ? (
                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-500">연락처</span>
                  <span className="font-medium text-slate-800">
                    {intro.phone}
                  </span>
                </div>
              ) : null}
              {intro.totalExperience ? (
                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-500">경력</span>
                  <span className="font-medium text-slate-800">
                    {intro.totalExperience}
                  </span>
                </div>
              ) : null}
            </div>
          </div>

          {intro.education?.length ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:border-slate-300 hover:bg-slate-50/60">
              <p className="text-base font-semibold text-slate-900">학력</p>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                {intro.education.map((edu) => (
                  <div key={`${edu.school}-${edu.period}`} className="space-y-1">
                    <p className="font-medium text-slate-800">{edu.school}</p>
                    <p>
                      {edu.department} · {edu.major}
                    </p>
                    <p className="text-xs text-slate-500">
                      {edu.period} · {edu.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {intro.awards?.length ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:border-slate-300 hover:bg-slate-50/60">
              <p className="text-base font-semibold text-slate-900">수상/자격증</p>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                {intro.awards.map((award) => (
                  <div key={`${award.title}-${award.date}`} className="space-y-1">
                    <p className="font-medium text-slate-800">
                      {award.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {award.date}
                      {award.type ? ` · ${award.type}` : ""}
                    </p>
                    <p className="text-sm">{award.note}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-base font-semibold text-slate-900">
          기술 철학과 인사이트
        </p>
        <div className="mt-4 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
            <p className="text-sm font-semibold text-slate-900">
              AI-Driven Development: 구현자에서 설계자로
            </p>
            <div className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
              <p>
                Cursor AI와 같은 도구의 등장은 프론트엔드 개발의 패러다임을
                <strong>&quot;How(구현)&quot;</strong>에서 <strong>&quot;What(설계)</strong>&quot;으로 이동시키고
                있습니다.
              </p>
              <p>
                과거에는 복잡한 UI 로직을 &apos;직접 짜는 능력&apos;이
                중요했고, 이를 위해 많은 시간을 할애하였다면,<br />
                이제는 AI와 함께 로직의 무결성을 검증하고,
                사용자 경험(UX)의 디테일을 챙기며, 전체 아키텍처를
                바라보는 능력이 핵심 역량이 되었습니다.
              </p>
              <p>
              머지않아 <strong>AI가 또 다른 AI를 지휘하며 개발하는 '에이전트(Agentic) 워크플로우'</strong>의 시대가 도래할 것입니다.<br />
              급변하는 기술의 파도 속에서도 도구에 매몰되지 않고, 변화의 본질을 읽어내어<br />
              시장이 필요로 하는 최적의 기술을 선제적으로 도입해야 합니다.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
            <p className="text-sm font-semibold text-slate-900">
              웹 최적화 패러다임의 변화 (Legacy vs Modern)
            </p>
            <div className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
              <p>
                <strong>Pre-Framework (jQuery/MPA 시대):</strong> 최적화의 주적은 <strong>'네트워크 지연(Network Latency)'</strong>이었습니다.<br />
                동시 요청 제한을 극복하기 위해 이미지 스프라이트, 스크립트 병합 등 리소스 요청 횟수와 물리적 용량을 줄이는 것이 핵심이었습니다.<br />
                스크립트의 defer/async 처리나 CDN 활용 또한 <strong>'다운로드를 빠르게'</strong> 하는 데 초점이 맞춰져 있었습니다.
              </p>
              <p>
                <strong>Post-Framework (React/Next.js 시대):</strong> 이제는 <strong>'메인 스레드 부하(CPU-bound)'</strong>가 핵심 병목입니다.<br />
                네트워크 속도는 빨라졌지만, 거대한 JS 실행 비용(<strong>Hydration</strong>)이 사용자 경험을 저해합니다.<br />
                따라서 Next.js와 같은 프레임워크를 도입하여 불필요한 JS 전송을 줄이는 <strong>서버 컴포넌트(RSC)</strong> 아키텍처를 활용하고,<br />
                실행 시점을 지연시키는 <strong>번들 스플리팅</strong> 전략을 통해<strong> 라우팅 이외의 컴포넌트 레벨도 TTI(Time to Interactive)</strong>를 단축하는 데에도 노력을 기울여야 합니다.
              </p>
              <p className="pt-2">
                기술 스택은 변했지만 &apos;<strong>브라우저가 화면을 그리는 원리(Critical
                Rendering Path)</strong>&apos;는 변하지 않았습니다.<br />시대가 변화하더라도 브라우저 렌더링
                메커니즘에 기반한 근본적인 최적화를 수행하는것이 중요합니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
