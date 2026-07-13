import { Mail, MapPin, Phone } from "lucide-react";

export const CONTACT_INFO = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@biogenicsoil.lk",
    href: "mailto:hello@biogenicsoil.lk",
  },
  { icon: Phone, title: "Phone", value: "+94 11 234 5678", href: "tel:+94112345678" },
  {
    icon: MapPin,
    title: "Office",
    value: "AgriTech Park, Peradeniya",
    href: undefined as string | undefined,
  },
] as const;

export function ContactInfoCards({ variant = "light" }: { variant?: "light" | "dark" }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {CONTACT_INFO.map((c) => {
        const inner = (
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <c.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {c.title}
              </p>
              <p className="mt-1 text-base font-semibold">{c.value}</p>
            </div>
          </div>
        );
        return (
          <div
            key={c.title}
            className={
              variant === "dark"
                ? "rounded-2xl border border-white/10 bg-white/5 p-6"
                : "card-surface flex items-start gap-4 p-6"
            }
          >
            {c.href ? (
              <a href={c.href} className="block">
                {inner}
              </a>
            ) : (
              inner
            )}
          </div>
        );
      })}
    </div>
  );
}
