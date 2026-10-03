"use client";

import { useState, useRef } from "react";
import {
  Sun, Zap, MapPin, Settings, Wrench, BarChart3, Search, Layers,
  Building2, Monitor, ClipboardList, Calendar, TrendingUp, ShieldCheck,
  RotateCcw, Users, ChevronRight, ArrowRight, Microscope, Eye, FileCheck,
  Radio, Cpu, Activity, Gauge, FileText, Hammer, Menu, X, Star,
  CheckCircle2, Wifi, Grid, Thermometer, AlertCircle,
} from "lucide-react";

// ─────────────────────────────────────────────
// SHARED HELPERS
// ─────────────────────────────────────────────
function SectionTag({ text }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="w-6 h-[2.5px] bg-[#3AB257] rounded-full" />
      <span className="text-xs font-bold uppercase tracking-wider text-[#3AB257]">{text}</span>
    </div>
  );
}

// Numbered step card (for ordered processes / activity lists)
function NumberedCard({ number, text, accent = "#3AB257" }) {
  return (
    <div className="flex items-center gap-3 bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-[#3AB257]/30 transition-all duration-200">
      <span
        className="w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5"
        style={{ backgroundColor: accent }}
      >
        {number}
      </span>
      <p className="text-sm sm:text-base text-slate-700 leading-snug font-medium">{text}</p>
    </div>
  );
}

// Pill tag (compact, for short items)
function Pill({ text, color = "green" }) {
  const styles = {
    green:  "bg-[#eef9f2] border-[#c6edd3] text-[#173b42]",
    blue:   "bg-[#f0f9ff] border-[#d0e8f8] text-[#0369a1]",
    purple: "bg-[#f5f3ff] border-[#ddd6fe] text-[#5b21b6]",
    teal:   "bg-[#f0fdf4] border-[#bbf7d0] text-[#15803d]",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 border rounded-full px-4 py-2 text-sm sm:text-base font-semibold ${styles[color]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 shrink-0" />
      {text}
    </span>
  );
}

// Dot-accent row (for monitoring / analytics items)
function DotRow({ text, index }) {
  const colors = ["#3AB257", "#329ACD", "#8b5cf6", "#f59e0b", "#ef4444", "#14b8a6"];
  const c = colors[index % colors.length];
  return (
    <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl px-4 py-3 shadow-sm">
      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c }} />
      <span className="text-sm sm:text-base text-slate-700 font-medium">{text}</span>
    </div>
  );
}

// Icon-badge card (icon + label, horizontal)
function IconBadge({ icon: Icon, text, iconBg = "#eef9f2", iconColor = "#3AB257" }) {
  return (
    <div className="flex items-center gap-3 bg-white border border-slate-200/80 rounded-xl px-4 py-3 shadow-sm hover:shadow-md hover:border-[#3AB257]/20 transition-all">
      <span
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        <Icon className="w-4 h-4" style={{ color: iconColor }} strokeWidth={1.8} />
      </span>
      <span className="text-sm sm:text-base text-slate-700 font-medium leading-snug">{text}</span>
    </div>
  );
}

function TransmissionTowerIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 2h10l2 6H5l2-6z" /><path d="M5 8l-2 14h18L19 8" />
      <path d="M6 14h12" /><path d="M12 2v20" />
      <path d="M7 8l5 6-5 8" /><path d="M17 8l-5 6 5 8" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// SIDEBAR NAV
// ─────────────────────────────────────────────
const navItems = [
  { id: "positioning",           label: "Proposed Website Positioning Statement", icon: Star },
  { id: "om-portfolio",          label: "O&M Portfolio",                          icon: Wrench },
  { id: "operational-portfolio", label: "Operational Portfolio",                  icon: Sun },
  { id: "site-presence",         label: "Site Presence",                          icon: MapPin },
  { id: "team-capability",       label: "Team & Organizational Capability",       icon: Users },
  { id: "core-activities",       label: "Core O&M Activities",                   icon: ClipboardList },
  { id: "drone-thermography",    label: "Specialized Inspection & Diagnostic Services", icon: Eye },
  { id: "iv-curve",              label: "IV Curve Testing",                      icon: Activity },
  { id: "electrical-testing",    label: "Electrical Equipment Testing & Health Assessment", icon: Zap },
  { id: "relay-testing",         label: "Relay & Protection System Testing",    icon: ShieldCheck },
  { id: "pcb-repair",            label: "Micro-PCB Repair & Electronic Services", icon: Cpu },
  { id: "testing-capability",    label: "In-House & Third-Party Testing Capability", icon: Settings },
  { id: "experience-summary",    label: "Key Experience Summary",               icon: BarChart3 },
  { id: "website-highlights",    label: "Website Highlights",                   icon: TrendingUp },
];

