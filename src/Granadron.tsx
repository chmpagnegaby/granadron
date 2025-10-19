import { useEffect, useState } from "react";
// Tipos necesarios para evitar 'any' implícitos
import type { ReactNode, MouseEventHandler } from "react";

type MediaItem = { src: string; title?: string; description?: string; label?: string };

type NavLinkProps = {
  href: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

type MediaCarouselProps = {
  items: MediaItem[];
  intervalMs?: number;
  heightClass?: string;
  withOverlay?: boolean;
};

import { motion } from "framer-motion";
import { Menu, X, Phone, Mail, Send, ArrowRight, Instagram, Video as VideoIcon } from "lucide-react";
import firma from './assets/Logotipos/82f59599-8e4d-4493-b415-d6848d720c33.png';
import hero from './assets/Fotos/Zafra/aea7ba88-e412-4cec-a41f-87afb8b65ac6.jpg';

// ✅ Vídeos servidos desde Google Drive (asegúrate de que están “Cualquiera con el vínculo”)
const cultura = "https://drive.google.com/uc?export=download&id=1CP65LiwSsc9AVnNJnr_EQRsSCl98me8t";
const fiestapueblo = "https://drive.google.com/uc?export=download&id=1aRoOxoEY_oSP0BHLB1TVpkj7HBJLPprC";
const toreo = "https://drive.google.com/uc?export=download&id=1qTh56jJMDyp3s2WriV-6M9uYYu1DP5Xg"; // recortes
const fiestaprivada = "https://drive.google.com/uc?export=download&id=1BHvzelYTfGkAlozpXHOm1ci4RITLR5ka";
const ferialocal = "https://drive.google.com/uc?export=download&id=16mdWT0JDFhrzI_GFAhMd0u5lB5sVoL3C";


import fotopatrimonio from './assets/Fotos/monasterio/monasterio.JPEG';
import fototoreo from './assets/Fotos/domavaquera/doma.JPG';
import fotoferia from './assets/Fotos/Zafra/BDE09759-D93E-4547-A6C3-F4806D1CFD27.JPEG';
import fotofiestas from './assets/Fotos/procesion/procesion.JPEG';
import fotoevento from './assets/Fotos/futbol/futbol.JPG';

import dron1 from './assets/DRON/dron3.jpg';
import dron2 from './assets/DRON/dron2.jpg';
import dron3 from './assets/DRON/IMG_9805.JPG';

import logo from './assets/Logotipos/f3129c07-52f2-4c3d-bcde-269f178c0f06.png';

// --- Google Drive helpers ---
const isDriveUrl = (url = "") => /https?:\/\/drive\.google\.com\/.+/i.test(url);

// Extrae el ID desde formatos:
// - https://drive.google.com/file/d/ID/preview
// - https://drive.google.com/uc?export=download&id=ID
const extractDriveId = (url = "") => {
  const byPath = url.match(/\/d\/([-\w]{25,})/);
  if (byPath?.[1]) return byPath[1];
  const byQuery = url.match(/[?&]id=([-\w]{25,})/);
  return byQuery?.[1] || "";
};

// Transforma cualquier URL de Drive a /preview
const toDrivePreview = (url = "") => {
  const id = extractDriveId(url);
  return id ? `https://drive.google.com/file/d/${id}/preview` : url;
};

// =============================================
// Granadron — Landing Page (single-file React)
// - TailwindCSS required
// - Replace placeholder assets (logo, videos, images, links)
// - Layout actualizado según nuevas indicaciones
// =============================================

/***********************
 * Fuentes y helpers UI *
 ***********************/
const FontInjector = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    :root { --font-display: 'Sora', system-ui, -apple-system, Segoe UI, Roboto, Inter, sans-serif; --font-body: 'Plus Jakarta Sans', Inter, system-ui, sans-serif; }
    .font-display { font-family: var(--font-display); letter-spacing: .02em; }
    .font-body { font-family: var(--font-body); }
  `}</style>
);


/***********************
 * Datos estáticos *
 ***********************/
const NAV_ITEMS: { label: string; href: string }[] = [
  { label: "¿Qué hacemos?", href: "#que-hacemos" },
  { label: "Sobre nosotros", href: "#sobre-nosotros" },
  { label: "Nuestro contacto", href: "#contacto" },
  { label: "Más de nuestro trabajo", href: "/proyectos" },
  { label: "RR.SS.", href: "#rrss" },
  { label: "Futuros proyectos", href: "/futuros" },

];

const PROJECT_VIDEOS: MediaItem[] = [
  { src: ferialocal, title: "Aftermovie — Feria local", description: "Resumen dinámico con planos aéreos y transiciones suaves." },
  { src: toreo, title: "Toreo — Tentadero", description: "Cobertura elegante con travellings y foco en la emoción." },
  { src: fiestapueblo, title: "Fiestas de pueblo", description: "Planos cenitales y tomas cercanas para sentir la fiesta." },
  { src: cultura, title: "Cultura y patrimonio", description: "Narrativa visual para eventos culturales y tradiciones." },
  { src: fiestaprivada, title: "Privado — Evento familiar", description: "Discreto y cinematográfico, pensado para recordar." },
];

const EXPERIENCE_TAGS = [
  "Ferias y eventos",
  "Mundo del toreo",
  "Fiestas de pueblo",
  "Cultura y patrimonio",
  "Eventos privados",
];

const EXPERIENCE_SLIDES: MediaItem[] = [
  { src: fotoferia, label: "Ferias y eventos" },
  { src: fototoreo, label: "Toreo" },
  { src: fotofiestas, label: "Fiestas" },
  { src: fotopatrimonio, label: "Cultura y patrimonio" },
  { src: fotoevento, label: "Eventos privados" },
];

const RRSS = [
  { label: "Instagram", href: "https://instagram.com/tuusuario", handle: "@granadron", icon: <Instagram className="h-6 w-6" aria-hidden /> },
  { label: "TikTok", href: "https://tiktok.com/@tuusuario", handle: "@granadron", icon: <VideoIcon className="h-6 w-6" aria-hidden /> },
];

const CONTACT = {
  phone: "+34642839787",
  displayPhone: "642 839 787",
  email: "granadron25@gmail.com",
  whatsapp: "https://wa.me/34642839787",
};

/***********************
 * Componentes base *
 ***********************/
// Link con subrayado animado
const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => (
  <a href={href} onClick={onClick} className="group relative text-[15px] font-semibold text-neutral-100/90 hover:text-white">
    <span>{children}</span>
    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full" />
  </a>
);


// SOLO extensiones reales; Drive NO entra aquí
const isVideo = (src = "") => /\.(mp4|webm|ogg|mov)(\?.*)?(#.*)?$/i.test(src);

const guessMime = (src = "") => {
  const clean = src.split("?")[0].split("#")[0];
  const ext = (clean.split(".").pop() || "").toLowerCase();
  if (ext === "mp4") return "video/mp4";
  if (ext === "webm") return "video/webm";
  if (ext === "ogg") return "video/ogg";
  if (ext === "mov") return "video/quicktime";
  return "video/mp4";
};



const MediaCarousel: React.FC<MediaCarouselProps> = ({
  items,
  intervalMs = 5000,
  heightClass = "h-[60vh]",
  withOverlay = true,
}) => {
  const [index, setIndex] = useState(0);
  const length = items.length;

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % length), intervalMs);
    return () => clearInterval(id);
  }, [length, intervalMs]);

  const prev = () => setIndex((i) => (i - 1 + length) % length);
  const next = () => setIndex((i) => (i + 1) % length);

  // --- Helpers locales ---
  const isDriveUrl = (url = "") => /https?:\/\/drive\.google\.com\/.+/i.test(url);

  // extrae ID desde:
  // - https://drive.google.com/file/d/ID/preview
  // - https://drive.google.com/uc?export=download&id=ID
  const extractDriveId = (url = "") => {
    const byPath = url.match(/\/d\/([-\w]{25,})/);
    if (byPath?.[1]) return byPath[1];
    const byQuery = url.match(/[?&]id=([-\w]{25,})/);
    return byQuery?.[1] || "";
  };

  const toDrivePreview = (url = "") => {
    const id = extractDriveId(url);
    // puedes añadir ?autoplay=1 si quieres intentar autoplay en desktop
    return id ? `https://drive.google.com/file/d/${id}/preview` : url;
  };

  // SOLO considera vídeo si hay extensión real; Drive se maneja aparte
  const isVideo = (src = "") => /\.(mp4|webm|ogg|mov)(\?.*)?(#.*)?$/i.test(src);

  const guessMime = (src = "") => {
    const clean = src.split("?")[0].split("#")[0];
    const ext = (clean.split(".").pop() || "").toLowerCase();
    if (ext === "mp4") return "video/mp4";
    if (ext === "webm") return "video/webm";
    if (ext === "ogg") return "video/ogg";
    if (ext === "mov") return "video/quicktime";
    return "video/mp4";
  };

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl shadow-2xl ${heightClass}`}>
      {items.map((item: MediaItem, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className={`absolute inset-0 ${i === index ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          {isDriveUrl(item.src) ? (
            // ▶️ Google Drive (iframe /preview)
            <iframe
              src={toDrivePreview(item.src)}
              allow="autoplay; encrypted-media"
              allowFullScreen
              loading="lazy"
              className="h-full w-full rounded-2xl"
              referrerPolicy="no-referrer"
              title={item.title || item.label || `slide-${i}`}
            />
          ) : isVideo(item.src) ? (
            // ▶️ Vídeo con archivo real (CDN/local)
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            // descomenta para depurar:
            // onError={(e) => console.error("VIDEO ERROR", e.currentTarget.error, item.src)}
            // onLoadedData={() => console.log("VIDEO LOADED", item.src)}
            >
              <source src={item.src} type={guessMime(item.src)} />
            </video>
          ) : (
            // ▶️ Imagen
            <img
              src={item.src}
              alt={item.title || item.label || `slide-${i}`}
              className="h-full w-full object-cover"
            />
          )}

          {withOverlay && (item.title || item.description) && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              {item.title && <h3 className="text-xl font-semibold text-white">{item.title}</h3>}
              {item.description && (
                <p className="mt-1 max-w-3xl text-sm text-white/80">{item.description}</p>
              )}
            </div>
          )}

          {item.label && (
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="rounded-full bg-black/35 px-5 py-2 text-lg font-bold backdrop-blur-sm">
                {item.label}
              </div>
            </div>
          )}
        </motion.div>
      ))}

      <div className="pointer-events-none absolute inset-0">
        <div className="pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2">
          <button
            onClick={prev}
            className="rounded-full bg-white/10 p-3 backdrop-blur hover:bg-white/20"
            aria-label="Anterior"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5 text-white"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        </div>
        <div className="pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2">
          <button
            onClick={next}
            className="rounded-full bg-white/10 p-3 backdrop-blur hover:bg-white/20"
            aria-label="Siguiente"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5 text-white"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};



