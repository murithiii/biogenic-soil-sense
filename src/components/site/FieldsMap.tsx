import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, useMap } from "react-leaflet";
import type { LatLngExpression, LatLngTuple } from "leaflet";
import { MapPin } from "lucide-react";

export type Field = {
  id: string;
  name: string;
  district: string;
  province: string;
  crop: string;
  status: "Analyzed" | "In Lab" | "Scheduled";
  date: string; // ISO
  areaHa: number;
  coords: LatLngTuple;
  soilSummary: string;
  recommendation: string;
  /** 0–100 soil-health index derived from lab panel */
  healthIndex: number;
  /** Key limiting factor from the soil panel */
  limitingFactor: string;
};

export const FIELDS: Field[] = [
  {
    id: "f1",
    name: "Nuwara Eliya Tea Estate",
    district: "Nuwara Eliya",
    province: "Central",
    crop: "Tea",
    status: "Analyzed",
    date: "2025-11-04",
    areaHa: 48,
    coords: [6.9497, 80.7891],
    soilSummary: "Red-yellow Podzol, pH 4.6, high Al saturation, moderate organic carbon.",
    recommendation: "Micro-dose dolomite 1.0 t/ha; sulphate-based NPK; mulch cover.",
    healthIndex: 72,
    limitingFactor: "Aluminium toxicity",
  },
  {
    id: "f2",
    name: "Polonnaruwa Paddy Tract",
    district: "Polonnaruwa",
    province: "North Central",
    crop: "Paddy Rice",
    status: "Analyzed",
    date: "2025-10-22",
    areaHa: 95,
    coords: [7.9403, 81.0188],
    soilSummary: "Low-humic Gley, pH 5.9, adequate K, borderline N, low Zn.",
    recommendation: "Split N: 70 kg/ha basal + 50 kg/ha topdress; ZnSO₄ 20 kg/ha.",
    healthIndex: 68,
    limitingFactor: "Zinc deficiency",
  },
  {
    id: "f3",
    name: "Kurunegala Coconut Plantation",
    district: "Kurunegala",
    province: "North Western",
    crop: "Coconut",
    status: "In Lab",
    date: "2025-12-01",
    areaHa: 62,
    coords: [7.4867, 80.3659],
    soilSummary: "Reddish Brown Earth, pH 6.2, moderate CEC, low available P.",
    recommendation: "Awaiting micronutrient panel; expect B and Mg deficit.",
    healthIndex: 0,
    limitingFactor: "Pending lab results",
  },
  {
    id: "f4",
    name: "Matale Spice Gardens",
    district: "Matale",
    province: "Central",
    crop: "Cinnamon & Spices",
    status: "Analyzed",
    date: "2025-09-18",
    areaHa: 18,
    coords: [7.4675, 80.6234],
    soilSummary: "Reddish Latosol, pH 5.5, high SOM, adequate P and K.",
    recommendation: "Maintain organic mulch; foliar Ca every 8 weeks for bark quality.",
    healthIndex: 84,
    limitingFactor: "Calcium availability",
  },
  {
    id: "f5",
    name: "Kandy Highland Vegetable Farm",
    district: "Kandy",
    province: "Central",
    crop: "Vegetables",
    status: "Analyzed",
    date: "2025-11-28",
    areaHa: 12,
    coords: [7.2906, 80.6337],
    soilSummary: "Red-yellow Podzol, pH 5.2, low pH, high leaching risk.",
    recommendation: "Lime 1.5 t/ha to raise pH; split N application; add organic matter.",
    healthIndex: 61,
    limitingFactor: "Soil acidity",
  },
  {
    id: "f6",
    name: "Anuradhapura Paddy Scheme",
    district: "Anuradhapura",
    province: "North Central",
    crop: "Paddy Rice",
    status: "Scheduled",
    date: "2025-12-14",
    areaHa: 140,
    coords: [8.3114, 80.4037],
    soilSummary: "Sampling scheduled; historical data suggests low pH tendency.",
    recommendation: "Full panel + micronutrients recommended before Maha season.",
    healthIndex: 0,
    limitingFactor: "Not yet sampled",
  },
  {
    id: "f7",
    name: "Galle Rubber Estate",
    district: "Galle",
    province: "Southern",
    crop: "Rubber",
    status: "Analyzed",
    date: "2025-10-05",
    areaHa: 55,
    coords: [6.0535, 80.221],
    soilSummary: "Red-yellow Podzol, pH 4.8, high rainfall leaching, low Mg.",
    recommendation: "Apply MgSO₄ 80 kg/ha; dolomite 0.8 t/ha; cover-crop with Pueraria.",
    healthIndex: 70,
    limitingFactor: "Magnesium deficiency",
  },
  {
    id: "f8",
    name: "Jaffna Vegetable Fields",
    district: "Jaffna",
    province: "Northern",
    crop: "Vegetables",
    status: "Analyzed",
    date: "2025-11-11",
    areaHa: 28,
    coords: [9.6615, 80.0255],
    soilSummary: "Calcic Red-Yellow Latosol, pH 7.2, high Ca, low Fe and Zn.",
    recommendation: "Foliar Fe + Zn chelate; avoid over-liming; drip-fertigate N.",
    healthIndex: 76,
    limitingFactor: "Iron chlorosis",
  },
  {
    id: "f9",
    name: "Badulla Fruit Orchards",
    district: "Badulla",
    province: "Uva",
    crop: "Fruits (Banana & Mango)",
    status: "Analyzed",
    date: "2025-11-20",
    areaHa: 34,
    coords: [6.9934, 81.055],
    soilSummary: "Reddish Brown Earth, pH 6.0, adequate P, moderate K, low organic carbon.",
    recommendation: "Apply 10 t/ha compost; K₂O 80 kg/ha; intercrop with legumes.",
    healthIndex: 79,
    limitingFactor: "Low organic carbon",
  },
  {
    id: "f10",
    name: "Ratnapura Tea Smallholdings",
    district: "Ratnapura",
    province: "Sabaragamuwa",
    crop: "Tea",
    status: "In Lab",
    date: "2025-12-05",
    areaHa: 22,
    coords: [6.6824, 80.3992],
    soilSummary: "Humic Podzol, pH 4.5, high organic matter, awaiting micronutrient panel.",
    recommendation: "Awaiting Cu and Zn results; lime programme pending.",
    healthIndex: 0,
    limitingFactor: "Pending lab results",
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
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map, points]);
  return null;
}

