"use client";

import { useEffect, useState } from "react";
import { Building2, MapPin, Zap } from "lucide-react";
import { axiosGet, BASE_URL } from "@/lib/api";

const TABS_DATA = [
  {
    id: "solar-pv",
    label: "Solar PV",
    cards: [
      {
        id: "1",
        image: "/images/solar1.png",
        title: "650MW Solar PV",
        status: "Completed",
        location: "Chennai",
        description:
          "Successfully delivered 650MW of solar PV projects, generating clean and sustainable energy.",
      },
      {
        id: "2",
        image: "/images/solar2.png",
        title: "500MW Solar PV",
        status: "Ongoing",
        location: "Coimbatore",
        description:
          "Currently executing 500MW of solar PV projects, ensuring optimal design and performance.",
      },
    ],
  },
];

const SOUTHERN_ZONE_PHASES = [
  {
    title: "Southern Zone 1 \u2014 117 MW Solar Project",
    description:
      "This project marked our initial solar project in the Southern Zone, commissioned in 2021. The project has been operating continuously since commissioning, with no major breakdowns or operational issues reported, demonstrating the quality, reliability, and long-term performance of our EPC execution. The project is supported by two 110/33kV - Pooling Substations (PSS), enabling reliable power evacuation and grid connectivity.",
  },
  {
    title: "Southern Zone 2 \u2014 101 MW Solar Project",
    description:
      "This project combines large-scale solar generation with Battery Energy Storage System (BESS) integration, delivering a reliable and flexible renewable energy solution. The project was successfully executed through optimized engineering, efficient construction practices, and coordinated project management. Supported by the 110/33kV Pooling Substation (PSS) and integrated BESS infrastructure, the project enables reliable power evacuation, grid connectivity, and enhanced energy management.",
  },
];

