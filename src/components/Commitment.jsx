"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CommitmentSection() {
  const commitments = [
    {
      imgSrc: "/images/c1.png",
      title: "Environmental Stewardship",
      description:
        "As a company revolving around designing, manufacturing, developing, building, operating and maintaining renewable plants in the region, we understand the responsibility in safeguarding the environment, reducing carbon footprint and conserving resources, while harnessing the natural resources. ",
    },
    {
      imgSrc: "/images/c2.png",
      title: "Advanced Technology",
      description:
        "To accelerate the transition to renewable sources, we adapt the latest and innovative technologies through R&D and collaborations. This helps us to assist our clients in a swift shift to clean energy by developing both energy-efficient and cost-efficient solutions.",
    },
    {
      imgSrc: "/images/c3.png",
      title: "Socially Responsible",
      description:
        "Renfra Energy does not just invest and build renewable plants, but rather it invests and develops the communities it works in! We prioritize community engagement, ethical labor practices, and environmental stewardship. In addition of providing long term job and business opportunities to the local community.",
    },
    {
      imgSrc: "/images/c4.png",
      title: "Client-Centric",
      description:
        "Renfra Energy is dedicated to empowering clients with reliable, affordable, and sustainable energy solutions. Through advanced solar and wind technologies, we help businesses optimize energy costs, improve operational efficiency, and build a cleaner, more resilient future.) ",
    },
  ];

  const cardVariants = {
    offscreen: { opacity: 0, y: 50 },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 0.8,
      },
    },
  };

  return (
    <section
      className="pt-16 px-4 bg-cover bg-center pb-10"
      style={{ backgroundImage: "url('/images/commit-bg.png')" }}
    >
      <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#293E52] mb-4">
            Our Commitment
          </h2>
          <p className="text-[#293E52] max-w-3xl mx-auto text-sm sm:text-sm md:text-base lg:text-base">
            Renfra offers corporate training in emerging tech with hands-on
            projects to build confidence, skills, and industry readiness.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {commitments.map((item, index) => (
       <motion.div
  key={index}
  className="bg-white rounded-lg p-6 shadow-sm transition-all duration-300"
  initial="offscreen"
  whileInView="onscreen"
  viewport={{ once: true, amount: 0.2 }}
  variants={cardVariants}
  whileHover={{
    y: -6,
    scale: 1.03,
    boxShadow: "0px 12px 30px rgba(0,0,0,0.12)",
  }}
  transition={{
    type: "spring",
    stiffness: 200,
    damping: 15,
  }}
>

              {/* Image */}
              <div className="flex justify-center mb-4">
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  className="w-16 h-16 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-center font-semibold text-[#293E52] mb-3 text-lg">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-center text-[#293E52] text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
