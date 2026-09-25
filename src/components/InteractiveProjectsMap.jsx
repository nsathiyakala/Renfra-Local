"use client"

import { useState } from "react"
import { Sun, Wind } from "lucide-react"

// ============================================================
// DATASETS: Strictly city name, value, and type from the map images
// ============================================================

export const COMPLETED_PROJECTS = [
  // Left side callouts
  { id: "c-villupuram", city: "Villupuram", value: "6.5 MW", type: "solar", x: 60.0, y: 31.8, side: "left" },
  { id: "c-trichy-wind", city: "Trichy", value: "49.5 MW", type: "wind", x: 42.1, y: 48.2, side: "left" },
  { id: "c-pudukkottai", city: "Pudukkottai", value: "37 MW", type: "solar", x: 50.4, y: 58.8, side: "left" },
  { id: "c-tirunelveli", city: "Tirunelveli", value: "31 MW", type: "solar", x: 23.5, y: 85.8, side: "left" },

  // Right side callouts
  { id: "c-tiruvannamalai", city: "Tiruvannamalai", value: "20 MW", type: "solar", x: 56.3, y: 21.6, side: "right" },
  { id: "c-cuddalore", city: "Cuddalore", value: "16 MW", type: "solar", x: 63.7, y: 38.7, side: "right" },
  { id: "c-pondicherry", city: "Pondicherry", value: "10.85 MW", type: "solar", x: 69.5, y: 34.9, side: "right" },
  { id: "c-trichy-solar", city: "Trichy", value: "50.50 MW", type: "solar", x: 44.8, y: 47.2, side: "right" },
  { id: "c-nagapattinam", city: "Nagapattinam", value: "15 MW", type: "solar", x: 75.6, y: 49.8, side: "right" },
  { id: "c-ramanathapuram", city: "Ramanathapuram", value: "31 MW", type: "solar", x: 48.2, y: 75.3, side: "right" },
  { id: "c-tuticorin", city: "Tuticorin", value: "195 MW", type: "solar", x: 36.2, y: 81.6, side: "right" },
]

export const ONGOING_PROJECTS = [
  // Left side callouts
  { id: "o-tiruvananamalai", city: "Tiruvananamalai", value: "5 MW", type: "solar", x: 56.3, y: 21.6, side: "left" },
  { id: "o-karur", city: "Karur", value: "49.50 MW", type: "wind", x: 37.9, y: 49.9, side: "left" },

  // Right side callouts
  { id: "o-thiruvallur", city: "Thiruvallur", value: "25 MW", type: "solar", x: 75.1, y: 9.7, side: "right" },
  { id: "o-pondicherry", city: "Pondicherry", value: "4.95 MW", type: "solar", x: 69.5, y: 34.9, side: "right" },
  { id: "o-trichy", city: "Trichy", value: "6.6 MW", type: "wind", x: 44.8, y: 47.2, side: "right" },

  // Bottom callout
  { id: "o-tuticorin", city: "Tuticorin", value: "48 MW", type: "solar", x: 36.2, y: 81.6, side: "bottom" },
]

// ============================================================
// ICONS: Matching the exact graphics from completed-map.png & ongoing-map.png
// ============================================================

function SolarArtworkIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <circle cx="36" cy="12" r="6" fill="#F59E0B" />
      <g stroke="#F59E0B" strokeWidth="2" strokeLinecap="round">
        <line x1="36" y1="2" x2="36" y2="4" />
        <line x1="36" y1="20" x2="36" y2="22" />
        <line x1="26" y1="12" x2="28" y2="12" />
        <line x1="44" y1="12" x2="46" y2="12" />
        <line x1="29" y1="5" x2="30.5" y2="6.5" />
        <line x1="41.5" y1="17.5" x2="43" y2="19" />
        <line x1="29" y1="19" x2="30.5" y2="17.5" />
        <line x1="41.5" y1="6.5" x2="43" y2="5" />
      </g>
      <g>
        <polygon points="6,34 16,16 34,16 38,34" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5" />
        <line x1="15" y1="16" x2="16" y2="34" stroke="#93C5FD" strokeWidth="1" />
        <line x1="25" y1="16" x2="27" y2="34" stroke="#93C5FD" strokeWidth="1" />
        <line x1="11" y1="25" x2="36" y2="25" stroke="#93C5FD" strokeWidth="1" />
      </g>
      <path d="M22,34 L22,40 M16,40 L28,40" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function WindArtworkIcon({ className = "w-6 h-6", spinning = false }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <polygon points="18,44 19.5,20 21.5,20 23,44" fill="#1E293B" />
      <polygon points="31,44 32,26 33.5,26 34.5,44" fill="#475569" opacity="0.8" />
      <g
        className={spinning ? "origin-[20.5px_20px] animate-[spin_3s_linear_infinite]" : "origin-[20.5px_20px]"}
        style={{ transformOrigin: "20.5px 20px" }}
      >
        <circle cx="20.5" cy="20" r="2" fill="#0F172A" />
        <path d="M20.5,20 C19,13 20.5,5 21,5 C21.5,5 22.5,13 20.5,20 Z" fill="#0F172A" />
        <path d="M20.5,20 C27,22 34,28 33.5,28.5 C33,29 25,25 20.5,20 Z" fill="#0F172A" />
        <path d="M20.5,20 C14,24 8,30 7.5,29.5 C7,29 14,22 20.5,20 Z" fill="#0F172A" />
      </g>
      <g
        className={spinning ? "origin-[32.8px_26px] animate-[spin_2.5s_linear_infinite]" : "origin-[32.8px_26px]"}
        style={{ transformOrigin: "32.8px 26px" }}
      >
        <circle cx="32.8" cy="26" r="1.5" fill="#334155" />
        <path d="M32.8,26 C31.5,20 32.8,14 33.2,14 C33.6,14 34.2,20 32.8,26 Z" fill="#334155" />
        <path d="M32.8,26 C38,28 43,32 42.5,32.5 C42,33 36,30 32.8,26 Z" fill="#334155" />
        <path d="M32.8,26 C28,29 23,34 22.5,33.5 C22,33 27,27 32.8,26 Z" fill="#334155" />
      </g>
    </svg>
  )
}

// ============================================================
// CALLOUT CARD: Shows ONLY City Name and Value (with matching icon)
// ============================================================

function CalloutCard({ project, isHovered, onHover, onLeave }) {
  const isSolar = project.type === "solar"

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`cursor-pointer rounded-xl bg-white border px-2 py-1.5 text-center transition-all duration-200 ${
        isHovered
          ? "border-[#15803D] ring-2 ring-[#15803D]/25 shadow-lg scale-105"
          : "border-slate-800/80 hover:border-slate-900 shadow-sm hover:shadow"
      }`}
    >
      <div className="flex justify-center mb-0.5">
        {isSolar ? (
          <SolarArtworkIcon className="w-5 h-5" />
        ) : (
          <WindArtworkIcon className="w-5 h-5" spinning={isHovered} />
        )}
      </div>
      <p className="text-[11px] font-bold text-[#1E3A8A] leading-tight break-words">
        {project.city}
      </p>
      <p className="text-[11px] font-extrabold text-[#15803D] leading-tight">
        {project.value}
      </p>
    </div>
  )
}

// ============================================================
// SINGLE MAP COMPONENT
// ============================================================

