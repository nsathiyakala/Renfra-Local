"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { axiosGet } from "@/lib/api";
import { IMG_ENDPOINT } from "@/lib/config";

export function TabSolutionSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [tabsData, setTabsData] = useState([]);
  const [tabContent, setTabContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const currentTab = tabsData[activeTab];

  // Load all solution tabs
  const fetchTabsData = async () => {
    try {
      setLoading(true);
      const response = await axiosGet.get(
        "masters/solutions/get/?web_sts=1&active_status=1&order_type=asc&order_field=created_date"
      );
      const tabs = response.data.data;
      setTabsData(tabs);
      if (tabs.length > 0) {
        fetchContentData(tabs[0].data_uniq_id);
      }
    } catch (err) {
      console.error("Tabs Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load content for specific solution
  const fetchContentData = async (uniqId) => {
    if (!uniqId) return;
    setLoading(true);
    try {
      const response = await axiosGet.get(
        `masters/solutions/content/get/?solution_id=${uniqId}&web_sts=1`
      );
      const contentObj = response.data.data?.[0]?.data;
      setTabContent(contentObj || null);
    } catch (err) {
      console.error("Content Error:", err);
      setTabContent(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTabsData();
  }, []);

  useEffect(() => {
    if (currentTab?.data_uniq_id) {
      fetchContentData(currentTab.data_uniq_id);
    }
  }, [activeTab]);

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (loading && tabsData.length === 0) {
    return (
      <div className="w-full py-20 text-center text-[#293E52] text-lg font-semibold">
        Loading...
      </div>
    );
  }

  if (tabsData.length === 0 && !loading) {
    return (
      <div className="w-full py-20 text-center text-[#293E52] text-lg font-semibold">
        No Solutions Found
      </div>
    );
  }

  // ── Content extraction ────────────────────────────────────────────────────
  const mainDesc = tabContent?.content?.[0]?.description || "";

  // Static service tags per solution title (shown as pill tags under description)
  const SERVICE_TAGS = {
    solar:       ["Design & Engineering", "Procurement", "Construction & Installation", "Operations & Maintenance"],
    wind:        ["Design & Engineering", "Procurement", "Construction & Installation", "Operations & Maintenance"],
    battery:     ["Design & Engineering", "Procurement", "Installation", "Commissioning"],
    operations:  ["Preventive Maintenance", "Corrective Maintenance", "Performance Monitoring", "Asset Management"],
  };
  const titleKey = currentTab?.title?.toLowerCase() || "";
  const services =
    titleKey.includes("solar")   ? SERVICE_TAGS.solar :
    titleKey.includes("wind")    ? SERVICE_TAGS.wind :
    titleKey.includes("battery") ? SERVICE_TAGS.battery :
    titleKey.includes("operat")  ? SERVICE_TAGS.operations :
    SERVICE_TAGS.solar;

  return (
    <section className="w-full bg-[#fff] py-10 sm:py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">

        {/* ── TOP ROW: Heading left | Tabs right ──────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12 mb-10 sm:mb-12">

          {/* Left – heading block */}
          <div className="lg:w-[38%] shrink-0">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">
              <span className="inline-block w-8 h-[2px] bg-emerald-500" />
              Our Solutions
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a3854] leading-snug mb-3">
              Clean Energy <br className="hidden sm:block" />
              for a Brighter Tomorrow
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              Explore our renewable energy solutions designed to power a
              sustainable and efficient future.
            </p>
          </div>

          {/* Right – tab buttons */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {tabsData.map((tab, index) => (
              <button
                key={tab.data_uniq_id}
                onClick={() => setActiveTab(index)}
                className={`flex flex-col items-center justify-center gap-2 rounded-2xl border px-3 py-4 sm:py-5 cursor-pointer transition-all duration-200
                  ${activeTab === index
                    ? "bg-emerald-50 border-emerald-300 shadow-sm"
                    : "bg-white border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/40"
                  }`}
              >
                <img
                  src={`${IMG_ENDPOINT}${tab.image_path}`}
                  alt={tab.title}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                />
                <span className="text-xs sm:text-sm font-semibold text-[#1f3d5b] leading-snug text-center">
                  {tab.title}
                </span>
                <span
                  className={`w-8 h-[3px] rounded-full transition-colors duration-200 ${
                    activeTab === index ? "bg-emerald-500" : "bg-slate-200"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── CONTENT ROW: Image left | Text right ────────────────────────── */}
        <AnimatePresence mode="wait">
          {currentTab && tabContent && (
            <motion.div
              key={currentTab.data_uniq_id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center"
            >
              {/* Solution image */}
              <div className="w-full overflow-hidden rounded-2xl">
                <img
                  src={`${IMG_ENDPOINT}${currentTab.card_image_path}`}
                  alt={currentTab.title}
                  className="w-full h-[240px] sm:h-[300px] lg:h-[320px] object-cover"
                />
              </div>

              {/* Solution text */}
              <div className="flex flex-col gap-4">
                {/* Label */}
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-600">
                  <span className="inline-block w-8 h-[2px] bg-emerald-500" />
                  {currentTab.title} Solutions
                </p>

                {/* Title + external link */}
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a3854]">
                    {currentTab.title}
                  </h2>
                  <Link href={`/solutions-details?id=${currentTab.data_uniq_id}`}>
                    <ExternalLink className="w-5 h-5 text-emerald-600 shrink-0" />
                  </Link>
                </div>

                {/* Description */}
                <div
                  className="text-sm sm:text-base text-slate-600 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html:
                      mainDesc.length > 550
                        ? mainDesc.slice(0, 550) + "..."
                        : mainDesc,
                  }}
                />

                {/* Services tag row */}
                {/* <div className="flex flex-wrap items-center gap-0 mt-1 py-3 border-t border-slate-100">
                  <img
                    src={`${IMG_ENDPOINT}${currentTab.image_path}`}
                    alt={currentTab.title}
                    className="w-8 h-8 object-contain shrink-0 mr-4"
                  />
                  {services.map((svc, i) => (
                    <span
                      key={i}
                      className="flex items-center text-xs text-[#1a3854] font-medium"
                    >
                      {i !== 0 && (
                        <span className="mx-2 text-slate-300 text-sm leading-none select-none">|</span>
                      )}
                      {svc}
                    </span>
                  ))}
                </div> */}

                {/* CTA button */}
                <div className="mt-2">
                  <Link
                    href={`/solutions-details?id=${currentTab.data_uniq_id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-600 px-5 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors duration-200"
                  >
                    Learn More About Our {currentTab.title} Solutions →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Loading state for tab switch */}
          {loading && currentTab && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10"
            >
              <div className="w-full h-[280px] sm:h-[320px] rounded-2xl bg-slate-100 animate-pulse" />
              <div className="flex flex-col gap-4 pt-4">
                <div className="h-4 w-32 bg-slate-100 animate-pulse rounded" />
                <div className="h-8 w-48 bg-slate-100 animate-pulse rounded" />
                <div className="h-4 w-full bg-slate-100 animate-pulse rounded" />
                <div className="h-4 w-5/6 bg-slate-100 animate-pulse rounded" />
                <div className="h-4 w-4/6 bg-slate-100 animate-pulse rounded" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
