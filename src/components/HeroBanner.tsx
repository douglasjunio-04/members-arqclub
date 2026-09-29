import { Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import hero from "@/assets/hero-architecture.jpg";

export function HeroBanner({ compact = false, primaryTo = "/projetos" }: { compact?: boolean; primaryTo?: string }) {
  const isHash = primaryTo.startsWith("#");
  const targetId = isHash ? primaryTo.slice(1) : "";

  return (
    <section
      className={
        compact
          ? "relative h-auto min-h-[380px] w-full overflow-hidden pb-4 pt-[calc(env(safe-area-inset-top)+3.5rem)] sm:h-[62vh] sm:min-h-[460px] sm:pb-0 sm:pt-16 max-sm:max-h-[440px]"
          : "relative h-auto min-h-[400px] w-full overflow-hidden pb-4 pt-[calc(env(safe-area-inset-top)+3.5rem)] sm:h-[78vh] sm:min-h-[520px] sm:pb-0 sm:pt-16 max-sm:max-h-[470px]"
      }
    >
      <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover sm:object-cover max-sm:object-[center_18%]" width={1920} height={1024} />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/5 sm:bg-gradient-to-r sm:from-background sm:via-background/75 sm:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent opacity-60 sm:opacity-100" />

      {/* Architectural grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] sm:opacity-[0.04] [background-image:linear-gradient(var(--gold)_1px,transparent_1px),linear-gradient(90deg,var(--gold)_1px,transparent_1px)] [background-size:64px_64px] sm:[background-size:80px_80px]" />

      <div
        className={`relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col justify-end px-4 ${
          compact ? "py-0 sm:px-8 sm:pb-12" : "py-0 sm:px-8 sm:pb-20"
        }`}
      >
        <div className="max-w-2xl sm:max-w-2xl max-sm:max-w-full">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/5 px-2.5 py-1 sm:mb-5 sm:px-3">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)] animate-pulse" />
            <span className="font-display text-[10px] uppercase tracking-[0.2em] text-[var(--gold)] sm:text-[11px] sm:tracking-[0.28em]">
              Coleção principal
            </span>
          </div>

          <h1 className="font-display text-[1.55rem] font-bold leading-[1.08] text-foreground sm:text-5xl lg:text-7xl max-sm:text-[1.45rem]">
            500 Projetos de Casas <span className="text-[var(--gold)]">Populares</span> e Modernas
          </h1>

          <p className="mt-2.5 max-w-xl text-[13px] leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg max-sm:text-[13px]">
            Escolha um projeto, baixe os arquivos e comece sua obra com mais segurança.
            Arquivos completos em Revit, AutoCAD e PDF.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">
            {primaryTo.startsWith("#") ? (
              <a
                href={primaryTo}
                onClick={(e) => {
                  const el = document.getElementById(targetId);
                  if (!el) return;
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                  history.replaceState(null, "", primaryTo);
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--gold)] px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition active:scale-[0.98] hover:brightness-110 hover:shadow-glow sm:w-auto sm:px-6 sm:py-3"
              >
                <Play className="h-4 w-4 fill-current" /> Ver Projetos
              </a>
            ) : (
              <Link
                to={primaryTo}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--gold)] px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition active:scale-[0.98] hover:brightness-110 hover:shadow-glow sm:w-auto sm:px-6 sm:py-3"
              >
                <Play className="h-4 w-4 fill-current" /> Ver Projetos
              </Link>
            )}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-8 sm:flex sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3 text-[11px] text-muted-foreground sm:text-xs">
            <div className="flex flex-col items-start gap-0 sm:block">
              <span className="font-display text-xl font-bold leading-none text-foreground sm:text-xl">500+</span>
              <span className="text-[11px] leading-none">Projetos</span>
            </div>
            <div className="flex flex-col items-start gap-0 sm:block">
              <span className="font-display text-xl font-bold leading-none text-foreground sm:text-xl">3</span>
              <span className="text-[11px] leading-none">Formatos</span>
            </div>
            <div className="flex flex-col items-start gap-0 sm:block">
              <span className="font-display text-xl font-bold leading-none text-foreground sm:text-xl">∞</span>
              <span className="text-[11px] leading-none">Acesso vitalício</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
