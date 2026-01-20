import portfolioData from "@/data/portfolio.json";
import ProjectThumbnail from "@/components/ProjectThumbnail";

type Project = {
  title: string;
  slug: string;
  href: string;
  thumbnail: string;
  period: string;
  description: string;
  details?: string[];
  stack: string[];
  detail?: boolean;
  video?: string;
  featured?: boolean;
  note?: string;
};

type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights?: string[];
  details?: string[];
};

export default function ProjectsPage() {
  const { projects, experiences } = portfolioData as {
    projects: Project[];
    experiences: Experience[];
  };
  const featuredProjects = projects.filter((project) => project.featured);
  const resolveThumbnail = (project: Project) => {
    if (project.thumbnail) {
      return project.thumbnail;
    }
    if (project.href) {
      return `https://image.thum.io/get/width/1200/${project.href}`;
    }
    return "/projects/design-system.svg";
  };

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12">
      <div>
        <p className="text-sm font-semibold text-blue-600">프로젝트</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-950">
          대표 프로젝트
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {featuredProjects.map((project) => {
          const hasExternalLink = Boolean(project.href);
          const hasDetailPage = Boolean(project.detail);
          const link = hasExternalLink
            ? project.href
            : hasDetailPage
              ? `/projects/${project.slug}`
              : undefined;
          const Wrapper: React.ElementType = link ? "a" : "div";

          const hasDetails = project.details && project.details.length > 0;

          return (
            <Wrapper
              key={project.title}
              href={link}
              target={hasExternalLink ? "_blank" : undefined}
              rel={hasExternalLink ? "noreferrer" : undefined}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:border-slate-300 hover:bg-slate-50/60"
            >
              <ProjectThumbnail
                src={resolveThumbnail(project)}
                alt={`${project.title} 썸네일`}
              />
              <div className="mt-4 border-t border-slate-200/70 pt-4 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {project.title}
                  </h2>
                </div>
                {hasDetails ? (
                  <div className="space-y-1 text-sm leading-6 text-slate-600">
                    {project.details?.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm leading-6 text-slate-600">
                    {project.description}
                  </p>
                )}
                {project.note ? (
                  <p className="text-xs text-slate-500">{project.note}</p>
                ) : null}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Wrapper>
          );
        })}
      </div>

      <section className="mt-4">
        <p className="text-base font-semibold text-slate-900">전체 프로젝트</p>
        <div className="mt-4 space-y-4">
          {experiences.map((experience) => {
            const detailLines =
              experience.details && experience.details.length > 0
                ? experience.details
                : experience.highlights || [];

            return (
              <details
                key={experience.company}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:border-slate-300 hover:bg-slate-50/60"
                open
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {experience.company}
                    </p>
                    <p className="text-xs text-slate-500">
                      {experience.role} · {experience.period}
                    </p>
                  </div>
                  <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition duration-200 group-open:rotate-180 group-open:border-slate-300 group-open:text-slate-500">
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-sm text-slate-600">
                  {experience.summary}
                </p>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  {detailLines.map((line, index) => {
                    if (line.trim() === "---") {
                      return (
                        <div
                          key={`${experience.company}-${index}-divider`}
                          className="my-3 h-px w-full bg-slate-200"
                        />
                      );
                    }

                    if (line.startsWith("## ")) {
                      return (
                        <p
                          key={`${experience.company}-${index}-h2`}
                          className="pt-2 text-sm font-semibold text-slate-900"
                        >
                          {line.replace("## ", "")}
                        </p>
                      );
                    }

                    if (line.startsWith("# ")) {
                      return (
                        <p
                          key={`${experience.company}-${index}-h1`}
                          className="pt-2 text-sm font-semibold text-slate-900"
                        >
                          {line.replace("# ", "")}
                        </p>
                      );
                    }

                    if (line.startsWith("- ")) {
                      return (
                        <p key={`${experience.company}-${index}-li`}>
                          • {line.replace("- ", "")}
                        </p>
                      );
                    }

                    return (
                      <p key={`${experience.company}-${index}-text`}>{line}</p>
                    );
                  })}
                </div>
              </details>
            );
          })}
        </div>
      </section>
    </main>
  );
}
