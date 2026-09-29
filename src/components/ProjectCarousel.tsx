import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/data/projects";

type Props = { title: string; projects: Project[]; eyebrow?: string };

export function ProjectCarousel({ title, projects, eyebrow }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  if (!projects.length) return null;

  return (
    <section className="group/section relative">
      <div className="mb-3 flex items-start justify-between gap-2 px-4 sm:mb-4 sm:px-8">
        <div className="min-w-0 flex-1 pr-1">
          {eyebrow && (
            <p className="font-display text-[10px] uppercase tracking-[0.24em] text-[var(--gold)] sm:text-[11px] sm:tracking-[0.28em]">{eyebrow}</p>
          )}
          <h2 className="mt-1 line-clamp-2 font-display text-lg font-semibold leading-tight text-foreground sm:text-2xl">
            {title}
          </h2>
        </div>
        <div className="mt-0.5 flex shrink-0 gap-1 sm:gap-1.5 sm:mt-0">
          <button
            onClick={() => scroll(-1)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-surface/60 text-muted-foreground active:scale-95 hover:text-foreground hover:border-[var(--gold)]/40 transition"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-surface/60 text-muted-foreground active:scale-95 hover:text-foreground hover:border-[var(--gold)]/40 transition"
            aria-label="Próximo"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={ref}
          className="scrollbar-hide flex gap-3 overflow-x-auto scroll-smooth px-4 pb-5 sm:gap-4 sm:px-8 sm:pb-4 snap-x snap-mandatory touch-manipulation"
        >
          {projects.map((p) => (
            <div key={p.id} className="snap-start">
              <ProjectCard project={p} />
            </div>
          ))}
          <div className="shrink-0 w-3 sm:w-2" />
        </div>
      </div>
    </section>
  );
}
