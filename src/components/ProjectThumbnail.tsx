"use client";

import Image from "next/image";
import { useState } from "react";

type ProjectThumbnailProps = {
  src: string;
  alt: string;
};

export default function ProjectThumbnail({ src, alt }: ProjectThumbnailProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-xl bg-slate-50">
      <Image
        src={src}
        alt={alt}
        width={640}
        height={360}
        className="h-56 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
        onLoadingComplete={() => setLoaded(true)}
      />
      {!loaded ? (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100/80">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-slate-500" />
        </div>
      ) : null}
    </div>
  );
}
