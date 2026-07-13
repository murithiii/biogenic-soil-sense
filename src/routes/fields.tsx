import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Calendar,
  Filter,
  MapPin,
  Ruler,
  Search,
  Sprout,
  X,
  Award,
  CheckCircle2,
  Clock,
  Globe2,
} from "lucide-react";
import { FieldsMap, FIELDS, type Field } from "../components/site/FieldsMap";
import { CTASection } from "../components/site/CTASection";
import crops from "../assets/crops.jpg";

export const Route = createFileRoute("/fields")({
  head: () => ({
    meta: [
      { title: "Tested Fields Map — Biogenic Soil Sense" },
      {
        name: "description",
        content:
          "Explore an interactive map of fields analyzed by Biogenic Soil Sense — filter by county, crop, date and status.",
      },
      { property: "og:title", content: "Tested Fields Map" },
      {
        property: "og:description",
        content:
          "An interactive showcase of soil analysis work across the region — clustered fields, live filters and detail cards.",
      },
    ],
  }),
  component: FieldsPage,
});

const COUNTIES = ["All", ...Array.from(new Set(FIELDS.map((f) => f.county))).sort()];
const CROPS = ["All", ...Array.from(new Set(FIELDS.map((f) => f.crop))).sort()];
const STATUSES = ["All", "Analyzed", "In Lab", "Scheduled"] as const;
const DATE_RANGES = ["All time", "Last 30 days", "Last 90 days", "This year"] as const;

const STAT_BANNER = [
  { icon: Sprout, value: `${FIELDS.length}+`, label: "Fields analyzed" },
  { icon: Globe2, value: `${new Set(FIELDS.map((f) => f.county)).size}`, label: "Counties covered" },
  { icon: Calendar, value: "Dec 2025", label: "Latest analysis" },
  { icon: Clock, value: "5–7 days", label: "Avg. turnaround" },
];

const STORIES = [
  {
    title: "22% yield lift on Rift maize",
    body: "A precise nitrogen split plan turned an average season into the best harvest in five years.",
    tag: "Nakuru · Maize",
  },
  {
    title: "Lime program saves Kericho tea",
    body: "Correcting aluminium toxicity restored root health across 76 hectares of estate tea.",
    tag: "Kericho · Tea",
  },
  {
    title: "Meru avocados stay export-grade",
    body: "Micronutrient management kept fruit consistency high through a difficult dry spell.",
    tag: "Meru · Avocado",
  },
];

function daysAgo(iso: string) {
  return (Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24);
}

