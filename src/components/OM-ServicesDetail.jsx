"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wrench,
  Zap,
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
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Microscope,
  Eye,
  FileCheck,
  Radio,
  Cpu,
  Sparkles,
  Phone,
  Mail,
  Sun,
  Activity,
  Award,
  AlertTriangle,
  Flame,
  Gauge,
  Sliders,
  FileText,
  Hammer,
} from "lucide-react";

// ==========================================
// DATA DEFINITIONS FROM DOCX CONTENT
// ==========================================

// 6.1 Preventive Maintenance Activities (all 10 items)
const preventiveActivities = [
  {
    title: "Electrical System Inspection",
    desc: "Comprehensive visual and thermal checks of transformers, switchgear, busbars, and distribution equipment.",
  },
  {
    title: "PV Module & Structure Inspection",
    desc: "Regular structural integrity verification, mounting torque checks, module cleaning status, and degradation checks.",
  },
  {
    title: "Inverter Inspection & Maintenance",
    desc: "Routine filter cleaning, DC/AC terminal torque checking, fan checks, firmware monitoring, and efficiency assessment.",
  },
  {
    title: "Transformer Inspection & Maintenance",
    desc: "Oil level and temperature verification, BDV testing, silica gel breather maintenance, and bushing inspection.",
  },
  {
    title: "HT/LT Panel Inspection",
    desc: "Routine testing of busbars, contact resistance, terminal tighteners, and auxiliary control circuits.",
  },
  {
    title: "Cable & Termination Inspection",
    desc: "Inspection of high-voltage and low-voltage cable terminations, crimping condition, and insulation resistance checks.",
  },
  {
    title: "Protection-System Inspection",
    desc: "Regular functional checks on relays, circuit breakers, and trip-circuit supervision systems.",
  },
  {
    title: "Equipment Condition Monitoring",
    desc: "Vibration, thermal, and noise profiling to detect mechanical and electrical wear before failure.",
  },
  {
    title: "Preventive Component Replacement",
    desc: "Proactive replacement of aging fuses, surge arrestors, relays, and worn terminal connectors.",
  },
  {
    title: "Thermal Inspection of Electrical Connections",
    desc: "Thermographic imaging of critical electrical junctions and contact points to detect abnormal hotspots early.",
  },
];

// 6.3 Performance Monitoring & Analytics (11 parameters)
const monitoringAreas = [
  { title: "Plant Generation", desc: "Real-time generation tracking against contractual targets and historical benchmarks." },
  { title: "Inverter Performance", desc: "Granular monitoring of conversion efficiency, clipping, and error alarms across all units." },
  { title: "String Performance", desc: "Real-time current and voltage tracking across individual strings to detect underperforming lines." },
  { title: "Equipment Availability", desc: "Uptime calculation across inverters, transformers, SCADA, and evacuation feeders." },
  { title: "Performance Ratio (PR)", desc: "Normalized PR evaluation taking into account irradiance, ambient temperature, and clipping." },
  { title: "Irradiance & Environment", desc: "Solar irradiance (GHI, GTI), wind speed, module temperature, and meteorological data integration." },
  { title: "Alarm Analysis", desc: "Automated classification of active alerts to prioritize field intervention and dispatch." },
  { title: "Communication Status", desc: "Continuous heartbeat monitoring for sensors, trackers, meters, and SCADA telemetry." },
  { title: "Energy Yield Assessment", desc: "Daily, monthly, and seasonal yield comparison with simulation models (PVSyst)." },
  { title: "Generation Loss Analysis", desc: "Precise categorization of losses: soiling, shading, clipping, downtime, and grid curtailment." },
  { title: "Equipment Performance Trends", desc: "Predictive analytics tracking long-term degradation patterns to schedule timely repairs." },
];

// 7.1 Drone Thermography Findings (10 items)
const droneFindings = [
  "Module hotspots",
  "Abnormal thermal patterns",
  "Module defects",
  "String-level abnormalities",
  "Junction-box abnormalities",
  "Bypass diode-related issues",
  "Physical module damage",
  "Visible module defects",
  "Structural abnormalities",
  "Other thermal & visual anomalies",
];