export default function Granadron() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-body">
      <FontInjector />

      {/* ======= Navbar (más alta) ======= */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
          <a href="/" className="flex items-center gap-3">
            <img src={logo} alt="Granadron" className="h-11 w-11 rounded" />
          </a>

          {/* Menú completo solo desde >= xl */}
          <div className="hidden items-center gap-8 xl:flex">
            {NAV_ITEMS.map((item: { label: string; href: string }) => (
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

          {/* Hamburger visible por debajo de xl */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="xl:hidden"
            aria-label="Abrir menú"
          >
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </nav>

        {/* Drawer móvil también condicionado a xl */}
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

      {/* ======= Hero (100vh) ======= */}
      <section
        id="top"
        className="relative flex min-h-[100vh] items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${hero})` }}
      >
        {/* Gradiente general para contraste de texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-transparent" />

        {/* === DIFUMINADO INFERIOR — fusión con bg-neutral-950 === */}
        <div
          className="absolute inset-x-0 bottom-0 h-[300px]"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.7) 60%, #0a0a0a 100%)",
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
          <img
            src={firma}
            alt="Granadron"
            className="mb-6 h-24 w-24 sm:h-28 sm:w-28"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl leading-tight sm:text-6xl md:text-7xl"
          >
            WELCOME TO<br className="hidden sm:block" /> GRANADRON
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-5 max-w-2xl text-base text-neutral-200 sm:text-lg"
          >
            Capturamos historias desde el aire: eventos, cultura, tradición y momentos
            privados con una mirada cinematográfica.
          </motion.p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90"
            >
              Contáctenos <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/proyectos"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Ver trabajos
            </a>
          </div>
        </div>
      </section>


      {/* ======= ¿Qué hacemos? (texto izq + carrusel dcha) ======= */}
      <section id="que-hacemos" className="border-t border-black/10 bg-neutral-950 py-18 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
          <div>
            <p className="text-xs tracking-[0.35em] text-neutral-400">NUESTRO ENFOQUE</p>
            <h2 className="mt-2 font-display text-3xl md:text-5xl">¿Qué hacemos?</h2>
            <p className="mt-4 max-w-xl text-neutral-300">
              Realizamos vídeos y grabaciones con dron para ferias, eventos taurinos, fiestas de pueblo, actos culturales y celebraciones privadas.
              Apostamos por planos creativos, montaje ágil y sonido cuidado para que cada pieza cuente una historia única.
            </p>
            <p className="mt-4 max-w-xl text-neutral-400 text-sm">
              Nuestro estilo combina tomas aéreas estables, travellings fluidos y edición rítmica para transmitir la energía real del evento.
            </p>
          </div>
          <div>
            {/* Carrusel a la derecha — intervalo 5 MIN */}
            <MediaCarousel items={PROJECT_VIDEOS} intervalMs={300000} heightClass="h-[72vh]" />
          </div>
        </div>
      </section>

      {/* ======= CTA a todos los trabajos (bg con desvanecido arriba/abajo) ======= */}
      <section id="proyectos-mas" className="relative isolate bg-black py-24">
        <div className="absolute inset-0 -z-10">
          <img src="/images/portfolio_cover.jpg" alt="Portafolio Granadron" className="h-full w-full object-cover" />
          {/* Fades */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <p className="text-xs tracking-[0.35em] text-neutral-300">PORTAFOLIO COMPLETO</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl">Explora todos nuestros trabajos</h2>
          <p className="mx-auto mt-4 max-w-3xl text-neutral-200">
            Aftermovies de ferias, tentaderos, fiestas tradicionales y encargos privados. Cada evento merece una narrativa: dinámica, clara y honesta.
          </p>
          <a href="/proyectos" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90">
            Ver todos los proyectos <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* ======= Experiencia (igual, con carrusel a la derecha con labels) ======= */}
      <section id="sobre-nosotros" className="border-t border-white/10 bg-neutral-950 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs tracking-[0.35em] text-neutral-400">EXPERIENCIA</p>
              <h2 className="mt-2 font-display text-3xl md:text-5xl">Hemos trabajado en...</h2>
              <p className="mt-4 text-neutral-300">
                Desde ferias multitudinarias hasta eventos privados, pasando por el mundo del toreo y celebraciones culturales.
                Adaptamos el estilo para que cada proyecto conserve su esencia.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {EXPERIENCE_TAGS.map((t) => (
                  <span key={t} className="rounded-full border border-white/15 px-3 py-1 text-sm text-neutral-200">
                    {t}
                  </span>
                ))}
              </div>
              <a href="/proyectos" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90">
                Ver nuestro trabajo <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="relative">
              <MediaCarousel items={EXPERIENCE_SLIDES} intervalMs={5000} heightClass="h-[64vh]" withOverlay={false} />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* ======= Certificados ======= */}
      <section id="certificados" className="border-t border-white/10 bg-black py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-xs tracking-[0.35em] text-neutral-400">CERTIFICADOS</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl">
            Operador y certificaciones
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-neutral-300 text-lg leading-relaxed">
            Contamos con el <strong>registro oficial de operador de drones</strong> y el
            <strong> certificado A1/A3</strong>, garantizando operaciones seguras y conformes a la normativa europea.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-neutral-400 text-base leading-relaxed">
            Además, para aquellas operaciones que lo requieren, realizamos la
            <strong> comunicación previa al Ministerio del Interior</strong>,
            la <strong>coordinación con aeródromos</strong> y todos los trámites necesarios
            para garantizar la seguridad y la legalidad de cada vuelo.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <div className="rounded-2xl border border-white/10 bg-neutral-900/60 px-8 py-4 text-sm text-neutral-300 backdrop-blur-sm">
              🛩️ Registro de operador de drones
            </div>
            <div className="rounded-2xl border border-white/10 bg-neutral-900/60 px-8 py-4 text-sm text-neutral-300 backdrop-blur-sm">
              🎓 Certificación A1/A3
            </div>
            <div className="rounded-2xl border border-white/10 bg-neutral-900/60 px-8 py-4 text-sm text-neutral-300 backdrop-blur-sm">
              🏛️ Comunicación a organismos oficiales
            </div>
          </div>
        </div>
      </section>


      {/* ======= Nuestro equipo (mosaico 3 fotos) ======= */}
      <section id="equipo" className="bg-black py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs tracking-[0.35em] text-neutral-400">NUESTRO EQUIPO</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl">El dron con el que volamos</h2>
          <p className="mt-4 max-w-3xl text-neutral-300">
            DJI Mini 3 — compacto, versátil y con calidad 4K para resultados nítidos. Ideal para eventos dinámicos y grabaciones discretas.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <img src={dron1} alt="DJI Mini 3 - detalle 1" className="aspect-[4/3] w-full rounded-2xl object-cover" />
            <img src={dron2} alt="DJI Mini 3 - detalle 2" className="aspect-[4/3] w-full rounded-2xl object-cover" />
            <img src={dron3} alt="DJI Mini 3 - detalle 3" className="aspect-[4/3] w-full rounded-2xl object-cover" />
          </div>
        </div>
      </section>

      {/* ======= Nuevos proyectos ======= */}
      <section id="nuevos-proyectos" className="border-t border-white/10 bg-neutral-950 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-xs tracking-[0.35em] text-neutral-400">PRÓXIMAMENTE</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl">Nuevos proyectos en camino</h2>
          <p className="mx-auto mt-6 max-w-3xl text-neutral-300 text-lg leading-relaxed">
            Estamos preparando algo muy especial. Muy pronto podrás disfrutar de nuestro próximo trabajo:
            <strong> “Monesterio como nunca lo habías visto”</strong>, una pieza que mostrará su esencia desde el aire,
            combinando historia, cultura y emoción visual.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-neutral-400 text-base leading-relaxed">
            Seguimos creando, explorando y llevando nuestra visión cinematográfica a nuevos rincones.
            Pronto disponible para el público.
          </p>

          <div className="mt-10 flex justify-center">
            <a
              href="/futuros"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90"
            >
              Ver adelanto <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>


      {/* ======= Contacto ======= */}
      <section id="contacto" className="border-t border-white/10 bg-neutral-950 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs tracking-[0.35em] text-neutral-400">CONTACTO</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl">Hablemos de tu proyecto</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="group rounded-2xl border border-white/10 bg-black/40 p-6 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-black/60">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">WhatsApp</div>
                <Send className="h-5 w-5 opacity-70 group-hover:opacity-100" />
              </div>
              <p className="mt-2 text-neutral-300">{CONTACT.displayPhone}</p>
              <p className="mt-1 text-sm text-neutral-400">Escríbenos ahora y cuéntanos tu idea.</p>
            </a>

            <a href={`tel:${CONTACT.phone}`} className="group rounded-2xl border border-white/10 bg-black/40 p-6 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-black/60">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">Llamada</div>
                <Phone className="h-5 w-5 opacity-70 group-hover:opacity-100" />
              </div>
              <p className="mt-2 text-neutral-300">{CONTACT.displayPhone}</p>
              <p className="mt-1 text-sm text-neutral-400">Te atendemos y resolvemos dudas.</p>
            </a>

            <a href={`mailto:${CONTACT.email}`} className="group rounded-2xl border border-white/10 bg-black/40 p-6 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-black/60">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">Correo</div>
                <Mail className="h-5 w-5 opacity-70 group-hover:opacity-100" />
              </div>
              <p className="mt-2 text-neutral-300">{CONTACT.email}</p>
              <p className="mt-1 text-sm text-neutral-400">Envíanos detalles y fechas.</p>
            </a>
          </div>
        </div>
      </section>

      {/* ======= RR.SS. con texto extra ======= */}
      <section id="rrss" className="border-t border-white/10 bg-neutral-950 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6">
            <p className="text-xs tracking-[0.35em] text-neutral-400">REDES SOCIALES</p>
            <h2 className="mt-2 font-display text-3xl md:text-5xl">Síguenos</h2>
            <p className="mt-3 max-w-3xl text-neutral-300">
              Detrás de cada plano hay una historia. En nuestras redes subimos making-of, clips verticales (ideal para Reels/TikTok) y avances de proyectos.
              Si quieres ver cómo trabajamos en terreno y los resultados finales, aquí es donde más se siente la energía de Granadron.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {RRSS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/40 p-6 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-black/60">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-white/10 p-3">{s.icon}</div>
                    <div className="text-lg font-semibold">{s.label}</div>
                  </div>
                  <p className="mt-2 text-sm text-neutral-400">{s.handle}</p>
                </div>
                <ArrowRight className="h-5 w-5 opacity-70 transition group-hover:translate-x-1 group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ======= Footer ======= */}
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
    </div>
  );
}

//Ahora quiero hacer un nuevo .tsx con el mismo footer y navba, en el que se presenten los proyectos con un titulo, descripcion, y video. Primer proyecto anuncio corrida de toros Monesterio, pon el espacio para el video hazme una descripcion. Segundo Concurso Doma Vaquera Monesterio, dame un espacio para el video, y pon una descripciom
//Tercero Entrenamiento CP Monesterio , dame un espacio para el video, y pon una descripcion. 
//Cuarto Feria Zafra, dame un espacio para el video, y pon una descripcion. 
//Quinto Fuera de Monesterio, dame un espacio para el video, y pon una descripcion. 
//Sexto Iglesia de Fuente de Cantos, dame un espacio para el video, y pon una descripcion. 
//Septimo Jerez de los caballeros, dame un espacio para el video, y pon una descripcion. 
//Octavo, Monasterio de Tentudia, dame un espacio para el video, y pon una descripcion. 
//Noveno,Preferia Bar Leo, dame un espacio para el video, y pon una descripcion. 
//Decimo Preferia Monesterio, dame un espacio para el video, y pon una descripcion. 
//Unceavo Recortes, dame un espacio para el video, y pon una descripcion. 
//Doceavo Victoriano Contreras, dame un espacio para el video, y pon una descripcion. 
//treaceavo Virgen de Tentudia, dame un espacio para el video, y pon una descripcion. 
//14 Zafra, dame un espacio para el video, y pon una descripcion. 