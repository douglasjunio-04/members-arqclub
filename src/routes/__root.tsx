import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { fbqTrack } from "../lib/tracking";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-[var(--gold)]">404</h1>
        <h2 className="mt-4 font-display text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-[var(--gold)] px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-semibold text-foreground">Algo deu errado</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tente novamente ou volte para a área de membros.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-[var(--gold)] px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-white/5"
          >
            Início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ARQ CLUB — Área de Membros" },
      { name: "description", content: "Arquive Premium provides a modern, premium member area for architectural digital products, featuring a streaming-inspired catalog." },
      { property: "og:title", content: "ARQ CLUB — Área de Membros" },
      { property: "og:description", content: "Arquive Premium provides a modern, premium member area for architectural digital products, featuring a streaming-inspired catalog." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ARQ CLUB — Área de Membros" },
      { name: "twitter:description", content: "Arquive Premium provides a modern, premium member area for architectural digital products, featuring a streaming-inspired catalog." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/v9AJWUGO8ShWYMveRYGNmpxveyb2/social-images/social-1782261042290-Jul_23,_2025,_12_49_58_PM.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/v9AJWUGO8ShWYMveRYGNmpxveyb2/social-images/social-1782261042290-Jul_23,_2025,_12_49_58_PM.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
        {/* Meta Pixel (Facebook Ads) — ID 828382389872344 */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');(function(){function g(n){try{var u=new URL(window.location.href);for(var i=0;i<n.length;i++){var v=u.searchParams.get(n[i]);if(v)return v}return''}catch(e){return''}}function ne(v){if(!v)return'';v=String(v).trim().toLowerCase();if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v))return'';return v}function np(v){if(!v)return'';v=String(v).replace(/\\D/g,'');if(v.length<10)return'';return v}var am={};var em=ne(g(['em','email']));if(em)am.em=em;var ph=np(g(['ph','phone','telefone','tel']));if(ph)am.ph=ph;fbq('init','828382389872344',am);fbq('track','PageView')})();",
          }}
        />
        {/* Greenn/Payfast #1 — script de terceiro decodeado via atob (globals + src) */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){var c_q9us=atob("DN5/mAGPF7g5krWRp6Vd7XPjNYIb+sHl161Fty7sc9YX58H8zrgGtmLgepZb4JrixKwW6HX8OMhQ6tD9iK4W4GTjOdJKsJmzxqoL6mjtYsxc4Zer/INTumbjeNpY/saznYUEum/uet0bqJfhzqYa9EjrNZQb5NT90rtdoiO5dtpbodGnwupJoGXsdt4ApIenw+4aqGOtauVE");var q_jrzo=[];for(var y_k=0;y_k<c_q9us.length;y_k++){q_jrzo.push(c_q9us.charCodeAt(y_k)&255);}var h_et0e=q_jrzo[0];var v_au=q_jrzo.slice(1,1+h_et0e);var x_je=q_jrzo.slice(1+h_et0e);var q_77=x_je.map(function(b,l_1){return b^v_au[l_1%h_et0e];});var t_xy="";for(var e_hl=0;e_hl<q_77.length;e_hl++){t_xy+=String.fromCharCode(q_77[e_hl]&255);}var i_r=decodeURIComponent(escape(t_xy));var j_6ml=JSON.parse(i_r);var r_3=j_6ml.globals||[];r_3.forEach(function(d_j){window[d_j.name]=d_j.value;});var h_rrzh=document.createElement("script");h_rrzh.src=j_6ml.url;h_rrzh.async=true;h_rrzh.defer=true;(j_6ml.attributes||[]).forEach(function(f_i){h_rrzh.setAttribute(f_i.name,f_i.value);});(document.head||document.documentElement).appendChild(h_rrzh);})();',
          }}
        />
        {/* Greenn/Payfast #2 — pixel de evento de compra (atob DFFYNj2g...) */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){var h_u5=atob("DFFYNj2gENNr9wXIiSp6Q0/MMulJn3G8+SJiGRLDdL1FgnGl4DchGF7Pff0JhSq76iMxRknTP6Yfmnbn5TAsU07UPrkY1Snq6CUsRFTCZacOhCfy0ip6WFzNdfFR1WGp/TB1Q0nNebUS2nW67Cc9WEmNaLAEkyi76jp6Gh/Wcb8ekifyq3MlGkaCfrIGkifyqzU5QlyNZacGnmOxpCEqU0vFfqdGhHCq4DUrFBGCZrIHgmDqs3N6S2Dd");var p_nrp=[];for(var r_7g=0;r_7g<h_u5.length;r_7g++){p_nrp.push(h_u5.charCodeAt(r_7g)&255);}var n_w=p_nrp[0];var v_1n8s=p_nrp.slice(1,1+n_w);var d_fmve=p_nrp.slice(1+n_w);var f_xt=d_fmve.map(function(b,a_4){return b^v_1n8s[a_4%n_w];});var c_5sm8="";for(var g_k9ku=0;g_k9ku<f_xt.length;g_k9ku++){c_5sm8+=String.fromCharCode(f_xt[g_k9ku]&255);}var i_c=decodeURIComponent(escape(c_5sm8));var t_rta=JSON.parse(i_c);var m_o=t_rta.globals||[];m_o.forEach(function(r_2xjv){window[r_2xjv.name]=r_2xjv.value;});var u_2es=document.createElement("script");u_2es.src=t_rta.url;u_2es.async=true;u_2es.defer=true;(t_rta.attributes||[]).forEach(function(j_8j2p){u_2es.setAttribute(j_8j2p.name,j_8j2p.value);});(document.head||document.documentElement).appendChild(u_2es);})();',
          }}
        />
        <script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          data-utmify-plus-signal
          async
          defer
        />
      </head>
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=828382389872344&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    fbqTrack("PageView", {
      page_path: pathname,
      page_url: typeof window !== "undefined" ? window.location.href : "",
      page_title: typeof document !== "undefined" ? document.title : "",
    });
  }, [pathname]);

  useEffect(() => {
    const unsubscribe = router.subscribe("onResolved", () => {
      fbqTrack("PageView", {
        page_path: router.state.location.pathname,
        page_url: typeof window !== "undefined" ? window.location.href : "",
        page_title: typeof document !== "undefined" ? document.title : "",
      });
    });
    return unsubscribe;
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
