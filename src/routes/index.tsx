import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  FlaskConical,
  Layers,
  Sprout,
  Satellite,
  ClipboardCheck,
  Microscope,
  Send,
  TrendingUp,
  Wallet,
  Leaf,
  Recycle,
  MapPin,
  Users,
  type LucideIcon,
} from "lucide-react";
import heroSoil from "../assets/hero-soil.jpg";
import fieldsAerial from "../assets/fields-aerial.jpg";
import teamImg from "../assets/team.jpg";
import { CTASection } from "../components/site/CTASection";
import { FieldsMap, FIELDS } from "../components/site/FieldsMap";
import { SectionHead } from "../components/site/SectionHead";
import { Reveal } from "../components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Biogenic Soil Sense — Turn Soil Data into Smarter Farming Decisions" },
      {
        name: "description",
        content:
          "Scientific soil analysis, land profiling and GIS mapping for Sri Lankan agriculture. Higher yields, less fertilizer waste, healthier soil.",
      },
      {
        property: "og:title",
        content: "Biogenic Soil Sense — Soil Intelligence for Sri Lankan Farms",
      },
      {
        property: "og:description",
        content:
          "From sample to recommendation — lab-grade soil analysis and GIS-driven insights for precision agriculture across Sri Lanka.",
      },
    ],
  }),
  component: Home,
});

const SERVICES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: FlaskConical,
    title: "Soil Analysis",
    body: "Lab-grade testing for macro- and micronutrients, pH, salinity, organic carbon and texture.",
  },
  {
    icon: Layers,
    title: "Land Profiling",
    body: "Full-farm land characterization with zone maps, slope, drainage and management units.",
  },
  {
    icon: Sprout,
    title: "Nutrient Recommendations",
    body: "Crop-specific fertilizer plans for tea, paddy, coconut and spice lands — cut waste, lift yield.",
  },
  {
    icon: Satellite,
    title: "Precision Agriculture",
    body: "GIS layers and variable-rate prescriptions connected to your equipment and workflow.",
  },
];

const STEPS = [
  {
    icon: ClipboardCheck,
    label: "01 · Collect",
    title: "On-farm sampling",
    body: "Our agronomists design a sampling grid and collect soil cores across every management zone.",
  },
  {
    icon: Microscope,
    title: "Lab analysis",
    label: "02 · Analyze",
    body: "Samples are processed in accredited labs with ISO-referenced methods and QA controls.",
  },
  {
    icon: Send,
    label: "03 · Recommend",
    title: "Actionable plan",
    body: "You receive a clear, crop-specific report with GIS layers and season-ready recommendations.",
  },
];

const BENEFITS = [
  {
    icon: TrendingUp,
    title: "Higher yields",
    body: "Match inputs to what the soil actually needs.",
  },
  {
    icon: Wallet,
    title: "Reduced costs",
    body: "Cut over-fertilization by 20–40% on typical farms.",
  },
  { icon: Leaf, title: "Healthier soil", body: "Rebuild organic matter and biological activity." },
  {
    icon: Recycle,
    title: "Sustainable farming",
    body: "Lower runoff and greenhouse-gas footprint.",
  },
];

const STATS = [
  { value: "3,400+", label: "Fields analyzed" },
  { value: "9", label: "Provinces covered" },
  { value: "12 yrs", label: "Field experience" },
  { value: "99.2%", label: "Lab reproducibility" },
];