function ProjectMap({ mode = "completed" }) {
  const isCompleted = mode === "completed"
  const projects = isCompleted ? COMPLETED_PROJECTS : ONGOING_PROJECTS
  const mapSvgUrl = isCompleted
    ? "/images/tamil-nadu-completed.svg"
    : "/images/tamil-nadu-ongoing.svg"

  const [hoveredId, setHoveredId] = useState(null)

  const leftProjects = projects.filter((p) => p.side === "left")
  const rightProjects = projects.filter((p) => p.side === "right")
  const bottomProject = projects.find((p) => p.side === "bottom")

  return (
    <div className="w-full rounded-3xl border border-slate-200/90 bg-[#F9FBFA] shadow-md p-4 sm:p-6 lg:p-7 flex flex-col justify-between overflow-hidden">
      
      {/* ================= TITLE (Matching images) ================= */}
      <div className="pb-3 border-b border-slate-200/70">
        <h3 className="text-xl sm:text-xl font-black tracking-tight">
          <span className="text-[#1E3A8A]">
            {isCompleted ? "COMPLETED" : "ON GOING"}
          </span>{" "}
          <span className="text-[#15803D]">PROJECTS</span>
        </h3>
      </div>

      {/* ================= MAP + SIDE CARDS — desktop (grid: cards | map | cards) ================= */}
      <div className="my-4 hidden md:grid gap-2" style={{ gridTemplateColumns: "90px 1fr 90px" }}>

        {/* LEFT CARDS */}
        <div className="flex flex-col gap-2 justify-around">
          {leftProjects.map((project) => (
            <CalloutCard key={project.id} project={project}
              isHovered={hoveredId === project.id}
              onHover={() => setHoveredId(project.id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </div>

        {/* CENTER MAP */}
        <div className="flex flex-col items-center justify-between gap-2">
          <div className="relative w-full max-w-[450px] aspect-[1640/2032] mx-auto select-none">
            <img
              src={mapSvgUrl}
              alt="Tamil Nadu Map"
              className="w-full h-full object-contain drop-shadow-sm pointer-events-none"
              onError={(e) => { e.currentTarget.src = isCompleted ? "/images/completed-map.png" : "/images/ongoing-map.png" }}
            />
            {projects.map((project) => {
              const isHovered = hoveredId === project.id
              const isSolar = project.type === "solar"
              return (
                <div key={project.id}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{ left: `${project.x}%`, top: `${project.y}%`, transform: "translate(-50%, -50%)" }}
                  className="absolute z-20 cursor-pointer"
                >
                  <span className="absolute -inset-2 rounded-full bg-[#15803D]/30 animate-ping pointer-events-none" />
                  <div className={`relative flex items-center justify-center rounded-full transition-all duration-300 shadow-md ${
                    isHovered ? "w-6 h-6 ring-4 ring-[#15803D] bg-[#15803D] text-white scale-125 z-30"
                    : isSolar ? "w-4 h-4 bg-amber-500 text-white ring-2 ring-white hover:scale-110"
                    : "w-4 h-4 bg-cyan-600 text-white ring-2 ring-white hover:scale-110"
                  }`}>
                    {isSolar ? <Sun className="w-2.5 h-2.5 stroke-[2.5]" /> : <Wind className="w-2.5 h-2.5 stroke-[2.5]" />}
                  </div>
                  {isHovered && (
                    <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 whitespace-nowrap bg-slate-900/95 text-white px-5 py-3 rounded-lg shadow-xl text-xs font-bold pointer-events-none z-60 border border-slate-700">
                      <span className="text-[#93C5FD] text-lg">{project.city} :{" "}</span> 
                      <span className="text-[#4ADE80] text-lg">{project.value}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          {!isCompleted && bottomProject && (
            <div className="w-[90px]">
              <CalloutCard project={bottomProject}
                isHovered={hoveredId === bottomProject.id}
                onHover={() => setHoveredId(bottomProject.id)}
                onLeave={() => setHoveredId(null)}
              />
            </div>
          )}
        </div>

        {/* RIGHT CARDS */}
        <div className="flex flex-col gap-2 justify-around">
          {rightProjects.map((project) => (
            <CalloutCard key={project.id} project={project}
              isHovered={hoveredId === project.id}
              onHover={() => setHoveredId(project.id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </div>

      </div>

      {/* ================= MOBILE: map full width + cards grid below ================= */}
      <div className="md:hidden my-4 flex flex-col items-center gap-4">
        <div className="relative w-full max-w-[300px] aspect-[1640/2032] select-none">
          <img
            src={mapSvgUrl}
            alt="Tamil Nadu Map"
            className="w-full h-full object-contain drop-shadow-sm pointer-events-none"
            onError={(e) => { e.currentTarget.src = isCompleted ? "/images/completed-map.png" : "/images/ongoing-map.png" }}
          />
          {projects.map((project) => {
            const isHovered = hoveredId === project.id
            const isSolar = project.type === "solar"
            return (
              <div key={project.id}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ left: `${project.x}%`, top: `${project.y}%`, transform: "translate(-50%, -50%)" }}
                className="absolute z-20 cursor-pointer"
              >
                <span className="absolute -inset-2 rounded-full bg-[#15803D]/30 animate-ping pointer-events-none" />
                <div className={`relative flex items-center justify-center rounded-full transition-all duration-300 shadow-md ${
                  isHovered ? "w-6 h-6 ring-4 ring-[#15803D] bg-[#15803D] text-white scale-125 z-30"
                  : isSolar ? "w-4 h-4 bg-amber-500 text-white ring-2 ring-white"
                  : "w-4 h-4 bg-cyan-600 text-white ring-2 ring-white"
                }`}>
                  {isSolar ? <Sun className="w-2.5 h-2.5 stroke-[2.5]" /> : <Wind className="w-2.5 h-2.5 stroke-[2.5]" />}
                </div>
                {isHovered && (
                   <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 whitespace-nowrap bg-slate-900/95 text-white px-5 py-3 rounded-lg shadow-xl text-xs font-bold pointer-events-none z-60 border border-slate-700">
                      <span className="text-[#93C5FD] text-lg">{project.city} :{" "}</span> 
                      <span className="text-[#4ADE80] text-lg">{project.value}</span>
                    </div>
                )}
              </div>
            )
          })}
        </div>
        <div className="w-full grid grid-cols-3 gap-2">
          {projects.map((project) => (
            <CalloutCard key={project.id} project={project}
              isHovered={hoveredId === project.id}
              onHover={() => setHoveredId(project.id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </div>
      </div>

      {/* ================= TOTAL CAPACITY SUMMARY BOX (Matching images exactly) ================= */}
      <div className="mt-4 pt-3 border-t border-slate-200">
        {isCompleted ? (
          // Completed Projects: "Total Capacity" with Solar 412.85 MW and Wind 49.5 MW
          // <div className="bg-white rounded-2xl border border-slate-800/80 p-3 sm:p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
          //   <h4 className="text-base sm:text-lg font-bold text-[#1E3A8A]">
          //     Total Capacity
          //   </h4>

          //   <div className="flex items-center gap-6 sm:gap-8">
          //     <div className="flex items-center gap-2">
          //       <SolarArtworkIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          //       <span className="text-base sm:text-lg font-extrabold text-[#15803D]">
          //         412.85 MW
          //       </span>
          //     </div>
          //     <div className="flex items-center gap-2">
          //       <WindArtworkIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          //       <span className="text-base sm:text-lg font-extrabold text-[#15803D]">
          //         49.5 MW
          //       </span>
          //     </div>
          //   </div>
          // </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl border border-slate-800/80 p-3 shadow-sm flex items-center gap-3">
              <SolarArtworkIcon className="w-8 h-8 sm:w-9 sm:h-9" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#1E3A8A]">
                  Total Solar Capacity
                </p>
                <p className="text-base sm:text-lg font-extrabold text-[#15803D]">
                  412.85 MW
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-800/80 p-3 shadow-sm flex items-center gap-3">
              <WindArtworkIcon className="w-8 h-8 sm:w-9 sm:h-9" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#1E3A8A]">
                  Total Wind Capacity
                </p>
                <p className="text-base sm:text-lg font-extrabold text-[#15803D]">
                  49.5 MW
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Ongoing Projects: Total Solar Capacity 83 MW & Total Wind Capacity 56.10 MW
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl border border-slate-800/80 p-3 shadow-sm flex items-center gap-3">
              <SolarArtworkIcon className="w-8 h-8 sm:w-9 sm:h-9" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#1E3A8A]">
                  Total Solar Capacity
                </p>
                <p className="text-base sm:text-lg font-extrabold text-[#15803D]">
                  83 MW
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-800/80 p-3 shadow-sm flex items-center gap-3">
              <WindArtworkIcon className="w-8 h-8 sm:w-9 sm:h-9" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#1E3A8A]">
                  Total Wind Capacity
                </p>
                <p className="text-base sm:text-lg font-extrabold text-[#15803D]">
                  56.10 MW
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

// ============================================================
// EXPORT: Clean 2-column dual map section matching CompletedProjects
// ============================================================

export default function InteractiveProjectsMap() {
  return (
    <section className="w-[90%] mx-auto pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <ProjectMap mode="completed" />
        <ProjectMap mode="ongoing" />
      </div>
    </section>
  )
}
