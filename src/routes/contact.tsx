import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, CircleCheck as CheckCircle2 } from "lucide-react";
import { CTASection } from "../components/site/CTASection";
import { CONTACT_INFO } from "../components/site/ContactInfo";
import { Reveal } from "../components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Biogenic Soil Sense" },
      {
        name: "description",
        content:
          "Request a soil analysis or talk to our agronomy team. We respond within one business day — serving farmers across Sri Lanka.",
      },
      { property: "og:title", content: "Contact Biogenic Soil Sense" },
      {
        property: "og:description",
        content:
          "Get in touch to schedule a sampling visit or discuss a precision-agriculture project in Sri Lanka.",
      },
    ],
  }),
  component: Contact,
});

const SRI_LANKAN_PROVINCES = [
  "Central",
  "Southern",
  "Northern",
  "North Central",
  "North Western",
  "Eastern",
  "Uva",
  "Sabaragamuwa",
  "Western",
];

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-border bg-gradient-to-b from-accent/60 to-background">
        <div aria-hidden className="pointer-events-none absolute inset-0 grain-bg opacity-50" />
        <div className="container-page relative py-16 sm:py-20 lg:py-24">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-[56px]">
            Let's talk about your soil.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Tell us about your farm. We'll get back within one business day with next steps and a
            sampling plan.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* FORM */}
          <Reveal>
            <div className="card-surface p-7 sm:p-10">
              {submitted ? (
                <div className="flex flex-col items-start gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground shadow-card">
                    <CheckCircle2 className="h-6 w-6" />
                  </span>
                  <h2 className="text-2xl font-semibold">Thanks — request received.</h2>
                  <p className="text-muted-foreground">
                    We'll be in touch within one business day to confirm your sampling visit.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-sm font-semibold text-primary transition hover:underline"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form
                  className="grid gap-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" required>
                      <input required className={inputCls} placeholder="Saman Bandara" />
                    </Field>
                    <Field label="Email" required>
                      <input
                        required
                        type="email"
                        className={inputCls}
                        placeholder="saman@farm.lk"
                      />
                    </Field>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Farm / Organization">
                      <input className={inputCls} placeholder="Hill View Tea Estate" />
                    </Field>
                    <Field label="Farm size (ha)">
                      <input type="number" min={0} className={inputCls} placeholder="50" />
                    </Field>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Province">
                      <select className={inputCls} defaultValue="">
                        <option value="" disabled>
                          Select province…
                        </option>
                        {SRI_LANKAN_PROVINCES.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Primary crop">
                      <input className={inputCls} placeholder="Tea, paddy, coconut…" />
                    </Field>
                  </div>
                  <Field label="What would you like to know about your soil?" required>
                    <textarea
                      required
                      rows={5}
                      className={`${inputCls} resize-y`}
                      placeholder="Crops, current concerns, timing…"
                    />
                  </Field>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-card transition hover:-translate-y-0.5 hover:shadow-elevated"
                  >
                    <Send className="h-4 w-4" /> Send request
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* CONTACT INFO */}
          <div className="flex flex-col gap-4">
            {CONTACT_INFO.map((c) => (
              <div key={c.title} className="card-surface card-surface-hover p-6">
                {c.href ? (
                  <a href={c.href} className="block">
                    <ContactRow icon={c.icon} title={c.title} value={c.value} />
                  </a>
                ) : (
                  <ContactRow icon={c.icon} title={c.title} value={c.value} />
                )}
              </div>
            ))}
            <div className="card-surface p-6">
              <p className="text-sm font-semibold">Hours</p>
              <p className="mt-1 text-sm text-muted-foreground">Mon–Fri · 8:30–17:00 IST</p>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-[color:var(--color-primary-dark)] p-6 text-white">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 topo-pattern text-white opacity-40"
              />
              <div className="relative">
                <p className="text-sm font-semibold">Response time</p>
                <p className="mt-1 text-2xl font-bold">1 business day</p>
                <p className="mt-2 text-sm text-white/80">
                  We respond to every inquiry with a tailored sampling plan and cost estimate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Explore our work"
        title="Prefer to see our work first?"
        description="Browse the interactive map of fields we've analyzed across Sri Lanka."
        primary={{ to: "/fields", label: "Explore Tested Fields" }}
      />
    </>
  );
}

function ContactRow({
  icon: Icon,
  title,
  value,
}: {
  icon: typeof Send;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-card">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
        <p className="mt-1 text-base font-semibold">{value}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-foreground">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      {children}
    </label>
  );
}
