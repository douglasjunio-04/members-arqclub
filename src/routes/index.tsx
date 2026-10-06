import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { HeroBanner } from "@/components/HeroBanner";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { projects, sections } from "@/data/projects";
import { fbqTrackInitiateCheckout, fbqTrackLead, fbqTrack } from "@/lib/tracking";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ARQ CLUB" },
      { name: "description", content: "500+ projetos de casas populares e modernas. Acesso vitalício, bônus exclusivos e garantia de 7 dias. Veja por dentro e escolha seu plano." },
    ],
  }),
  component: LandingPage,
});

const megaCheckoutUrl = "https://payfast.greenn.com.br/redirect/323798";
const ultraCheckoutUrl = "https://payfast.greenn.com.br/redirect/323799";

const plans = [
  {
    id: "mega",
    title: "Mega Pack",
    price: "R$ 37,90",
    installments: "8x de R$ 5,40",
    features: [
      "100+ Projetos Completos (Editáveis em REVIT e DWG) - R$ 297",
      "Renderizações 3D de Todos os Projetos - R$ 60",
      "Lista Completa de Materiais por Projeto - R$ 28",
      "Planilha PRO de Custos + Cronograma - R$ 97",
      'PDFs Otimizados "Modo Obra" - R$ 20',
      "Guia Prático de Construção - R$ 15",
      "🎁 BÔNUS 1 — Checklist Aprovação Prefeituras - R$ 97",
      "🎁 BÔNUS 2 — Planilha Automática de Orçamento - R$ 67",
      "🎁 BÔNUS 3 — Guia 15 Erros Caros em Obras - R$ 47",
      "🎁 BÔNUS 4 — Cronograma Realista de Obra - R$ 67",
      "🎁 BÔNUS 5 — PDF Modo Obra Simplificado - R$ 28",
    ],
    cta: "Garantir Mega Pack",
    highlight: false,
    checkoutUrl: megaCheckoutUrl,
  },
  {
    id: "ultra",
    title: "Ultra Pack",
    price: "R$ 67,00",
    installments: "12x de R$ 6,73",
    features: [
      "Tudo que contém no Mega Pack, mais:",
      "500 Projetos em PDF/Planta Humanizada para inspiração",
      "35 Projetos de casas de campo (Editáveis em DWG)",
      "100 Projetos de Chalé Alpino (Projetos para lucrar no AirBNB)",
      "30 Projetos de Kitnets",
      "10 Fachadas em SKP",
      "100+ Projetos Completos (Editáveis em REVIT e DWG)",
      "Renderizações 3D de Todos os Projetos",
      "Lista Completa de Materiais por Projeto",
      "Planilha PRO de Custos + Cronograma",
      "Acesso Vitalício + Todos os Bônus VIP",
    ],
    cta: "Garantir Ultra Pack",
    highlight: true,
    checkoutUrl: ultraCheckoutUrl,
  },
] as const;

