"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sun,
  Zap,
  MapPin,
  Settings,
  Wrench,
  BarChart3,
  Search,
  Layers,
  Building2,
  Monitor,
  ClipboardList,
  Calendar,
  TrendingUp,
  ShieldCheck,
  RotateCcw,
  Users,
  Check,
  ChevronRight,
  ArrowRight,
  Microscope,
  Eye,
  FileCheck,
  Radio,
  Cpu,
  Sparkles,
  ChevronsLeft,
} from "lucide-react";

// ==========================================
// 1. DATA & CONSTANTS
// ==========================================

function TransmissionTowerIcon({ className = "w-6 h-6 text-[#3AB257]" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 2h10l2 6H5l2-6z" />
      <path d="M5 8l-2 14h18L19 8" />
      <path d="M6 14h12" />
      <path d="M12 2v20" />
      <path d="M7 8l5 6-5 8" />
      <path d="M17 8l-5 6 5 8" />
    </svg>
  );
}

const statsData = [
  {
    icon: Sun,
    value: "432.9 MW",
    label: "AC Operational Capacity",
  },
  {
    icon: Zap,
    value: "553.5 MW",
    label: "DC Operational Capacity",
  },
  {
    icon: MapPin,
    value: "24",
    label: "Operational Sites",
  },
  {
    icon: TransmissionTowerIcon,
    value: "4 × 110/33 kV",
    label: "PSS",
  },
  {
    icon: Settings,
    value: "450 MW",
    label: "Equipment Testing & Health Assessment",
  },
];

const omPortfolioServices = [
  {
    icon: Wrench,
    label: "Preventive and corrective maintenance",
  },
  {
    icon: Zap,
    label: "Electrical equipment inspection and maintenance",
  },
  {
    icon: BarChart3,
    label: "Plant performance monitoring and analysis",
  },
  {
    icon: Search,
    label: "Breakdown analysis and troubleshooting",
  },
  {
    icon: Layers,
    label: "Inverter and transformer maintenance",
  },
  {
    icon: Radio,
    label: "HT/LT system maintenance",
  },
  {
    icon: Building2,
    label: "Substation and evacuation-system maintenance",
  },
  {
    icon: Monitor,
    label: "SCADA and communication-system monitoring",
  },
  {
    icon: ClipboardList,
    label: "Equipment condition assessment",
  },
  {
    icon: Calendar,
    label: "Shutdown planning and maintenance coordination",
  },
  {
    icon: TrendingUp,
    label: "Generation and performance analysis",
  },
  {
    icon: ShieldCheck,
    label: "Safety and statutory compliance management",
  },
  {
    icon: RotateCcw,
    label: "Reliability improvement and predictive maintenance",
  },
];

const siteTeamSupport = {
  col1: [
    "Daily plant operations",
    "Preventive maintenance",
    "Corrective maintenance",
    "Breakdown response",
    "Equipment inspection",
  ],
  col2: [
    "Testing and diagnostic activities",
    "Shutdown execution",
    "Grid coordination",
    "Safety implementation",
    "Technical reporting",
    "Performance monitoring",
    "Emergency response and restoration",
  ],
};

const teamCapabilities = {
  col1: [
    "Renewable energy asset management",
    "Electrical engineering",
    "O&M planning and execution",
    "Performance analysis",
    "Technical troubleshooting",
  ],
  col2: [
    "Reliability improvement",
    "Customer coordination",
    "OEM and vendor coordination",
    "Project management",
    "Technical documentation and reporting",
  ],
};

const faultProcessSteps = [
  { icon: Search, label: "Fault Identification" },
  { icon: Microscope, label: "Diagnosis" },
  { icon: Eye, label: "Root Cause Analysis" },
  { icon: Wrench, label: "Rectification" },
  { icon: FileCheck, label: "Testing" },
  { icon: RotateCcw, label: "Restoration" },
  { icon: ShieldCheck, label: "Performance Verification" },
];

const electricalEquipmentPills = [
  "Power transformers",
  "HT/LT panels",
  "ACBs",
  "MCCBs",
  "VCBs",
  "Protection relays",
  "CTs",
  "PTs",
  "Switchgear",
  "Power and control cables",
  "Earthing systems",
  "Control circuits",
  "Auxiliary systems",
  "Substation equipment",
  "PSS equipment",
];