// 8. IV Curve Testing Findings (8 items)
const ivCurveFindings = [
  "Underperforming strings",
  "Current/voltage deviations",
  "Mismatch conditions",
  "Module degradation",
  "High-resistance conditions",
  "Open-circuit conditions",
  "String-level abnormalities",
  "Performance deviations",
];

// 9. Electrical Equipment Testing Items (15 items)
const electricalEquipmentList = [
  "Power transformers",
  "HT/LT panels",
  "ACBs (Air Circuit Breakers)",
  "MCCBs (Molded Case Circuit Breakers)",
  "VCBs (Vacuum Circuit Breakers)",
  "Protection relays",
  "CTs (Current Transformers)",
  "PTs (Potential Transformers)",
  "Switchgear assemblies",
  "Power and control cables",
  "Earthing systems & ground grids",
  "Control circuits & secondary wiring",
  "Auxiliary systems & UPS supplies",
  "Substation equipment & isolators",
  "PSS equipment (Power Substation)",
];

// 10. Relay & Protection Testing Activities (9 items)
const relayTestingActivities = [
  "Protection relay testing & calibration",
  "Functional verification of trip logic",
  "Trip circuit verification & timing tests",
  "Breaker trip/close verification",
  "Interlock & permissive verification",
  "Protection parameter & setting verification",
  "Control circuit verification",
  "Equipment diagnostic testing",
  "Test report preparation & compliance filing",
];

// 11. Micro-PCB Repair & Electronic Services (8 items)
const pcbRepairServices = [
  { title: "PCB Inspection", desc: "Microscopic and thermal scanning of boards to detect micro-cracks and burnt traces." },
  { title: "Component-Level Diagnosis", desc: "Oscilloscope and multitester analysis to pinpoint failed ICs, capacitors, and diodes." },
  { title: "Micro Soldering", desc: "High-precision soldering and rework for ultra-fine surface-mount components (SMD)." },
  { title: "Connector Repair", desc: "Refurbishment and replacement of damaged terminal pins and ribbon connectors." },
  { title: "Component Replacement", desc: "Sourcing and precision mounting of original-spec electronic chips and power switches." },
  { title: "Track & Connection Repair", desc: "Jumper micro-wiring and trace reconstruction for damaged printed circuit boards." },
  { title: "Board-Level Troubleshooting", desc: "In-depth circuit simulation and testing under nominal operating voltages." },
  { title: "Functional Verification", desc: "Bench testing before redeployment to ensure flawless field operation." },
];

// 5.2 Site Engineering Team Responsibilities (10 items)
const siteTeamResponsibilities = [
  "Plant operation & daily monitoring",
  "Preventive maintenance execution",
  "Corrective & breakdown maintenance",
  "Equipment inspection & condition checks",
  "Field troubleshooting & fault isolation",
  "Testing coordination with external agencies",
  "Safety compliance & work permit enforcement",
  "Grid coordination & SLDC communication",
  "Equipment health monitoring & records",
  "Daily operational reporting & logbooks",
];

// 12. Testing Approach Steps (5 steps)
const testingApproachSteps = [
  { step: "01", title: "Scope Identification", desc: "Define critical assets, test scope, statutory mandates, and performance targets." },
  { step: "02", title: "Testing Plan & Coordination", desc: "Establish test procedures, shutdown windows, safety protocols, and dispatch." },
  { step: "03", title: "Execution (In-House / Third-Party)", desc: "Deploy calibrated testing equipment and qualified electrical engineers on site." },
  { step: "04", title: "Report & Analysis", desc: "Compile comprehensive diagnostic reports with oscillograms and health scores." },
  { step: "05", title: "Recommendations & Closure", desc: "Formulate prioritized rectification actions, execute fixes, and verify restoration." },
];

