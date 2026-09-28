"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Zap, ArrowRight, ArrowLeft, ExternalLink } from "lucide-react";
import ProjectsSlider from "@/components/ProjectsSlider";
import { axiosGet, BASE_URL } from "@/lib/api";
import InnerBannersol from "@/components/Inner-bannersol";

// ==========================================
// 1. ICONS FOR SOLUTION FEATURES
// ==========================================

function SolarGridIcon({ className = "w-6 h-6 text-[#3CA948]" }) {
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
      {/* Sun rays above */}
      <circle cx="12" cy="4" r="1.5" />
      <path d="M12 1v1M7.8 2.8l.7.7M16.2 2.8l-.7.7M5.5 5.5l.8.4M18.5 5.5l-.8.4" />
      {/* Tilted Solar Panel Grid */}
      <path d="M3.5 14.5l3-6.5h11l3 6.5H3.5z" />
      <path d="M9 8l-1.5 6.5M15 8l1.5 6.5M5 11.2h14" />
      {/* Mount pole and base plate */}
      <path d="M12 14.5v5.5M8.5 20h7" />
    </svg>
  );
}

function WindTurbineIcon({ className = "w-6 h-6 text-[#3CA948]" }) {
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
      <path d="M12 12v9M9.5 21h5" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 10C12 5 15 2 15 2C15 2 13 6 12 10z" />
      <path d="M10.2 13C6 14.5 3 13 3 13C3 13 7 12 10.2 13z" />
      <path d="M13.8 13C17 16 18 19 18 19C18 19 16 16 13.8 13z" />
    </svg>
  );
}

function BatteryStorageIcon({ className = "w-6 h-6 text-[#3CA948]" }) {
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
      <rect x="2" y="7" width="16" height="12" rx="2" />
      <path d="M6 11v4M10 11v4M14 11v4" />
      <path d="M20 10v6" />
    </svg>
  );
}

