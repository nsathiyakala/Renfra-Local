import { Sun, Zap, MapPin, Activity, Settings } from "lucide-react";

const stats = [
  { icon: Sun,      value: "432.9 MW",      label: "AC Operational Capacity",                color: "text-emerald-500" },
  { icon: Zap,      value: "553.5 MW",      label: "DC Operational Capacity",                color: "text-[#329ACD]"  },
  { icon: MapPin,   value: "24",            label: "Operational Sites",                      color: "text-emerald-500" },
  { icon: Activity, value: "4 × 110/33 kV", label: "PSS",                                   color: "text-[#329ACD]"  },
  { icon: Settings, value: "450 MW",        label: "Equipment Testing & Health Assessment",  color: "text-emerald-500" },
];

export default function OMStatsBar() {
  return (
    <div className="relative z-20 -mt-8 max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 px-6 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-start gap-2 px-6 py-3 lg:py-0 first:pl-0 last:pr-0"
              >
                <Icon className={`w-6 h-6 ${s.color}`} strokeWidth={1.6} />
                <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-500 leading-snug">{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
