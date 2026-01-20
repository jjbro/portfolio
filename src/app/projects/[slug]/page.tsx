"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import portfolioData from "@/data/portfolio.json";

type Project = {
  title: string;
  slug: string;
  href: string;
  thumbnail: string;
  video?: string;
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
  const pathname = usePathname();
  const { projects } = portfolioData as { projects: Project[] };
  const rawSlug = Array.isArray(params.slug)
    ? params.slug.join("/")
    : params.slug;
  const decodedSlug = rawSlug ? decodeURIComponent(rawSlug) : "";
  const fallbackSlug = pathname.split("/").filter(Boolean).pop() ?? "";
  const resolvedSlug = decodedSlug || fallbackSlug;
  const normalize = (value: string | undefined) =>
    value
      ?.trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  const normalizedSlug = normalize(resolvedSlug);
  const project =
    projects.find((item) => item.slug === resolvedSlug) ??
    projects.find((item) => normalize(item.slug) === normalizedSlug);
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
        {process.env.NODE_ENV === "development" ? (
          <div className="text-xs text-slate-400">
            <p>요청 slug: {resolvedSlug || "없음"}</p>
            <p>사용 가능한 slug: {projects.map((item) => item.slug).join(", ")}</p>
          </div>
        ) : null}
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
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12">
      <div>
        <p className="text-sm font-semibold text-blue-600">프로젝트</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-950">
          {project.title}
        </h1>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white">
        {project.video ? (
          <video
            className="h-[32rem] w-full object-cover sm:h-[40rem]"
            controls
            preload="metadata"
          >
            <source src={project.video} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={resolveThumbnail(project)}
            alt={`${project.title} 썸네일`}
            width={960}
            height={540}
            className="h-[32rem] w-full object-cover sm:h-[40rem]"
          />
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {project.details && project.details.length > 0 ? (
          <div className="space-y-2 text-sm leading-6 text-slate-600">
            {project.details.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        ) : (
          <p className="text-sm leading-6 text-slate-600">
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

      <div className="flex justify-end">
        <Link
          href="/projects"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          목록으로
        </Link>
      </div>
    </main>
  );
}
