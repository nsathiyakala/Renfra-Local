"use client";

import { ExternalLink, Sun, Wind, Zap, Battery, Wrench } from "lucide-react";

// ✅ Solution Card Component
function SolutionCard({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Icon */}
      <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-accent/10">
        <Icon className="w-6 h-6 md:w-7 md:h-7 text-accent" />
      </div>

      {/* Title */}
      <h3 className="text-lg md:text-xl font-semibold text-center text-card-foreground">{title}</h3>

      {/* Description */}
      <p className="text-sm md:text-base text-muted-foreground text-center line-clamp-3">{description}</p>
    </div>
  );
}

// ✅ Solutions Section Component
export default function SolutionsSection() {
  const solutions = [
    {
      id: 1,
      icon: Sun,
      title: "Solar PV",
      description:
        "As the leading player in PV solar greenfield project development, we harness the power of the Sun",
    },
    {
      id: 2,
      icon: Wind,
      title: "Wind",
      description:
        "As the leading player in PV solar greenfield project development, we harness the power of the Sun",
    },
    {
      id: 3,
      icon: Zap,
      title: "Commercial & Industrial",
      description:
        "As the leading player in PV solar greenfield project development, we harness the power of the Sun",
    },
    {
      id: 4,
      icon: Battery,
      title: "Energy Storage System",
      description:
        "As the leading player in PV solar greenfield project development, we harness the power of the Sun",
    },
    {
      id: 5,
      icon: Wrench,
      title: "Operation Maintenance",
      description:
        "As the leading player in PV solar greenfield project development, we harness the power of the Sun",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-[#329ACD] to-[#3AB257] py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-[85rem] 2xl:max-w-[90rem] px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 md:mb-16 text-center">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">Our Solutions</h1>
            <ExternalLink className="w-6 h-6 md:w-8 md:h-8 text-white flex-shrink-0" />
          </div>
          <p className="text-sm sm:text-sm md:text-base lg:text-base text-center
 text-white/90 max-w-2xl">
            As the leading player in PV solar greenfield project development, we harness the power of the Sun
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
          {solutions.map((solution) => (
            <SolutionCard
              key={solution.id}
              icon={solution.icon}
              title={solution.title}
              description={solution.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
