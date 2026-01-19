import Image from "next/image";
import Link from "next/link";
import portfolioData from "@/data/portfolio.json";

type Project = {
  title: string;
  slug: string;
  href: string;
  thumbnail: string;
  period: string;
  description: string;
  stack: string[];
  details?: string[];
  note?: string;
};

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { projects } = portfolioData as { projects: Project[] };
  const project = projects.find((item) => item.slug === params.slug);
  const resolveThumbnail = (item: Project) => {
    if (item.thumbnail) {
      return item.thumbnail;
    }
    if (item.href) {
      return `https://image.thum.io/get/width/1200/${item.href}`;
    }
    return "/projects/design-system.svg";
  };

  if (!project) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-12">
        <p className="text-sm text-slate-500">프로젝트를 찾을 수 없습니다.</p>
        <Link
          href="/projects"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          목록으로
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-12">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-600">프로젝트</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-950">
            {project.title}
          </h1>
        </div>
        <Link
          href="/projects"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          목록으로
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white">
        <Image
          src={resolveThumbnail(project)}
          alt={`${project.title} 썸네일`}
          width={960}
          height={540}
          className="h-64 w-full object-cover sm:h-80"
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span>{project.period}</span>
          <span className="text-slate-300">•</span>
          <span>{project.stack.join(" · ")}</span>
        </div>
        {project.details && project.details.length > 0 ? (
          <div className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
            {project.details.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm leading-6 text-slate-600">
            {project.description}
          </p>
        )}
        {project.note ? (
          <p className="mt-2 text-xs text-slate-500">{project.note}</p>
        ) : null}
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            사이트 방문
          </a>
        ) : null}
      </div>
    </main>
  );
}
