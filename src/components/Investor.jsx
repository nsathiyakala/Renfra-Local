"use client"

import React, { useState, useEffect, useMemo, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Download,
  ExternalLink,
  Search,
  Play,
  X,
  ShieldCheck,
  FolderOpen,
  Folder,
  Layers,
  Sparkles,
  CheckCircle2,
  Mail,
  Building2,
  Phone,
  ChevronsUpDown,
  FileCheck2,
  Info,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { axiosGet, BASE_URL } from "@/lib/api"

// ==========================================
// 1. CONSTANTS, ALIASES & INITIAL DATA
// ==========================================

const slugify = (str = "") =>
  String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

const TAB_ALIASES = {
  drhp: "drhp-documents",
  "drhp-documents": "drhp-documents",
  management: "management",
  reg46: "reg-46",
  "reg-46": "reg-46",
  financials: "financials",
  investor: "investor-contacts",
  "investor-contacts": "investor-contacts",
  sebi: "sebi-avs",
  "sebi-avs": "sebi-avs",
  compliance: "stock-exchange-compliance",
  "stock-exchange-compliance": "stock-exchange-compliance",
}

const INITIAL_TABS = [
  { id: "drhp", slug: "drhp-documents", label: "DRHP DOCUMENTS", title: "DRHP DOCUMENTS", tree: [], totalFiles: 0 },
  { id: "management", slug: "management", label: "MANAGEMENT", title: "MANAGEMENT", tree: [], totalFiles: 0 },
  { id: "reg-46", slug: "reg-46", label: "REG 46", title: "REG 46", tree: [], totalFiles: 0 },
  { id: "financials", slug: "financials", label: "FINANCIALS", title: "FINANCIALS", tree: [], totalFiles: 0 },
  { id: "investor-contacts", slug: "investor-contacts", label: "INVESTOR CONTACTS", title: "INVESTOR CONTACTS", tree: [], totalFiles: 0 },
  { id: "sebi-avs", slug: "sebi-avs", label: "SEBI AVS", title: "SEBI AVS", tree: [], totalFiles: 0 },
  { id: "stock-exchange-compliance", slug: "stock-exchange-compliance", label: "STOCK EXCHANGE COMPLIANCE", title: "STOCK EXCHANGE COMPLIANCE", tree: [], totalFiles: 0 },
]

const getTabSlug = (title = "") => {
  const clean = title.toLowerCase().trim()
  if (clean.includes("drhp")) return "drhp-documents"
  if (clean.includes("management")) return "management"
  if (clean.includes("reg 46") || clean.includes("reg46")) return "reg-46"
  if (clean.includes("financial")) return "financials"
  if (clean.includes("contact")) return "investor-contacts"
  if (clean.includes("sebi")) return "sebi-avs"
  if (clean.includes("compliance") || clean.includes("exchange")) return "stock-exchange-compliance"
  return slugify(title)
}

const buildFileSrc = (file) => {
  if (file.url) return file.url
  if (file.file_path) return `${BASE_URL}${file.file_path}`
  return ""
}

const buildFileName = (file) => {
  const safeName = file.file_name || "document"
  const ext = file.file_type ? `.${file.file_type}` : ""
  if (ext && safeName.toLowerCase().endsWith(ext.toLowerCase())) return safeName
  return `${safeName}${ext}`
}

const isDirectVideoUrl = (url = "") => {
  if (!url) return false
  return /\.(mp4|webm|ogg|mov|avi|mkv)(\?.*)?$/i.test(url)
}

const extractYouTubeId = (url = "") => {
  if (!url) return null
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

const resolveVideoSource = (videoUrl = "", youtubeUrl = "") => {
  if (videoUrl && isDirectVideoUrl(videoUrl)) {
    return { type: "direct", src: videoUrl }
  }
  if (videoUrl) {
    const ytId = extractYouTubeId(videoUrl)
    if (ytId) return { type: "youtube", videoId: ytId }
  }
  if (youtubeUrl) {
    const ytId = extractYouTubeId(youtubeUrl)
    if (ytId) return { type: "youtube", videoId: ytId }
  }
  return { type: "none" }
}

const VIDEO_FILE_TYPES = new Set(["video", "mp4", "webm", "ogg", "mov", "avi", "mkv"])

const isVideoFile = (file) => {
  if (!file) return false
  const ft = (file.fileType || "").toLowerCase()
  if (ft && VIDEO_FILE_TYPES.has(ft)) return true
  if (isDirectVideoUrl(file.src || file.url || "")) return true
  if (!ft && file.url) return true
  return false
}

const mapFiles = (files = []) =>
  (files || [])
    .filter((f) => f.active_status !== 0)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map((f) => ({
      id: f.data_uniq_id || slugify(f.file_name),
      name: f.file_name,
      filename: buildFileName(f),
      src: buildFileSrc(f),
      fileType: (f.file_type || "").toLowerCase().trim(),
      url: f.url || "",
      youtubeUrl: f.youtube_url || f.youtube_link || "",
      thumbnailPath: f.thumbnail_path ? `${BASE_URL}${f.thumbnail_path}` : "",
      thumbnailName: f.thumbnail_name || "",
      isUrlVideo: !f.file_type && !!f.url,
    }))

const mapCategoryNode = (node) => ({
  id: node.data_uniq_id || slugify(node.category_name),
  label: node.category_name || "",
  files: mapFiles(node.files),
  children: (node.children || [])
    .filter((c) => c.active_status !== 0)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map(mapCategoryNode),
})

const countNodeFiles = (node) => {
  let count = (node.files || []).length
  for (const child of node.children || []) {
    count += countNodeFiles(child)
  }
  return count
}

const mapInvestorBlock = (block) => {
  const rawId = block.investor_id || slugify(block.investor_title)
  const title = (block.investor_title || "").toUpperCase()
  const slug = getTabSlug(title)
  const tree = (block.data || [])
    .filter((n) => n.active_status !== 0)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map(mapCategoryNode)

  const totalFiles = tree.reduce((acc, node) => acc + countNodeFiles(node), 0)

  return {
    id: rawId,
    slug,
    label: title,
    title,
    tree,
    totalFiles,
  }
}

const transformTabsData = (apiJson) => {
  if (!apiJson || apiJson.action !== "success" || !Array.isArray(apiJson.data)) {
    return []
  }
  return apiJson.data.map(mapInvestorBlock)
}

const collectVideosFromTree = (nodes = []) => {
  const results = []
  const walk = (nodeList) => {
    for (const node of nodeList) {
      for (const f of node.files || []) {
        if (isVideoFile(f)) {
          results.push({
            id: f.id,
            title: f.name || "Corporate Overview",
            subtitle: f.name || "Renfra Corporate Video",
            videoUrl: f.fileType === "video" ? f.src : "",
            youtubeUrl: !f.fileType && f.url ? f.url : f.youtubeUrl || "",
            thumbnailPath: f.thumbnailPath || "",
          })
        }
      }
      if (node.children && node.children.length > 0) {
        walk(node.children)
      }
    }
  }
  walk(nodes)
  return results
}

// ==========================================
// 2. VIDEO PLAYBACK MODAL
// ==========================================

function VideoModal({ video, onClose }) {
  if (!video) return null
  const source = resolveVideoSource(video.videoUrl, video.youtubeUrl)

  return (
    <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="bg-white rounded-3xl max-w-3xl w-full flex flex-col p-5 md:p-6 shadow-2xl relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-black p-2 rounded-full z-20 transition-all cursor-pointer"
          aria-label="Close Playback"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-black aspect-video rounded-2xl overflow-hidden relative flex items-center justify-center mt-3 border border-slate-800">
          {source.type === "direct" && (
            <video
              className="w-full h-full object-contain"
              src={source.src}
              controls
              autoPlay
              preload="auto"
            />
          )}
          {source.type === "youtube" && (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${source.videoId}?autoplay=1`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
          {source.type === "none" && (
            <div className="text-center text-slate-400 p-4">
              <p>No video source available.</p>
            </div>
          )}
        </div>

        <div className="mt-4">
          <span className="text-[10px] font-mono tracking-widest text-[#15803D] uppercase font-bold block">
            Renfra Corporate Media
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
            {video.title}
          </h3>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#293E52] hover:bg-[#1E293B] text-white text-xs font-bold uppercase py-2.5 px-6 rounded-full transition-all cursor-pointer"
          >
            Done Viewing
          </button>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 3. DOCUMENT ITEM ROW COMPONENT
// ==========================================

function DocumentRow({ doc, onDownload }) {
  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-slate-50/70 hover:bg-emerald-50/40 border border-slate-200/80 hover:border-emerald-300 transition-all duration-200">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-red-100/80 text-red-600 flex items-center justify-center shrink-0 border border-red-200/60 shadow-xs">
          <FileText className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h5 className="text-sm font-bold text-[#1E293B] group-hover:text-[#15803D] transition-colors leading-snug break-words">
            {doc.name}
          </h5>
          <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
            <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold uppercase bg-red-100/70 text-red-700">
              PDF
            </span>
            <span className="truncate max-w-[200px] sm:max-w-xs">{doc.filename}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
        <button
          onClick={() => onDownload(doc)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#3AB257] to-[#329ACD] hover:opacity-95 shadow-xs hover:shadow transition-all duration-200 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download</span>
        </button>
        <button
          onClick={() => onDownload(doc)}
          className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          title="Open in new window"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// ==========================================
// 4. CATEGORY ACCORDION COMPONENT
// ==========================================

function CategoryAccordion({ node, depth = 0, onDownload, searchQuery = "", globalExpand = null }) {
  const [isOpen, setIsOpen] = useState(depth === 0)

  // Sync with global Expand All / Collapse All toggle if set
  useEffect(() => {
    if (globalExpand !== null) {
      setIsOpen(globalExpand)
    }
  }, [globalExpand])

  // Filter files by search query if any
  const docFiles = (node.files || []).filter((f) => {
    const isPdf = (f.fileType || "").toLowerCase() === "pdf" || (!f.fileType && !f.url)
    if (!isPdf) return false
    if (!searchQuery) return true
    return (f.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  })

  const hasChildren = node.children && node.children.length > 0
  const hasFiles = docFiles.length > 0
  const isExpandable = hasChildren || hasFiles

  // If search is active and there's a match, auto-open
  useEffect(() => {
    if (searchQuery && (hasFiles || hasChildren)) {
      setIsOpen(true)
    }
  }, [searchQuery, hasFiles, hasChildren])

  if (!isExpandable) {
    return (
      <div className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-600 font-semibold text-sm flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Folder className="w-4 h-4 text-slate-400" />
          <span className="uppercase text-xs sm:text-sm tracking-wide">{node.label}</span>
        </div>
        <span className="text-[11px] uppercase font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
          Filing in progress
        </span>
      </div>
    )
  }

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden mb-3.5 ${
        isOpen
          ? "border-emerald-300/80 bg-white shadow-sm ring-1 ring-emerald-500/10"
          : "border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-xs"
      }`}
    >
      {/* Accordion Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 sm:px-6 py-4 flex items-center justify-between text-left transition-colors cursor-pointer group"
      >
        <div className="flex items-center gap-3 min-w-0 pr-4">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              isOpen
                ? "bg-emerald-100 text-emerald-800"
                : "bg-slate-100 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-700"
            }`}
          >
            {isOpen ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />}
          </div>

          <div className="min-w-0">
            <h4 className="text-sm sm:text-base font-bold text-[#1E293B] uppercase tracking-wide leading-tight truncate">
              {node.label}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              {hasFiles
                ? `${docFiles.length} ${docFiles.length === 1 ? "document" : "documents"}`
                : `${node.children.length} sub-categories`}
            </p>
          </div>
        </div>

        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen ? "bg-emerald-50 text-emerald-700 rotate-180" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      {/* Accordion Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-slate-100"
          >
            <div className="p-4 sm:p-5 space-y-2.5 bg-slate-50/30">
              {/* Render Direct Document Files */}
              {hasFiles && (
                <div className="space-y-2">
                  {docFiles.map((doc) => (
                    <DocumentRow key={doc.id} doc={doc} onDownload={onDownload} />
                  ))}
                </div>
              )}

              {/* Render Nested Child Categories (e.g. for Subsidiaries) */}
              {hasChildren && (
                <div className="space-y-3 pt-2">
                  {node.children.map((child) => (
                    <CategoryAccordion
                      key={child.id}
                      node={child}
                      depth={depth + 1}
                      onDownload={onDownload}
                      searchQuery={searchQuery}
                      globalExpand={globalExpand}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ==========================================
// 5. INNER INVESTOR RELATIONS COMPONENT
// ==========================================

function InvestorRelationsInner() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [tabsData, setTabsData] = useState(INITIAL_TABS)
  const [activeTabSlug, setActiveTabSlug] = useState("drhp-documents")
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeVideo, setActiveVideo] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)
  const [globalExpand, setGlobalExpand] = useState(null)

  // Fetch all investor relations data
  useEffect(() => {
    let isMounted = true

    const fetchTabs = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams({
          web_sts: "1",
          active_status: "1",
          order_type: "asc",
          order_field: "created_date",
        })

        const res = await axiosGet.get(`masters/investor/all-get/?${params.toString()}`)
        const transformed = transformTabsData(res.data)

        if (isMounted && transformed.length > 0) {
          setTabsData(transformed)

          // Determine active tab based on ?tab= query parameter
          const paramTab = searchParams.get("tab")
          if (paramTab) {
            const normalized = TAB_ALIASES[paramTab.toLowerCase()] || paramTab.toLowerCase()
            const match = transformed.find(
              (t) => t.slug === normalized || t.id === paramTab || t.slug.includes(paramTab)
            )
            if (match) {
              setActiveTabSlug(match.slug)
            } else {
              setActiveTabSlug(transformed[0].slug)
            }
          }
        }
      } catch (err) {
        console.error("Failed to load investor relations data:", err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchTabs()
    return () => {
      isMounted = false
    }
  }, [])

  // Sync tab state when URL ?tab= changes externally
  useEffect(() => {
    const paramTab = searchParams.get("tab")
    if (paramTab && tabsData.length > 0) {
      const normalized = TAB_ALIASES[paramTab.toLowerCase()] || paramTab.toLowerCase()
      const match = tabsData.find(
        (t) => t.slug === normalized || t.id === paramTab || t.slug.includes(paramTab)
      )
      if (match) {
        setActiveTabSlug(match.slug)
      }
    }
  }, [searchParams, tabsData])

  // Handle tab click: updates both state & URL parameter
  const handleTabClick = (tab) => {
    setActiveTabSlug(tab.slug)
    setSearchQuery("")
    setGlobalExpand(null)
    router.push(`/investor-relations?tab=${tab.slug}`, { scroll: false })
  }

  // Active Tab Object
  const currentTab = useMemo(() => {
    return (
      tabsData.find((t) => t.slug === activeTabSlug) ||
      tabsData[0] ||
      INITIAL_TABS[0]
    )
  }, [tabsData, activeTabSlug])

  // Collect any video files from the current tab
  const videoFiles = useMemo(() => {
    if (!currentTab) return []
    return collectVideosFromTree(currentTab.tree)
  }, [currentTab])

  // Download handler
  const triggerDownload = (doc) => {
    if (!doc || !doc.src) {
      setToastMessage("File is not available for download yet.")
      setTimeout(() => setToastMessage(null), 3000)
      return
    }
    window.open(doc.src, "_blank", "noopener,noreferrer")
    setToastMessage(`Opening ${doc.name}...`)
    setTimeout(() => setToastMessage(null), 3000)
  }

  return (
    <div className="w-full bg-[#FAFCFB] min-h-screen py-8 md:py-14">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-[#1E293B] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 text-xs font-bold tracking-wide"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= TAB NAVIGATION PILL BAR ================= */}
        <div className="mb-8 md:mb-10">
          <div className="p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl flex items-center gap-2 sm:gap-2.5 ">
            {tabsData.map((tab) => {
              const isActive = activeTabSlug === tab.slug

              return (
                <button
                  key={tab.id || tab.slug}
                  onClick={() => handleTabClick(tab)}
                  className={`
                    px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shrink-0 cursor-pointer select-none
                    ${
                      isActive
                        ? "bg-gradient-to-r from-[#3AB257] to-[#329ACD] text-white shadow-md shadow-emerald-700/15 scale-[1.02]"
                        : "bg-white text-[#293E52] border border-slate-200/90 hover:border-emerald-300 hover:text-[#15803D] hover:bg-slate-50"
                    }
                  `}
                >
                  <span>{tab.label}</span>
                  {tab.totalFiles > 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {tab.totalFiles}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* ================= ACTIVE TAB HEADER & TOOLBAR ================= */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#15803D] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Renfra Energy • Statutory Disclosures</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-tight mt-1">
              {currentTab.title}
            </h2>
          </div>

          {/* Action Toolbar: Expand All & In-Tab Search */}
          <div className="flex flex-wrap items-center gap-3">
            {currentTab.tree.length > 1 && (
              <button
                onClick={() => setGlobalExpand(globalExpand === true ? false : true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-xs transition-colors cursor-pointer"
              >
                <ChevronsUpDown className="w-3.5 h-3.5 text-slate-500" />
                <span>{globalExpand === true ? "Collapse All" : "Expand All"}</span>
              </button>
            )}

            {currentTab.totalFiles > 0 && (
              <div className="relative w-full sm:w-64 md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter documents..."
                  className="w-full pl-9 pr-8 py-2 rounded-full border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#3AB257] focus:ring-2 focus:ring-[#3AB257]/20 shadow-xs transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ================= MAIN CONTENT AREA ================= */}
        <div className="w-full">
          {loading && currentTab.tree.length === 0 && (
            <div className="space-y-4 py-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />
              ))}
            </div>
          )}

          {/* Videos Grid (for SEBI AVS or video files) */}
          {videoFiles.length > 0 && (
            <div className="mb-10">
              <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Play className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>Audio Visual Overview</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videoFiles.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => setActiveVideo(v)}
                    className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 bg-slate-900"
                  >
                    {v.thumbnailPath ? (
                      <img
                        src={v.thumbnailPath}
                        alt={v.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center opacity-90" />
                    )}

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Centered Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#3AB257] to-[#329ACD] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ring-4 ring-white/20">
                        <Play className="w-6 h-6 fill-white ml-1" />
                      </div>
                    </div>

                    {/* Video Title on bottom */}
                    <div className="absolute bottom-4 inset-x-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        Official SEBI AVS
                      </span>
                      <h4 className="text-white text-base sm:text-lg font-bold leading-snug drop-shadow-sm mt-0.5">
                        {v.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Document Categories Tree */}
          {currentTab.tree.length > 0 && (
            <div className="space-y-4">
              {currentTab.tree.map((node) => (
                <CategoryAccordion
                  key={node.id}
                  node={node}
                  depth={0}
                  onDownload={triggerDownload}
                  searchQuery={searchQuery}
                  globalExpand={globalExpand}
                />
              ))}
            </div>
          )}

          {/* Quick Contact Desk Card for INVESTOR CONTACTS tab */}
          {currentTab.slug === "investor-contacts" && (
            <div className="mt-8 rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#15803D] flex items-center justify-center border border-emerald-100">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">
                    Investor Grievance & Compliance Desk
                  </h4>
                  <p className="text-xs text-slate-500">
                    Renfra Energy Limited • Dedicated Investor Relations Assistance
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <Mail className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Grievance Redressal Email
                    </span>
                    <a
                      href="mailto:info@renfraenergy.com"
                      className="text-sm font-bold text-slate-800 hover:text-emerald-600 transition-colors"
                    >
                      info@renfraenergy.com
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Compliance Direct Line
                    </span>
                    <a
                      href="tel:+917094488909"
                      className="text-sm font-bold text-slate-800 hover:text-emerald-600 transition-colors"
                    >
                      +91 70944 88909
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Special State: Stock Exchange Compliance / Empty Tab Placeholder */}
          {!loading && currentTab.tree.length === 0 && videoFiles.length === 0 && (
            <div className="py-16 px-6 text-center max-w-xl mx-auto rounded-3xl bg-white border border-slate-200/90 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#15803D] flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-xs">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                Statutory Filings in Pipeline
              </h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                Official regulatory intimations and quarterly filings under SEBI (LODR) Regulations will be updated here in compliance with exchange guidelines.
              </p>
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-xs font-semibold text-slate-600">
                <Mail className="w-4 h-4 text-[#15803D]" />
                <span>For investor inquiries: </span>
                <a
                  href="mailto:info@renfraenergy.com"
                  className="text-[#15803D] hover:underline font-bold"
                >
                  info@renfraenergy.com
                </a>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </div>
  )
}

// ==========================================
// 6. MAIN EXPORT WITH SUSPENSE WRAPPER
// ==========================================

export default function NewInvestorSection() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center text-slate-400 font-semibold uppercase tracking-wider text-xs">
          Loading Investor Disclosures...
        </div>
      }
    >
      <InvestorRelationsInner />
    </Suspense>
  )
}
