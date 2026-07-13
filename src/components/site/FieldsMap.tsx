import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import type { LatLngExpression, LatLngTuple } from "leaflet";
import { MapPin } from "lucide-react";

export type Field = {
  id: string;
  name: string;
  county: string;
  crop: string;
  status: "Analyzed" | "In Lab" | "Scheduled";
  date: string; // ISO
  areaHa: number;
  coords: LatLngTuple;
  soilSummary: string;
  recommendation: string;
};

export const FIELDS: Field[] = [
  {
    id: "f1",
    name: "Kianjege Estate",
    county: "Nyeri",
    crop: "Coffee",
    status: "Analyzed",
    date: "2025-11-04",
    areaHa: 42,
    coords: [-0.4201, 36.9476],
    soilSummary: "Andosol, pH 5.8, high organic carbon, low available phosphorus.",
    recommendation: "Apply 60 kg P₂O₅/ha via DAP; lime 1.2 t/ha to raise pH.",
  },
  {
    id: "f2",
    name: "Rift Grain Cooperative",
    county: "Nakuru",
    crop: "Maize",
    status: "Analyzed",
    date: "2025-10-22",
    areaHa: 118,
    coords: [-0.3031, 36.08],
    soilSummary: "Vertisol, pH 6.4, adequate K, borderline N.",
    recommendation: "Split N: 80 kg/ha at planting + 60 kg/ha topdress.",
  },
  {
    id: "f3",
    name: "Uasin Highlands Farm",
    county: "Uasin Gishu",
    crop: "Wheat",
    status: "In Lab",
    date: "2025-12-01",
    areaHa: 210,
    coords: [0.5143, 35.2698],
    soilSummary: "Ferralsol, pH 5.4, low CEC, moderate SOM.",
    recommendation: "Awaiting micronutrient panel; expect Zn deficit.",
  },
  {
    id: "f4",
    name: "Meru Green Terraces",
    county: "Meru",
    crop: "Avocado",
    status: "Analyzed",
    date: "2025-09-18",
    areaHa: 34,
    coords: [0.0463, 37.6559],
    soilSummary: "Nitisol, pH 6.1, high SOM, adequate P and K.",
    recommendation: "Maintain mulch cover; foliar B every 6 weeks.",
  },
  {
    id: "f5",
    name: "Kericho Ridge Estate",
    county: "Kericho",
    crop: "Tea",
    status: "Analyzed",
    date: "2025-11-28",
    areaHa: 76,
    coords: [-0.3689, 35.2831],
    soilSummary: "Humic Nitisol, pH 4.9, high Al saturation.",
    recommendation: "Micro-dose lime 0.8 t/ha; sulphate-based NPK.",
  },
  {
    id: "f6",
    name: "Trans-Nzoia Homestead",
    county: "Trans Nzoia",
    crop: "Maize",
    status: "Scheduled",
    date: "2025-12-14",
    areaHa: 55,
    coords: [1.0157, 34.9906],
    soilSummary: "Sampling scheduled; historical data suggests acidic tendency.",
    recommendation: "Full panel + micronutrients recommended.",
  },
  {
    id: "f7",
    name: "Naivasha Horticulture",
    county: "Nakuru",
    crop: "Vegetables",
    status: "Analyzed",
    date: "2025-10-05",
    areaHa: 22,
    coords: [-0.7167, 36.4333],
    soilSummary: "Andosol, pH 6.8, high EC in irrigated blocks.",
    recommendation: "Reduce fertigation EC; monitor Na build-up monthly.",
  },
  {
    id: "f8",
    name: "Bomet Dairy Pastures",
    county: "Bomet",
    crop: "Pasture",
    status: "Analyzed",
    date: "2025-11-11",
    areaHa: 140,
    coords: [-0.7833, 35.35],
    soilSummary: "Nitisol, pH 5.7, low S, adequate Ca.",
    recommendation: "Introduce ammonium sulphate; rotational grazing.",
  },
];

const STATUS_COLOR: Record<Field["status"], string> = {
  Analyzed: "#2E7D32",
  "In Lab": "#D4A017",
  Scheduled: "#7A5C3E",
};

function FitBounds({ points }: { points: LatLngTuple[] }) {
  const map = useMap();
  useEffect(() => {
    if (!points.length) return;
    const bounds = points.reduce(
      (b, p) => {
        b[0][0] = Math.min(b[0][0], p[0]);
        b[0][1] = Math.min(b[0][1], p[1]);
        b[1][0] = Math.max(b[1][0], p[0]);
        b[1][1] = Math.max(b[1][1], p[1]);
        return b;
      },
      [
        [points[0][0], points[0][1]],
        [points[0][0], points[0][1]],
      ] as [[number, number], [number, number]],
    );
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map, points]);
  return null;
}

export function FieldsMap({
  fields,
  activeId,
  onSelect,
  height = 560,
}: {
  fields: Field[];
  activeId?: string | null;
  onSelect?: (f: Field) => void;
  height?: number;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const center = useMemo<LatLngExpression>(() => [-0.2, 36.5], []);
  const points = useMemo<LatLngTuple[]>(() => fields.map((f) => f.coords), [fields]);

  if (!mounted) {
    return (
      <div
        style={{ height }}
        className="grid place-items-center rounded-2xl border border-border bg-muted text-sm text-muted-foreground"
      >
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" /> Loading map…
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border shadow-card">
      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom={false}
        style={{ height, width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds points={points} />
        {fields.map((f) => {
          const isActive = activeId === f.id;
          return (
            <CircleMarker
              key={f.id}
              center={f.coords}
              radius={isActive ? 13 : 9}
              pathOptions={{
                color: "#ffffff",
                weight: 2,
                fillColor: STATUS_COLOR[f.status],
                fillOpacity: isActive ? 1 : 0.85,
              }}
              eventHandlers={{
                click: () => onSelect?.(f),
              }}
            >
              <Popup>
                <div className="min-w-[180px]">
                  <div className="text-[13px] font-semibold text-[color:var(--color-primary-dark)]">
                    {f.name}
                  </div>
                  <div className="mt-0.5 text-xs text-[color:var(--color-muted-foreground)]">
                    {f.county} · {f.crop}
                  </div>
                  <div className="mt-2 text-xs">
                    <span
                      className="inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold"
                      style={{
                        background: `${STATUS_COLOR[f.status]}1a`,
                        color: STATUS_COLOR[f.status],
                      }}
                    >
                      {f.status}
                    </span>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
