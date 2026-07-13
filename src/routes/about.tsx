import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Compass,
  Target,
  Eye,
  ShieldCheck,
  Sparkles,
  Handshake,
  Recycle,
  FlaskConical,
  Microscope,
  Satellite,
  Layers,
  Users,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import teamImg from "../assets/team.jpg";
import labImg from "../assets/lab-scientist.jpg";
import fieldsAerial from "../assets/fields-aerial.jpg";
import { CTASection } from "../components/site/CTASection";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Biogenic Soil Sense" },
      {
        name: "description",
        content:
          "Meet the team of soil scientists, agronomists and GIS engineers turning soil data into better farming outcomes.",
      },
      { property: "og:title", content: "About Biogenic Soil Sense" },
      {
        property: "og:description",
        content:
          "Our story, mission and the scientific approach behind every recommendation we deliver to farms.",
      },
    ],
  }),
  component: About,
});

const VALUES = [
  { icon: ShieldCheck, title: "Scientific integrity", body: "Every number we publish is traceable to a lab result and a documented method." },
  { icon: Handshake, title: "Farmer-first", body: "Reports are written for the field, not the shelf. Clear language, clear actions." },
  { icon: Recycle, title: "Sustainability", body: "We reduce input waste and rebuild soil health as a first-order objective." },
  { icon: Sparkles, title: "Curiosity", body: "We keep learning from every sample, every farm and every season." },
];

const APPROACH = [
  { icon: FlaskConical, title: "Accredited chemistry", body: "ISO-referenced procedures with duplicate QA on every batch." },
  { icon: Microscope, title: "Biology & physics", body: "Texture, SOM, respiration and microbial indicators — not just NPK." },
  { icon: Satellite, title: "GIS integration", body: "Every result becomes a mappable layer for zone management." },
  { icon: Layers, title: "Whole-farm view", body: "Soil, topography, hydrology and crop rotation reasoned together." },
];

const TEAM = [
  { name: "Dr. Amina Otieno", role: "Chief Soil Scientist" },
  { name: "James Kariuki", role: "Head of Agronomy" },
  { name: "Priya Menon", role: "GIS & Data Lead" },
  { name: "Samuel Ndegwa", role: "Lab Operations Manager" },
];

const TIMELINE = [
  { year: "2013", title: "Research beginnings", body: "Founders publish first regional soil-health study." },
  { year: "2016", title: "Field lab opens", body: "First accredited soil chemistry lab commissioned." },
  { year: "2019", title: "GIS platform launched", body: "Soil results become live map layers for clients." },
  { year: "2022", title: "3,000+ fields analyzed", body: "Coverage expands to 18 regions and 6 crop systems." },
  { year: "2025", title: "Precision agriculture suite", body: "End-to-end variable-rate prescriptions in production." },
];

const TRUST = [
  { title: "Accredited labs", body: "Referenced against international soil science standards." },
  { title: "Reproducible science", body: "99.2% inter-lab reproducibility on split-sample audits." },
  { title: "Independent advice", body: "We don't sell fertilizer — our recommendations are unbiased." },
  { title: "Long-term partnership", body: "Multi-season follow-up on every recommendation." },
];

const STATS = [
  { value: "3,400+", label: "Fields analyzed" },
  { value: "18", label: "Regions" },
  { value: "12 yrs", label: "Experience" },
  { value: "30+", label: "Specialists" },
];

