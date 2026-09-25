"use client"

import { useEffect, useState } from "react"
import { ExternalLink, ChevronRight, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { axiosGet, BASE_URL } from "@/lib/api"

// Curated default projects matching the design screenshot
const FALLBACK_PROJECTS = [
  {
    id: "proj-1",
    title: "210 MW Renewable Portfolio (Northern Zone)",
    location: "Tamil Nadu",
    category: "Multi-Technology",
    badge: "FLAGSHIP PORTFOLIO",
    description:
      "Renfra has a proven track record of working on multi-technology projects, including strong grid interconnection, storage, grid and interconnection.",
    image: "https://bkrenfraenergy.irepute.in/media/projects/210_MW_project-2026-08-14_05-20-48.png",
    fallbackImage: "/images/about.png",
    link: "/projects",
  },
  {
    id: "proj-2",
    title: "3.42 MWh Battery Energy Storage (BESS)",
    location: "Tamil Nadu",
    category: "Utility Storage",
    badge: "ENERGY STORAGE",
    description:
      "Renfra is one of the very few companies in the region to successfully install and operate Battery Energy Storage Systems in one of its project sites as a pilot project. Commissioned in a record 60 days.",
    image: "https://bkrenfraenergy.irepute.in/media/projects/3-2026-08-14_05-22-03.png",
    fallbackImage: "/images/about.png",
    link: "/projects",
  },
  {
    id: "proj-3",
    title: "213 MW Solar Farm",
    location: "Tamil Nadu",
    category: "High Yield Solar",
    badge: "SOLAR FARM",
    description:
      "Successfully executed landmark solar installation project designed for exceptional yield across complex soil and grid conditions.",
    image: "https://bkrenfraenergy.irepute.in/media/projects/213_MW_project-2026-08-14_05-20-37.jpeg",
    fallbackImage: "/images/about.png",
    link: "/projects",
  },
  {
    id: "proj-4",
    title: "147.5 MW Solar Projects (Central Zone)",
    location: "Tamil Nadu",
    category: "Solar Energy",
    badge: "SOLAR UTILITY",
    description:
      "High-efficiency utility-scale solar generation facility integrated with regional grid substations, featuring automated single-axis tracking modules.",
    image: "https://bkrenfraenergy.irepute.in/media/projects/147-2026-08-14_05-21-14.jpeg",
    fallbackImage: "/images/about.png",
    link: "/projects",
  },
  {
    id: "proj-5",
    title: "49.5 MW Wind Projects – Installation and O&M",
    location: "Tamil Nadu",
    category: "Wind Energy",
    badge: "WIND ENERGY",
    description:
      "High-capacity wind turbine installations with round-the-clock monitoring and predictive blade maintenance ensuring maximal generation uptime.",
    image: "https://bkrenfraenergy.irepute.in/media/projects/49-2026-08-14_05-21-25.jpg",
    fallbackImage: "/images/about.png",
    link: "/projects",
  },
  {
    id: "proj-6",
    title: "Advanced Predictive Maintenance & Asset Management",
    location: "Tamil Nadu",
    category: "Operations & Maintenance",
    badge: "O&M ASSETS",
    description:
      "Comprehensive maintenance strategy utilizing AI-enabled drone technology for real-time monitoring of WTG blades, transformers, and 33 kV transmission lines.",
    image: "https://bkrenfraenergy.irepute.in/media/projects/s-05-2026-06-29_at_09-2026-06-29_03-34-12-2026-08-14_12-46-15.jpeg",
    fallbackImage: "/images/about.png",
    link: "/projects",
  },
  {
    id: "proj-7",
    title: "462.35 MW Solar O&M",
    location: "Tamil Nadu",
    category: "Solar O&M",
    badge: "O&M PORTFOLIO",
    description:
      "Overseeing 462.35 megawatts of operational solar assets, ensuring maximum uptime and high plant performance ratio through advanced telemetry.",
    image: "https://bkrenfraenergy.irepute.in/media/projects/s05-2026-04-27_04-59-48-2026-08-14_12-47-10.png",
    fallbackImage: "/images/about.png",
    link: "/projects",
  },
]

// Helper to determine tag matching screenshot styling
const getProjectTag = (item) => {
  const title = (item.title || item.name || "").toLowerCase()
  const solution = (item.solution_name || "").toLowerCase()
  const desc = (item.description || "").toLowerCase()

  if (title.includes("renewable portfolio") || desc.includes("multi-technology")) {
    return "Multi-Technology"
  }
  if (title.includes("battery") || solution.includes("battery")) {
    return "Utility Storage"
  }
  if (title.includes("213 mw") || title.includes("solar farm")) {
    return "High Yield Solar"
  }
  if (solution.includes("solar") || title.includes("solar")) {
    return "Solar Energy"
  }
  if (solution.includes("wind") || title.includes("wind")) {
    return "Wind Energy"
  }
  if (solution.includes("maintenance") || solution.includes("o&m")) {
    return "Operations & Maintenance"
  }
  return item.solution_name || "Renewable Energy"
}

// Clean HTML tags and entities for descriptions
const cleanHtmlDescription = (raw) => {
  if (!raw) return ""
  return raw
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

const limitDescription = (description, maxLength = 300) => {
  if (description.length <= maxLength) return description
  return `${description.slice(0, maxLength).trimEnd()}...`
}

export function OurProjectsSection() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS)
  const [selectedProject, setSelectedProject] = useState(FALLBACK_PROJECTS[0])
  const [isPaused, setIsPaused] = useState(false)
  const [loading, setLoading] = useState(false)

  // Fetch live projects from CMS / API
  useEffect(() => {
    let isMounted = true

    const fetchProjects = async () => {
      try {
        setLoading(true)
        const res = await axiosGet.get(
          `masters/projects/get/?web_sts=1&order_type=asc&order_field=created_date&get_sts=1`
        )

        const data = res.data?.data || []
        if (data.length > 0 && isMounted) {
          const formatted = data.map((item, index) => {
            const imgUrl = item.image_path
              ? (item.image_path.startsWith("http") ? item.image_path : `${BASE_URL}${item.image_path}`)
              : "/images/about.png"

            return {
              id: item.data_uniq_id || `proj-${index}`,
              title: item.title || item.name || "Renewable Project",
              location: item.location || "Tamil Nadu",
              category: getProjectTag(item),
              badge: index === 0 ? "FLAGSHIP PORTFOLIO" : "FLAGSHIP PROJECT",
              description: cleanHtmlDescription(item.description) || "Leading clean energy infrastructure project engineered for high-performance and reliable green power generation.",
              image: imgUrl,
              fallbackImage: "/images/about.png",
              link: "/projects",
            }
          })

          setProjects(formatted)
          setSelectedProject(formatted[0])
        }
      } catch (err) {
        console.warn("Using fallback projects data:", err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchProjects()
    return () => {
      isMounted = false
    }
  }, [])

  // Card click handler: selects project to display on the left card
  const handleCardClick = (project) => {
    setSelectedProject(project)
  }

  // Duplicate the track so the animation can loop without a visible reset.
  const displayList = projects.length >= 2 ? projects : FALLBACK_PROJECTS
  const loopList = [...displayList, ...displayList]

  return (
    <section className="w-full bg-[#F8FAF9] py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="mb-10 flex flex-col lg:flex-row lg:justify-between lg:items-start">
          <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#293E52]">
              Signature Projects
            </h2>
            <a
              href="/projects"
              className="text-[#10B981] hover:text-[#059669] transition-colors p-1"
              aria-label="View all signature projects"
            >
              <ExternalLink className="w-6 sm:w-7 h-6 sm:h-7"
              strokeWidth={2}
              style={{ stroke: "url(#grad)" }} />
            </a>
          </div>

          <p className="mt-3 text-[#475569] text-base md:text-lg leading-relaxed max-w-xl">
            Delivering exceptional projects in India and Overseas to clients looking for long time value.
          </p>

          </div>

          <div className="mt-5 lg:mt-0 w-fit">
            <a
              href="/projects"
             className="
        px-6 py-3 rounded-full text-white font-semibold
        bg-gradient-to-r from-[#3AB257] to-[#329ACD]
        hover:opacity-90 transition-all duration-300
        flex items-center gap-2 cursor-pointer
      "
            >
              <span>Know More</span>
              {/* <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" /> */}
            </a>
          </div>
        </div>

        {/* ================= MAIN 2-COLUMN DISPLAY ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ================= LEFT CARD (FEATURED / ACTIVE) ================= */}
          <div className="lg:col-span-8 w-full h-[460px] md:h-[480px] bg-white rounded-3xl border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] overflow-hidden">
            <AnimatePresence mode="wait">
              {selectedProject && (
                <motion.div
                  key={selectedProject.id || selectedProject.title}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex flex-col h-full w-full"
                >
                  {/* Left Half: Image */}
                  <div className="relative w-full h-50 md:h-70 bg-slate-900 overflow-hidden flex-shrink-0">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      onError={(e) => {
                        e.currentTarget.src = selectedProject.fallbackImage || "/images/about.png"
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />

                 
                  </div>

                  {/* Right Half: Content with Description */}
                  <div className="w-full p-6 sm:p-7 md:p-8 flex flex-col justify-between bg-white">
                    {/* Top Group */}
                    <div>
                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#16A34A]">
                        <MapPin className="w-3.5 h-3.5 fill-[#16A34A] text-[#16A34A]" />
                        <span>{selectedProject.location || "Tamil Nadu"}</span>
                      </div>

                      {/* Title */}
                      <h3 className="mt-2.5 text-xl sm:text-2xl font-bold text-[#1E293B] leading-tight line-clamp-2">
                        {selectedProject.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-3.5 text-slate-600 text-sm md:text-[15px] leading-relaxed">
                        {limitDescription(selectedProject.description || "", 200)}
                      </p>
                    </div>

                    {/* Bottom Row: Tag & Explore Action */}
                    {/* <div className="pt-5 mt-4 flex items-center justify-between border-t border-slate-100">
                      <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#F1F5F9] text-slate-700 border border-slate-200/60">
                        {selectedProject.category || "Multi-Technology"}
                      </span>

                      <a
                        href={selectedProject.link || "/projects"}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-[#15803D] hover:text-[#0E5C2A] transition-colors group/link"
                      >
                        <span>Explore Project</span>
                        <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" />
                      </a>
                    </div> */}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ================= RIGHT COLUMN (VERTICAL SLIDER - ONLY IMAGE & TITLE) ================= */}
          <div
            className="lg:col-span-4 w-full flex flex-col"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Top Bar above slider */}
            {/* <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Explore Projects ({displayList.length})
              </span>
            </div> */}

            {/* Vertical Slider Window */}
            <div className="relative h-[460px] md:h-[480px] overflow-hidden rounded-3xl">
              <div
                className="project-loop flex flex-col gap-4 will-change-transform"
                style={{
                  animationDuration: `${Math.max(18, displayList.length * 4.5)}s`,
                  animationPlayState: isPaused ? "paused" : "running",
                }}
              >
                {loopList.map((project, idx) => {
                  const isSelected =
                    selectedProject?.id === project.id || selectedProject?.title === project.title

                  return (
                    <div
                      key={`${project.id}-${idx}`}
                      onClick={() => handleCardClick(project)}
                        className={`
                        group relative h-[108px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300
                        ${
                          isSelected
                            ? "border-2 border-[#16A34A] shadow-md ring-2 ring-[#16A34A]/10"
                            : "border border-slate-200/90 hover:border-slate-300 hover:shadow-md"
                        }
                      `}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        onError={(e) => {
                          e.currentTarget.src = project.fallbackImage || "/images/about.png"
                        }}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/25" />

                      <div className="absolute inset-x-0 bottom-0 z-10 p-3 sm:p-4">
                        <h4
                          className="text-sm sm:text-base leading-snug text-white drop-shadow-sm line-clamp-2"
                        >
                          {project.title}
                        </h4>

                        {isSelected && (
                          <div className="absolute right-3 bottom-4 flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75"></span>
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

// Exports for backward compatibility
export const ProjectHomeSection = OurProjectsSection
export const OurProjects = OurProjectsSection
export default OurProjectsSection
