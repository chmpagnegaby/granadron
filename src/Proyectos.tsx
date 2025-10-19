import { useState } from "react";
import { Menu, X, ArrowRight, Play } from "lucide-react";
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
    { label: "Más de nuestro trabajo", href: "/#proyectos-mas" },
    { label: "RR.SS.", href: "/#rrss" },
];

const CONTACT = {
    phone: "+34642839787",
    displayPhone: "642 839 787",
    email: "granadron25@gmail.com",
    whatsapp: "https://wa.me/34642839787",
};

/***********************
 * Datos de proyectos   *
 ***********************/
interface ProjectItem {
    title: string;
    slug: string;
    description: string;
    videoSrc?: string; // Rellena más tarde; por ahora dejamos el hueco
}

const PROJECTS: ProjectItem[] = [
    {
        title: "Anuncio Corrida de Toros — Monesterio",
        slug: "anuncio-corrida-monesterio",
        description:
            "Pieza promocional con ritmo intenso y planos aéreos dinámicos que presentan el cartel, la plaza y la emoción del festejo.",
        videoSrc: "https://drive.google.com/uc?export=download&id=1LvbIYRryheIu5RofhK0DoiySEg7gcdpU",
    },
    {
        title: "Concurso de Doma Vaquera — Monesterio",
        slug: "concurso-doma-vaquera-monesterio",
        description:
            "Cobertura elegante con foco en la técnica y la armonía jinete-caballo, combinando travellings bajos y tomas cenitales.",
        videoSrc: "https://drive.google.com/uc?export=download&id=1HCUtKwfJPbGb172p1y6bryCKIV4ponTZ",
    },
    {
        title: "Entrenamiento CP Monesterio",
        slug: "entrenamiento-cp-monesterio",
        description:
            "Vídeo deportivo con cortes ágiles, seguimiento de acción y detalles cercanos para transmitir intensidad y esfuerzo.",
        videoSrc: "https://drive.google.com/uc?export=download&id=1AxLyLo3e-zFuZKREpWXxO7cEFRLix8I6",
    },
    {
        title: "Feria de Zafra",
        slug: "feria-zafra",
        description:
            "Aftermovie festivo con panorámicas del recinto ferial, multitudes y espectáculos; color y energía en cada plano.",
        videoSrc: "https://drive.google.com/uc?export=download&id=1md834qIeKseg4g70yYL8SjiZdC37AMYU",
    },
    {
        title: "Feria de Monesterio",
        slug: "feria-de-monesterio",
        description:
            "Selección de proyectos itinerantes: localizaciones singulares y culturas distintas, siempre con narrativa visual coherente.",
        videoSrc: "https://drive.google.com/uc?export=download&id=1aRoOxoEY_oSP0BHLB1TVpkj7HBJLPprC",
    },
    {
        title: "Iglesia de Fuente de Cantos",
        slug: "iglesia-fuente-de-cantos",
        description:
            "Pieza patrimonial con movimientos suaves y encuadres respetuosos que resaltan arquitectura y luz natural.",
        videoSrc: "https://drive.google.com/uc?export=download&id=1ERSq37yFV9CRDBpMv9iM-Coq-D6XQ0ZR",
    },
    {
        title: "Jerez de los Caballeros",
        slug: "jerez-de-los-caballeros",
        description:
            "Retrato urbano y cultural: vuelos controlados, texturas del casco histórico y momentos de vida local.",
        videoSrc: "https://drive.google.com/uc?export=download&id=1MG2Djalc-FhxJbwmgwf1VT9TdI20Q5pt",
    },
    {
        title: "Monasterio de Tentudía",
        slug: "monasterio-de-tentudia",
        description:
            "Tomas contemplativas al atardecer para destacar el enclave y su entorno, con transiciones suaves y tono épico.",
        videoSrc: "https://drive.google.com/uc?export=download&id=1f1WNAZL8c3UrkWaKqOK4PfDvDu4jK4Qc",
    },
    {
        title: "Preferia — Bar Leo",
        slug: "preferia-bar-leo",
        description:
            "Clip social con enfoque en ambiente, música y detalles de la jornada; edición rítmica para redes.",
        videoSrc: "https://drive.google.com/uc?export=download&id=1BHvzelYTfGkAlozpXHOm1ci4RITLR5ka",
    },
    {
        title: "Preferia — Monesterio",
        slug: "preferia-monesterio",
        description:
            "Resumen vibrante de preferia: planos generales para contexto y cercanos para emoción de calle.",
        videoSrc: "https://drive.google.com/uc?export=download&id=1CsM4R2r5hk2Wmy4ITqCH3L-di8dsyrt7",
    },
    {
        title: "Recortes",
        slug: "recortes",
        description:
            "Cobertura de recortes con especial atención a la seguridad y a la tensión del momento; cámara lenta puntual para dramatismo.",
        videoSrc: "https://drive.google.com/uc?export=download&id=1qTh56jJMDyp3s2WriV-6M9uYYu1DP5Xg",
    },
    {
        title: "Victoriano Contreras",
        slug: "victoriano-contreras",
        description:
            "Mini documental que combina archivo, narrativa y vuelos suaves para perfilar la figura del maestro.",
        videoSrc: "https://drive.google.com/uc?export=download&id=1gNx4cT1na6IkaaqP9PufNcBTfenLU2NV",
    },
    {
        title: "Virgen de Tentudía",
        slug: "virgen-de-tentudia",
        description:
            "Procesión y tradición: composición cuidada y respeto por el ritmo ceremonial, priorizando el silencio visual.",
        videoSrc: "https://drive.google.com/uc?export=download&id=1ERSq37yFV9CRDBpMv9iM-Coq-D6XQ0ZR",
    },
    {
        title: "Zafra (varios)",
        slug: "zafra-varios",
        description:
            "Compendio de momentos capturados en Zafra: ferias, cultura y vida cotidiana desde una mirada aérea.",
        videoSrc: "https://drive.google.com/uc?export=download&id=16mdWT0JDFhrzI_GFAhMd0u5lB5sVoL3C",
    },
];


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

                {/* Menú completo solo desde >= xl */}
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
 * Vista de Proyectos   *
 ***********************/