// ─────────────────────────────────────────────
// SECTION 1 — POSITIONING STATEMENT
// ─────────────────────────────────────────────
function PositioningStatement() {
  return (
    <div>
      {/* <SectionTag text="Proposed Website Positioning Statement" /> */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#293E52] leading-tight mb-6 capitalize">
        Proposed Website Positioning Statement
      </h2>

      {/* Hero image */}
      <div className="relative rounded-2xl overflow-hidden mb-7 h-56 sm:h-72">
        <img
          src="/images/project-bg.png"
          alt="Renfra Energy Solar & Wind Operations"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#193F3D]/70 via-[#193F3D]/30 to-transparent" />
        <div className="absolute bottom-5 left-6 right-6">
          <p className="text-white font-bold text-lg sm:text-xl leading-snug drop-shadow">
            Powering Performance. Protecting Assets. Delivering Reliability.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Renfra Energy delivers integrated Renewable Energy Operations &amp; Maintenance (O&amp;M),
          Asset Management, Inspection, Testing and Specialized Technical Services.
        </p>
        <div className="bg-[#eef9f2] border border-[#c6edd3] rounded-2xl p-6">
          <p className="text-sm sm:text-base text-[#173b42] leading-relaxed">
            With an operational portfolio of <strong>432.9 MW AC / 553.5 MW DC</strong> across
            24 sites in Tamil Nadu, our experienced site teams and technical professionals
            combine field expertise, advanced inspection technologies, electrical testing,
            performance analytics and specialized repair capabilities to support renewable
            energy assets throughout their operational lifecycle.
          </p>
        </div>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Our capabilities combine in-house technical expertise with specialized third-party
          testing services, providing comprehensive support focused on plant availability,
          performance optimization, equipment reliability and long-term asset health.
        </p>
        <div className="bg-[#f0f9ff] border border-[#d0e8f8] rounded-2xl p-5 flex items-start gap-3.5">
          <span className="text-4xl font-serif text-[#329ACD] leading-none select-none shrink-0">&ldquo;</span>
          <p className="text-sm sm:text-base text-[#173b42] font-medium leading-relaxed italic pt-1">
            Our operational infrastructure includes 4 × 110/33 kV Power Substations (PSS)
            supporting the portfolio's electrical evacuation and grid-interface requirements.
          </p>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: Sun,                   val: "432.9 MW AC",   sub: "Operational Capacity" },
          { icon: Zap,                   val: "553.5 MW DC",   sub: "Installed Capacity" },
          { icon: MapPin,                val: "24 Sites",      sub: "Tamil Nadu" },
          { icon: TransmissionTowerIcon, val: "4 × 110/33 kV", sub: "Power Substations" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col gap-2 shadow-sm">
              <Icon className="w-6 h-6 text-[#3AB257]" strokeWidth={1.8} />
              <p className="text-lg font-bold text-[#293E52] leading-tight">{s.val}</p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">{s.sub}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// REUSABLE: SERVICE ICON GRID
// Always icon-above-text centered, no horizontal card flip
// cols: 2 on mobile, 3 on sm, 4 on lg (when full-width)
// Pass cols="3" to cap at 3 columns (when inside a 2-col parent)
// ─────────────────────────────────────────────
function ServiceGrid({ items, iconBg = "#eaf4fd", iconColor = "#329ACD", cols = "4" }) {
  const colClass = cols === "3"
    ? "grid-cols-2 sm:grid-cols-3"
    : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={`grid ${colClass} gap-x-4 gap-y-7`}>
      {items.map((svc, i) => {
        const Icon = svc.icon;
        return (
          <div key={i} className="flex flex-col items-center text-center gap-3">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: iconBg }}
            >
              <Icon className="w-6 h-6" style={{ color: iconColor }} strokeWidth={1.6} />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-[#293E52] leading-snug">
              {svc.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// SECTION 2 — O&M PORTFOLIO
// ─────────────────────────────────────────────
function OmPortfolio() {
  const services = [
    { icon: Wrench,        label: "Preventive and corrective maintenance" },
    { icon: Zap,           label: "Electrical equipment inspection and maintenance" },
    { icon: BarChart3,     label: "Plant performance monitoring and analysis" },
    { icon: Search,        label: "Breakdown analysis and troubleshooting" },
    { icon: Layers,        label: "Inverter and transformer maintenance" },
    { icon: Radio,         label: "HT/LT system maintenance" },
    { icon: Building2,     label: "Substation and evacuation-system maintenance" },
    { icon: Monitor,       label: "SCADA and communication-system monitoring" },
    { icon: ClipboardList, label: "Equipment condition assessment" },
    { icon: Calendar,      label: "Shutdown planning and maintenance coordination" },
    { icon: TrendingUp,    label: "Generation and performance analysis" },
    { icon: ShieldCheck,   label: "Safety and statutory compliance management" },
    { icon: RotateCcw,     label: "Reliability improvement and predictive maintenance" },
  ];

  return (
    <div>
      {/* <SectionTag text="O&M Portfolio" /> */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#293E52] leading-tight mb-2">
        O&amp;M Portfolio
      </h2>
      <h3 className="text-lg font-semibold text-[#329ACD] mb-5">Operations &amp; Maintenance</h3>
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-3">
        Renfra Energy provides comprehensive Operations &amp; Maintenance (O&amp;M) and Asset
        Management Services for utility-scale solar assets, with a focus on maximizing
        plant availability, optimizing generation, maintaining equipment reliability and
        extending asset life.
      </p>
      <p className="text-[#000] font-semibold text-sm sm:text-base leading-relaxed mb-8">
        Our key O&amp;M activities include:
      </p>
      <ServiceGrid items={services} />
    </div>
  );
}

// ─────────────────────────────────────────────
// SECTION 3 — OPERATIONAL PORTFOLIO
// ─────────────────────────────────────────────
function OperationalPortfolio() {
  const focuses = [
    { icon: Sun,           label: "Maximizing plant availability" },
    { icon: Zap,           label: "Optimizing energy generation" },
    { icon: Activity,      label: "Monitoring equipment health" },
    { icon: ShieldCheck,   label: "Reducing unplanned downtime" },
    { icon: ClipboardList, label: "Implementing preventive and predictive maintenance strategies" },
    { icon: Search,        label: "Identifying performance deviations" },
    { icon: Settings,      label: "Improving equipment reliability" },
    { icon: TrendingUp,    label: "Supporting long-term asset performance" },
    { icon: Wifi,          label: "Ensuring effective grid and evacuation-system management" },
  ];

  const tableRows = [
    { label: "Operational Solar Capacity – AC", value: "432.9 MW" },
    { label: "Operational Solar Capacity – DC", value: "553.5 MW" },
    { label: "Operational Sites",               value: "24 Sites" },
    { label: "Primary Region",                  value: "Tamil Nadu" },
    { label: "Power Substations",               value: "4 × 110/33 kV PSS" },
    { label: "O&M Scope",                       value: "Solar Plant Operations & Maintenance" },
    { label: "Testing Capability",              value: "In-House & Specialized Third-Party" },
    { label: "Advanced Inspection",             value: "Drone Thermography & Visual Inspection" },
  ];

  return (
    <div>
      {/* <SectionTag text="Operational Portfolio" /> */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#293E52] leading-tight mb-2">
        Operational Portfolio
      </h2>
      <h3 className="text-lg font-semibold text-[#329ACD] mb-5">Portfolio Management</h3>
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
        Renfra Energy currently manages an operational solar portfolio of approximately{" "}
        <strong className="text-[#293E52]">432.9 MW AC / 553.5 MW DC</strong> across multiple
        project locations in Tamil Nadu.
      </p>

      {/* Focus — icon-above-text grid, full width */}
      <p className="text-sm sm:text-base text-[#000] font-semibold mb-6">
        Our asset management approach focuses on:
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 mb-10">
        {focuses.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-full bg-[#eaf4fd] flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-[#329ACD]" strokeWidth={1.6} />
              </div>
              <p className="text-sm sm:text-base font-semibold text-[#293E52] leading-snug">{f.label}</p>
            </div>
          );
        })}
      </div>

      {/* Stat cards row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Sun,                   val: "432.9 MW",      sub: "AC Capacity" },
          { icon: Zap,                   val: "553.5 MW",      sub: "DC Capacity" },
          { icon: MapPin,                val: "24",            sub: "Operational Sites" },
          { icon: TransmissionTowerIcon, val: "4 × 110/33 kV", sub: "Power Substations" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col gap-2 shadow-sm">
              <Icon className="w-6 h-6 text-[#3AB257]" strokeWidth={1.8} />
              <p className="text-xl font-bold text-[#293E52] leading-tight">{s.val}</p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">{s.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Portfolio Table */}
      <div className="rounded-2xl overflow-x-auto border border-slate-200/80 shadow-sm">
        <div className="bg-[#193F3D] px-5 py-3">
          <h4 className="font-bold text-white text-sm">Key Portfolio Highlights</h4>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#f0f9ff] border-b border-slate-200">
              <th className="text-left px-5 py-3 font-bold text-[#293E52]">Particular</th>
              <th className="text-left px-5 py-3 font-bold text-[#293E52]">Current Portfolio</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, i) => (
              <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-[#fafcfb]"}`}>
                <td className="px-5 py-3 text-sm sm:text-base text-slate-600">{row.label}</td>
                <td className="px-5 py-3 font-semibold text-sm sm:text-base text-[#293E52]">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SECTION 4 — SITE PRESENCE
// ─────────────────────────────────────────────
function SitePresence() {
  const support = [
    { icon: Sun,           label: "Daily plant operations" },
    { icon: Wrench,        label: "Preventive maintenance" },
    { icon: Settings,      label: "Corrective maintenance" },
    { icon: AlertCircle,   label: "Breakdown response" },
    { icon: Search,        label: "Equipment inspection" },
    { icon: Activity,      label: "Testing and diagnostic activities" },
    { icon: Calendar,      label: "Shutdown execution" },
    { icon: Wifi,          label: "Grid coordination" },
    { icon: ShieldCheck,   label: "Safety implementation" },
    { icon: FileText,      label: "Technical reporting" },
    { icon: BarChart3,     label: "Performance monitoring" },
    { icon: RotateCcw,     label: "Emergency response and restoration" },
  ];

  return (
    <div>
      {/* <SectionTag text="Site Presence" /> */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#293E52] leading-tight mb-2">
        Site Presence
      </h2>
      <h3 className="text-lg font-semibold text-[#329ACD] mb-5">24 Operational Sites Across Tamil Nadu</h3>
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
        Our presence across 24 operational sites enables strong local technical support,
        faster response and effective coordination with customers, OEMs, testing agencies
        and grid authorities.
      </p>

      <div className="grid lg:grid-cols gap-8 items-start mb-8">
        {/* Site photo with map overlay */}
        {/* <div className=" relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm bg-white">
          <div className="relative h-64 sm:h-80">
            <img src="/images/fac.png" alt="Renfra Solar Site Tamil Nadu"
              className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#193F3D]/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white font-bold text-base mb-1">24 Operational Sites</p>
              <p className="text-white/80 text-sm">Tamil Nadu, India</p>
            </div>
          </div>
          <div className="p-4 bg-white flex items-center gap-3">
            <img src="/images/tamil-nadu-districts.svg" alt="Tamil Nadu map"
              className="h-16 w-auto object-contain opacity-80" />
            <div>
              <p className="text-xs font-bold text-[#293E52]">Portfolio Coverage</p>
              <p className="text-xs text-slate-500">Multiple districts across Tamil Nadu</p>
            </div>
          </div>
        </div> */}

        {/* ServiceGrid */}
        <div className="">
          <p className="text-sm sm:text-base text-[#000] font-semibold mb-5">Our site teams support:</p>
          <ServiceGrid items={support} iconBg="#eaf4fd" iconColor="#329ACD" cols="4" />

          <div className="mt-6 bg-[#f0f9ff] border border-[#d0e8f8] rounded-2xl p-5 flex items-start gap-3.5">
            <span className="text-4xl font-serif text-[#329ACD] leading-none select-none shrink-0">&ldquo;</span>
            <p className="text-sm sm:text-base text-[#173b42] font-medium leading-relaxed italic pt-1">
              Our distributed site presence, supported by centralized technical management,
              enables efficient field execution and timely resolution of operational issues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SECTION 5 — TEAM & ORGANIZATIONAL CAPABILITY
// ─────────────────────────────────────────────
function TeamCapability() {
  const mgmt = [
    "Renewable energy asset management",
    "Electrical engineering",
    "O&M planning and execution",
    "Performance analysis",
    "Technical troubleshooting",
    "Reliability improvement",
    "Customer coordination",
    "OEM and vendor coordination",
    "Project management",
    "Technical documentation and reporting",
  ];

  const site = [
    "Plant operation",
    "Preventive maintenance",
    "Corrective and breakdown maintenance",
    "Equipment inspection",
    "Troubleshooting",
    "Testing coordination",
    "Safety compliance",
    "Grid coordination",
    "Equipment health monitoring",
    "Daily operational reporting",
  ];

  return (
    <div>
      {/* <SectionTag text="Team & Organizational Capability" /> */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#293E52] leading-tight mb-8">
        Team &amp; Organizational Capability
      </h2>

      <div className="grid  gap-8 mb-6">
        {/* 5.1 */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#329ACD] mb-4">Core Management &amp; Technical Team</h3>
          <p className="text-sm sm:text-base text-slate-600 mb-5 leading-relaxed">
            Our central management and technical team comprises experienced professionals with expertise in:
          </p>
          {/* Pill tags */}
          <div className="flex flex-wrap gap-2.5">
            {mgmt.map((t, i) => (
              <Pill key={i} text={t} color={i % 2 === 0 ? "green" : "teal"} />
            ))}
          </div>
        </div>

        {/* 5.2 */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#329ACD] mb-4">Site Engineering &amp; Technical Teams</h3>
          <p className="text-sm sm:text-base text-slate-600 mb-5 leading-relaxed">
            Our site teams comprise experienced engineers, technicians and operational personnel responsible for:
          </p>
          <div className="flex flex-wrap gap-2.5">
            {site.map((t, i) => (
              <Pill key={i} text={t} color={i % 2 === 0 ? "blue" : "purple"} />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#193F3D] rounded-2xl overflow-hidden flex flex-col sm:flex-row items-stretch mb-0">
        {/* Team photo */}
        <div className="sm:w-48 lg:w-56 shrink-0 h-48 sm:h-auto">
          <img
            src="/images/fac.png"
            alt="Renfra Energy Field Team"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 flex items-center">
          <div>
            <span className="text-4xl font-serif text-[#3AB257] leading-none select-none block mb-2">&ldquo;</span>
            <p className="text-sm sm:text-base text-white/90 font-medium leading-relaxed italic">
              The central team provides technical direction, planning, performance monitoring,
              engineering support and operational coordination to site-level teams.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SECTION 6 — CORE O&M ACTIVITIES
// ─────────────────────────────────────────────
function CoreActivities() {
  const preventive = [
    "Electrical system inspection",
    "PV module and structure inspection",
    "Inverter inspection and maintenance",
    "Transformer inspection and maintenance",
    "HT/LT panel inspection",
    "Cable and termination inspection",
    "Protection-system inspection",
    "Equipment condition monitoring",
    "Preventive component replacement",
    "Thermal inspection of electrical connections and equipment",
  ];

  const faultSteps = [
    { icon: Search,      label: "Fault Identification" },
    { icon: Microscope,  label: "Diagnosis" },
    { icon: Eye,         label: "Root Cause Analysis" },
    { icon: Wrench,      label: "Rectification" },
    { icon: FileCheck,   label: "Testing" },
    { icon: RotateCcw,   label: "Restoration" },
    { icon: ShieldCheck, label: "Performance Verification" },
  ];

  const monitoring = [
    "Plant generation",
    "Inverter performance",
    "String performance",
    "Equipment availability",
    "Performance Ratio (PR)",
    "Irradiance and environmental parameters",
    "Alarm analysis",
    "Communication status",
    "Energy yield",
    "Generation loss analysis",
    "Equipment performance trends",
  ];

  return (
    <div>
      {/* <SectionTag text="Core O&M Activities" /> */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#293E52] leading-tight mb-4">
        Core O&amp;M Activities
      </h2>

      {/* 6.1 Preventive — numbered cards in 2-col grid */}
      <div className="mb-10">
        <h3 className="text-base sm:text-lg font-bold text-[#329ACD] mb-3">Preventive Maintenance</h3>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-3">
          Routine inspections and planned maintenance activities are carried out to identify
          potential failures at an early stage and maintain equipment reliability.
        </p>
        <p className="text-sm sm:text-base text-[#000] font-semibold mb-5">Major activities include:</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {preventive.map((t, i) => (
            <NumberedCard key={i} number={i + 1} text={t} accent={i % 2 === 0 ? "#3AB257" : "#329ACD"} />
          ))}
        </div>
      </div>

      {/* Corrective — process flow */}
      <div className="mb-10">
        <h3 className="text-base sm:text-lg font-bold text-[#329ACD] mb-3">Corrective &amp; Breakdown Maintenance</h3>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-3">
          Our technical teams provide structured breakdown response and troubleshooting to
          restore equipment and plant availability.
        </p>
        <p className="text-sm sm:text-base text-[#000] font-bold mb-5">Maintenance methodology:</p>
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm mb-4">
          <div className="flex flex-wrap gap-y-6 gap-x-2 items-center justify-center sm:justify-between">
            {faultSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex items-center gap-2">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-11 h-11 rounded-full bg-[#f0f9ff] border border-[#d0e8f8] flex items-center justify-center shadow-sm hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 text-[#329ACD]" strokeWidth={1.8} />
                    </div>
                    <span className="text-[14px] font-semibold text-slate-700 text-center w-20 leading-tight">{step.label}</span>
                  </div>
                  {idx < faultSteps.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-[#000] -mt-5 shrink-0 hidden sm:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-[#f0f9ff] border border-[#d0e8f8] rounded-2xl p-4">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            This structured approach helps minimize downtime and ensure reliable restoration of affected equipment.
          </p>
        </div>
      </div>

      {/* 6.3 Monitoring — dot-row grid */}
      <div>
        <h3 className="text-base sm:text-lg font-bold text-[#329ACD] mb-3">Performance Monitoring &amp; Analytics</h3>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-3">
          Continuous monitoring and analysis of plant operating parameters are carried out
          to identify generation losses, equipment abnormalities and performance deviations.
        </p>
        <p className="text-sm sm:text-base text-[#000] font-semibold mb-5">Key monitoring areas include:</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {monitoring.map((t, i) => (
            <DotRow key={i} text={t} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SECTION 7 — DRONE THERMOGRAPHY
// ─────────────────────────────────────────────
function DroneThermography() {
  const identifications = [
    { icon: Thermometer,  label: "Module hotspots" },
    { icon: Activity,     label: "Abnormal thermal patterns" },
    { icon: AlertCircle,  label: "Module defects" },
    { icon: Grid,         label: "String-level abnormalities" },
    { icon: Zap,          label: "Junction-box abnormalities" },
    { icon: Settings,     label: "Bypass diode-related issues" },
    { icon: AlertCircle,  label: "Physical module damage" },
    { icon: Eye,          label: "Visible module defects" },
    { icon: Building2,    label: "Structural abnormalities" },
    { icon: Search,       label: "Other thermal and visual anomalies" },
  ];

  return (
    <div>
      {/* <SectionTag text="Specialized Inspection & Diagnostic Services" /> */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#293E52] leading-tight mb-2">
        Specialized Inspection &amp; Diagnostic Services
      </h2>
      <h3 className="text-lg font-semibold text-[#329ACD] mb-5">Drone Thermography &amp; Visual Inspection</h3>
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
        Renfra Energy utilizes advanced drone-based thermal imaging and visual inspection
        technology for efficient and comprehensive inspection of large-scale solar assets.
      </p>
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
        Our drone thermography capability enables rapid identification and mapping of
        thermal and visual anomalies across solar PV installations while minimizing
        inspection time and manual intervention.
      </p>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Image */}
        <div className="col-span-12 md:col-span-4 rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm">
          <div className="relative h-60 overflow-hidden">
            <img src="/images/new-ims-banner.jpg" alt="Drone Thermography Inspection"
              className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#193F3D]/70 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="bg-[#3AB257] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                Advanced Inspection Technology
              </span>
            </div>
          </div>
          <div className="p-5 bg-white">
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              Inspection findings are analyzed and documented to support defect identification,
              prioritization of corrective actions and overall asset performance improvement.
            </p>
          </div>
        </div>

        {/* ServiceGrid for identifications */}
        <div className="col-span-12 md:col-span-8">
          <p className="text-sm sm:text-base font-semibold text-[#173b42] mb-4">
            The inspection process supports identification of:
          </p>
          <ServiceGrid items={identifications} iconBg="#eaf4fd" iconColor="#329ACD" cols="3" />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SECTION 8 — IV CURVE TESTING
// ─────────────────────────────────────────────
function IvCurveTesting() {
  const identifications = [
    "Underperforming strings",
    "Current/voltage deviations",
    "Mismatch conditions",
    "Module degradation",
    "High-resistance conditions",
    "Open-circuit conditions",
    "String-level abnormalities",
    "Performance deviations",
  ];

  return (
    <div>
      {/* <SectionTag text="IV Curve Testing" /> */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#293E52] leading-tight mb-2">
        IV Curve Testing
      </h2>
      <h3 className="text-lg font-semibold text-[#329ACD] mb-5">PV Module &amp; String Performance Assessment</h3>
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
        IV Curve Testing is used to assess the electrical characteristics and performance
        of PV modules and strings and to identify abnormal operating conditions.
      </p>
      <p className="text-[#000] font-semibold text-sm sm:text-base leading-relaxed mb-8">
        The testing supports identification of:
      </p>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Dot-row cards */}
        <div className="col-span-12 md:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
          {identifications.map((t, i) => (
            <DotRow key={i} text={t} index={i} />
          ))}
        </div>

        <div className="col-span-12 md:col-span-7 space-y-5">
          <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm">
            <div className="h-52 overflow-hidden">
              <img src="/images/sol-inner.png" alt="IV Curve Testing"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          </div>
          <div className="bg-[#f0f9ff] border border-[#d0e8f8] rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#329ACD] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Gauge className="w-4 h-4" />
              </div>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Renfra Energy utilizes a combination of in-house technical resources and
                specialized third-party testing agencies, depending on project requirements,
                testing scope and customer requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SECTION 9 — ELECTRICAL EQUIPMENT TESTING
// ─────────────────────────────────────────────
function ElectricalTesting() {
  const equipment = [
    "Power transformers", "HT/LT panels", "ACBs", "MCCBs", "VCBs",
    "Protection relays", "CTs", "PTs", "Switchgear", "Power and control cables",
    "Earthing systems", "Control circuits", "Auxiliary systems",
    "Substation equipment", "PSS equipment",
  ];

  return (
    <div>
      {/* <SectionTag text="Electrical Equipment Testing & Health Assessment" /> */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#293E52] leading-tight mb-5">
        Electrical Equipment Testing &amp; Health Assessment
      </h2>
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
        Renfra Energy undertakes comprehensive inspection, testing and health assessment
        of critical electrical equipment through a combination of in-house technical
        capabilities and specialized third-party testing agencies.
      </p>
      <p className="text-[#000] font-semibold text-sm sm:text-base leading-relaxed mb-6">
        Testing and assessment may include:
      </p>

      {/* Equipment pills — already styled, kept */}
      <div className="bg-[#f8fafc] border border-slate-200/70 rounded-2xl p-6 mb-8">
        <div className="flex flex-wrap gap-2.5">
          {equipment.map((pill, i) => (
            <span key={i}
              className="bg-[#f0f9ff] border border-[#d0e8f8] text-[#0369a1] text-sm sm:text-base font-semibold px-4 py-2 rounded-full hover:bg-[#e0f2fe] transition-colors">
              {pill}
            </span>
          ))}
        </div>
      </div>

      <h3 className="text-base sm:text-lg font-bold text-[#329ACD] mb-4">Experience</h3>
      <div className="bg-[#193F3D] rounded-2xl overflow-hidden flex flex-col sm:flex-row items-stretch gap-0">
        <div className="sm:w-44 lg:w-52 shrink-0 h-44 sm:h-auto">
          <img
            src="/images/pro1.png"
            alt="Electrical equipment testing"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 flex flex-col justify-center">
          <p className="text-3xl font-bold text-white mb-2">450 MW</p>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
            of equipment testing and health assessment activities completed by our team,
            covering critical electrical equipment across renewable energy assets.
          </p>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed mt-2">
            This includes equipment health assessment and verification associated with
            4 × 110/33 kV Power Substations (PSS), as applicable to the project scope.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SECTION 10 — RELAY & PROTECTION TESTING
// ─────────────────────────────────────────────
function RelayTesting() {
  const activities = [
    { icon: ShieldCheck,   label: "Protection relay testing" },
    { icon: CheckCircle2,  label: "Functional verification" },
    { icon: Activity,      label: "Trip circuit verification" },
    { icon: Zap,           label: "Breaker trip/close verification" },
    { icon: Settings,      label: "Interlock verification" },
    { icon: Gauge,         label: "Protection parameter verification" },
    { icon: Monitor,       label: "Control circuit verification" },
    { icon: Search,        label: "Equipment diagnostic testing" },
    { icon: FileText,      label: "Test report preparation" },
  ];

  return (
    <div>
      {/* <SectionTag text="Relay & Protection System Testing" /> */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#293E52] leading-tight mb-3">
        Relay &amp; Protection System Testing
      </h2>
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
        Our dedicated technical team supports inspection, testing and verification of
        electrical protection and control systems.
      </p>

      {/* Top image banner */}
      {/* <div className="relative rounded-2xl overflow-hidden mb-8 h-52 sm:h-64">
        <img
          src="/images/md1.png"
          alt="Relay & Protection System Testing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#193F3D]/80 via-[#193F3D]/40 to-transparent" />
        <div className="absolute inset-0 flex items-center px-8">
          <div>
            <p className="text-white font-bold text-xl sm:text-2xl leading-snug mb-2">
              Ensuring Protection Systems Are<br className="hidden sm:inline" /> Reliable &amp; Ready
            </p>
            <p className="text-white/75 text-sm sm:text-base max-w-sm">
              Safeguarding equipment, personnel and grid connectivity.
            </p>
          </div>
        </div>
      </div> */}

      {/* Activities grid + methodology card */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Activities — icon grid spanning 2 cols */}
        <div className="lg:col-span-2">
          <p className="text-sm sm:text-base text-[#000] font-semibold mb-5">Key activities include:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activities.map((item, i) => {
              const Icon = item.icon;
              const colors = ["#3AB257", "#329ACD", "#8b5cf6", "#f59e0b", "#14b8a6", "#ef4444"];
              const c = colors[i % colors.length];
              return (
                <div key={i} className="flex items-center gap-3 bg-white border border-slate-200/80 rounded-xl px-4 py-3 shadow-sm hover:shadow-md hover:border-[#329ACD]/30 transition-all">
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${c}18` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: c }} strokeWidth={1.8} />
                  </span>
                  <span className="text-sm sm:text-base text-slate-700 font-medium leading-snug">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Methodology card — 1 col */}
        <div className="flex flex-col gap-4">
          <div className="bg-[#193F3D] rounded-2xl p-6 flex-1">
            <div className="w-10 h-10 rounded-xl bg-[#3AB257] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-white" strokeWidth={1.8} />
            </div>
            <h4 className="font-bold text-white text-base sm:text-lg mb-3">Testing Methodology</h4>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Testing activities are carried out using in-house capabilities and specialized
              third-party testing agencies, depending on project requirements and test scope.
            </p>
          </div>

          <div className="bg-[#eef9f2] border border-[#c6edd3] rounded-2xl p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#3AB257] mb-2">Coverage</p>
            <p className="text-sm sm:text-base font-semibold text-[#173b42] leading-snug">
              In-House + Specialized Third-Party Testing Agencies
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SECTION 11 — MICRO-PCB REPAIR
// ─────────────────────────────────────────────
function PcbRepair() {
  const services = [
    { icon: Search,       label: "PCB inspection" },
    { icon: Microscope,   label: "Component-level diagnosis" },
    { icon: Zap,          label: "Micro soldering" },
    { icon: Settings,     label: "Connector repair" },
    { icon: RotateCcw,    label: "Component replacement" },
    { icon: Activity,     label: "Track and connection repair" },
    { icon: Monitor,      label: "Board-level troubleshooting" },
    { icon: CheckCircle2, label: "Functional verification" },
  ];

  return (
    <div>
      {/* <SectionTag text="Micro-PCB Repair & Electronic Services" /> */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#293E52] leading-tight mb-5">
        Micro-PCB Repair &amp; Electronic Services
      </h2>
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
        Renfra Energy has specialized technical capability for micro-PCB inspection,
        component-level troubleshooting and soldering support for selected electronic
        and control-system equipment.
      </p>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Icon-badge cards */}
        <div>
          <p className="text-sm sm:text-base text-[#000] font-semibold mb-4">Services include:</p>
          <ServiceGrid items={services} iconBg="#eaf4fd" iconColor="#329ACD" cols="3" />
        </div>

        <div className="bg-[#193F3D] rounded-2xl overflow-hidden">
          <div className="h-44 overflow-hidden">
            <img
              src="/images/pro2.png"
              alt="PCB Repair & Electronic Services"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
          <div className="p-6">
            <h4 className="font-bold text-white text-base sm:text-lg mb-3">Capability</h4>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              This capability supports the repair and restoration of serviceable electronic
              components, helping reduce equipment downtime and potentially minimize
              complete-board replacement where technically feasible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SECTION 12 — IN-HOUSE & THIRD-PARTY TESTING
// ─────────────────────────────────────────────
function TestingCapability() {
  const approaches = [
    { title: "Testing Approach",    color: "bg-[#fce7f3] border-[#fbcfe8] text-[#831843]" },
    { title: "In-House Inspection & Diagnostics", color: "bg-[#eef9f2] border-[#c6edd3] text-[#173b42]" },
    { title: "Advanced / Specialized Testing",     color: "bg-[#fef3c7] border-[#fde68a] text-[#92400e]"  },
    { title: "Third-Party Testing Where Required", color: "bg-[#f0f9ff] border-[#d0e8f8] text-[#173b42]" },
    { title: "Technical Analysis & Assessment",    color: "bg-[#fef3c7] border-[#fde68a] text-[#92400e]"  },
    { title: "Corrective Action Recommendation",  color: "bg-[#fce7f3] border-[#fbcfe8] text-[#831843]" },
    { title: "Post-Rectification Verification",    color: "bg-[#eef9f2] border-[#c6edd3] text-[#173b42]" },
  ];

  return (
    <div>
      {/* <SectionTag text="In-House & Third-Party Testing Capability" /> */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#293E52] leading-tight mb-5">
        In-House &amp; Third-Party Testing Capability
      </h2>
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
        Renfra Energy follows an integrated in-house and third-party testing model,
        enabling the appropriate technical resources to be deployed based on equipment
        criticality, project requirements and testing scope.
      </p>
      {/* <h3 className="text-base sm:text-lg font-bold text-[#329ACD] mb-5">Testing Approach</h3> */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {approaches.map((a, i) => (
          <div key={i} className={`border rounded-xl px-5 py-4 text-sm sm:text-base font-semibold ${a.color}`}>
            {a.title}
          </div>
        ))}
      </div>
      <div className="bg-[#f0f9ff] border border-[#d0e8f8] rounded-2xl p-5">
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          This approach provides flexibility to undertake routine inspections, advanced
          diagnostics and specialized testing while supporting customer-specific and
          statutory requirements.
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SECTION 13 — KEY EXPERIENCE SUMMARY
// ─────────────────────────────────────────────
function ExperienceSummary() {
  const tableRows = [
    { area: "Operational Solar Portfolio – AC",     value: "432.9 MW" },
    { area: "Operational Solar Portfolio – DC",     value: "553.5 MW" },
    { area: "Operational Sites",                    value: "24 Sites" },
    { area: "Power Substations",                    value: "4 × 110/33 kV PSS" },
    { area: "Advanced Inspection",                  value: "Drone Thermography & Visual Inspection" },
    { area: "Equipment Testing & Health Assessment", value: "450 MW" },
    { area: "Testing Model",                        value: "In-House + Specialized Third-Party" },
    { area: "O&M Coverage",                         value: "Preventive, Corrective & Predictive Maintenance" },
    { area: "Specialized Services",                 value: "PCB Repair, Relay Testing, IV Curve Testing & Drone Thermography" },
  ];

  return (
    <div>
      {/* <SectionTag text="Key Experience Summary" /> */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#293E52] leading-tight mb-8">
        Key Experience Summary
      </h2>
      <div className="rounded-2xl overflow-x-auto border border-slate-200/80 shadow-sm mb-8">
        <div className="bg-[#193F3D] px-5 py-3">
          <div className="grid grid-cols-2">
            <span className="font-bold text-white text-sm">Area</span>
            <span className="font-bold text-white text-sm">Experience / Capability</span>
          </div>
        </div>
        <table className="w-full text-sm">
          <tbody>
            {tableRows.map((row, i) => (
              <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-[#fafcfb]"}`}>
                <td className="px-5 py-3 text-sm sm:text-base text-slate-600 w-1/2">{row.area}</td>
                <td className="px-5 py-3 font-semibold text-sm sm:text-base text-[#293E52]">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { icon: Sun,                   val: "432.9 MW AC", sub: "Operational Solar Portfolio",           color: "bg-[#3AB257]" },
          { icon: Zap,                   val: "553.5 MW DC", sub: "Installed Solar Capacity",              color: "bg-[#329ACD]" },
          { icon: MapPin,                val: "24 Sites",    sub: "Operational Presence Across Tamil Nadu", color: "bg-[#8b5cf6]" },
          { icon: TransmissionTowerIcon, val: "4 × 110/33 kV", sub: "Power Substations",                  color: "bg-[#f59e0b]" },
          { icon: Settings,              val: "450 MW",      sub: "Equipment Testing & Health Assessment", color: "bg-[#ef4444]" },
        ].map((h, i) => {
          const Icon = h.icon;
          return (
            <div key={i} className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-all text-center">
              <div className={`w-10 h-10 rounded-xl ${h.color} text-white flex items-center justify-center shadow-sm`}>
                <Icon className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <p className="text-base font-bold text-[#293E52] leading-tight">{h.val}</p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-snug">{h.sub}</p>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}

// ─────────────────────────────────────────────
// SECTION 14 — WEBSITE HIGHLIGHTS
// ─────────────────────────────────────────────
function WebsiteHighlights() {
  const highlights = [
    { val: "432.9 MW AC",            sub: "Operational Solar Portfolio",           icon: Sun,                   color: "from-[#3AB257] to-[#2d9647]" },
    { val: "553.5 MW DC",            sub: "Installed Solar Capacity",               icon: Zap,                   color: "from-[#329ACD] to-[#2580b0]" },
    { val: "24 Sites",               sub: "Operational Presence Across Tamil Nadu", icon: MapPin,                color: "from-[#8b5cf6] to-[#7c3aed]" },
    { val: "4 × 110/33 kV",          sub: "Power Substations",                     icon: TransmissionTowerIcon, color: "from-[#f59e0b] to-[#d97706]" },
    { val: "Drone Thermography",     sub: "Advanced Solar Asset Inspection",        icon: Eye,                   color: "from-[#14b8a6] to-[#0d9488]" },
    { val: "450 MW",                 sub: "Equipment Testing & Health Assessment",  icon: Settings,              color: "from-[#ef4444] to-[#dc2626]" },
    { val: "In-House + Third-Party", sub: "Testing & Diagnostic Capability",        icon: ShieldCheck,           color: "from-[#193F3D] to-[#1a4f4c]" },
  ];

  return (
    <div>
      {/* <SectionTag text="Website Highlights" /> */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#293E52] leading-tight mb-8">
        Website Highlights
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {highlights.map((h, i) => {
          const Icon = h.icon;
          return (
            <div key={i}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${h.color} p-6 text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200`}>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />
              <Icon className="w-8 h-8 mb-4 opacity-90" strokeWidth={1.5} />
              <p className="text-2xl font-bold leading-tight mb-1">{h.val}</p>
              <p className="text-sm sm:text-base text-white/80 font-medium leading-snug">{h.sub}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SECTION MAP
// ─────────────────────────────────────────────
const sectionComponents = {
  "positioning":           PositioningStatement,
  "om-portfolio":          OmPortfolio,
  "operational-portfolio": OperationalPortfolio,
  "site-presence":         SitePresence,
  "team-capability":       TeamCapability,
  "core-activities":       CoreActivities,
  "drone-thermography":    DroneThermography,
  "iv-curve":              IvCurveTesting,
  "electrical-testing":    ElectricalTesting,
  "relay-testing":         RelayTesting,
  "pcb-repair":            PcbRepair,
  "testing-capability":    TestingCapability,
  "experience-summary":    ExperienceSummary,
  "website-highlights":    WebsiteHighlights,
};

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function OM2Page() {
  const [activeSection, setActiveSection] = useState("positioning");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const topRef = useRef(null);

  const ActiveComponent = sectionComponents[activeSection];
  const activeLabel = navItems.find((n) => n.id === activeSection)?.label || "";

  const handleNav = (id) => {
    setActiveSection(id);
    setMobileSidebarOpen(false);
    if (topRef.current) {
      const offset = topRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#fafcfb]">
    <div className="max-w-[85rem] 2xl:max-w-[100rem] mx-auto  min-h-screen">

      {/* ── Mobile top bar ── */}
      <div className="lg:hidden flex items-center justify-between bg-white border-b border-slate-200 px-4 py-3 sticky top-20 z-30 shadow-sm">
        <span className="text-xs font-bold text-[#293E52] truncate max-w-[230px] leading-snug">{activeLabel}</span>
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="flex items-center gap-1.5 bg-[#193F3D] text-white text-xs font-semibold px-3 py-2 rounded-lg shrink-0 ml-2"
        >
          <Menu className="w-4 h-4" />
          Menu
        </button>
      </div>

      {/* Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          mobileSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileSidebarOpen(false)}
      />
      {/* Drawer */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-[290px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="bg-[#193F3D] px-5 py-4 flex items-center justify-between shrink-0">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#3AB257] mb-0.5">O&amp;M Services</p>
            <span className="font-bold text-white text-sm">Operations &amp; Maintenance</span>
          </div>
          <button onClick={() => setMobileSidebarOpen(false)}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button key={item.id} onClick={() => handleNav(item.id)}
                className={`w-full flex items-start gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium mb-1 transition-all duration-150 ${
                  isActive ? "bg-[#3AB257] text-white shadow-sm" : "text-slate-600 hover:bg-[#eef9f2] hover:text-[#173b42]"
                }`}>
                <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${isActive ? "text-white" : "text-[#3AB257]"}`}
                  strokeWidth={isActive ? 2.5 : 1.8} />
                <span className="leading-snug">{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-100 shrink-0">
          <a href="/contact"
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#3AB257] to-[#329ACD] text-white font-bold text-xs px-4 py-2.5 rounded-full shadow-md">
            Get in Touch <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="flex w-full items-start">

        {/* ════ LEFT SIDEBAR ════ */}
        <aside className="hidden lg:flex flex-col w-[290px] xl:w-[310px] shrink-0 bg-white border-r border-slate-200/80 sticky top-0 min-h-screen">
          <div className="bg-[#193F3D] px-5 py-5 shrink-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#3AB257] mb-1">O&amp;M Services</p>
            <h2 className="text-base font-bold text-white leading-snug">Operations &amp; Maintenance</h2>
          </div>
          <nav className="flex-1 p-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button key={item.id} onClick={() => handleNav(item.id)}
                  className={`w-full flex items-start gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium mb-1 transition-all duration-150 group ${
                    isActive ? "bg-[#3AB257] text-white shadow-sm" : "text-slate-600 hover:bg-[#eef9f2] hover:text-[#173b42]"
                  }`}>
                  <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${isActive ? "text-white" : "text-[#3AB257]"}`}
                    strokeWidth={isActive ? 2.5 : 1.8} />
                  <span className="leading-snug flex-1">{item.label}</span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-white/70 shrink-0" />}
                </button>
              );
            })}
          </nav>
          <div className="p-4 border-t border-slate-100 shrink-0">
            <div className="bg-[#eef9f2] border border-[#c6edd3] rounded-xl p-4">
              <p className="text-xs font-semibold text-[#173b42] mb-3 leading-snug">Have a project in mind?</p>
              <a href="/contact"
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#3AB257] to-[#329ACD] text-white font-bold text-xs px-4 py-2.5 rounded-full shadow-md hover:opacity-90 hover:scale-105 transition-all duration-200">
                Get in Touch <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </aside>

        {/* ════ RIGHT CONTENT ════ */}
        <main className="flex-1 min-w-0">
          <div ref={topRef} className="px-5 py-8 md:px-10 md:py-10 lg:px-14 lg:py-12 xl:px-16">

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-8 flex-wrap">
              <a href="/" className="hover:text-[#3AB257] font-medium transition-colors">Home</a>
              <ChevronRight className="w-3 h-3 shrink-0" />
              <span className="font-medium text-slate-500">Operations &amp; Maintenance</span>
              <ChevronRight className="w-3 h-3 shrink-0" />
              <span className="font-semibold text-[#3AB257] truncate max-w-[180px] sm:max-w-none">{activeLabel}</span>
            </div>

            <ActiveComponent />

            {/* Prev / Next */}
            <div className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between gap-4">
              {(() => {
                const currentIdx = navItems.findIndex((n) => n.id === activeSection);
                const prev = navItems[currentIdx - 1];
                const next = navItems[currentIdx + 1];
                return (
                  <>
                    {prev ? (
                      <button onClick={() => handleNav(prev.id)}
                        className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#3AB257] font-semibold transition-colors group">
                        <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
                        <span className="hidden sm:inline truncate max-w-[160px]">{prev.label}</span>
                        <span className="sm:hidden">Previous</span>
                      </button>
                    ) : <div />}
                    {next ? (
                      <button onClick={() => handleNav(next.id)}
                        className="flex items-center gap-2 text-sm text-white bg-gradient-to-r from-[#3AB257] to-[#329ACD] font-bold px-5 py-2.5 rounded-full shadow-md hover:opacity-90 hover:scale-105 transition-all duration-200 group">
                        <span className="hidden sm:inline truncate max-w-[160px]">{next.label}</span>
                        <span className="sm:hidden">Next</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ) : (
                      <a href="/contact"
                        className="flex items-center gap-2 text-sm text-white bg-gradient-to-r from-[#3AB257] to-[#329ACD] font-bold px-5 py-2.5 rounded-full shadow-md hover:opacity-90 hover:scale-105 transition-all duration-200">
                        Contact Us <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </main>
      </div>
    </div>
    </div>
  );
}
