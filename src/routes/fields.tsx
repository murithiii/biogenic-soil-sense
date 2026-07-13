import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Calendar, ListFilter as Filter, MapPin, Ruler, Search, Sprout, X, Award, CircleCheck as CheckCircle2, Clock, Globe as Globe2, CircleAlert as AlertCircle } from "lucide-react";
import { FieldsMap, FIELDS, type Field } from "../components/site/FieldsMap";
import { CTASection } from "../components/site/CTASection";
import { Reveal } from "../components/site/Reveal";

export const Route = createFileRoute("/fields")({
  head: () => ({
    meta: [
      { title: "Tested Fields Map — Biogenic Soil Sense" },
      {
        name: "description",
        content:
          "Explore an interactive map of fields analyzed by Biogenic Soil Sense across Sri Lanka — filter by district, crop, date and status.",
      },
      { property: "og:title", content: "Tested Fields Map — Sri Lanka" },
      {
        property: "og:description",
        content:
          "An interactive showcase of soil analysis work across Sri Lanka — mapped fields, live filters and detail cards.",
      },
    ],
  }),
  component: FieldsPage,
});

const DISTRICTS = ["All", ...Array.from(new Set(FIELDS.map((f) => f.district))).sort()];
const CROPS = ["All", ...Array.from(new Set(FIELDS.map((f) => f.crop))).sort()];
const PROVINCES = ["All", ...Array.from(new Set(FIELDS.map((f) => f.province))).sort()];
const STATUSES = ["All", "Analyzed", "In Lab", "Scheduled"] as const;
const DATE_RANGES = ["All time", "Last 30 days", "Last 90 days", "This year"] as const;

const STAT_BANNER = [
  { icon: Sprout, value: `${FIELDS.length}+`, label: "Fields analyzed" },
  {
    icon: Globe2,
    value: `${new Set(FIELDS.map((f) => f.province)).size}`,
    label: "Provinces covered",
  },
  { icon: Calendar, value: "Dec 2025", label: "Latest analysis" },
  { icon: Clock, value: "5–7 days", label: "Avg. turnaround" },
];

const STORIES = [
  {
    title: "22% yield lift on Nuwara Eliya tea",
    body: "A precise dolomite and nutrient split plan turned an acidic, aluminium-toxic estate into the best flush in five years.",
    tag: "Nuwara Eliya · Tea",
  },
  {
    title: "Zinc program rescues Polonnaruwa paddy",
    body: "Correcting a hidden zinc deficiency lifted grain fill and added over 300 kg/ha on a 95-hectare tract.",
    tag: "Polonnaruwa · Paddy Rice",
  },
  {
    title: "Matale cinnamon stays export-grade",
    body: "Foliar calcium management kept bark quality high through an unusually wet Maha season.",
    tag: "Matale · Cinnamon",
  },
];

function daysAgo(iso: string) {
  return (Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24);
}

function healthColor(idx: number) {
  if (idx >= 80) return "var(--color-primary)";
  if (idx >= 65) return "var(--color-harvest)";
  return "var(--color-earth)";
}

