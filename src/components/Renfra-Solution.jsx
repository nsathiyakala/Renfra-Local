"use client";
 
import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { axiosGet } from "@/lib/api";
 
export default function SolutionsRenfra() {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [solutionIds, setSolutionIds] = useState({});
 
  const solutionCards = [
    {
      id: "1",
      icon: "/images/sol1.png",
      title: "Solar",
      description:
        "As the leading player in solar greenfield project solutions, we have helped numerous clients to harness the power of the Sun! We offer end-to-end solutions ",
    },
    {
      id: "2",
      icon: "/images/sol2.png",
      title: "Wind",
      description:
        "In a short span of time, Renfra Energy has successfully delivered 49.50 MW of wind energy projects and is currently executing an additional 56.10 MW, reinforcing our expertise in the renewable energy sector.",
    },
    {
      id: "3",
      icon: "/images/sol4.png",
      title: "Battery Energy Storage System",
      description:
        "As a provider of end-to-end energy solutions, Renfra Energy manufactures and builds Energy Storage Systems for our clients, enabling a more efficient, reliable power supply to their facilities.",
    },
    {
      id: "4",
      icon: "/images/sol5.png",
      title: "Operation & Maintenance",
      aliases: ["Operations & Maintenance", "Operation Maintenance", "O&M"],
      description:
        "At Renfra Energy, our journey to a sustainable energy future doesn't end with the construction of renewable project, Renfra Energy offers a fully integrated suite of services.",
    },
    //     {
    //   id: "5",
    //   icon: "/images/sol3.png",
    //   title: "Commercial & Industrial",
    //   description:
    //     "Renfra Energy has been in the forefront of providing a range of solutions to help Commercial & Industrial (C&I) customers meet their energy demand goals. ",
    // }
  ];

  useEffect(() => {
    const fetchSolutionIds = async () => {
      try {
        const response = await axiosGet.get(
          "masters/solutions/get/?web_sts=1&active_status=1"
        );
        const solutions = response.data?.data || [];
        const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

        const ids = solutions.reduce((result, solution) => {
          const normalizedTitle = normalize(solution.title || "");
          const card = solutionCards.find((item) => {
            const cardTitles = [item.title, ...(item.aliases || [])].map(normalize);
            return cardTitles.some(
              (cardTitle) =>
                normalizedTitle === cardTitle ||
                normalizedTitle.includes(cardTitle) ||
                cardTitle.includes(normalizedTitle)
            );
          });

          if (card && solution.data_uniq_id) {
            result[card.id] = solution.data_uniq_id;
          }
          return result;
        }, {});

        setSolutionIds(ids);
      } catch (error) {
        console.error("Solution IDs Error:", error);
      }
    };

    fetchSolutionIds();
  }, []);
 
  // Detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint in Tailwind
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
 
  // Show only first 2 on mobile if not expanded
  const displayedCards =
    isMobile && !showAll ? solutionCards.slice(0, 2) : solutionCards;
 
  return (
    <section className="w-full bg-gradient-to-b from-[#329ACD] to-[#3AB257] px-4 py-12 md:px-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4 flex justify-center">
          <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white flex items-center gap-2">
            Our Solutions
           <a href="/solutions"><ExternalLink className="w-7 h-7 text-white" /></a>
          </h2>
        </div>
 
        {/* Subtitle */}
        <p className="mb-8 max-w-3xl text-sm sm:text-sm md:text-base lg:text-base
 text-white text-center mx-auto">
          As a leading Independent Service Provider in the clean energy and energy storage landscape, Renfra Energy manufactures, develops, engineers, procures and constructs renewable projects and products for commercial and industrial clients in addition to providing the Operation & Maintenance solutions, thus guaranteeing a sustainable energy transition!  
        </p>

        <div className="flex justify-center pb-4">
  <a
    href="/solutions"
    className="
      inline-flex items-center gap-2
      rounded-full px-5 py-2 text-sm font-semibold text-black
      bg-white
      transition-all duration-300
      hover:scale-105 hover:shadow-lg
    "
  >
    Know More  </a>
</div>
 
        {/* Responsive grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedCards.map((card) => (
            <Link
  key={card.id}
  href={`/solutions-details/?id=${encodeURIComponent(solutionIds[card.id] || card.id)}`}
  className="group rounded-lg bg-white p-6 shadow-md 
             transition-all duration-300 ease-in-out
             hover:-translate-y-2 hover:scale-[1.03]
             hover:shadow-xl"
>
              {/* Icon */}
              <div className="mb-4 flex justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
  <img
    src={card.icon || "/placeholder.svg"}
    alt={card.title}
    className="h-16 w-16 object-contain"
  />
</div>
 
              {/* Title */}
              <h3 className="mb-3 text-center font-bold text-[#293E52]">
                {card.title}
              </h3>
 
              {/* Description */}
              <p className="text-center text-sm text-[#293E52]">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
 
        {/* Show More / Show Less Button (mobile only) */}
        {isMobile && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2 bg-white text-[#329ACD] font-semibold rounded-full shadow-md hover:bg-[#f2f2f2] transition"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}