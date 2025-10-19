import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "./assets/Logotipos/f3129c07-52f2-4c3d-bcde-269f178c0f06.png";

/***********************
 * Fuente y constantes  *
 ***********************/
const FontInjector = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    :root { --font-display: 'Sora', system-ui, -apple-system, Segoe UI, Roboto, Inter, sans-serif; --font-body: 'Plus Jakarta Sans', Inter, system-ui, sans-serif; }
    .font-display { font-family: var(--font-display); letter-spacing: .02em; }
    .font-body { font-family: var(--font-body); }
  `}</style>
);

const NAV_ITEMS = [
  { label: "¿Qué hacemos?", href: "/#que-hacemos" },
  { label: "Sobre nosotros", href: "/#sobre-nosotros" },
  { label: "Nuestro contacto", href: "/#contacto" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Futuros proyectos", href: "/futuros" },
  { label: "RR.SS.", href: "/#rrss" },
];

const CONTACT = {
  phone: "+34642839787",
  displayPhone: "642 839 787",
  email: "granadron25@gmail.com",
  whatsapp: "https://wa.me/34642839787",
};

// 🎬 VIDEO DESDE GOOGLE DRIVE
// ID del archivo: 1v_56L7M_AW5EbG_sNutiHdslAqCB8Z3B
const TEASER_SRC = "https://drive.google.com/file/d/1v_56L7M_AW5EbG_sNutiHdslAqCB8Z3B/preview";

/***********************
 * Componentes comunes  *
 ***********************/
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="group relative text-[15px] font-semibold text-neutral-100/90 hover:text-white">
    <span>{children}</span>
    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full" />
  </a>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
        <a href="/" className="flex items-center gap-3">
          <img src={logo} alt="Granadron" className="h-11 w-11 rounded" />
        </a>

        <div className="hidden items-center gap-8 xl:flex">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="group">
              <NavLink href={item.href}>{item.label}</NavLink>
            </div>
          ))}
          <a
            href="/#contacto"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90"
          >
            Contáctenos
          </a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="xl:hidden"
          aria-label="Abrir menú"
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-black/90 px-6 py-5 xl:hidden">
          <div className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-[15px] text-neutral-200"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/#contacto"
              onClick={() => setOpen(false)}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-white/90"
            >
              Contáctenos
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer = () => (
  <footer className="border-t border-white/10 bg-black">
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="Granadron" className="h-8 w-8 rounded" />
          </div>
          <p className="mt-3 max-w-md text-sm text-neutral-400">
            Vídeo con dron para eventos, cultura y momentos únicos. Basados en Extremadura, trabajando donde nos necesites.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold">Secciones</div>
          <ul className="mt-3 space-y-2 text-sm text-neutral-300">
            {NAV_ITEMS.map((i) => (
              <li key={i.label}><a href={i.href} className="hover:text-white">{i.label}</a></li>
            ))}
            <li><a href="/proyectos" className="hover:text-white">Proyectos</a></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold">Contacto</div>
          <ul className="mt-3 space-y-2 text-sm text-neutral-300">
            <li><a href={`tel:${CONTACT.phone}`} className="hover:text-white">Tel: {CONTACT.displayPhone}</a></li>
            <li><a href={`mailto:${CONTACT.email}`} className="hover:text-white">{CONTACT.email}</a></li>
            <li><a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-neutral-500">
        <p>© {new Date().getFullYear()} Granadron. Todos los derechos reservados.</p>
        <p>Hecho con ❤️ y pasión por el cine.</p>
      </div>
    </div>
  </footer>
);

/***********************
 * Vista: Futuros proyectos
 ***********************/
export default function FuturosProyectos() {
  return (
    <div className="min-h-screen bg-black text-white font-body">
      <FontInjector />
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pt-36 pb-24">
        <header className="mb-10 text-center">
          <p className="text-xs tracking-[0.35em] text-neutral-400">ADELANTO</p>
          <h1 className="font-display text-4xl md:text-6xl">Futuros proyectos</h1>
          <p className="mx-auto mt-3 max-w-2xl text-neutral-300">
            Estamos preparando un proyecto especial: <strong>Monesterio como nunca lo habías visto</strong>. Un recorrido aéreo y narrativo que pone en valor sus rincones, su gente y su energía.
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-neutral-400">
            Muy pronto disponible para el público. Aquí tienes un pequeño adelanto.
          </p>
        </header>

        <section className="grid gap-8 md:grid-cols-1">
          <article className="rounded-2xl border border-white/10 bg-black/40 p-6 transition hover:border-white/20 hover:bg-black/60">
            <h2 className="font-display text-2xl font-semibold">Teaser — Monesterio</h2>
            <p className="mt-2 text-neutral-300">
              Plano secuencia con vuelos bajos, travellings suaves y un montaje inspirado en el pulso de la localidad.
            </p>

            {/* 🎥 PLAYER GOOGLE DRIVE */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl mt-4">
              <iframe
                src={TEASER_SRC}
                allow="autoplay; encrypted-media"
                allowFullScreen
                loading="lazy"
                className="h-full w-full rounded-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </article>
        </section>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-center">
          <a
            href="/proyectos"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
          >
            Ver proyectos publicados <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="/#contacto"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-white/90"
          >
            Contáctenos
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
