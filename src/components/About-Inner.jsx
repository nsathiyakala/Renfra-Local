"use client"

import React, { useState } from "react"
import { Play } from "lucide-react"
import { motion } from "framer-motion"

export default function CenterTextVideoSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="flex flex-col items-center justify-center px-4 pt-12 pb-4 bg-white">
      {/* Centered Paragraph */}
      <motion.div
        className="max-w-6xl text-center mb-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div
          className={`text-base sm:text-base md:text-md lg:text-lg text-gray-700 leading-relaxed transition-all duration-500 ${
            isExpanded ? "line-clamp-none" : "line-clamp-4"
          }`}
        >
          <p>
           At Renfra Energy India Limited, our commitment is to make clean energy available and affordable to all, thus reducing the carbon footprint!
          </p>

          <br />

          <p>
            As a fast-growing turkey solution provider for clean energy in the region, Renfra Energy India Limited takes pride in the fact that the company has been acting as a catalyst in the renewable energy landscape by bringing positive changes that creates a greener and a sustainable future! Renfra Energy India Limited is a green-field project developer and provides end-to-end solutions for wind, solar and energy storage that are critical to meet the power demands of industrial, commercial and residential.
          </p>

          {/* New Section inside Read More */}
          <div className="mt-8 text-left">
            <h3 className="text-xl md:text-2xl font-bold text-[#0D0D0D] mb-3">
              What We Do            </h3>

            <p className="text-base md:text-lg text-gray-700 mb-4">
              We are a full-service EPC (Engineering, Procurement & Construction) company delivering:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Solar Power Plants (Utility Scale)</li>
              <li>Wind Energy Projects</li>
              <li>Battery Energy Storage Systems (BESS)</li>
              <li>Hybrid Renewable Solutions (Solar + Wind + BESStorage)</li>
            </ul>

             <p className="text-base md:text-lg text-gray-700 my-4">
             From planning to commissioning — and beyond — we manage your entire energy project under one roof.
            </p>
          </div>
        </div>

        {/* Read More / Less Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-[#0D0D0D] font-semibold px-3 py-1 border border-black rounded-lg hover:text-[#555] cursor-pointer"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </motion.div>

      {/* Video Section */}
<motion.div
  className="relative w-full max-w-[85rem] 2xl:max-w-[90rem] rounded-2xl overflow-hidden"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
  viewport={{ once: true, amount: 0.3 }}
>
  <img
    src="/images/about-video-image.png"
    alt="Banner"
    className="w-full h-[400px] object-cover"
  />

  {/* Play Button */}
  <motion.button
    className="absolute inset-0 flex items-center justify-center hover:bg-black/50 transition"
    aria-label="Play video"
    initial={{ scale: 0 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    {/* <div className="bg-white text-black rounded-full p-4 md:p-6 shadow-lg">
      <Play className="w-6 h-6 md:w-8 md:h-8" />
    </div> */}
  </motion.button>
</motion.div>
    </section>
  )
}