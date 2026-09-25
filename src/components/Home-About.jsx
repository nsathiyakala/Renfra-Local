"use client"

import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { axiosGet } from "@/lib/api"
import { IMG_ENDPOINT } from "@/lib/config"

function AnimatedCounter({ value }) {
  const [count, setCount] = useState(0)
  const stringValue = String(value ?? "0")
  const match = stringValue.match(/^(.*?)([\d,]+(?:\.\d+)?)(.*)$/)

  useEffect(() => {
    if (!match) return

    const target = Number(match[2].replace(/,/g, ""))
    const decimals = (match[2].split(".")[1] || "").length
    const duration = 4000
    let animationFrame
    let startTime

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      setCount(Number((target * easedProgress).toFixed(decimals)))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    setCount(0)
    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [value])

  if (!match) return value

  const decimalPlaces = (match[2].split(".")[1] || "").length
  const formattedCount = count.toLocaleString("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  })

  return `${match[1]}${formattedCount}${match[3]}`
}

export default function AboutUsSection() {
  const stats = [
    { img: "/images/abt3.png", number: "650MW", label: "Solar" },
    { img: "/images/sol2.png", number: "99MW", label: "Wind" },
    { img: "/images/sol4.png", number: "28MWh wip", label: "Battery Energy Storage System" },
    { img: "/images/sol5.png", number: "500MW", label: "Operation & Maintenance" },
  ]

  const[statusCard,setStatusCard] = useState([])
  // Animation variants for Framer Motion
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }


  
    const fetchData = async () => {
  
      axiosGet
        .get(
          `masters/home/get/?web_sts=1&active_status=1`
        )
        .then((response) => {
          setStatusCard(response.data.data);
  
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    useEffect(() => {
      fetchData();
    }, []);
  
  return (
    <section className="w-full bg-background py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Content Area */}
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-start mb-2">
          {/* Left Side - Title and Description */}
          <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            variants={fadeUp}
          >
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#293E52]">About Us</h1>
              <a href="/about">
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

            <p className="text-sm sm:text-sm md:text-base lg:text-lg text-[#293E52]">
              At Renfra Energy India Limited, our commitment is to make clean energy available and affordable to all, thus reducing the carbon footprint!
            </p>
             <p className="text-sm sm:text-sm md:text-base lg:text-lg text-[#293E52] font-bold">
              Renfra Energy India Limited is a green-field project developer and provides end-to-end solutions for wind, solar and energy storage that are critical to meet the power demands of industrial, commercial and residential.
            </p>

                        <div className="mt-4">
  <a href="/about">
    <button
      className="
        px-6 py-3 rounded-full text-white font-semibold
        bg-gradient-to-r from-[#3AB257] to-[#329ACD]
        hover:opacity-90 transition-all duration-300
        flex items-center gap-2 cursor-pointer
      "
    >
      Know More
    </button>
  </a>
</div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            className="items-start justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            variants={fadeUp}
          >
            <div className="relative w-full h-[250px] md:h-[320px] lg:h-[350px] ">
              <Image
                src="/images/renfra-about.gif"
                alt="About Renfra Energy"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="border border-border rounded-lg overflow-hidden mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {statusCard.map((stat, index) => (
              <motion.div
  key={index}
  className={`
    flex flex-col items-center justify-center gap-4 p-6 bg-card
    ${index % 4 !== 3 ? "border-r border-border" : ""}
    ${index < stats.length - 4 ? "border-b border-border" : ""}
  `}
  initial="hidden"
  whileInView="visible"
  whileHover={{
    scale: 1.05,
    y: -6,
  }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{
    duration: 0.3,
    ease: "easeOut",
  }}
  variants={fadeUp}
>

                <div className="relative w-14 h-14 md:w-18 md:h-18">
                  <Image src={`${IMG_ENDPOINT}${stat.image_path}`} alt={stat.image_name} fill className="object-contain" />
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-[#293E52]"><AnimatedCounter value={stat.value} /></p>
                  <p className="text-sm md:text-base text-[#293E52] mt-1">{stat.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