// Portfolio Highlights Table Data
const portfolioSummary = [
  { particular: "Operational Solar Capacity - AC", value: "432.9 MW" },
  { particular: "Operational Solar Capacity - DC", value: "553.5 MW" },
  { particular: "Operational Sites", value: "24 Sites Across Tamil Nadu" },
  { particular: "Power Substations (PSS)", value: "4 × 110/33 kV Power Substations" },
  { particular: "Equipment Testing & Health Assessment", value: "450 MW Completed" },
  { particular: "Advanced Inspection Capability", value: "Drone Thermography & IV Curve Testing" },
  { particular: "Service Delivery Model", value: "Integrated In-House + Specialized Third-Party" },
  { particular: "O&M Coverage", value: "Preventive, Corrective & Predictive Maintenance" },
  { particular: "Specialized Services", value: "Micro-PCB Repair, Relay Testing, Drone Inspection" },
];

// ==========================================
// HELPER COMPONENTS
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

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function OMServicesDetail() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="w-full bg-white text-slate-800">
      {/* Top Banner Navigation Bar */}
      <div className="bg-[#f0f9ff] border-b border-[#e0f2fe] py-4 sticky top-16 z-30 shadow-xs">
        <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#329ACD]">
              O&amp;M Scope of Work
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs text-slate-500 font-medium">Detailed Specifications</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <a
              href="#preventive"
              className="px-3 py-1.5 rounded-full bg-white hover:bg-emerald-50 text-slate-700 font-medium border border-slate-200 transition-colors"
            >
              Preventive
            </a>
            <a
              href="#analytics"
              className="px-3 py-1.5 rounded-full bg-white hover:bg-emerald-50 text-slate-700 font-medium border border-slate-200 transition-colors"
            >
              Analytics
            </a>
            <a
              href="#drone-iv"
              className="px-3 py-1.5 rounded-full bg-white hover:bg-emerald-50 text-slate-700 font-medium border border-slate-200 transition-colors"
            >
              Drone &amp; IV Testing
            </a>
            <a
              href="#electrical"
              className="px-3 py-1.5 rounded-full bg-white hover:bg-emerald-50 text-slate-700 font-medium border border-slate-200 transition-colors"
            >
              Substation Testing
            </a>
            <a
              href="#pcb"
              className="px-3 py-1.5 rounded-full bg-white hover:bg-emerald-50 text-slate-700 font-medium border border-slate-200 transition-colors"
            >
              Micro-PCB
            </a>
            <a
              href="#portfolio"
              className="px-3 py-1.5 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
            >
              Portfolio Table
            </a>
          </div>
        </div>
      </div>

      {/* ==========================================
          SECTION 1: PREVENTIVE MAINTENANCE BREAKDOWN
          ========================================== */}
      <section id="preventive" className="w-full py-16 sm:py-20 bg-white border-b border-slate-100 scroll-mt-28">
        <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeaderTag text="SECTION 6.1" />
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#293E52] leading-tight mb-4">
            Preventive Maintenance: Scope &amp; Activities
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-10 max-w-3xl">
            Routine inspections and planned maintenance activities are carried out to identify potential failures
            at an early stage and maintain equipment reliability across all solar PV installations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {preventiveActivities.map((act, idx) => (
              <div
                key={idx}
                className="bg-[#fafcfb] border border-slate-200/80 rounded-2xl p-5 sm:p-6 hover:border-[#3AB257]/40 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-7 h-7 rounded-lg bg-[#3AB257]/15 text-[#3AB257] font-bold text-xs flex items-center justify-center group-hover:bg-[#3AB257] group-hover:text-white transition-colors">
                    {idx + 1}
                  </span>
                  <h3 className="font-bold text-[#173b42] text-sm sm:text-base leading-snug">
                    {act.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {act.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 2: PERFORMANCE MONITORING & ANALYTICS
          ========================================== */}
      <section id="analytics" className="w-full py-16 sm:py-20 bg-[#fafcfb] border-b border-slate-100 scroll-mt-28">
        <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeaderTag text="SECTION 6.3" />
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#293E52] leading-tight mb-4">
            Performance Monitoring &amp; Analytics
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-10 max-w-3xl">
            Continuous monitoring and analysis of plant operating parameters are carried out to identify generation losses,
            equipment abnormalities, and performance deviations in real time.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {monitoringAreas.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#329ACD]" />
                  <h3 className="font-bold text-[#173b42] text-sm">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 3: DRONE THERMOGRAPHY & IV CURVE TESTING
          ========================================== */}
      <section id="drone-iv" className="w-full py-16 sm:py-20 bg-white border-b border-slate-100 scroll-mt-28">
        <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Drone Thermography */}
            <div className="space-y-6">
              <div>
                <SectionHeaderTag text="SECTION 7.1" />
                <h2 className="text-2xl sm:text-3xl font-bold text-[#293E52] leading-tight mb-3">
                  Drone Thermography &amp; Visual Inspection
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Renfra Energy utilizes advanced drone-based thermal imaging and visual inspection technology for efficient
                  and comprehensive inspection of large-scale solar assets. Rapid identification and mapping of anomalies
                  minimizes inspection downtime.
                </p>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-md h-52">
                <img
                  src="/images/pt1.jpg"
                  alt="Drone Thermography Inspection"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-[#f0fdf7] border border-[#bbf7d0] rounded-2xl p-5">
                <h3 className="font-bold text-sm text-[#173b42] mb-3">
                  Supported Defect Identification:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {droneFindings.map((finding, i) => (
                    <span
                      key={i}
                      className="bg-white border border-[#86efac] text-[#166534] text-xs font-medium px-3 py-1 rounded-full shadow-xs"
                    >
                      {finding}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: IV Curve Testing */}
            <div className="space-y-6">
              <div>
                <SectionHeaderTag text="SECTION 8" />
                <h2 className="text-2xl sm:text-3xl font-bold text-[#293E52] leading-tight mb-3">
                  IV Curve Testing (PV Modules &amp; Strings)
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  IV Curve Testing is used to assess the electrical characteristics and performance of PV modules and strings,
                  identifying abnormal operating conditions, cell degradation, and string-level resistive losses.
                </p>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-md h-52">
                <img
                  src="/images/pt2.jpg"
                  alt="IV Curve Testing Tablet Measurement"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-2xl p-5">
                <h3 className="font-bold text-sm text-[#173b42] mb-3">
                  Key Diagnostic Capabilities:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ivCurveFindings.map((finding, i) => (
                    <span
                      key={i}
                      className="bg-white border border-[#7dd3fc] text-[#0369a1] text-xs font-medium px-3 py-1 rounded-full shadow-xs"
                    >
                      {finding}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 4: ELECTRICAL EQUIPMENT & RELAY TESTING
          ========================================== */}
      <section id="electrical" className="w-full py-16 sm:py-20 bg-[#fafcfb] border-b border-slate-100 scroll-mt-28">
        <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeaderTag text="SECTIONS 9 & 10" />
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#293E52] leading-tight mb-4">
            Electrical Equipment Testing &amp; Health Assessment
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-3xl">
            Renfra Energy undertakes comprehensive testing and health assessment of critical electrical equipment through
            a combination of in-house technical capabilities and specialized third-party testing agencies.
          </p>

          {/* 450 MW Experience Callout */}
          <div className="bg-gradient-to-r from-[#173b42] to-[#1f4e57] text-white rounded-2xl p-6 sm:p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">Proven Track Record</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold mt-1">450 MW Tested &amp; Assessed</h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl">
                Covering critical electrical equipment across renewable energy assets, including verification associated
                with 4 × 110/33 kV Power Substations (PSS).
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3AB257] to-[#329ACD] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full transition-all hover:scale-105 hover:opacity-90 shrink-0"
            >
              Request Equipment Audit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Equipment Coverage Cloud */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-base text-[#173b42] mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#329ACD]" /> Equipment Scopes Tested
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {electricalEquipmentList.map((item, i) => (
                  <span
                    key={i}
                    className="bg-[#f0f9ff] border border-[#bae6fd] text-[#0369a1] text-xs font-semibold px-3 py-1.5 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Relay & Protection Testing */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-base text-[#173b42] mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#3AB257]" /> Relay &amp; Protection System Testing
              </h3>
              <ul className="space-y-2.5">
                {relayTestingActivities.map((act, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-[#3AB257] shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 5: MICRO-PCB REPAIR & ELECTRONIC SERVICES
          ========================================== */}
      <section id="pcb" className="w-full py-16 sm:py-20 bg-white border-b border-slate-100 scroll-mt-28">
        <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeaderTag text="SECTION 11" />
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#293E52] leading-tight mb-4">
            Micro-PCB Repair &amp; Electronic Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-10 max-w-3xl">
            Renfra Energy provides component-level troubleshooting, micro-soldering, and board repair for solar inverters,
            trackers, sensors, and SCADA control boards, significantly reducing turnaround time and replacement costs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pcbRepairServices.map((srv, idx) => (
              <div
                key={idx}
                className="bg-[#fafcfb] border border-slate-200/80 rounded-2xl p-5 hover:border-[#329ACD]/50 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center mb-3">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[#173b42] mb-1.5">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {srv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 6: TESTING DELIVERY MODEL & SITE TEAMS
          ========================================== */}
      <section className="w-full py-16 sm:py-20 bg-[#fafcfb] border-b border-slate-100">
        <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left: 5-Step Testing Delivery Model */}
            <div className="lg:col-span-7">
              <SectionHeaderTag text="SECTION 12" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#293E52] leading-tight mb-4">
                Testing Approach &amp; Delivery Model
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                An integrated in-house and third-party testing model deployable based on equipment criticality,
                statutory standards, and customer requirements.
              </p>

              <div className="space-y-4">
                {testingApproachSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-4 shadow-xs"
                  >
                    <span className="text-sm font-black text-[#329ACD] bg-[#f0f9ff] px-2.5 py-1 rounded-lg shrink-0">
                      {step.step}
                    </span>
                    <div>
                      <h3 className="font-bold text-sm text-[#173b42] mb-1">
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Site Engineering Teams (Section 5.2) */}
            <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between">
              <div>
                <SectionHeaderTag text="SECTION 5.2" />
                <h3 className="text-xl font-bold text-[#173b42] mb-3">
                  Site Engineering &amp; Operational Teams
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  Experienced engineers, technicians, and field operational staff support day-to-day plant reliability:
                </p>

                <ul className="space-y-2.5">
                  {siteTeamResponsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                      <Check className="w-4 h-4 text-[#3AB257] shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#3AB257] to-[#329ACD] text-white font-bold text-xs sm:text-sm py-3 rounded-full shadow-lg transition-all hover:scale-[1.02] hover:opacity-90"
                >
                  Contact Operations Team <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 7: COMPLETE PORTFOLIO SUMMARY TABLE
          ========================================== */}
      <section id="portfolio" className="w-full py-16 sm:py-20 bg-white scroll-mt-28">
        <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeaderTag text="SECTIONS 3 & 13" />
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#293E52] leading-tight mb-4">
            Key Experience &amp; Portfolio Summary
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
            Official operational metrics and technical capabilities of Renfra Energy India Limited.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200/80 shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#173b42] text-white text-xs uppercase tracking-wider">
                  <th className="py-4 px-6 font-bold">Scope / Particular</th>
                  <th className="py-4 px-6 font-bold">Experience / Capability Metric</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {portfolioSummary.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-[#173b42]">{row.particular}</td>
                    <td className="py-4 px-6 font-medium text-slate-700">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
            <Link
              href="/operations-maintenance"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#329ACD] hover:text-[#3AB257] transition-colors"
            >
              ← Back to Operations &amp; Maintenance Overview
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3AB257] to-[#329ACD] text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg transition-all hover:scale-105 hover:opacity-90"
            >
              Discuss Your O&amp;M Requirements <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