function About() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[color:var(--color-primary-dark)] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[color:var(--color-primary-light)]/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[color:var(--color-harvest)]/20 blur-3xl"
        />
        <div className="container-page relative grid gap-12 py-20 sm:py-24 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:py-28">
          <div>
            <p className="eyebrow text-[color:var(--color-primary-light)]">About us</p>
            <h1 className="mt-3 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-[56px]">
              Soil science that farmers can act on.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/80">
              We're a team of soil scientists, agronomists and GIS engineers on a mission to turn
              honest, lab-grade data into practical decisions for every hectare we touch.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-[color:var(--color-primary-dark)] transition hover:-translate-y-0.5"
              >
                Work with us <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/fields"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                See our fieldwork
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={teamImg}
              alt="Team of Biogenic Soil Sense agronomists in a field"
              width={1400}
              height={1000}
              className="w-full rounded-3xl object-cover shadow-elevated"
            />
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <p className="eyebrow">Our story</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              A decade of listening to what soil is saying.
            </h2>
          </div>
          <div className="grid gap-5 lg:col-span-2 sm:grid-cols-2">
            {[
              {
                title: "Started in the field",
                body: "We began as an independent soil research group working with cooperatives on nutrient loss and yield gaps.",
              },
              {
                title: "Built our own lab",
                body: "Frustrated by slow turnaround, we set up an accredited lab and paired it with agronomy expertise.",
              },
              {
                title: "Added GIS",
                body: "We layered spatial context on every result, so recommendations reflect the real geography of a farm.",
              },
              {
                title: "Now: end-to-end",
                body: "Today we deliver a full soil-to-season workflow, from sampling grids to variable-rate prescriptions.",
              },
            ].map((c) => (
              <div key={c.title} className="card-surface p-7">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="section-y bg-muted/60">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <div className="card-surface flex flex-col gap-4 p-8">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Target className="h-6 w-6" />
            </span>
            <h3 className="text-2xl font-semibold">Our mission</h3>
            <p className="text-[17px] leading-relaxed text-muted-foreground">
              Make soil intelligence accessible to every farmer, so land is farmed with precision,
              respect and long-term productivity in mind.
            </p>
          </div>
          <div className="card-surface flex flex-col gap-4 p-8">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-[color:var(--color-harvest)] text-white">
              <Eye className="h-6 w-6" />
            </span>
            <h3 className="text-2xl font-semibold">Our vision</h3>
            <p className="text-[17px] leading-relaxed text-muted-foreground">
              A farming sector where every decision — planting, fertilizing, irrigating — is
              informed by measurable, reproducible soil data.
            </p>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="section-y">
        <div className="container-page">
          <SectionHead eyebrow="Core values" title="What we won't compromise on." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="card-surface card-surface-hover p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary-dark">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCIENTIFIC APPROACH */}
      <section className="section-y bg-muted/60">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div className="relative">
            <img
              src={labImg}
              alt="Scientist analyzing a soil sample in a modern lab"
              width={1400}
              height={1000}
              loading="lazy"
              className="w-full rounded-3xl object-cover shadow-elevated"
            />
            <div className="absolute -bottom-5 left-6 hidden rounded-2xl bg-surface px-5 py-4 shadow-elevated sm:block">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Accredited lab
              </p>
              <p className="text-sm font-semibold">ISO-referenced methods</p>
            </div>
          </div>
          <div>
            <p className="eyebrow">Our scientific approach</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              We measure soil the way soil deserves to be measured.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Chemistry, biology, physics and spatial context — combined into a single, coherent
              recommendation.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {APPROACH.map((a) => (
                <div key={a.title} className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-primary-dark">
                    <a.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold">{a.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="section-y">
        <div className="container-page">
          <SectionHead
            eyebrow="Leadership"
            title="The people behind the science."
            description="Multidisciplinary and always in the field."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((p) => (
              <div key={p.name} className="card-surface card-surface-hover p-6 text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-accent text-2xl font-bold text-primary-dark">
                  {p.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <p className="mt-4 font-semibold">{p.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{p.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY FARMERS TRUST US */}
      <section className="section-y bg-muted/60">
        <div className="container-page">
          <SectionHead eyebrow="Trust" title="Why farmers keep coming back." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST.map((t) => (
              <div key={t.title} className="card-surface p-7">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{t.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section-y">
        <div className="container-page">
          <div className="rounded-3xl border border-border bg-surface p-8 shadow-card sm:p-12">
            <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dd className="text-4xl font-bold text-primary sm:text-5xl">{s.value}</dd>
                  <dt className="mt-2 text-sm font-medium text-muted-foreground">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section-y bg-muted/60">
        <div className="container-page">
          <SectionHead eyebrow="Timeline" title="From research group to precision-ag partner." />
          <ol className="relative mt-12 space-y-6 border-l border-border pl-6 sm:pl-8">
            {TIMELINE.map((t) => (
              <li key={t.year} className="relative">
                <span className="absolute -left-[33px] top-1.5 grid h-4 w-4 place-items-center rounded-full border-4 border-background bg-primary sm:-left-[41px]" />
                <div className="card-surface p-6">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="rounded-lg bg-accent px-2.5 py-1 text-xs font-bold text-primary-dark">
                      {t.year}
                    </span>
                    <h3 className="text-lg font-semibold">{t.title}</h3>
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{t.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="section-y">
        <div className="container-page">
          <SectionHead
            eyebrow="Partners & clients"
            title="Trusted by cooperatives, agribusinesses and research bodies."
          />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {["AgriCo-op", "GreenRift", "TerraLabs", "FarmBridge", "AgroTech Inst.", "SoilWise"].map(
              (name) => (
                <div
                  key={name}
                  className="grid h-20 place-items-center rounded-2xl border border-border bg-surface text-sm font-semibold text-muted-foreground"
                >
                  {name}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        eyebrow="Partner with us"
        title="Bring soil science to your farm."
        description="From a single field to a full estate — our team is ready to help."
        primary={{ to: "/contact", label: "Request Soil Analysis" }}
        secondary={{ to: "/fields", label: "See our fieldwork" }}
      />

      {/* CONTACT */}
      <section className="section-y bg-muted/60">
        <div className="container-page grid gap-8 lg:grid-cols-3">
          {[
            { icon: Mail, title: "Email", value: "hello@biogenicsoil.com" },
            { icon: Phone, title: "Phone", value: "+254 700 000 000" },
            { icon: MapPin, title: "Office", value: "Research Park, Nairobi" },
          ].map((c) => (
            <div key={c.title} className="card-surface flex items-start gap-4 p-7">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                <c.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  {c.title}
                </p>
                <p className="mt-1 text-lg font-semibold">{c.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <img src={fieldsAerial} alt="" aria-hidden className="hidden" />
    </>
  );
}

function SectionHead({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="eyebrow justify-center">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-[40px]">{title}</h2>
      {description && <p className="mt-4 text-lg text-muted-foreground">{description}</p>}
    </div>
  );
}