function getDisplayProjects(projects) {
  return projects.flatMap((project) => {
    const title = project.title?.toLowerCase() || "";
    if (!title.includes("213") || !title.includes("southern zone")) {
      return [project];
    }
    return SOUTHERN_ZONE_PHASES.map((phase, index) => ({
      ...project,
      ...phase,
      data_uniq_id: `${project.data_uniq_id}-southern-zone-${index + 1}`,
    }));
  });
}

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("");
  const [masterTitle, setMasterTitle] = useState([]);
  const [projectData, setProjectData] = useState([]);
  console.log(activeTab, "activeTab");
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);

  const fetchMaster = async () => {
    try {
      setLoading(true);
      const res = await axiosGet.get(
        `masters/solutions/get/?web_sts=1&order_type=asc&order_field=created_date&get_sts=1`
      );
      const data = res.data?.data || [];
      if (data.length === 0) {
        setNoData(true);
        setLoading(false);
        return;
      }
      const filtered = data.filter(
        (item) =>
          !item.title?.toLowerCase().includes("operations") &&
          !item.title?.toLowerCase().includes("maintenance") &&
          !item.title?.toLowerCase().includes("o&m") &&
          !item.title?.toLowerCase().includes("o & m")
      );
      if (filtered.length === 0) {
        setNoData(true);
        setLoading(false);
        return;
      }
      setMasterTitle(filtered);
      setActiveTab(filtered[0].data_uniq_id);
    } catch (e) {
      console.error("Master Error:", e);
      setNoData(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchProject = async () => {
    if (!activeTab) return;
    try {
      setLoading(true);
      const res = await axiosGet.get(
        `masters/projects/get/?web_sts=1&solution_id=${activeTab}`
      );
      const data = res.data?.data || [];
      setProjectData(data);
      setNoData(data.length === 0);
    } catch (err) {
      console.error("Project Error:", err);
      setNoData(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaster();
  }, []);

  useEffect(() => {
    fetchProject();
  }, [activeTab]);

  const displayProjects = getDisplayProjects(projectData);

  if (loading) {
    return (
      <section className="w-full px-4 py-12 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center py-20 text-[#293E52] font-semibold">
          Loading...
        </div>
      </section>
    );
  }

  if (noData) {
    return (
      <section className="w-full px-4 py-12 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center py-20">
          <p className="text-sm text-[#293E52] md:text-base max-w-3xl mx-auto mb-4">
            Renfra Energy delivers large-scale solar, wind, and storage projects
            across India, powering a cleaner, sustainable future.
          </p>
          <p className="text-red-500 font-semibold">No Data Found</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full  ">
      <div className="mx-auto max-w-[85rem] 2xl:max-w-[90rem] px-4 py-14 md:px-6 md:py-16 lg:px-8">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mx-auto max-w-3xl text-sm leading-7 text-[#425263] md:text-base">
            Renfra Energy delivers large-scale solar, wind, and storage projects
            across India, powering a cleaner, sustainable future.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2 border-b border-[#dce6dd] pb-5 md:gap-3">
          {masterTitle.map((tab) => (
            <button
              key={tab.data_uniq_id}
              onClick={() => setActiveTab(tab.data_uniq_id)}
              aria-pressed={activeTab === tab.data_uniq_id}
             className={`
        rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 md:px-6 md:py-2.5 cursor-pointer
        ${
          activeTab === tab.data_uniq_id
            ? "bg-gradient-to-r from-[#3AB257] to-[#329ACD] text-white shadow-md"
            : "bg-background text-[#293E52]"
        }
      `}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Mosaic Grid */}
        {displayProjects.length > 0 && (
          <div className={`${
            displayProjects.length === 1
              ? "flex justify-center"
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          }`}>
            {displayProjects.map((project, i) => {
              // Pattern: 0=big, 1=small, 2=small, 3=big, 4=big, 5=small (repeating)
              const pattern = [true, false, false, true, true, false];
              const isBigFeature = pattern[i % 6];
              const isCompleted = project.project_status === 3;
              const titleCapacity = project.title?.match(/\b\d+(?:\.\d+)?\s*MW(?:h)?\b/i)?.[0];
              const rawCapacity =
                project.capacity ??
                project.project_capacity ??
                project.capacity_mw ??
                titleCapacity;
              const capacityUnit = /\bmwh\b/i.test(titleCapacity || "")
                ? "MWh"
                : "MW";
              const capacity = rawCapacity
                ? /\bmwh?\b/i.test(String(rawCapacity))
                  ? rawCapacity
                  : `${rawCapacity} ${capacityUnit}`
                : null;
              const projectFacts = [
                capacity && { icon: Zap, value: capacity, featured: true },
                (project.location || project.state) && {
                  icon: MapPin,
                  value: project.location || project.state,
                },
                (project.category || project.project_type || project.type) && {
                  icon: Building2,
                  value: project.category || project.project_type || project.type,
                },
              ].filter(Boolean);

              return (
                <div
                  key={project.data_uniq_id}
                  className={`group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 ${
                    displayProjects.length === 1
                      ? "w-full max-w-4xl"
                      : isBigFeature ? "sm:col-span-2" : ""
                  }`}
                >
                  {/* Image half */}
                  <div
                    className={`relative overflow-hidden flex-shrink-0 ${
                      isBigFeature ? "h-72 sm:h-80" : "h-56"
                    }`}
                  >
                    <img
                      src={`${BASE_URL}${project.image_path}`}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-0 right-0 w-0 h-0 border-t-[44px] border-r-[44px] border-t-transparent border-r-[#3CA948]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div
                      className={`absolute top-3 right-3 inline-flex items-center gap-2 rounded-full border border-white/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-md backdrop-blur-sm ${
                        isCompleted ? "bg-[#16803c]" : "bg-[#1679a8]"
                      }`}
                    >
                      <span
                        className="h-2 w-2 rounded-full bg-white shadow-[0_0_0_2px_rgba(255,255,255,0.25)]"
                      />
                      {isCompleted ? "Completed" : "Ongoing"}
                    </div>
                    {/* {project.location && (
                      <div className="absolute bottom-3 left-4 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#3CA948] flex-shrink-0" />
                        <span className="text-[#3CA948] text-[11px] font-semibold uppercase tracking-wider">
                          {project.location}
                        </span>
                      </div>
                    )} */}
                  </div>

                  {/* Content half — full description, no clamp */}
                  <div className="flex flex-col flex-1 p-5 sm:p-6">
                    <h3
                      className={`font-bold text-[#000] leading-snug mb-3 ${
                        isBigFeature ? "text-lg sm:text-xl" : "text-base sm:text-lg"
                      }`}
                    >
                      {project.title}
                    </h3>
                    {projectFacts.length > 0 && (
                      <div
                        className={`mb-3 flex flex-wrap gap-2 ${
                          projectFacts.length === 1 ? "justify-center" : ""
                        }`}
                      >
                        {projectFacts.map(({ icon: Icon, value, featured }, index) => (
                          <span
                            key={`${value}-${index}`}
                            className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-sm ${
                              featured
                                ? "border-[#2d9647] bg-[#3AB257] font-bold text-white shadow-sm"
                                : "border-slate-200 bg-white font-medium text-[#293E52]"
                            }`}
                          >
                            <Icon
                              className={`h-4 w-4 shrink-0 ${
                                featured ? "text-white" : "text-[#1e3a8a]"
                              }`}
                            />
                            <span className={`font-bold  ${
                                featured ? "text-white" : "text-[#1e3a8a]"
                              }`}>{value}</span>
                          </span>
                        ))}
                      </div>
                    )}
                    <div
                      className="text-sm text-gray-800 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: project.description }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