function Home() {
  const featured = FIELDS.slice(0, 6);
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroSoil}
          alt="Farmer holding fresh soil in a field at golden hour"
          width={1920}
          height={1200}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/60 to-black/30"
        />
        <div className="container-page relative pb-24 pt-20 sm:pb-32 sm:pt-28 lg:pb-40 lg:pt-36">
          <p className="eyebrow text-white/90">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-primary-light)]" />
            Scientific soil intelligence
          </p>
          <h1 className="mt-4 max-w-4xl text-[42px] font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[64px]">
            Transform soil data into smarter farming decisions.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90 sm:text-xl">
            Biogenic Soil Sense delivers lab-grade soil analysis, land profiling and GIS mapping so
            Sri Lankan farmers know exactly what their soil needs — season after season.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-card transition hover:-translate-y-0.5 hover:shadow-elevated"
            >
              Request Soil Analysis <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/fields"
              className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Explore Tested Fields
            </Link>
          </div>

          <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t border-white/20 pt-8 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="text-xs font-medium uppercase tracking-widest text-white/70">
                  {s.label}
                </dt>
                <dd className="mt-1 text-2xl font-bold text-white">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-y grain-bg">
        <div className="container-page">
          <Reveal>
            <SectionHead
              eyebrow="What we do"
              title="A complete soil intelligence toolkit"
              description="From sampling to prescription. Everything a modern Sri Lankan farm needs to work with its soil, not against it."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <article className="card-surface card-surface-hover flex h-full flex-col gap-4 p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-primary-dark">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
                  <Link
                    to="/contact"
                    className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:gap-2"
                  >
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-y bg-muted/60">
        <div className="container-page">
          <Reveal>
            <SectionHead
              eyebrow="How it works"
              title="Three steps from sample to season plan"
              description="A clear, scientific process — no jargon, no black boxes."
            />
          </Reveal>
          <ol className="mt-14 grid gap-6 lg:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 100} className="relative">
                <div className="card-surface flex h-full flex-col gap-4 p-8">
                  <div className="flex items-center gap-4">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-card">
                      <step.icon className="h-7 w-7" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                      {step.label}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold">{step.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    aria-hidden
                    className="absolute -right-3 top-1/2 hidden h-px w-6 bg-border lg:block"
                  />
                )}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section-y">
        <div className="container-page">
          <Reveal>
            <SectionHead eyebrow="Why it matters" title="Grow more. Waste less. Farm smarter." />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 80}>
                <div className="card-surface card-surface-hover h-full p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--color-harvest)]/15 text-[color:var(--color-harvest)]">
                    <b.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{b.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US — STATS */}
      <section className="section-y bg-[color:var(--color-primary-dark)] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 topo-pattern text-white opacity-40"
        />
        <div className="container-page relative grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal>
            <div>
              <p className="eyebrow text-[color:var(--color-primary-light)]">Why choose us</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-[42px]">
                Science-first. Farmer-tested. Field-proven.
              </h2>
              <p className="mt-4 text-lg text-white/85">
                We combine soil chemistry, agronomy and GIS in one team — so every recommendation is
                defensible, reproducible and ready for the field.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <dl className="grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:bg-white/10"
                >
                  <dd className="text-4xl font-bold text-white">{s.value}</dd>
                  <dt className="mt-1 text-sm text-white/80">{s.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* FEATURED FIELDS MAP */}
      <section className="section-y">
        <div className="container-page">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <SectionHead
                eyebrow="Featured tested fields"
                title="See where our soil intelligence is at work"
                description="A snapshot of recently analyzed farms across Sri Lanka."
                align="left"
                inline
              />
            </Reveal>
            <Link
              to="/fields"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
            >
              View all tested fields <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Reveal delay={100}>
            <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
              <FieldsMap fields={featured} height={480} compact />
              <div className="card-surface flex flex-col gap-3 p-6">
                <p className="eyebrow">Recent activity</p>
                <ul className="mt-2 divide-y divide-border">
                  {featured.map((f) => (
                    <li key={f.id} className="flex items-start gap-3 py-3">
                      <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent text-primary-dark">
                        <MapPin className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">{f.name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {f.district} · {f.crop} · {f.areaHa} ha
                        </p>
                      </div>
                      {f.healthIndex > 0 && (
                        <div className="flex shrink-0 flex-col items-end">
                          <span className="text-sm font-bold text-primary">{f.healthIndex}</span>
                          <span className="text-[10px] text-muted-foreground">health idx</span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="section-y bg-muted/60">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative">
              <img
                src={teamImg}
                alt="Biogenic Soil Sense agronomy team standing in a green field"
                width={1400}
                height={1000}
                loading="lazy"
                className="w-full rounded-3xl object-cover shadow-elevated"
              />
              <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-surface p-5 shadow-elevated sm:block">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                    <Users className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">30+ specialists</p>
                    <p className="text-xs text-muted-foreground">agronomy · GIS · lab science</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div>
              <p className="eyebrow">About Biogenic Soil Sense</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-[40px]">
                A team of scientists and agronomists building the soil intelligence layer for Sri
                Lankan farming.
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                We started as a soil-science research group and grew into a full
                precision-agriculture partner. Every recommendation we ship is grounded in real lab
                data and validated in the field.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-card transition hover:-translate-y-0.5"
                >
                  Meet our team <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/fields"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary/40"
                >
                  See our work
                </Link>
              </div>
              <img
                src={fieldsAerial}
                alt=""
                width={1600}
                height={1000}
                loading="lazy"
                className="mt-8 hidden h-32 w-full rounded-2xl object-cover shadow-card lg:block"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <CTASection
        eyebrow="Ready when you are"
        title="Ready to understand your soil?"
        description="Book a sampling visit and receive a full scientific report with a season-ready plan."
        primary={{ to: "/contact", label: "Request Soil Analysis" }}
        secondary={{ to: "/fields", label: "Explore fields" }}
      />
    </>
  );
}
