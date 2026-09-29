import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Download, ArrowLeft, FileText, Ruler, Home, ShieldCheck, Lock, Crown } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { findProject, projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

export const Route = createFileRoute("/projeto/$id")({
  loader: ({ params }) => {
    const project = findProject(params.id);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.project.title ?? "Projeto"} — ARQ CLUB` },
      { name: "description", content: loaderData?.project.description ?? "Projeto arquitetônico ARQ CLUB." },
      { property: "og:image", content: loaderData?.project.image },
    ],
  }),
  notFoundComponent: () => (
    <AppShell>
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="font-display text-3xl font-bold">Projeto não encontrado</h1>
        <Link to="/projetos" className="mt-6 inline-block text-[var(--gold)] hover:underline">Ver todos os projetos</Link>
      </div>
    </AppShell>
  ),
  component: ProjectDetailsPage,
});

const downloadButtons = [
  { label: "Baixar Revit", req: "Revit" },
  { label: "Baixar AutoCAD DWG", req: "DWG" },
  { label: "Baixar PDF Completo", req: "PDF" },
  { label: "Baixar PDF Modo Obra", req: "PDF" },
  { label: "Baixar Lista de Materiais", req: "PDF" },
] as const;

function ProjectDetailsPage() {
  const { project } = Route.useLoaderData();
  const related = projects.filter((p) => p.id !== project.id && p.category === project.category && !p.isBonus).slice(0, 6);
  const gallery = project.images.length > 0 ? project.images : [project.image];
  const [activeImage, setActiveImage] = useState(0);
  const [showMemberGate, setShowMemberGate] = useState(false);

  const renderMemberGate = () => (
    <div className="mt-5 space-y-4 rounded-2xl border border-[var(--gold)]/30 bg-[var(--gold)]/5 p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--gold)]/20 text-[var(--gold)]">
          <Lock className="h-5 w-5" />
        </div>
        <div className="space-y-1.5">
          <h4 className="font-display text-base font-semibold leading-tight">Acesso exclusivo para membros</h4>
          <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Este projeto está liberado apenas para membros ativos do ARQ CLUB.
            Garanta seu acesso a +100 projetos completos com arquivos Revit, DWG e PDF.
          </p>
        </div>
      </div>
      <a
        href="/#planos"
        onClick={() => setShowMemberGate(false)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--gold)] px-4 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition active:scale-[0.98] hover:brightness-110 hover:shadow-glow sm:text-sm"
      >
        <Crown className="h-4 w-4" /> Ver Planos
      </a>
      <button
        onClick={() => setShowMemberGate(false)}
        className="w-full text-center text-xs text-muted-foreground hover:text-foreground"
      >
        Entendido, fechar
      </button>
    </div>
  );

  return (
    <AppShell withTopPadding={false}>
      {/* Hero */}
      <section className="relative h-[62vh] min-h-[460px] w-full overflow-hidden pt-14 sm:h-[60vh] sm:pt-16 max-sm:min-h-[500px]">
        <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 to-transparent sm:from-background/80" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-4 pb-8 sm:px-8 sm:pb-10 max-sm:pb-8">
          <Link to="/projetos" className="mb-3 inline-flex w-fit items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground hover:text-[var(--gold)] sm:text-xs sm:tracking-wider sm:mb-4">
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar
          </Link>
          <p className="font-display text-[10px] uppercase tracking-[0.24em] text-[var(--gold)] sm:text-[11px] sm:tracking-[0.28em]">
            {project.category}
          </p>
          <h1 className="mt-1.5 font-display text-2xl font-bold leading-tight sm:mt-2 sm:text-4xl lg:text-6xl max-sm:text-[1.6rem]">
            {project.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mt-3 sm:text-base">
            {project.description}
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-8 sm:gap-10 sm:px-8 sm:py-12 lg:grid-cols-[1fr_400px] max-sm:py-5">
        {/* Info */}
        <div className="space-y-6 sm:space-y-8 lg:order-1">
          <div>
            <h2 className="font-display text-lg font-semibold leading-tight sm:text-xl">Galeria do projeto</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card/40 shadow-card">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={gallery[activeImage] ?? project.image}
                  alt={`${project.title} ${activeImage + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="scrollbar-hide -mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-2 touch-pan-x sm:gap-3 sm:mx-0 sm:px-0">
              {gallery.map((image, index) => (
                <button
                  key={`${project.id}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`shrink-0 overflow-hidden rounded-xl border transition active:scale-[0.97] ${
                    activeImage === index
                      ? "border-[var(--gold)] shadow-glow"
                      : "border-border hover:border-[var(--gold)]/40"
                  }`}
                  aria-label={`Ver imagem ${index + 1} do projeto`}
                >
                  <img
                    src={image}
                    alt=""
                    className="h-[64px] w-[90px] object-cover sm:h-24 sm:w-36"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-4 md:grid-cols-4">
            <Stat icon={<Home className="h-4 w-4" />} label="Tipo" value={project.type} />
            <Stat icon={<Ruler className="h-4 w-4" />} label="Terreno" value={project.landSize} />
            <Stat icon={<Ruler className="h-4 w-4" />} label="Área construída" value={project.builtArea} />
            <Stat icon={<FileText className="h-4 w-4" />} label="Arquivos" value={project.files.join(" · ")} />
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold leading-tight sm:text-xl">Sobre o projeto</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
              {project.tags.map((t: string) => (
                <span
                  key={t}
                  className="rounded-md border border-border bg-card/60 px-2.5 py-1 text-[11px] text-muted-foreground sm:text-xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[var(--gold)]/20 bg-[var(--gold)]/5 p-4 sm:p-5">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--gold)]" />
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                <span className="font-semibold text-foreground">Aviso de segurança:</span> Antes de iniciar sua obra,
                recomendamos validar o projeto com um profissional habilitado da sua região.
              </p>
            </div>
          </div>
        </div>

        {/* Downloads sidebar */}
        <aside className="lg:order-2 lg:sticky lg:top-20 lg:self-start lg:-mt-1">
          <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur shadow-card sm:p-6">
            <h3 className="font-display text-base font-semibold leading-tight sm:text-lg">Downloads</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Acesse e baixe os arquivos do projeto.
            </p>

            {project.downloadUrl ? (
              <a
                href={project.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--gold)] px-4 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition active:scale-[0.98] hover:brightness-110 hover:shadow-glow"
              >
                <Download className="h-4 w-4" /> Baixar Arquivos
              </a>
            ) : (
              <button
                onClick={() => setShowMemberGate(true)}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--gold)] px-4 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition active:scale-[0.98] hover:brightness-110 hover:shadow-glow"
              >
                <Download className="h-4 w-4" /> Baixar Arquivos
              </button>
            )}

            {showMemberGate && renderMemberGate()}

            <div className="mt-5 space-y-2">
              {downloadButtons.map((b) => {
                const available = project.files.includes(b.req as never) || project.files.includes("PDF");
                return (
                  <button
                    key={b.label}
                    disabled={!available}
                    onClick={() => {
                      if (!available) return;
                      if (project.downloadUrl) {
                        window.open(project.downloadUrl, "_blank", "noopener,noreferrer");
                      } else {
                        setShowMemberGate(true);
                      }
                    }}
                    className="flex w-full items-center justify-between gap-3 rounded-lg border border-border bg-background/40 px-3 py-2.5 text-left text-[13px] transition active:scale-[0.98] hover:border-[var(--gold)]/40 hover:bg-background/60 disabled:opacity-40 disabled:hover:border-border sm:px-4 sm:py-3 sm:text-sm"
                  >
                    <span className="leading-snug text-foreground">{b.label}</span>
                    <Download className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <div className="pb-14 sm:pb-16">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
            <h2 className="mb-4 font-display text-lg font-semibold leading-tight sm:mb-5 sm:text-2xl">
              Projetos relacionados
            </h2>
            <div className="scrollbar-hide -mx-4 flex gap-3 overflow-x-auto px-4 pb-4 snap-x snap-mandatory touch-pan-x sm:mx-0 sm:gap-4 sm:px-0 sm:pb-0">
              {related.map((p) => (
                <div key={p.id} className="snap-start shrink-0">
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/40 p-3.5 sm:p-4">
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:gap-2 sm:tracking-[0.18em]">
        <span className="text-[var(--gold)]">{icon}</span>
        {label}
      </div>
      <div className="mt-1.5 break-words font-display text-sm font-semibold leading-snug text-foreground sm:mt-2">
        {value}
      </div>
    </div>
  );
}