const testingApproachSteps = [
  { icon: Search, label: "Scope Identification" },
  { icon: Calendar, label: "Testing Plan & Coordination" },
  { icon: Zap, label: "Execution (In-House / Third-Party)" },
  { icon: ClipboardList, label: "Report & Analysis" },
  { icon: ShieldCheck, label: "Recommendations & Closure" },
];

// Operational sites pins across Tamil Nadu
const tamilNaduPins = [
  { top: "18%", left: "78%", name: "Tiruvallur" },
  { top: "24%", left: "75%", name: "Kanchipuram" },
  { top: "28%", left: "68%", name: "Vellore" },
  { top: "33%", left: "62%", name: "Tiruvannamalai" },
  { top: "37%", left: "71%", name: "Viluppuram" },
  { top: "42%", left: "58%", name: "Kallakurichi" },
  { top: "40%", left: "42%", name: "Salem" },
  { top: "44%", left: "78%", name: "Cuddalore" },
  { top: "49%", left: "32%", name: "Erode" },
  { top: "53%", left: "22%", name: "Coimbatore" },
  { top: "52%", left: "46%", name: "Karur" },
  { top: "54%", left: "57%", name: "Tiruchirappalli" },
  { top: "55%", left: "74%", name: "Thanjavur" },
  { top: "56%", left: "84%", name: "Nagapattinam" },
  { top: "62%", left: "38%", name: "Dindigul" },
  { top: "64%", left: "62%", name: "Pudukkottai" },
  { top: "69%", left: "45%", name: "Madurai" },
  { top: "68%", left: "30%", name: "Theni" },
  { top: "72%", left: "60%", name: "Sivaganga" },
  { top: "76%", left: "46%", name: "Virudhunagar" },
  { top: "78%", left: "69%", name: "Ramanathapuram" },
  { top: "83%", left: "38%", name: "Tenkasi" },
  { top: "85%", left: "52%", name: "Thoothukudi" },
  { top: "89%", left: "44%", name: "Tirunelveli" },
];

// Floating quick contact drawer items
const quickMenuItems = [
  {
    image: "/images/con-call.png",
    label: "Call",
    value: "+91 70944 88909",
    type: "info",
    delay: 0,
  },
  {
    image: "/images/mail1.svg",
    label: "Email",
    value: "info@renfraenergy.com",
    type: "info",
    delay: 50,
  },
  {
    image: "/images/whatsapp1.png",
    label: "WhatsApp",
    value: "+91 70944 88909",
    type: "info",
    delay: 150,
  },
  {
    image: "/images/new-down.svg",
    label: "Download",
    link: "/news",
    type: "link",
    delay: 100,
  },
];

// ==========================================
// 2. HELPER COMPONENTS
// ==========================================

function SectionHeaderTag({ text }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="w-6 h-[2.5px] bg-[#3AB257] rounded-full" />
      <span className="text-xs font-bold uppercase tracking-wider text-[#3AB257]">
        {text}
      </span>
    </div>
  );
}

function CheckmarkItem({ text }) {
  return (
    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-snug">
      <span className="w-4 h-4 rounded-full bg-[#3AB257]/15 text-[#3AB257] flex items-center justify-center shrink-0 mt-0.5 font-bold">
        <Check className="w-3 h-3 text-[#3AB257]" strokeWidth={3} />
      </span>
      <span>{text}</span>
    </li>
  );
}

function FloatingContactDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <div className="fixed -right-2 top-2/4 -translate-y-1/2 md:-right-2 lg:-right-0 z-50">
      <div className="relative flex flex-row items-center gap-3">
        <div className="flex flex-col items-end gap-1">
          {quickMenuItems.map((item, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ease-out ${
                isOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-16 pointer-events-none"
              }`}
              style={{ transitionDelay: isOpen ? `${item.delay}ms` : "0ms" }}
            >
              {item.type === "link" ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <button className="group relative w-12 h-12 bg-white rounded-full hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center border border-slate-100">
                    <img src={item.image} alt={item.label} className="w-6 h-6" />
                  </button>
                </a>
              ) : (
                <button
                  onClick={() =>
                    setActiveMenu(activeMenu === index ? null : index)
                  }
                  className="group relative w-12 h-12 bg-white rounded-full hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center border border-slate-100"
                >
                  <img src={item.image} alt={item.label} className="w-6 h-6" />
                  <span
                    className={`absolute right-full mr-3 px-3 py-1.5 bg-slate-800 text-white text-xs rounded-lg whitespace-nowrap transition-all duration-300 ${
                      activeMenu === index
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-2 pointer-events-none"
                    }`}
                  >
                    {item.value}
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-10 h-16 lg:w-8 lg:h-24 bg-gradient-to-r from-[#329ACD] to-[#3AB257] transition-all duration-300 flex items-center justify-center z-10 shadow-lg"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <ChevronsLeft
            className={`w-6 h-6 md:w-7 md:h-7 text-white transition-transform duration-500 ease-out ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 3. MAIN PAGE COMPONENT
// ==========================================

export default function OMPage() {
  return (
    <div className="w-full bg-white text-slate-800 selection:bg-[#3AB257] selection:text-white">
      <FloatingContactDrawer />

      {/* ==========================================
          HERO SECTION + FLOATING STATS BAR
          ========================================== */}
      <section className="relative w-full bg-gradient-to-b from-[#eaf6f4] via-[#f3faf7] to-white pt-10 sm:pt-14 pb-20 sm:pb-24 overflow-hidden border-b border-slate-100">
        {/* Subtle decorative leaf branch on top left */}
        <div className="absolute top-6 -left-8 w-36 h-36 opacity-35 pointer-events-none text-[#3AB257]">
          <svg viewBox="0 0 120 120" fill="none" stroke="currentColor">
            <path
              d="M10 90 C 30 70, 70 50, 105 15"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M35 72 C 30 55, 45 42, 60 52 C 55 68, 42 75, 35 72 Z"
              fill="currentColor"
              fillOpacity="0.45"
            />
            <path
              d="M65 52 C 60 35, 78 22, 92 32 C 87 48, 73 55, 65 52 Z"
              fill="currentColor"
              fillOpacity="0.45"
            />
            <path
              d="M20 82 C 10 70, 20 58, 32 64 C 28 78, 22 82, 20 82 Z"
              fill="currentColor"
              fillOpacity="0.4"
            />
            <path
              d="M85 32 C 88 18, 102 12, 110 20 C 105 32, 94 35, 85 32 Z"
              fill="currentColor"
              fillOpacity="0.45"
            />
          </svg>
        </div>

        <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-6 z-10">
              <SectionHeaderTag text="OUR SOLUTIONS" />
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#293E52] tracking-tight leading-[1.14] mb-4">
                Powering Performance.
                <br />
                Protecting Assets.
                <br />
                Delivering Reliability.
              </h1>
              <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed max-w-xl">
                Renfra Energy delivers integrated Renewable Energy Operations &
                Maintenance (O&M), Asset Management, Inspection, Testing and
                Specialized Technical Services.
              </p>
            </div>

            {/* Right Hero Image (Solar panels & wind turbines) */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[260px] sm:h-[340px] border-4 border-white/80">
                <img
                  src="/images/sol-inner.png"
                  alt="Solar and Wind Renewable Energy Operations"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#173b42]/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Stats Bar */}
      <div className="relative -mt-12 sm:-mt-14 z-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_16px_40px_-8px_rgba(23,59,66,0.12)] border border-slate-100 px-6 py-5 sm:px-8 sm:py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 gap-y-4 sm:gap-y-0">
            {statsData.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-start gap-1.5 px-3 sm:px-5 py-2 sm:py-0 first:pl-0 last:pr-0"
                >
                  <IconComp className="w-6 h-6 text-[#3AB257]" strokeWidth={1.8} />
                  <p className="text-lg sm:text-2xl font-bold text-[#293E52] tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500 font-medium leading-snug">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ==========================================
          SECTION 2: O&M PORTFOLIO
          ========================================== */}
      <section className="w-full py-16 sm:py-20 bg-white">
        <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5">
              <SectionHeaderTag text="O&M PORTFOLIO" />
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#293E52] leading-tight mb-4">
                End-to-End Operations &<br className="hidden sm:inline" />{" "}
                Maintenance Services
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-8 max-w-md">
                We provide comprehensive Operations & Maintenance (O&M) and Asset
                Management Services for utility-scale solar assets, with a focus
                on maximizing plant availability, optimizing generation,
                maintaining equipment reliability and extending asset life.
              </p>
              <Link
                href="/operations-maintenance/services"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3AB257] to-[#329ACD] text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 hover:opacity-90"
              >
                Our capabilities <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right 4-column Service Icons Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-7">
              {omPortfolioServices.map((service, idx) => {
                const IconComp = service.icon;
                return (
                  <div
                    key={idx}
                    className="group flex flex-col items-center text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#f0f9ff] text-[#329ACD] border border-[#dff1fd] flex items-center justify-center mb-2.5 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#e0f2fe] shadow-sm">
                      <IconComp className="w-5 h-5 text-[#329ACD]" strokeWidth={1.8} />
                    </div>
                    <p className="text-[11px] sm:text-xs font-semibold text-slate-700 leading-tight max-w-[130px]">
                      {service.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 3: OPERATIONAL FOOTPRINT
          ========================================== */}
      <section className="w-full py-16 sm:py-20 bg-[#fafcfb] border-t border-slate-100 overflow-hidden">
        <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Tamil Nadu Map with 24 Markers & Solar Landscape Photo */}
            <div className="lg:col-span-6 relative">
              <div className="relative w-full h-[400px] sm:h-[460px] bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden p-4 flex items-center justify-center">
                {/* Embedded Vector Map of Tamil Nadu */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src="/images/tamil-nadu-districts.svg"
                    alt="Tamil Nadu Operational Sites Map"
                    className="max-h-full max-w-full object-contain filter contrast-105"
                  />

                  {/* 24 Site Pin Markers Overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    {tamilNaduPins.map((pin, i) => (
                      <div
                        key={i}
                        className="absolute group pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-200 hover:scale-125"
                        style={{ top: pin.top, left: pin.left }}
                        title={`${pin.name} Operational Site`}
                      >
                        <div className="w-4 h-4 rounded-full bg-[#3AB257] border-2 border-white shadow-md flex items-center justify-center">
                          <span className="w-1 h-1 rounded-full bg-white" />
                        </div>
                        {/* Hover Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 bg-slate-900 text-white text-[10px] font-medium rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30 pointer-events-none">
                          {pin.name}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom-left Photo of Solar Farm curved inset */}
                  <div className="absolute bottom-3 left-3 w-40 sm:w-48 h-24 sm:h-28 rounded-2xl overflow-hidden border-2 border-white shadow-lg">
                    <img
                      src="/images/pt4.jpg"
                      alt="Solar field"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute bottom-1.5 left-2 text-[10px] font-bold text-white tracking-wide">
                      Tamil Nadu Solar Field
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Operational Footprint Text & Support Checklist Box */}
            <div className="lg:col-span-6">
              <SectionHeaderTag text="OPERATIONAL FOOTPRINT" />
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#293E52] leading-tight mb-4">
                24 Operational Sites<br className="hidden sm:inline" /> Across
                Tamil Nadu
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Our presence across 24 operational sites enables strong local
                technical support, faster response and effective coordination
                with customers, OEMs, testing agencies and grid authorities.
              </p>

              {/* Mint Green Checklist Card */}
              <div className="bg-[#eef9f2] border border-[#c6edd3] rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-[#3AB257] text-white flex items-center justify-center shadow-sm">
                    <Users className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-[#173b42] text-sm sm:text-base">
                    Our site teams support:
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  <ul className="space-y-2.5">
                    {siteTeamSupport.col1.map((item, i) => (
                      <CheckmarkItem key={i} text={item} />
                    ))}
                  </ul>
                  <ul className="space-y-2.5">
                    {siteTeamSupport.col2.map((item, i) => (
                      <CheckmarkItem key={i} text={item} />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 4: TEAM & ORGANIZATIONAL CAPABILITY
          ========================================== */}
      <section className="w-full py-16 sm:py-20 bg-white">
        <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6">
              <SectionHeaderTag text="TEAM & ORGANIZATIONAL CAPABILITY" />
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#293E52] leading-tight mb-4">
                Our People. Your<br className="hidden sm:inline" /> Renewable
                Energy Partner.
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Our central management and technical team comprises experienced
                professionals with expertise in:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                <ul className="space-y-2.5">
                  {teamCapabilities.col1.map((item, i) => (
                    <CheckmarkItem key={i} text={item} />
                  ))}
                </ul>
                <ul className="space-y-2.5">
                  {teamCapabilities.col2.map((item, i) => (
                    <CheckmarkItem key={i} text={item} />
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Team Photo & Quote Card */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg h-56 sm:h-64 border border-slate-100">
                <img
                  src="/images/team3.png"
                  alt="Renfra Energy Team in Field"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Light Blue Quote Card */}
              <div className="bg-[#f0f9ff] border border-[#d0e8f8] rounded-2xl p-5 sm:p-6 flex items-start gap-3.5 shadow-sm">
                <span className="text-3xl sm:text-4xl font-serif text-[#329ACD] leading-none select-none shrink-0">
                  &ldquo;
                </span>
                <p className="text-xs sm:text-sm text-[#173b42] font-medium leading-relaxed italic pt-1">
                  The central team provides technical direction, planning,
                  performance monitoring, engineering support and operational
                  coordination to site-level teams.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 5: CORE O&M ACTIVITIES
          ========================================== */}
      <section className="w-full py-16 sm:py-20 bg-[#fafcfb] border-t border-slate-100">
        <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeaderTag text="CORE O&M ACTIVITIES" />
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#293E52] leading-tight mb-8">
            Maintenance That Keeps Your Assets Performing
          </h2>

          {/* 3 Core Activity Cards in a Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Preventive Maintenance */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#3AB257] text-white flex items-center justify-center shrink-0 shadow-sm">
                <ClipboardList className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#173b42] text-base mb-1.5">
                  Preventive Maintenance
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Scheduled maintenance to prevent failures and ensure optimal
                  performance.
                </p>
              </div>
            </div>

            {/* Corrective & Breakdown Maintenance */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#329ACD] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#173b42] text-base mb-1.5">
                  Corrective & Breakdown Maintenance
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Quick response and effective resolution of unplanned issues.
                </p>
              </div>
            </div>

            {/* Performance Monitoring & Analytics */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#8b5cf6] text-white flex items-center justify-center shrink-0 shadow-sm">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#173b42] text-base mb-1.5">
                  Performance Monitoring & Analytics
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Data-driven insights for better decisions and higher
                  efficiency.
                </p>
              </div>
            </div>
          </div>

          {/* Fault Resolution Flow Box */}
          <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="font-bold text-[#173b42] text-sm sm:text-base mb-7">
              Our Process for Effective Fault Resolution
            </h3>

            <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-3">
              {faultProcessSteps.map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <div key={idx} className="flex items-center gap-2 sm:gap-3">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#f0f9ff] border border-[#d0e8f8] flex items-center justify-center text-[#329ACD] shadow-sm transition-transform hover:scale-110">
                        <StepIcon className="w-5 h-5 text-[#329ACD]" strokeWidth={1.8} />
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-semibold text-slate-700 text-center w-20 leading-tight">
                        {step.label}
                      </span>
                    </div>

                    {idx < faultProcessSteps.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-slate-300 -mt-5 shrink-0 hidden sm:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 6: SPECIALIZED SERVICES & TESTING
          ========================================== */}
      <section className="w-full py-16 sm:py-20 bg-white">
        <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
            {/* Left Column: Specialized Inspection Services */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#3AB257]" />
                <h3 className="font-bold text-[#173b42] text-base sm:text-lg">
                  Specialized Inspection Services
                </h3>
              </div>

              {/* 2 Photo Cards Side by Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Drone Thermography */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-full h-32 sm:h-36 rounded-xl overflow-hidden mb-3">
                    <img
                      src="/images/pt1.jpg"
                      alt="Drone Thermography & Visual Inspection"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-bold text-sm text-[#173b42] leading-snug mb-1">
                    Drone Thermography &amp; Visual Inspection
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Early detection. Better planning. Higher uptime.
                  </p>
                </div>

                {/* IV Curve Testing */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-full h-32 sm:h-36 rounded-xl overflow-hidden mb-3">
                    <img
                      src="/images/pt2.jpg"
                      alt="IV Curve Testing"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-bold text-sm text-[#173b42] leading-snug mb-1">
                    IV Curve Testing
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Accurate performance assessment for maximum output.
                  </p>
                </div>
              </div>

              {/* Relay & Protection Testing Card */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#173b42] mb-0.5">
                    Relay &amp; Protection System Testing
                  </h4>
                  <p className="text-xs text-slate-500">
                    Ensures protection systems are reliable and ready when it
                    matters most.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Electrical Equipment Testing & Health Assessment */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#3AB257]" />
                <h3 className="font-bold text-[#173b42] text-base sm:text-lg">
                  Electrical Equipment Testing &amp; Health Assessment
                </h3>
              </div>

              {/* Tag Cloud / Rounded Pills */}
              <div className="bg-[#f8fafc] border border-slate-200/70 rounded-2xl p-5">
                <div className="flex flex-wrap gap-2">
                  {electricalEquipmentPills.map((pill, idx) => (
                    <span
                      key={idx}
                      className="bg-[#f0f9ff] border border-[#d0e8f8] text-[#0369a1] text-xs font-semibold px-3.5 py-1.5 rounded-full hover:bg-[#e0f2fe] transition-colors"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Micro-PCB Repair Card */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#173b42] mb-0.5">
                    Micro-PCB Repair &amp; Electronic Services
                  </h4>
                  <p className="text-xs text-slate-500">
                    Extends equipment life with expert repair and servicing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/operations-maintenance/services"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#3AB257] to-[#329ACD] px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:opacity-90"
            >
              Detailed inspection &amp; testing scope
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 7: TESTING APPROACH & EXPERIENCE SUMMARY
          ========================================== */}
      <section className="w-full py-16 sm:py-20 bg-[#fafcfb] border-t border-slate-100">
        <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Box: In-House & Third-Party Testing Flow */}
            <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#3AB257]" />
                  <h3 className="font-bold text-[#173b42] text-base sm:text-lg">
                    In-House &amp; Third-Party Testing Capability
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-8 max-w-xl">
                  Combining our in-house expertise with trusted third-party
                  services for comprehensive testing and assurance.
                </p>
              </div>

              {/* 5 Process Steps */}
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
                {testingApproachSteps.map((step, idx) => {
                  const StepIcon = step.icon;
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#f0f9ff] border border-[#d0e8f8] flex items-center justify-center text-[#329ACD] shadow-sm">
                          <StepIcon className="w-4 h-4 text-[#329ACD]" strokeWidth={1.8} />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-700 text-center w-16 sm:w-18 leading-tight">
                          {step.label}
                        </span>
                      </div>

                      {idx < testingApproachSteps.length - 1 && (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 -mt-4 shrink-0 hidden sm:block" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Box: Key Experience Summary */}
            <div className="lg:col-span-5 bg-[#eef9f2]/70 border border-[#bbf7d0] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-sm">
              {/* Decorative Leaf in Top-Right Corner */}
              <div className="absolute top-4 right-4 w-12 h-12 text-[#3AB257]/30 pointer-events-none">
                <svg viewBox="0 0 40 40" fill="currentColor">
                  <path d="M20 5 C 30 15, 35 25, 30 35 C 20 38, 10 30, 8 20 C 12 12, 16 8, 20 5 Z" />
                </svg>
              </div>

              <div>
                <h3 className="font-bold text-[#173b42] text-lg mb-6">
                  Key Experience Summary
                </h3>

                <div className="space-y-4">
                  {/* Item 1 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#c6edd3] flex items-center justify-center text-[#3AB257] shrink-0 shadow-sm">
                      <Sun className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm sm:text-base text-[#173b42] leading-tight">
                        432.9 MW AC / 553.5 MW DC
                      </p>
                      <p className="text-xs text-slate-500 font-medium">
                        Operational Portfolio
                      </p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#c6edd3] flex items-center justify-center text-[#3AB257] shrink-0 shadow-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm sm:text-base text-[#173b42] leading-tight">
                        24
                      </p>
                      <p className="text-xs text-slate-500 font-medium">
                        Operational Sites in Tamil Nadu
                      </p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#c6edd3] flex items-center justify-center text-[#3AB257] shrink-0 shadow-sm">
                      <TransmissionTowerIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm sm:text-base text-[#173b42] leading-tight">
                        4 × 110/33 kV PSS
                      </p>
                      <p className="text-xs text-slate-500 font-medium">
                        Power Substations
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom CTA Button */}
              <div className="pt-6">
                <Link
                  href="/operations-maintenance/services#portfolio"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3AB257] to-[#329ACD] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-lg transition-all duration-200 hover:scale-105 hover:opacity-90"
                >
                  Explore O&amp;M scope <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