function FieldsPage() {
  const [county, setCounty] = useState<string>("All");
  const [crop, setCrop] = useState<string>("All");
  const [status, setStatus] = useState<string>("All");
  const [range, setRange] = useState<string>("All time");
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(FIELDS[0].id);
  const [panelOpen, setPanelOpen] = useState(false);

  const filtered = useMemo(() => {
    return FIELDS.filter((f) => {
      if (county !== "All" && f.county !== county) return false;
      if (crop !== "All" && f.crop !== crop) return false;
      if (status !== "All" && f.status !== status) return false;
      if (q.trim() && !f.name.toLowerCase().includes(q.trim().toLowerCase())) return false;
      if (range !== "All time") {
        const d = daysAgo(f.date);
        if (range === "Last 30 days" && d > 30) return false;
        if (range === "Last 90 days" && d > 90) return false;
        if (range === "This year" && new Date(f.date).getFullYear() !== new Date().getFullYear())
          return false;
      }
      return true;
    });
  }, [county, crop, status, range, q]);

  const selected: Field | undefined =
    filtered.find((f) => f.id === selectedId) ?? filtered[0];

  return (
    <>
      {/* HERO */}
      <section className="border-b border-border bg-gradient-to-b from-accent/60 to-background">
        <div className="container-page py-16 sm:py-20 lg:py-24">
          <p className="eyebrow">Tested fields</p>
          <div className="mt-3 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <h1 className="text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-[56px]">
              An interactive map of every field we've analyzed.
            </h1>
            <p className="text-lg text-muted-foreground">
              Filter by county, crop, date or status. Select a field to see the soil summary and a
              preview of the recommendations we delivered.
            </p>
          </div>
        </div>
      </section>

      {/* MAP + PANELS */}
      <section className="section-y">
        <div className="container-page">
          <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)_320px]">
            {/* FILTER PANEL */}
            <aside className="card-surface flex h-fit flex-col gap-5 p-5 lg:sticky lg:top-24">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-primary-dark">
                  <Filter className="h-4 w-4" />
                </span>
                <h2 className="text-base font-semibold">Filters</h2>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Search field
                </label>
                <div className="mt-2 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 focus-within:border-primary/50">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Field name…"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                  {q && (
                    <button
                      onClick={() => setQ("")}
                      aria-label="Clear search"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <FilterSelect label="County" value={county} onChange={setCounty} options={COUNTIES} />
              <FilterSelect label="Crop type" value={crop} onChange={setCrop} options={CROPS} />
              <FilterChips
                label="Status"
                value={status}
                onChange={setStatus}
                options={[...STATUSES]}
              />
              <FilterSelect
                label="Analysis date"
                value={range}
                onChange={setRange}
                options={[...DATE_RANGES]}
              />

              <div className="flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                <span>
                  <b className="text-foreground">{filtered.length}</b> of {FIELDS.length} fields
                </span>
                <button
                  onClick={() => {
                    setCounty("All");
                    setCrop("All");
                    setStatus("All");
                    setRange("All time");
                    setQ("");
                  }}
                  className="font-semibold text-primary hover:underline"
                >
                  Reset
                </button>
              </div>
            </aside>

            {/* MAP */}
            <div className="flex flex-col gap-4">
              <FieldsMap
                fields={filtered}
                activeId={selected?.id}
                onSelect={(f) => {
                  setSelectedId(f.id);
                  setPanelOpen(true);
                }}
                height={620}
              />
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-primary" /> Analyzed
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[color:var(--color-harvest)]" /> In lab
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[color:var(--color-earth)]" /> Scheduled
                </span>
                <span className="ml-auto">Click a marker for details</span>
              </div>
            </div>

            {/* FIELD INFO CARD */}
            <aside className="card-surface flex h-fit flex-col gap-4 p-6 lg:sticky lg:top-24">
              {selected ? (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="eyebrow">Selected field</p>
                      <h3 className="mt-1 text-xl font-semibold">{selected.name}</h3>
                    </div>
                    <StatusBadge status={selected.status} />
                  </div>

                  <ul className="grid grid-cols-2 gap-3 text-sm">
                    <InfoItem icon={MapPin} label="County" value={selected.county} />
                    <InfoItem icon={Sprout} label="Crop" value={selected.crop} />
                    <InfoItem
                      icon={Calendar}
                      label="Analyzed"
                      value={new Date(selected.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    />
                    <InfoItem icon={Ruler} label="Area" value={`${selected.areaHa} ha`} />
                  </ul>

                  <div className="rounded-xl bg-muted/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Soil summary
                    </p>
                    <p className="mt-2 text-[14px] leading-relaxed text-foreground">
                      {selected.soilSummary}
                    </p>
                  </div>

                  <div className="rounded-xl border border-primary/20 bg-accent p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                      Recommendation preview
                    </p>
                    <p className="mt-2 text-[14px] leading-relaxed text-primary-dark">
                      {selected.recommendation}
                    </p>
                  </div>

                  <Link
                    to="/contact"
                    className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5"
                  >
                    Request a similar analysis <ArrowRight className="h-4 w-4" />
                  </Link>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No fields match the current filters. Reset filters to see all locations.
                </p>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* STAT BANNER */}
      <section className="pb-4">
        <div className="container-page">
          <div className="grid gap-4 rounded-3xl bg-[color:var(--color-primary-dark)] p-6 text-white sm:grid-cols-2 sm:p-8 lg:grid-cols-4">
            {STAT_BANNER.map((s) => (
              <div key={s.label} className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10">
                  <s.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-sm text-white/70">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className="section-y">
        <div className="container-page">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow">Success stories</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Real fields, real results.
              </h2>
            </div>
            <img
              src={crops}
              alt=""
              width={1400}
              height={900}
              loading="lazy"
              className="hidden h-24 w-full max-w-md rounded-2xl object-cover shadow-card sm:block"
            />
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {STORIES.map((s) => (
              <article key={s.title} className="card-surface card-surface-hover flex flex-col gap-3 p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--color-harvest)]/15 text-[color:var(--color-harvest)]">
                  <Award className="h-5 w-5" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {s.tag}
                </p>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  <CheckCircle2 className="h-4 w-4" /> Verified outcome
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile detail overlay */}
      {panelOpen && selected && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface p-5 shadow-elevated lg:hidden">
          <div className="mx-auto flex max-w-2xl items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate font-semibold">{selected.name}</p>
              <p className="text-xs text-muted-foreground">
                {selected.county} · {selected.crop}
              </p>
            </div>
            <button
              aria-label="Close"
              onClick={() => setPanelOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-border"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <CTASection
        eyebrow="Ready when you are"
        title="Want your farm analyzed?"
        description="Book a sampling visit and receive a full scientific report tailored to your fields."
        primary={{ to: "/contact", label: "Request Soil Analysis" }}
      />
    </>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary/50"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function FilterChips({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o;
          return (
            <button
              key={o}
              type="button"
              onClick={() => onChange(o)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                active
                  ? "bg-primary text-primary-foreground shadow-card"
                  : "border border-border bg-surface text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-start gap-2.5 rounded-xl border border-border bg-background/60 p-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <div className="min-w-0">
        <p className="text-[10.5px] font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p className="mt-0.5 truncate text-sm font-semibold">{value}</p>
      </div>
    </li>
  );
}

function StatusBadge({ status }: { status: Field["status"] }) {
  const color =
    status === "Analyzed"
      ? "bg-primary/10 text-primary"
      : status === "In Lab"
      ? "bg-[color:var(--color-harvest)]/15 text-[color:var(--color-harvest)]"
      : "bg-[color:var(--color-earth)]/15 text-[color:var(--color-earth)]";
  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${color}`}>{status}</span>
  );
}
