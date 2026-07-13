import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function CTASection({
  eyebrow = "Get started",
  title,
  description,
  primary = { to: "/contact", label: "Request Soil Analysis" },
  secondary,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  primary?: { to: string; label: string };
  secondary?: { to: string; label: string };
}) {
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-[color:var(--color-primary-dark)] px-8 py-14 text-white sm:px-14 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 topo-pattern text-white opacity-60"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[color:var(--color-primary-light)]/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[color:var(--color-harvest)]/20 blur-3xl"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_auto] lg:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow text-[color:var(--color-primary-light)]">{eyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-[42px]">
                {title}
              </h2>
              <p className="mt-4 text-base text-white/85 sm:text-lg">{description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to={primary.to}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-[color:var(--color-primary-dark)] shadow-card transition hover:-translate-y-0.5 hover:shadow-elevated"
              >
                {primary.label} <ArrowRight className="h-4 w-4" />
              </Link>
              {secondary && (
                <Link
                  to={secondary.to}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 hover:-translate-y-0.5"
                >
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