function FieldsPage() {
  const [district, setDistrict] = useState<string>("All");
  const [province, setProvince] = useState<string>("All");
  const [crop, setCrop] = useState<string>("All");
  const [status, setStatus] = useState<string>("All");
  const [range, setRange] = useState<string>("All time");
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(FIELDS[0].id);
  const [panelOpen, setPanelOpen] = useState(false);

  const filtered = useMemo(() => {
    return FIELDS.filter((f) => {
      if (district !== "All" && f.district !== district) return false;
      if (province !== "All" && f.province !== province) return false;
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
  }, [district, province, crop, status, range, q]);

  const selected: Field | undefined = filtered.find((f) => f.id === selectedId) ?? filtered[0];

  const resetFilters = () => {
    setDistrict("All");
    setProvince("All");
    setCrop("All");
    setStatus("All");
    setRange("All time");
    setQ("");
  };

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-border bg-gradient-to-b from-accent/60 to-background">
        <div aria-hidden className="pointer-events-none absolute inset-0 grain-bg opacity-50" />
        <div className="container-page relative py-16 sm:py-20 lg:py-24">
          <p className="eyebrow">Tested fields</p>
          <div className="mt-3 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <h1 className="text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-[56px]">
              An interactive map of every field we've analyzed.
            </h1>
            <p className="text-lg text-muted-foreground">
              Filter by district, crop, date or status. Select a field to see the soil summary,
              health index and a preview of the recommendations we delivered.
            </p>
          </div>
        </div>
      </section>

      {/* MAP + PANELS */}
      <section className="section-y">
        <div className="container-page">
          <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)_340px]">
            {/* FILTER PANEL */}
            <aside className="card-surface flex h-fit flex-col gap-5 p-5 lg:sticky lg:top-24">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-primary-dark">
                  <Filter className="h-4 w-4" />
                </span>
                <h2 className="text-base font-semibold">Filters</h2>
              </div>

              <fieldset className="flex flex-col gap-4">
                <legend className="sr-only">Field filters</legend>

                <div>
                  <label
                    htmlFor="field-search"
                    className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                  >
                    Search field
                  </label>
                  <div className="mt-2 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 transition focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/30">
                    <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <input
                      id="field-search"
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Field name…"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                    {q && (
                      <button
                        type="button"
                        onClick={() => setQ("")}
                        aria-label="Clear search"
                        className="text-muted-foreground transition hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                <FilterSelect
                  id="filter-district"
                  label="District"
                  value={district}
                  onChange={setDistrict}
                  options={DISTRICTS}
                />
                <FilterSelect
                  id="filter-province"
                  label="Province"
                  value={province}
                  onChange={setProvince}
                  options={PROVINCES}
                />
                <FilterSelect
                  id="filter-crop"
                  label="Crop type"
                  value={crop}
                  onChange={setCrop}
                  options={CROPS}
                />
                <FilterChips
                  label="Status"
                  value={status}
                  onChange={setStatus}
                  options={[...STATUSES]}
                />
                <FilterSelect
                  id="filter-date"
                  label="Analysis date"
                  value={range}
                  onChange={setRange}
                  options={[...DATE_RANGES]}
                />
              </fieldset>

              <div className="flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                <span>
                  <b className="text-foreground">{filtered.length}</b> of {FIELDS.length} fields
                </span>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="font-semibold text-primary transition hover:underline"
                >
                  Reset
                </button>
              </div>
            </aside>

            {/* MAP + RESULTS LIST */}
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
                  <span className="h-3 w-3 rounded-full bg-primary ring-2 ring-primary/20" />{" "}
                  Analyzed
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[color:var(--color-harvest)] ring-2 ring-[color:var(--color-harvest)]/20" />{" "}
                  In lab
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[color:var(--color-earth)] ring-2 ring-[color:var(--color-earth)]/20" />{" "}
                  Scheduled
                </span>
                <span className="ml-auto">Click a marker for details</span>
              </div>

              {/* RESULTS TABLE — GIS style */}
              {filtered.length > 0 && (
                <div className="card-surface overflow-hidden">
                  <div className="border-b border-border px-5 py-3">
                    <h3 className="text-sm font-semibold">Field results</h3>
                  </div>
                  <div className="max-h-[320px] overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-muted/80 text-left text-xs uppercase tracking-widest text-muted-foreground backdrop-blur">
                        <tr>
                          <th className="px-5 py-2.5 font-semibold">Field</th>
                          <th className="hidden px-3 py-2.5 font-semibold sm:table-cell">Crop</th>
                          <th className="hidden px-3 py-2.5 font-semibold sm:table-cell">Status</th>
                          <th className="px-3 py-2.5 text-right font-semibold">Health</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filtered.map((f) => (
                          <tr
                            key={f.id}
                            onClick={() => {
                              setSelectedId(f.id);
                              setPanelOpen(true);
                            }}
                            className={`cursor-pointer transition hover:bg-accent/50 ${
                              selected?.id === f.id ? "bg-accent/70" : ""
                            }`}
                          >
                            <td className="px-5 py-3">
                              <p className="font-semibold text-foreground">{f.name}</p>
                              <p className="text-xs text-muted-foreground">{f.district}</p>
                            </td>
                            <td className="hidden px-3 py-3 text-muted-foreground sm:table-cell">
                              {f.crop}
                            </td>
                            <td className="hidden px-3 py-3 sm:table-cell">
                              <StatusBadge status={f.status} />
                            </td>
                            <td className="px-3 py-3 text-right">
                              {f.healthIndex > 0 ? (
                                <span
                                  className="font-bold"
                                  style={{ color: healthColor(f.healthIndex) }}
                                >
                                  {f.healthIndex}
                                </span>
                              ) : (
                                <span className="text-xs text-muted-foreground">—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* FIELD INFO CARD */}
            <aside className="card-surface flex h-fit flex-col gap-4 p-6 lg:sticky lg:top-24">
              {selected ? (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="eyebrow">Selected field</p>
                      <h3 className="mt-1 text-xl font-semibold">{selected.name}</h3>
                    </div>
                    <StatusBadge status={selected.status} />
                  </div>

                  <ul className="grid grid-cols-2 gap-3 text-sm">
                    <InfoItem icon={MapPin} label="District" value={selected.district} />
                    <InfoItem icon={Globe2} label="Province" value={selected.province} />
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
                    <InfoItem
                      icon={AlertCircle}
                      label="Limiting factor"
                      value={selected.limitingFactor}
                    />
                  </ul>

                  {selected.healthIndex > 0 && (
                    <div className="rounded-xl border border-border bg-background/60 p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          Soil health index
                        </p>
                        <span
                          className="text-sm font-bold"
                          style={{ color: healthColor(selected.healthIndex) }}
                        >
                          {selected.healthIndex}/100
                        </span>
                      </div>
                      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${selected.healthIndex}%`,
                            backgroundColor: healthColor(selected.healthIndex),
                          }}
                        />
                      </div>
                    </div>
                  )}

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
                    className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-card"
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
          <div className="relative overflow-hidden rounded-3xl bg-[color:var(--color-primary-dark)] p-6 text-white sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 topo-pattern text-white opacity-40"
            />
            <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STAT_BANNER.map((s) => (
                <div key={s.label} className="flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-2xl font-bold">{s.value}</p>
                    <p className="text-sm text-white/85">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className="section-y">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <p className="eyebrow">Success stories</p>
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Real fields, real results.</h2>
              </div>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {STORIES.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <article className="card-surface card-surface-hover flex h-full flex-col gap-3 p-7">
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
              </Reveal>
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
                {selected.district} · {selected.crop}
              </p>
            </div>
            <button
              aria-label="Close detail panel"
              onClick={() => setPanelOpen(false)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border"
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
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
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
    <div role="group" aria-label={label}>
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o;
          return (
            <button
              key={o}
              type="button"
              aria-pressed={active}
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