export function FieldsMap({
  fields,
  activeId,
  onSelect,
  height = 560,
  compact = false,
}: {
  fields: Field[];
  activeId?: string | null;
  onSelect?: (f: Field) => void;
  height?: number;
  compact?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const center = useMemo<LatLngExpression>(() => [7.8731, 80.7718], []);
  const points = useMemo<LatLngTuple[]>(() => fields.map((f) => f.coords), [fields]);

  if (!mounted) {
    return (
      <div
        style={{ height }}
        className="grid place-items-center rounded-2xl border border-border bg-muted"
        role="status"
        aria-label="Loading interactive map"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-pulse rounded-full border-2 border-primary/20 border-t-primary" />
          <span className="text-sm text-muted-foreground">Loading map…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border shadow-card">
      <MapContainer
        center={center}
        zoom={8}
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
              radius={isActive ? 14 : 9}
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
                <div className="min-w-[200px]">
                  <div className="text-[13px] font-semibold text-[color:var(--color-primary-dark)]">
                    {f.name}
                  </div>
                  <div className="mt-0.5 text-xs text-[color:var(--color-muted-foreground)]">
                    {f.district} · {f.province} · {f.crop}
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <span
                      className="inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold"
                      style={{
                        background: `${STATUS_COLOR[f.status]}1a`,
                        color: STATUS_COLOR[f.status],
                      }}
                    >
                      {f.status}
                    </span>
                    {f.healthIndex > 0 && (
                      <span className="text-[color:var(--color-muted-foreground)]">
                        Health index: {f.healthIndex}
                      </span>
                    )}
                  </div>
                </div>
              </Popup>
              {!compact && (
                <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                  <span className="font-semibold">{f.name}</span>
                </Tooltip>
              )}
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
