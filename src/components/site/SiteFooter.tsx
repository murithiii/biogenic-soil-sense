import { Link } from "@tanstack/react-router";
import { Leaf, Mail, MapPin, Phone, Linkedin, Twitter, Facebook } from "lucide-react";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border bg-[color:var(--color-primary-dark)] text-white/90">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white">
              <Leaf className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-base font-bold text-white">Biogenic Soil Sense</span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/70">
            Scientific soil analysis, land profiling and GIS mapping for farmers who want to grow
            more with less waste.
          </p>
          <div className="mt-2 flex gap-2">
            {[Linkedin, Twitter, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol
          title="Explore"
          links={[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/fields", label: "Tested Fields" },
            { to: "/contact", label: "Contact" },
          ]}
        />
        <FooterCol
          title="Services"
          links={[
            { to: "/", label: "Soil Analysis" },
            { to: "/", label: "Land Profiling" },
            { to: "/", label: "Nutrient Recommendations" },
            { to: "/", label: "Precision Agriculture" },
          ]}
        />

        <div className="flex flex-col gap-3 text-sm">
          <h4 className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/60">
            Contact
          </h4>
          <a href="mailto:hello@biogenicsoil.com" className="flex items-start gap-2.5 text-white/80 hover:text-white">
            <Mail className="mt-0.5 h-4 w-4 shrink-0" />
            hello@biogenicsoil.com
          </a>
          <a href="tel:+254700000000" className="flex items-start gap-2.5 text-white/80 hover:text-white">
            <Phone className="mt-0.5 h-4 w-4 shrink-0" />
            +254 700 000 000
          </a>
          <p className="flex items-start gap-2.5 text-white/80">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            Research Park, Nairobi
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-start justify-between gap-3 py-6 text-xs text-white/60 sm:flex-row sm:items-center">
          <p>© {year} Biogenic Soil Sense. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/60">
        {title}
      </h4>
      <ul className="flex flex-col gap-2.5 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-white/80 transition hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