function MaintenanceWrenchIcon({ className = "w-6 h-6 text-[#3CA948]" }) {
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
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

// ==========================================
// 2. STATIC RICH DATA DICTIONARY
// ==========================================

const SOLUTIONS_DATA = {
  solar: {
    key: "solar",
    title: "Solar",
    
    
    showManufacturing: true,
    manufacturingTitle: "State-of-the-art Solar PV Panels Manufacturing",
    manufacturingDescription:
      "Our planned state-of-the-art PV manufacturing unit is poised to support the ever-increasing demand of solar panels with cutting-edge technology and sustainable production processes. We are committed to delivering high-efficiency, durable solar panels that meet global quality standards while contributing to a greener future.",
    manufacturingImage: "/images/factory.jpg",
    headline:
      "As the leading player in PV solar greenfield project solutions, we have helped numerous clients to harness the power of the Sun!",
    description:
      "We offer end-to-end solutions for Ground-mounted and Rooftop solar projects depending on the energy requirements for your businesses. Renfra Energy brings several decades of experience delivering high-quality solar solutions that are tailored to the specific requirements of our clients. Our proven track record and commitment to customer satisfaction sets us apart from our peers.",
      introLines: [
      "We determine your business's energy needs, then prioritize the panel efficiency, durability, and cost-effectiveness and warranties to maximize output and lifespan. High quality accessories and electrical equipment on both the DC and AC sides, ensuring longer efficiency and effectiveness. Renfra Energy develops, designs, engineers, procures, constructs and maintains captive scale greenfield solar farm projects across India.",
    ],
    heroImage: "/images/sol-inner.png",
    bannerImage: "/images/sol-inner.png",
    twoColumnTitle: "We offer our C&I customers end to end solutions",
    stats: [
      {
        icon: "zap",
        label: "Ongoing Projects",
        number: "12",
        subtext: "Projects in progress",
        link: "/projects?status=ongoing",
      },
      {
        icon: "solar",
        label: "Installed Projects",
        number: "48",
        subtext: "Projects completed",
        link: "/projects?status=completed",
      },
    ],
    features: [
      "Grid connectivity & load and Power evacuation activities",
      "Feasibility Study & Site Assessments",
      "Environmental Impact Assessments",
      "Land Acquisition",
      "Infrastructure development",
      "Design & Engineering",
      "Procurement",
      "Construction & Installation",
      "Permitting, Approvals and Liaison",
      "Commissioning",
      "Grid Integration",
      "Power evacuation",
    ],
    twoColumnFeatures: [
      "Grid capacity allocation and Power evacuation activities",
      "Feasibility Study & Site Assessment",
      "Environmental Impact Assessment",
      "Land Acquisition",
      "Infrastructure development",
      "Design & Engineering",
      "Procurement",
      "Construction & Installation",
      "Permitting, Approvals and Liaison",
      "Commissioning",
      "Grid Integration",
      "Power evacuation",
      "Maintenance",
    ],
    twoColumnStats: [
      { icon: "/images/s1.png", number: "500MW", label: "Ongoing Projects" },
      { icon: "/images/s2.png", number: "650 MW", label: "Installed Capacity" },
    ],
    centerParagraph:
      "100MW Solar PV project construction and connected to grid in record breaking 90 days",
    videoUrl: "#",
    projects: [
      { image: "/images/about.png", title: "500MW Solar Farm", location: "Rajasthan, India", capacity: "500 MW" },
      { image: "/images/about.png", title: "Commercial Rooftop Installation", location: "Mumbai, India", capacity: "50 MW" },
      { image: "/images/about.png", title: "Industrial Solar Plant", location: "Gujarat, India", capacity: "200 MW" },
    ],
  },

  wind: {
    key: "wind",
    title: "Wind",
    intro:
      "In a short span of time, Renfra Energy has been successful in delivering 100MW of wind energy power projects and has close to 500MW of ongoing projects in the wind sector.",
    // introLines: [
    //   "In a short span of time, Renfra Energy has been successful in delivering 100MW of wind energy power projects and has close to 500MW of ongoing projects in the wind sector. We have been successfully assisting companies in reducing their reliability on conventional power and building dependable energy by developing and constructing wind farms.  When commercial & industrial establishments face excessive energy requirements for their operations, a wind farm development is more economical and efficient than a solar farm. ",
    // ],
    
    description:
      "In a short span of time, Renfra Energy has been successful in delivering 100MW of wind energy power projects and has close to 500MW of ongoing projects in the wind sector. We have been successfully assisting companies in reducing their reliability on conventional power and building dependable energy by developing and constructing wind farms. When commercial & industrial establishments face excessive energy requirements for their operations, a wind farm development is more economical and efficient than a solar farm.",
    heroImage: "/images/wind-banner.svg",
    bannerImage: "/images/sol-inner.png",
    twoColumnTitle: "We offer our C&I customers end to end solutions",
    stats: [
      {
        icon: "zap",
        label: "Ongoing Projects",
        number: "480 MW",
        subtext: "Projects in progress",
        link: "/projects?status=ongoing",
      },
      {
        icon: "wind",
        label: "Installed Capacity",
        number: "99 MW",
        subtext: "Projects completed",
        link: "/projects?status=completed",
      },
    ],
    features: [
      "Grid capacity allocation and Power evacuation activities",
      "Feasibility Study & Site Assessment",
      "Environmental Impact Assessment",
      "Land Acquisition & RoW",
      "Infrastructure development",
      "Design & Engineering",
      "Procurement & Supply Chain",
      "Construction & Installation",
      "Permitting, Approvals and Liaison",
      "Commissioning",
      "Grid Integration",
      "Comprehensive Maintenance",
    ],
    twoColumnFeatures: [
      "Grid capacity allocation and Power evacuation activities",
      "Feasibility Study & Site Assessment",
      "Environmental Impact Assessment",
      "Land Acquisition",
      "Infrastructure development",
      "Design & Engineering",
      "Procurement",
      "Construction & Installation",
      "Permitting, Approvals and Liaison",
      "Commissioning",
      "Grid Integration",
      "Maintenance",
    ],
    twoColumnStats: [
      { icon: "/images/s1.png", number: "480MW", label: "Ongoing Projects" },
      { icon: "/images/s2.png", number: "99MW", label: "Installed Capacity" },
    ],
    centerParagraph:
      "Renfra Energy develops, designs, engineers, procures, constructs and maintains wind farms for its clients across India.",
    videoUrl: "#",
    projects: [
      { image: "/images/about.png", title: "99MW Wind Farm", location: "Tamil Nadu, India", capacity: "99 MW" },
      { image: "/images/about.png", title: "Offshore Wind Development", location: "Gujarat Coast, India", capacity: "150 MW" },
      { image: "/images/about.png", title: "Hybrid Wind-Solar Plant", location: "Rajasthan, India", capacity: "250 MW" },
    ],
  },

  storage: {
    key: "storage",
    title: "Battery Energy Storage System",
    intro:
      "As a provider of end-to-end energy solutions, Renfra Energy manufactures and builds Energy Storage Systems for our clients, enabling a more efficient, reliable and sustainable power supply to their facilities.",
    introLines: [
      "BESS mitigates this cost, thus not only reducing charges for unused/banked power but also optimizing the generation from the plants.Further in areas where there are frequent grid blackouts or maintenance shutdowns, having a BESS solution will ensure smooth and consistent power supply to your facility.Renfra Energy acts as a one stop solution provider to implement the BESS solution in your facility since both the DC and the AC side are handled by our professional team.",
    ],
    showManufacturing: true,
    manufacturingTitle: "State-of-the-art BESS Manufacturing",
    manufacturingDescription:
      "With various technical collaborations signed, Renfra Energy manufactures Battery Energy Storage Systems (BESS) with advanced DC coupling technology, ensuring minimal energy losses and maximum efficiency.",
    manufacturingImage: "/images/factory.jpg",
    headline:
      "As a provider of end-to-end energy solutions, Renfra Energy manufactures and builds Energy Storage Systems for our clients, enabling a more efficient, reliable and sustainable power supply to their facilities.",
    description:
      "We provide this hybrid solution, as Battery Energy Storage System (BESS) are needed since customers can store energy from the grid as it is produced from their farms and use it during peak hours, significantly saving on energy loss, which otherwise will either be banked or incur energy losses due to non utilization (Banking charges for power parking/banking on grid that has been generated from the farms but not immediately used are now either getting expensive or the Discoms are removing this service totally.",
    heroImage: "/images/energy-banner.svg",
    bannerImage: "/images/sol-inner.png",
    twoColumnTitle: "Our commercial & industrial solutions include",
    stats: [
      {
        icon: "zap",
        label: "Ongoing Deployments",
        number: "250+",
        subtext: "Projects in progress",
        link: "/projects?status=ongoing",
      },
      {
        icon: "storage",
        label: "Storage Capacity",
        number: "10,000 MWh",
        subtext: "Capacity delivered",
        link: "/projects?status=completed",
      },
    ],
    features: [
      "Grid capacity allocation and Power evacuation",
      "Design & Engineering",
      "Technology Selection",
      "Site Readying & Construction",
      "Procurement & DC Coupling",
      "Installation & Testing",
      "Grid Permits & Approvals",
      "Commissioning",
      "Energy Management System (EMS)",
      "Fire Prevention & Detection Systems",
      "Grid Integration",
      "Lifecycle Maintenance",
    ],
    twoColumnFeatures: [
      "Grid capacity allocation and Power evacuation activities",
      "Design & Engineering",
      "Technology Selection",
      "Site readying/Construction",
      "Procurement",
      "Installation",
      "Grid Permits & Approvals",
      "Commissioning",
      "Energy Management System (Monitoring & Controlling)",
      "Fire prevention and detection systems",
      "Maintenance",
    ],
    twoColumnStats: [
      { icon: "/images/s1.png", number: "250", label: "Industrial Clients" },
      { icon: "/images/s2.png", number: "10000", label: "MW Capacity" },
    ],
    videoUrl: "#",
    projects: [
      { image: "/images/about.png", title: "Industrial BESS Installation", location: "Chennai, India", capacity: "100 MWh" },
      { image: "/images/about.png", title: "Grid-Scale Storage", location: "Hyderabad, India", capacity: "250 MWh" },
      { image: "/images/about.png", title: "Hybrid Solar+BESS", location: "Ahmedabad, India", capacity: "150 MWh" },
    ],
  },

  maintenance: {
    key: "maintenance",
    title: "Operations & Maintenance",
    intro:
      "As a leading developer of renewable energy projects, Renfra Energy ensures consistent system performance through O&M.",
    // introLines: [
    //   "At Renfra Energy, our journey to a sustainable energy future doesn't end with the construction of renewable project. The long-term success and profitability of your renewable energy project, whether it's a utility-scale solar farm, a wind power plant, or a sophisticated energy storage system, depend entirely on expert Operations & Maintenance (O&M) and Strategic Asset Management. Renfra Energy offers a fully integrated suite of services designed to ensure your renewable assets perform optimally, reliably, and profitably for their entire lifecycle. Our core mission is to minimize downtime and maximize energy production through proactive, predictive, and rapid response maintenance.",
    // ],
    headline:
      "At Renfra Energy, our journey to a sustainable energy future doesn't end with the construction of renewable project!!!.",
    description:
      "The long-term success and profitability of your renewable energy project—whether it's a utility-scale solar farm, a wind power plant, or a sophisticated energy storage system—depend entirely on expert Operations & Maintenance (O&M) and Strategic Asset Management. Renfra Energy offers a fully integrated suite of services designed to ensure your renewable assets perform optimally, reliably, and profitably for their entire lifecycle. We take on the technical and financial complexity so you can focus on your core business. Our core mission is to minimize downtime and maximize energy production through proactive, predictive, and rapid response maintenance.",
    heroImage: "/images/operation-banner.svg",
    bannerImage: "/images/sol-inner.png",
    twoColumnTitle: "Why choose Renfra Energy to power up your business:",
    stats: [
      {
        icon: "zap",
        label: "O&M",
        number: "462.5 MW",
       
        link: "/projects?status=ongoing",
      },
     
    ],
    features: [
      "Significant Cost Savings",
      "Energy Independence",
      "Customised System Design",
      "Guaranteed System Efficiency",
      "Annual & Emergency Maintenance",
     
    ],
    twoColumnFeatures: [
      "Significant Cost Savings",
      "Energy Independence",
      "Customised system design",
      "Guaranteed system efficiency",
      "Annual and emergency maintenance",
    ],
    twoColumnStats: [
      { icon: "/images/s1.png", number: "462.5 MW", label: "O & M" },
      
    ],
    videoUrl: "#",
    projects: [
      { image: "/images/about.png", title: "Multi-Site O&M Services", location: "Pan-India", capacity: "1000+ Assets" },
      { image: "/images/about.png", title: "Solar Farm Maintenance", location: "Rajasthan, India", capacity: "500 MW" },
      { image: "/images/about.png", title: "Wind Turbine Services", location: "Tamil Nadu, India", capacity: "250 MW" },
    ],
  },

  commercial: {
    key: "commercial",
    title: "Commercial and Industrial (C&I)",
    intro:
      "Renfra Energy has been in the forefront of providing a range of solutions to help Commercial & Industrial (C&I) customers meet their energy demand goals.",
    introLines: [
      "Renfra Energy has been in the forefront of providing a range of solutions to help Commercial & Industrial (C&I) customers meet their energy demand goals. We have assisted our clients to generate their own clean electricity directly by the development, installation and maintenance of renewable energy systems. Our standard SOPs aimed to ensure that we have a profitable and optimized energy production and reduced costs.",
    ],
    headline:
      "Customized renewable energy transition solutions tailored for high-demand enterprises.",
    description:
      "Assisting commercial and industrial establishments to generate their own clean electricity directly by developing, installing, and maintaining captive-scale renewable energy systems.",
    heroImage: "/images/c&i-banner.svg",
    bannerImage: "/images/sol-inner.png",
    twoColumnTitle: "Our key greenfield activities supporting your renewable transition:",
    stats: [
      {
        icon: "zap",
        label: "Active Projects",
        number: "150",
        subtext: "Projects in progress",
        link: "/projects?status=ongoing",
      },
      {
        icon: "solar",
        label: "Delivered Capacity",
        number: "2,500 MWh",
        subtext: "Capacity completed",
        link: "/projects?status=completed",
      },
    ],
    features: [
      "Grid capacity allocation and Power evacuation",
      "Environmental Impact Assessment studies",
      "Land Acquisition and RoW",
      "Approvals & Liaison",
      "Engineering & Design",
      "Infrastructure Development",
      "Energy Systems Procurement",
      "Construction & Installation",
      "Commissioning",
      "Power Evacuation",
      "Energy Storage Solutions",
      "Lifecycle Asset Maintenance",
    ],
    twoColumnFeatures: [
      "Grid capacity allocation and Power evacuation activities",
      "Environmental Impact Assessment studies",
      "Land Acquisition and RoW",
      "Approvals & Liaison",
      "Engineering & Design",
      "Infrastructure Development",
      "Energy Systems Procurement",
      "Construction & Installation",
      "Commissioning",
      "Power evacuation",
      "Energy Storage Solutions",
      "Energy Management Systems",
      "Maintenance",
    ],
    twoColumnStats: [
      { icon: "/images/s1.png", number: "150", label: "Active Projects" },
      { icon: "/images/s2.png", number: "2500", label: "MWh Capacity" },
    ],
    videoUrl: "#",
    projects: [
      { image: "/images/about.png", title: "500MW Wind Farm", location: "Pune, India", capacity: "75 MW" },
      { image: "/images/about.png", title: "450MW Solar EPC", location: "Bangalore, India", capacity: "40 MW" },
      { image: "/images/about.png", title: "Warehouse Solar Rooftop", location: "Delhi NCR, India", capacity: "25 MW" },
    ],
  },
};

const UUID_KEY_MAP = {
  "ZGEwMjQxODktZDdiYi00YTYyLTkxNWYtMWQxMjIyMWZmYjgz": "solar",
  "NDM2YmYyYmEtZmI4Ni00OTVlLTkxMWQtYThjOTBmY2VhZGEx": "wind",
  "NjQ1MTRlNDQtYzdhZC00ZThhLWEwODEtNDc4MDAwZjhmODY5": "storage",
  "NmNlYTgxNWUtYWRhYy00Y2Y1LTk3ZGYtNmM3ZjE5ZjMzN2Q0": "maintenance",
  solar: "solar",
  wind: "wind",
  storage: "storage",
  bess: "storage",
  maintenance: "maintenance",
  commercial: "commercial",
};

// ==========================================
// 3. MAIN COMPONENT (CLIENT-SIDE)
// ==========================================

function SolutionInnerContent() {
  const searchParams = useSearchParams();
  const rawId = searchParams.get("id") || "solar";

  const [loading, setLoading] = useState(false);
  const [allSolutions, setAllSolutions] = useState([]);
  const [projects, setProjects] = useState([]);
  const [apiData, setApiData] = useState(null);

  // Determine active solution key
  const solutionKey = useMemo(() => {
    const cleanId = String(rawId).trim();
    if (UUID_KEY_MAP[cleanId]) return UUID_KEY_MAP[cleanId];
    const lower = cleanId.toLowerCase();
    if (lower.includes("wind")) return "wind";
    if (lower.includes("storage") || lower.includes("bess") || lower.includes("battery")) return "storage";
    if (lower.includes("maint") || lower.includes("o&m")) return "maintenance";
    if (lower.includes("comm") || lower.includes("c&i")) return "commercial";
    return "solar";
  }, [rawId]);

  // Fetch full solutions list for "Related Solutions"
  useEffect(() => {
    const fetchSolutionsList = async () => {
      try {
        const res = await axiosGet.get(
          "masters/solutions/get/?web_sts=1&active_status=1"
        );
        if (res.data?.data) {
          setAllSolutions(res.data.data);
        }
      } catch (err) {
        console.error("Solutions List Error:", err);
      }
    };

    fetchSolutionsList();
  }, []);

  // Fetch projects list
  useEffect(() => {
    const fetchProjects = async () => {
      setProjects(SOLUTIONS_DATA[solutionKey]?.projects || []);
      try {
        const res = await axiosGet.get("masters/projects/get/?web_sts=1");
        if (res.data?.data) {
          const formatted = res.data.data.map((p) => ({
            image: p.image_path ? BASE_URL + p.image_path : "/images/about.png",
            title: p.project_title || p.title || "Project",
            location: p.location || "",
            capacity: p.capacity || "",
          }));
          setProjects(formatted);
        }
      } catch (err) {
        console.error("Projects Fetch Error:", err);
      }
    };

    fetchProjects();
  }, [solutionKey]);

  // Fetch API content for this specific solution ID
  useEffect(() => {
    const fetchSolutionContent = async () => {
      if (!rawId) return;

      try {
        setLoading(true);
        const res = await axiosGet.get(
          `/masters/solutions/content/get/?solution_id=${rawId}&web_sts=1`
        );
        const root = res.data.data?.[0];
        if (root) {
          setApiData(root);
        }
      } catch (err) {
        // Fallback to static data
        console.warn("Using static dataset for solution:", solutionKey);
      } finally {
        setLoading(false);
      }
    };

    fetchSolutionContent();
  }, [rawId, solutionKey]);

  // Merge static dictionary with API content if available
  const currentSolution = useMemo(() => {
    const base = SOLUTIONS_DATA[solutionKey] || SOLUTIONS_DATA.solar;

    if (!apiData) return base;

    // Extract dynamic features from twocolumn HTML if available
    let dynamicFeatures = base.features;
    let dynamicTitle = base.twoColumnTitle;

    if (apiData.data?.twocolumn?.[0]?.description && typeof window !== "undefined") {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(
          apiData.data.twocolumn[0].description,
          "text/html"
        );
        const h2 = doc.querySelector("h2")?.textContent.trim();
        if (h2) dynamicTitle = h2;

        const lis = Array.from(doc.querySelectorAll("li"))
          .map((li) => li.textContent.replace(/\u00a0/g, " ").trim())
          .filter(Boolean);

        // Only override if meaningful items found
        if (lis.length >= 6) {
          dynamicFeatures = lis;
        }
      } catch (e) {
        console.warn("Failed to parse twocolumn html:", e);
      }
    }

    // Extract dynamic stats if available
    let dynamicStats = base.stats;
    const innerStats = apiData.data?.twocolumn?.[0]?.inner_stats;
    if (Array.isArray(innerStats) && innerStats.length >= 2) {
      dynamicStats = [
        {
          icon: "zap",
          label: innerStats[0].label || base.stats[0].label,
          number: innerStats[0].value || base.stats[0].number,
          subtext: "Projects in progress",
          link: "/projects?status=ongoing",
        },
        {
          icon: solutionKey === "wind" ? "wind" : "solar",
          label: innerStats[1].label || base.stats[1].label,
          number: innerStats[1].value || base.stats[1].number,
          subtext: "Projects completed",
          link: "/projects?status=completed",
        },
      ];
    }

    const bannerImg = apiData.banner_image_path
      ? `${BASE_URL}${apiData.banner_image_path}`
      : base.bannerImage;

    return {
      ...base,
      title: apiData.solution_name || base.title,
      headline: apiData.sub_title || base.headline,
      heroImage: bannerImg,
      bannerImage: bannerImg,
      twoColumnTitle: dynamicTitle,
      stats: dynamicStats,
      features: dynamicFeatures,
    };
  }, [solutionKey, apiData]);

  const apiImages = apiData?.data?.image || [];
  const rightColumnImage = apiImages[0]?.file_path
    ? `${BASE_URL}${apiImages[0].file_path}`
    : currentSolution.manufacturingImage || currentSolution.heroImage || "/images/sol-inner.png";

  // Related Solutions (exclude current)
  const relatedSolutions = useMemo(() => {
    const fallback = (SOLUTIONS_DATA[solutionKey]?.relatedSolutions || []).map((solution) => ({
      ...solution,
      link: "/solutions",
    }));
    const list = allSolutions.filter((s) => s.data_uniq_id !== rawId);
    if (list.length === 0) return fallback;
    return list.slice(0, 3).map((s) => ({
      imgSrc: s.image_path ? `${BASE_URL}${s.image_path}` : "/images/sol2.png",
      subtitle: s.title,
      description: s.description || "Explore this renewable energy solution.",
      link: `/solutions-details?id=${s.data_uniq_id}`,
    }));
  }, [allSolutions, rawId, solutionKey]);

  // Helper to render appropriate icon for cards
  const renderCardIcon = () => {
    switch (solutionKey) {
      case "wind":
        return <WindTurbineIcon className="w-6 h-6 text-[#3CA948]" />;
      case "storage":
        return <BatteryStorageIcon className="w-6 h-6 text-[#3CA948]" />;
      case "maintenance":
        return <MaintenanceWrenchIcon className="w-6 h-6 text-[#3CA948]" />;
      default:
        return <SolarGridIcon className="w-6 h-6 text-[#3CA948]" />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#eaf4fb] via-[#f5fafd] to-white relative overflow-hidden">
      <InnerBannersol
        title={currentSolution.title}
        bgImage={currentSolution.bannerImage || "/images/sol-inner.png"}
      />

      <div className="relative z-10">
        {/* ========================================================= */}
        {/* SECTION 1: TOP HERO (OUR SOLUTIONS)                      */}
        {/* ========================================================= */}
        <section className="w-full pt-8 sm:pt-12 md:pt-14 pb-8 sm:pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* Left Column: Heading, Headline, Description */}
              <div className="lg:col-span-6 xl:col-span-6 pr-0 lg:pr-4">
                {/* Pre-title with green line accent */}
                <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                  <div className="w-7 sm:w-8 h-0.5 bg-[#3CA948]" />
                  <span className="text-[#3CA948] text-xs font-black uppercase tracking-widest ">
                    OUR SOLUTIONS
                  </span>
                </div>

                {/* Main Title */}
                <h1 className=" text-[#1a3854] tracking-tight leading-tight mb-4  text-2xl font-bold sm:text-2xl md:text-3xl lg:4xl">
                  {currentSolution.title}
                </h1>

                {/* Headline / Subtitle */}
                <p className="text-base sm:text-lg font-bold text-[#1f3d5b] leading-snug mb-4 max-w-xl">
                  {currentSolution.headline}
                </p>

                {/* Body paragraph */}
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                  {currentSolution.description}
                </p>
              </div>

              {/* Right Column: Rounded Landscape Hero Image */}
              <div className="lg:col-span-6 xl:col-span-6">
                <div className="relative w-full h-[240px] sm:h-[300px] lg:h-[340px] rounded-3xl overflow-hidden shadow-sm border border-slate-100/80">
                  <Image
                    src={rightColumnImage}
                    alt={currentSolution.title}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {(currentSolution.introLines?.length > 0 || currentSolution.showManufacturing) && (
          <section className="w-full pb-10 sm:pb-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              {currentSolution.introLines?.map((paragraph, index) => (
                <p
                  key={`intro-${index}`}
                  className="max-w-5xl text-sm sm:text-base leading-relaxed text-slate-600"
                >
                  {paragraph}
                </p>
              ))}

             
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* SECTION 2: PANORAMIC BANNER WITH STATS CARD               */}
        {/* ========================================================= */}
        <section className="w-full mb-12 sm:mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative w-full h-[180px] sm:h-[200px] md:h-[220px] rounded-3xl overflow-hidden shadow-md">
              {/* Background panoramic image */}
              <Image
                src={currentSolution.bannerImage || "/images/sol-inner.png"}
                alt="Renewable energy panorama"
                fill
                className="object-cover object-center"
              />

              {/* Seamless gradient overlay: transparent on left, dark teal-green on right */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1a443c]/85 to-[#163c35]" />

              {/* Stats on the right side */}
              <div className="absolute inset-0 flex items-center justify-end px-6 sm:px-10 md:px-14">
                <div className="flex items-center gap-6 sm:gap-10 md:gap-12">
                  
                  {/* Stat 1: Ongoing Projects */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#48bb78] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Zap className="w-5 h-5 fill-white text-white" />
                    </div>
                    <div>
                      <p className="text-white/85 text-xs font-semibold">
                        {currentSolution.stats[0]?.label || "Ongoing Projects"}
                      </p>
                      <p className="text-white font-extrabold text-3xl sm:text-4xl leading-tight my-0.5">
                        {currentSolution.stats[0]?.number || "12"}
                      </p>
                      <div
                        
                        className="flex items-center gap-1 text-white/75 hover:text-white text-xs font-medium transition-colors"
                      >
                        <span>{currentSolution.stats[0]?.subtext || ""}</span>
                        {currentSolution.stats[0]?.subtext && <span className="text-emerald-400 text-sm">→</span>}
                      </div>
                    </div>
                  </div>

                  {/* Vertical divider line */}
                  <div className="w-px h-14 sm:h-16 bg-white/20" />

                  {/* Stat 2: Installed Projects */}
                  { currentSolution.stats[1]?.label && <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#48bb78] text-white flex items-center justify-center shrink-0 shadow-sm">
                      {solutionKey === "wind" ? (
                        <WindTurbineIcon className="w-5 h-5 text-white" />
                      ) : (
                        <SolarGridIcon className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="text-white/85 text-xs font-semibold">
                        {currentSolution.stats[1]?.label || ""}
                      </p>
                      <p className="text-white font-extrabold text-3xl sm:text-4xl leading-tight my-0.5">
                        {currentSolution.stats[1]?.number || ""}
                      </p>
                      <Link
                        href={currentSolution.stats[1]?.link || "/projects"}
                        className="flex items-center gap-1 text-white/75 hover:text-white text-xs font-medium transition-colors"
                      >
                        <span>{currentSolution.stats[1]?.subtext || "Projects completed"}</span>
                        <span className="text-emerald-400 text-sm">→</span>
                      </Link>
                    </div>
                  </div>}

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: END-TO-END SOLUTIONS (3-COLUMN CARDS GRID)    */}
        {/* ========================================================= */}
        <section className="w-full pb-16 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header: Green line + Title */}
            <div className="mb-8">
              <div className="w-8 h-0.5 bg-[#3CA948] mb-3 sm:mb-4" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a3854] tracking-tight">
                {currentSolution.twoColumnTitle ||
                  "We offer our C&I customers end to end solutions"}
              </h2>
            </div>

            {/* 3-Column Grid of 12 Pill Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {currentSolution.features.map((feature, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-200 flex items-center justify-between gap-3.5 group cursor-pointer"
                >
                  {/* Pale green icon box */}
                  <div className="w-12 h-12 rounded-xl bg-[#EAF7ED] text-[#3CA948] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {renderCardIcon()}
                  </div>

                  {/* Feature text */}
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-emerald-800 transition-colors leading-snug flex-1">
                    {feature}
                  </span>

                  {/* Right arrow */}
                  <ArrowRight className="w-4 h-4 text-[#3CA948] group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: PROJECTS SLIDER ("OUR PROJECTS")               */}
        {/* ========================================================= */}
        {projects.length > 0 && (
          <section className="bg-[#F8FAFC] py-12 border-t border-slate-200/60">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-left mb-8 text-[#1A202C]">
                Our Projects
              </h3>
              <ProjectsSlider projects={projects} />
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* SECTION 5: GO BACK TO SOLUTIONS LINK                      */}
        {/* ========================================================= */}
        <div className="bg-[#fff]">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 text-[#293E52] hover:text-[#3CA948] font-bold text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go back to Solutions</span>
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 6: RELATED SOLUTIONS                              */}
        {/* ========================================================= */}
        {relatedSolutions.length > 0 && (
          <section className="bg-[#fff] pb-16">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-left mb-8 text-[#1A202C]">
                Related Solutions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedSolutions.map((card, i) => (
                  <div
                    key={i}
                    className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center p-2 border border-slate-100">
                          <Image
                            src={card.imgSrc}
                            alt={card.subtitle}
                            width={40}
                            height={40}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <Link
                          href={card.link}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-[#3CA948] hover:bg-emerald-50 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-[#293E52] mb-2">
                        {card.subtitle}
                      </h4>
                      <p
                        className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: card.description }}
                      />
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={card.link}
                        className="text-xs font-bold text-[#329ACD] hover:text-[#3CA948] flex items-center gap-1 transition-colors"
                      >
                        <span>Explore Solution</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

// ==========================================
// 4. EXPORT WITH SUSPENSE WRAPPER
// ==========================================

export default function SolutionInnerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center text-slate-400 font-semibold uppercase tracking-wider text-xs">
          Loading Solutions Details...
        </div>
      }
    >
     
      
      <SolutionInnerContent />
    </Suspense>
  );
}
