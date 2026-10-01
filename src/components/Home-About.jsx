"use client"

import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { axiosGet } from "@/lib/api"

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

// Inline SVG icons matching the original screenshot exactly
// Solar panel+sun, Wind turbine, Battery+bolt, Wrench+screwdriver
function StatIcon({ index, title }) {
  const t = (title || "").toLowerCase();

  // ── Solar: solar panel (blue) + sun rays (green, spinning) ──
  if (t.includes("solar") || (!t && index === 0)) {
    return (
      <svg viewBox="0 0 64 56" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Sun — green, spins around its centre */}
        <motion.g
          style={{ transformOrigin: "32px 13px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="32" cy="13" r="5.5" fill="#3AB257" />
          {[0,45,90,135,180,225,270,315].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            return <line key={i}
              x1={32 + 8.5 * Math.cos(rad)} y1={13 + 8.5 * Math.sin(rad)}
              x2={32 + 12  * Math.cos(rad)} y2={13 + 12  * Math.sin(rad)}
              stroke="#3AB257" strokeWidth="2.5" strokeLinecap="round" />;
          })}
        </motion.g>
        {/* Solar panel body — blue */}
        <rect x="6" y="28" width="52" height="24" rx="3" fill="#1a4fa0" opacity="0.12" stroke="#1a4fa0" strokeWidth="2" />
        {/* Panel vertical dividers */}
        <line x1="23" y1="28" x2="23" y2="52" stroke="#1a4fa0" strokeWidth="1.5" />
        <line x1="41" y1="28" x2="41" y2="52" stroke="#1a4fa0" strokeWidth="1.5" />
        {/* Panel horizontal divider */}
        <line x1="6" y1="40" x2="58" y2="40" stroke="#1a4fa0" strokeWidth="1.5" />
        {/* Panel cell fill tint */}
        <rect x="8"  y="30" width="13" height="9" rx="1.5" fill="#1a4fa0" opacity="0.18" />
        <rect x="25" y="30" width="14" height="9" rx="1.5" fill="#1a4fa0" opacity="0.18" />
        <rect x="43" y="30" width="13" height="9" rx="1.5" fill="#1a4fa0" opacity="0.18" />
        <rect x="8"  y="42" width="13" height="8" rx="1.5" fill="#1a4fa0" opacity="0.18" />
        <rect x="25" y="42" width="14" height="8" rx="1.5" fill="#1a4fa0" opacity="0.18" />
        <rect x="43" y="42" width="13" height="8" rx="1.5" fill="#1a4fa0" opacity="0.18" />
        {/* Legs */}
        <line x1="20" y1="52" x2="15" y2="56" stroke="#1a4fa0" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="44" y1="52" x2="49" y2="56" stroke="#1a4fa0" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  // ── Wind: turbine tower (blue) + 3 spinning blades (green) ──
  if (t.includes("wind") || (!t && index === 1)) {
    return (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Tower — blue trapezoid */}
        <path d="M28 36 L24 62 L40 62 L36 36Z" fill="#1a4fa0" opacity="0.85" />
        {/* Base */}
        <rect x="20" y="59" width="24" height="5" rx="2.5" fill="#1a4fa0" />
        {/* Hub */}
        <circle cx="32" cy="34" r="4" fill="#1a4fa0" />
        <circle cx="32" cy="34" r="2" fill="white" />
        {/* Spinning blades */}
        <motion.g
          style={{ transformOrigin: "32px 34px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        >
          {/* Blade up */}
          <path d="M32 30 C31 22 27 10 24 4 C28 14 31 24 32 30Z" fill="#3AB257" />
          {/* Blade right-down */}
          <path d="M35 36 C43 39 54 39 58 38 C50 37 42 35 35 36Z" fill="#3AB257" opacity="0.9" />
          {/* Blade left-down */}
          <path d="M29 37 C21 42 12 49 8 53 C14 48 23 42 29 37Z" fill="#3AB257" opacity="0.75" />
        </motion.g>
      </svg>
    );
  }

  // ── Battery: rounded square (blue) + lightning bolt (green, pulses) ──
  if (
    t.includes("battery") ||
    t.includes("bess") ||
    t.includes("storage") ||
    (!t && index === 2)
  ) {
    return (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Outer rounded square */}
        <rect x="6" y="6" width="52" height="52" rx="12" stroke="#1a4fa0" strokeWidth="3" fill="none" />
        {/* Small terminal bumps on top */}
        <rect x="18" y="2" width="10" height="6" rx="2" fill="#1a4fa0" />
        <rect x="36" y="2" width="10" height="6" rx="2" fill="#1a4fa0" />
        {/* Lightning bolt — green */}
        <motion.path
          d="M37 10 L26 34 L34 34 L27 54 L38 28 L30 28 Z"
          fill="#3AB257"
          animate={{ opacity: [1, 0.35, 1] }}
          transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    );
  }

  // ── O&M: wrench (blue) + screwdriver (green) crossed, each rocks ──
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Wrench — blue, rocks */}
      <motion.g
        style={{ transformOrigin: "22px 22px" }}
        animate={{ rotate: [0, -12, 0, 12, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Wrench head circle */}
        <circle cx="16" cy="16" r="9" stroke="#1a4fa0" strokeWidth="3" fill="#1a4fa0" fillOpacity="0.12" />
        {/* Wrench notch */}
        <path d="M10 10 L14 14 M22 10 L18 14" stroke="#1a4fa0" strokeWidth="2.5" strokeLinecap="round" />
        {/* Wrench handle */}
        <path d="M22 22 L48 48" stroke="#1a4fa0" strokeWidth="5" strokeLinecap="round" />
        {/* Wrench end */}
        <rect x="44" y="46" width="9" height="7" rx="2" transform="rotate(45 44 46)" fill="#1a4fa0" />
      </motion.g>
      {/* Screwdriver — green, rocks opposite */}
      <motion.g
        style={{ transformOrigin: "48px 16px" }}
        animate={{ rotate: [0, 12, 0, -12, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        {/* Handle */}
        <rect x="42" y="4" width="12" height="18" rx="5" fill="#3AB257" />
        {/* Shaft */}
        <line x1="48" y1="22" x2="18" y2="58" stroke="#3AB257" strokeWidth="4" strokeLinecap="round" />
        {/* Flat tip */}
        <line x1="14" y1="56" x2="22" y2="62" stroke="#3AB257" strokeWidth="3.5" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
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
    <section className="w-full bg-background py-12 md:pt-16 md:pb-12 lg:pt-20 lg:pb-10">
      <div className="mx-auto max-w-[85rem] 2xl:max-w-[90rem] px-4 sm:px-6 lg:px-8">
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
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
            {statusCard.map((stat, index) => (
              <motion.div
                key={index}
                className={`
                  flex flex-col items-center justify-center gap-5 p-5 lg:p-8 bg-card
                  ${index % 4 !== 3 ? "sm:border-r border-border" : ""}
                  ${index < statusCard.length - 4 ? "border-b border-border" : ""}
                `}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              >
                {/* One spinning dashed ring + one orbiting dot + icon */}
                <div className="relative w-28 h-28 flex items-center justify-center">

                  {/* Single dashed ring — spins clockwise */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-dashed border-[#3AB257]/60"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Orbiting green dot on the ring */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 block w-3 h-3 rounded-full bg-[#3AB257] shadow-[0_0_8px_3px_rgba(58,178,87,0.55)]" />
                  </motion.div>

                  {/* Animated icon illustration */}
                  <div className="relative z-10 w-16 h-16" aria-hidden="true">
                    <StatIcon index={index} title={stat.title} />
                  </div>

                </div>

                {/* Number + label */}
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-[#293E52]">
                    <AnimatedCounter value={stat.value} />
                  </p>
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
