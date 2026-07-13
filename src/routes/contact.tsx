import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import { CTASection } from "../components/site/CTASection";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Biogenic Soil Sense" },
      {
        name: "description",
        content:
          "Request a soil analysis or talk to our agronomy team. We respond within one business day.",
      },
      { property: "og:title", content: "Contact Biogenic Soil Sense" },
      {
        property: "og:description",
        content:
          "Get in touch to schedule a sampling visit or discuss a precision-agriculture project.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="border-b border-border bg-gradient-to-b from-accent/60 to-background">
        <div className="container-page py-16 sm:py-20 lg:py-24">
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
          <div className="card-surface p-7 sm:p-10">
            {submitted ? (
              <div className="flex flex-col items-start gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <CheckCircle2 className="h-6 w-6" />
                </span>
                <h2 className="text-2xl font-semibold">Thanks — request received.</h2>
                <p className="text-muted-foreground">
                  We'll be in touch within one business day to confirm your sampling visit.
                </p>
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
                    <input required className={inputCls} placeholder="Jane Farmer" />
                  </Field>
                  <Field label="Email" required>
                    <input required type="email" className={inputCls} placeholder="jane@farm.co" />
                  </Field>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Farm / Organization">
                    <input className={inputCls} placeholder="Green Valley Farm" />
                  </Field>
                  <Field label="Farm size (ha)">
                    <input type="number" min={0} className={inputCls} placeholder="50" />
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
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-card transition hover:-translate-y-0.5"
                >
                  <Send className="h-4 w-4" /> Send request
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-4">
            {[
              { icon: Mail, title: "Email", value: "hello@biogenicsoil.com" },
              { icon: Phone, title: "Phone", value: "+254 700 000 000" },
              { icon: MapPin, title: "Office", value: "Research Park, Nairobi" },
            ].map((c) => (
              <div key={c.title} className="card-surface flex items-start gap-4 p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <c.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {c.title}
                  </p>
                  <p className="mt-1 text-base font-semibold">{c.value}</p>
                </div>
              </div>
            ))}
            <div className="card-surface p-6">
              <p className="text-sm font-semibold">Hours</p>
              <p className="mt-1 text-sm text-muted-foreground">Mon–Fri · 8:00–17:00 EAT</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Prefer to see our work first?"
        description="Browse the interactive map of fields we've analyzed across the region."
        primary={{ to: "/fields", label: "Explore Tested Fields" }}
      />
    </>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] outline-none transition placeholder:text-muted-foreground focus:border-primary/60";

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