const VideoPlaceholder = () => (
    <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
        <div className="absolute inset-0 grid place-items-center">
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-neutral-200 backdrop-blur">
                <Play className="h-4 w-4" /> Video aquí — sustituye el src
            </div>
        </div>
    </div>
);

// helpers para Drive
const isDrive = (url: string) => /https?:\/\/drive\.google\.com\/.+/.test(url);
const driveIdFrom = (url: string) => {
    const m = url.match(/[-\w]{25,}/); // extrae el FILE_ID
    return m ? m[0] : "";
};

const ProjectCard = ({ p }: { p: ProjectItem }) => {
    const isGDrive = p.videoSrc ? isDrive(p.videoSrc) : false;
    const driveId = isGDrive && p.videoSrc ? driveIdFrom(p.videoSrc) : "";

    return (
        <article
            id={p.slug}
            className="rounded-2xl border border-white/10 bg-black/40 p-6 transition hover:border-white/20 hover:bg-black/60"
        >
            <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
            <p className="mt-2 text-neutral-300">{p.description}</p>

            <div className="mt-4">
                {!p.videoSrc ? (
                    <VideoPlaceholder />
                ) : isGDrive ? (
                    // ▶️ Player de Google Drive
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                        <iframe
                            src={`https://drive.google.com/file/d/${driveId}/preview`}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            loading="lazy"
                            className="h-full w-full rounded-2xl"
                            referrerPolicy="no-referrer"
                        />
                    </div>
                ) : (
                    // ▶️ Vídeo normal (archivos propios / CDN)
                    <video
                        src={p.videoSrc}
                        className="aspect-video w-full rounded-2xl object-cover"
                        controls
                        preload="metadata"
                        playsInline
                        crossOrigin="anonymous"
                    />
                )}
            </div>
        </article>
    );
};

export default function Proyectos() {
    return (
        <div className="min-h-screen bg-black text-white font-body">
            <FontInjector />
            <Navbar />

            <main className="mx-auto max-w-6xl px-6 pt-36 pb-24">
                <header className="mb-10 text-center">
                    <p className="text-xs tracking-[0.35em] text-neutral-400">PORTAFOLIO</p>
                    <h1 className="font-display text-4xl md:text-6xl">Nuestros proyectos</h1>
                    <p className="mx-auto mt-3 max-w-2xl text-neutral-300">
                        Una selección de trabajos filmados con dron. Sustituye los espacios de vídeo por tus archivos cuando los tengas listos.
                    </p>
                </header>

                <section className="grid gap-6 md:grid-cols-2">
                    {PROJECTS.map((p) => (
                        <ProjectCard key={p.slug} p={p} />
                    ))}
                </section>

                <div className="mt-10 text-center">
                    <a href="/" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold hover:bg-white/10">
                        Volver a inicio <ArrowRight className="h-4 w-4 rotate-180" />
                    </a>
                </div>
            </main>

            <Footer />
        </div>
    );
}
