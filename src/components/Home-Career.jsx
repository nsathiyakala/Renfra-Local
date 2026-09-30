"use client";
 
import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { axiosGet } from "@/lib/api";

const careerData = [
  {
    id: "1",
    title: "Executive",
    type: "Full Time",
    requirements:
      "The Accounts Executive is responsible for managing day-to-day accounting operations, maintaining accurate financial records, and supporting internal and external auditing requirements. The role ensures compliance with accounting standards and contributes to the smooth functioning of the finance department.",
    level: "Fresher",
    salary: "As per Company",
    location: "Tamil Nadu",
  },
  {
    id: "2",
    title: "HR Executive",
    type: "Full Time",
    requirements:
      "The HR Executive is responsible for managing key human resource functions including recruitment, onboarding, employee relations, statutory compliance, performance management, and HR documentation. The role ensures smooth HR operations and supports the development of a productive and positive workplace.",
    level: "Experienced",
    salary: "As per Company",
    location: "Tamil Nadu",
  },
  {
    id: "3",
    title: "Electronics Engineer",
    type: "Full Time",
    requirements:
      "Responsible for troubleshooting, testing, repairing, and maintaining electronic circuits, inverter boards, and control modules used in solar power plants and laboratory applications.",
    level: "Intermediate",
    salary: "As per Company",
    location: "Tamil Nadu",
  },
  {
    id: "4",
    title: "Lead Executive",
    type: "Full Time",
    requirements:
      "The Land Legal Executive is responsible for handling all legal matters related to land acquisition, due diligence, documentation, compliance, and coordination with legal authorities. The role ensures that all land transactions are legally sound and compliant with statutory requirements.",
    level: "Intermediate",
    // salary: "3 - 6 Lacs P.A.",
        salary: "As per Company",
    location: "Tamil Nadu",
  },
];
 
export default function CareerSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(2); // Default: 2 cards for desktop
  const [loading, setLoading] = useState(false)


    const [jobs, setJobs] = useState([]);
  
    useEffect(() => {
      async function fetchJobs() {
        try {
          setLoading(true)
          const res = await axiosGet.get("/masters/career/get/?web_sts=1&has_limit=0&active_status=1");
  
          console.log("API Response:", res.data);
  
          const data = res.data.data || [];
  
          const formatted = data.map((item) => ({
            id: item.data_uniq_id,
            title: item.title,
            job_id: item.job_id,
            requirements: item.description,
            level: item.role_type,
            salary: item.salary_range,
            location: item.city_name,
            experience: item.no_experience,
          }));
  
          setJobs(formatted);
        } catch (error) {
          console.log("Career fetch error:", error);
        }finally {
          setLoading(false)
        }
      }
  
      fetchJobs();
    }, []);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1); // 1 card for mobile
      } else {
        setItemsPerView(2); // 2 cards for tablet/desktop
      }
    };
 
    handleResize(); // Run once on load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
 
  const totalSlides = Math.ceil(jobs.length / itemsPerView);
 
  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [totalSlides]);
 
  
  const variants = {
    enter: { x: "100%", opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };
 
  
  const visibleJobs = jobs.slice(
    currentIndex * itemsPerView,
    currentIndex * itemsPerView + itemsPerView
  );

  if (loading) {
    return (
      <section className="w-full py-16 text-center text-[#293E52] text-lg font-semibold">
        Loading...
      </section>
    )
  }

  
  if (!loading && jobs.length === 0) {
    return (
      
      <section className="w-full py-16 text-center text-[#293E52] text-lg font-semibold">
        <div className="flex items-center justify-center mb-4 gap-2">
          <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#293E52]">
            Recent Openings
          </h1>
          <a href="/career">
            <ExternalLink
              className="w-6 sm:w-7 h-6 sm:h-7"
              strokeWidth={2}
              style={{ stroke: "url(#grad)" }}
            />
            <svg width="0" height="0">
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3AB257" />
                <stop offset="100%" stopColor="#329ACD" />
              </linearGradient>
            </svg>
          </a>
        </div>
        No Jobs Found
      </section>
    )
  }
 
  return (
    <section className="w-full py-12 overflow-hidden">
      <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 md:px-6 lg:px-8">
        {/* Title Section */}
        <div className="flex items-center justify-center mb-4 gap-2">
          <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#293E52]">
            Recent Openings
          </h1>
          <a href="/career">
            <ExternalLink
              className="w-6 sm:w-7 h-6 sm:h-7"
              strokeWidth={2}
              style={{ stroke: "url(#grad)" }}
            />
            <svg width="0" height="0">
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3AB257" />
                <stop offset="100%" stopColor="#329ACD" />
              </linearGradient>
            </svg>
          </a>
        </div>
 
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6 text-center">
          Explore the recent job openings at various locations
        </p>
 
        {/* Carousel Section */}
        <div className="relative w-full overflow-hidden">
          <div className="flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className={`grid gap-6 lg:gap-8 ${
                  itemsPerView === 1 ? "grid-cols-1" : "grid-cols-2"
                }`}
              >
                {visibleJobs.map((job) => (
                  <CareerCard key={job.job_id} job={job} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
 
          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-3">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "bg-gradient-to-r from-[#3AB257] to-[#329ACD] scale-110"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
 
function CareerCard({ job }) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-xl font-semibold text-[#293E52]">{job.title}</h2>
        <div className="relative flex items-center gap-2">
         <a href="/career"> <ExternalLink
            className="w-6 h-6"
            style={{ stroke: "url(#linkGradient)" }}
          /></a>
          <svg className="absolute w-0 h-0">
            <defs>
              <linearGradient id="linkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#329ACD" />
                <stop offset="100%" stopColor="#3AB257" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
 
      <p className="text-sm font-medium text-gray-500 mb-3">{job.type}</p>
 
      <p
        className="text-sm text-[#293E52] font-medium mb-6 leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: `<span class="font-bold">Requirements: </span>${job.requirements}`,
        }}
      />

      
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <img src="/images/work.svg" alt="Level" className="w-4 h-4" />
          <span className="text-sm text-[#293E52]">{job.level}</span>
          {job?.experience ? (
          <span className="text-sm text-[#293E52]">{job.experience}</span>
          ) : null}
        </div>
        

        {job?.salary ? (
          <div className="flex items-center gap-2">
            <img src="/images/sal.svg" alt="Salary" className="w-4 h-4" />
            <span className="text-sm text-[#293E52]">{job.salary}</span>
          </div>
        ) : null}


        {job.location && (
          <div className="flex items-center gap-2">
            <img src="/images/loc.svg" alt="Location" className="w-4 h-4" />
            <span className="text-sm text-[#293E52]">{job.location}</span>
          </div>
        )}

      </div>
    </div>
  );
}
 