function LandingPage() {
  const bonuses = projects.filter((project) => project.isBonus);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const targetId = hash.replace("#", "");
    const el = document.getElementById(targetId);
    if (!el) return;
    const t = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
    return () => window.clearTimeout(t);
  }, []);

  const trackCheckoutAndGo = (href: string, opts: { value: number; id: string; name: string }) => {
    fbqTrackInitiateCheckout({
      value: opts.value,
      contentId: opts.id,
      contentName: opts.name,
      currency: "BRL",
      numItems: 1,
    });
    // Pequeno delay para garantir envio do evento em navegadores que cancelam XHR ao navegar
    const w = window.open(href, "_blank", "noopener,noreferrer");
    if (!w) {
      window.setTimeout(() => {
        window.location.href = href;
      }, 50);
    }
  };

  return (
    <AppShell>
      <HeroBanner compact primaryTo="#previa-area-membros" />



      <section className="pb-8 sm:pb-20 max-sm:pt-1">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
          <p
            id="previa-area-membros"
            className="scroll-mt-20 font-display text-[10px] uppercase tracking-[0.24em] text-[var(--gold)] sm:text-[11px] sm:tracking-[0.28em] max-sm:scroll-mt-14"
          >
            Prévia da área de membros
          </p>
          <h2 className="mt-1.5 font-display text-lg font-semibold leading-tight sm:mt-2 sm:text-3xl">
            Veja por dentro como você vai acessar
          </h2>
          <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-muted-foreground sm:mt-3 sm:text-base">
            Navegue pela experiência real: seções, carrosséis, projetos e filtros. Essa é a estrutura que você recebe após a compra.
          </p>
        </div>

        <div className="mt-4 space-y-6 sm:mt-10 sm:space-y-14 max-sm:mt-3">
          {sections.map((s) => (
            <ProjectCarousel
              key={s.title}
              title={s.title}
              projects={projects.filter((project) => project.hasMappedCover && s.filter(project)).slice(0, 14)}
            />
          ))}
        </div>

        <div className="mx-auto mt-6 max-w-[1600px] px-4 sm:mt-10 sm:px-8 max-sm:mt-4">
          <div className="grid gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
            <Link
              to="/projetos"
              onClick={() =>
                fbqTrackLead({
                  value: 0,
                })
              }
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--gold)] px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition active:scale-[0.98] hover:brightness-110 hover:shadow-glow sm:w-auto sm:px-6 sm:py-3"
            >
              Ver catálogo
            </Link>
            <a
              href="#planos"
              onClick={(e) => {
                fbqTrackLead({ value: 0 });
                const el = document.getElementById("planos");
                if (!el) return;
                e.preventDefault();
                el.scrollIntoView({ behavior: "smooth", block: "start" });
                history.replaceState(null, "", "#planos");
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-white/5 px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-foreground backdrop-blur transition active:scale-[0.98] hover:bg-white/10 hover:border-[var(--gold)]/40 sm:w-auto sm:px-6 sm:py-3"
            >
              Garantir meu acesso
            </a>
          </div>
        </div>
      </section>

      <section id="planos" className="mx-auto max-w-[1600px] scroll-mt-20 px-4 pb-12 sm:px-8 sm:pb-20 max-sm:scroll-mt-14 max-sm:pb-8">
        <h2 className="text-center font-display text-xl font-semibold leading-tight tracking-wider sm:text-3xl">
          Selecione <span className="text-muted-foreground">seu plano</span>
        </h2>
        <p className="mt-3 text-center text-sm leading-relaxed text-muted-foreground">
          Escolha o pacote ideal para seu objetivo e garanta acesso vitalício.
        </p>

        <div className="mt-7 grid gap-3 sm:mt-10 md:grid-cols-2 lg:gap-6 xl:grid-cols-2">
          {plans.map((p) => {
            const value = p.id === "mega" ? 37.9 : 67;
            return (
              <div
                key={p.title}
                className={`flex flex-col rounded-2xl border bg-card/40 p-5 sm:p-6 ${
                  p.highlight ? "border-[var(--gold)]/60 shadow-glow relative" : "border-border"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-semibold sm:text-lg">{p.title}</h3>
                    <p className="mt-2 font-display text-2xl font-bold sm:text-3xl">{p.price}</p>
                    {"installments" in p && (
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--gold)] sm:mt-2 sm:text-xs">
                        {p.installments}
                      </p>
                    )}
                  </div>
                  {p.highlight && (
                    <span className="shrink-0 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-[var(--gold)] sm:px-3 sm:text-[10px]">
                      Mais vendido
                    </span>
                  )}
                </div>

                <div className="scrollbar-hide mt-5 flex-1 space-y-2 overflow-y-auto pr-1 text-xs leading-relaxed text-muted-foreground sm:mt-6 sm:overflow-visible sm:pr-0 sm:text-sm md:max-h-[340px] xl:max-h-none">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]/70" />
                      <span className="leading-relaxed">{f}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={p.checkoutUrl}
                  onClick={(e) => {
                    e.preventDefault();
                    trackCheckoutAndGo(p.checkoutUrl, {
                      value,
                      id: p.id,
                      name: p.title,
                    });
                    fbqTrack("AddToCart", {
                      value,
                      currency: "BRL",
                      content_type: "product",
                      content_ids: [p.id],
                      content_name: p.title,
                      num_items: 1,
                    });
                  }}
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-md px-5 py-3 text-xs font-semibold uppercase tracking-wider transition active:scale-[0.98] sm:mt-8 ${
                    p.highlight
                      ? "bg-[var(--gold)] text-primary-foreground hover:brightness-110 hover:shadow-glow"
                      : "border border-border bg-background/40 text-foreground hover:border-[var(--gold)]/40 hover:bg-background/60"
                  }`}
                >
                  {p.cta}
                </a>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 pb-16 sm:px-8 sm:pb-24">
        <p className="font-display text-[10px] uppercase tracking-[0.24em] text-[var(--gold)] sm:text-[11px] sm:tracking-[0.28em]">
          Materiais complementares
        </p>
        <h2 className="mt-2 font-display text-xl font-semibold leading-tight sm:text-3xl">Bônus Exclusivos</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Planilhas, checklists, guias práticos e materiais extras para acelerar sua obra com mais segurança.
        </p>

        <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {bonuses.map((b) => (
            <Link
              key={b.id}
              to="/projeto/$id"
              params={{ id: b.id }}
              className="group overflow-hidden rounded-2xl border border-border bg-card/60 transition active:scale-[0.99] hover:border-[var(--gold)]/40 hover:shadow-glow"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={b.image}
                  alt={b.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <span className="absolute left-3 top-3 rounded-md bg-[var(--gold)]/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground sm:left-4 sm:top-4">
                  Bônus
                </span>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="min-h-[3.5rem] text-balance break-words font-display text-base font-semibold leading-tight sm:min-h-[4rem] sm:text-lg">
                  {b.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{b.description}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--gold)] sm:mt-4">
                  Acessar Bônus
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
