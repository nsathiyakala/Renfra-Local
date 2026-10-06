"use client"

import { useState, useEffect } from "react"
import { ChevronsLeft } from "lucide-react"

const carouselItems = [
  {
    id: 1,
    title: "Empowering a Green Revolution",
    text: "Delivering clients’ energy needs through solar and wind solutions",
  },
  {
    id: 2,
    title: "Committed to Deliver Excellence",
    text: "Achieving highest standards of performance, quality and innovation in our projects ",
  },
  {
    id: 3,
    title: "Powering a Sustainable Future",
    text: "Delivering long term energy security  and optimal performance through our renewable solutions ",
  },
]

export default function VideoBannerSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(null)

const toggleItem = (label) => {
  setActiveItem(activeItem === label ? null : label)
}

  // Smooth auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % carouselItems.length)
        setFade(true)
      }, 500)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Toggle menu on click
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Floating menu items with images
 const menuItems = [
  {
    image: "/images/new-call.svg",
    label: "Call",
    delay: 0,
    displayText: "+91 70944 88909",
    type: "info",
  },
  {
    image: "/images/mail1.svg",
    label: "Email",
    delay: 50,
    displayText: "info@renfraenergy.com",
    type: "info",
  },
  {
    image: "/images/new-whatsapp.svg",
    label: "WhatsApp",
    delay: 150,
    displayText: "+91 70944 88909",
    type: "info",
  },
  {
    image: "/images/new-down.svg",
    label: "Download",
    delay: 100,
    link: "/news",
    type: "link",
  },
]


  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Background GIF */}
      <video
  src="/images/Renfra-Energy-final-web.mp4" // replace with your actual video path
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
></video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#293E52]"></div>

      {/* Foreground Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full md:w-1/2 lg:w-6/12">
            <div className="relative h-18 sm:h-18 md:h-10 lg:h-38 overflow-hidden mb-2">
              <h1
                key={carouselItems[currentIndex].id + "-title"}
                className={`absolute text-3xl sm:text-3xl md:text-4xl lg:text-6xl font-black leading-tight transition-all duration-700 ease-in-out transform title-font text-white
                  ${fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                // style={{
                //   color: "transparent",
                //   WebkitTextStroke: "2px white",
                //   textShadow: "0 0 20px rgba(0,0,0,0.5)",
                // }}
              >
                {carouselItems[currentIndex].title}
              </h1>
            </div>

            <div className="relative h-16 md:h-20 flex items-start overflow-hidden mb-8">
              <p
                key={carouselItems[currentIndex].id + "-text"}
                className={`absolute text-lg sm:text-xl md:text-2xl text-white font-normal leading-relaxed transition-all duration-700 ease-in-out transform
                  ${fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}
              >
                {carouselItems[currentIndex].text}
              </p>
            </div>

            {/* Carousel indicators */}
            <div className="flex items-center gap-2 mt-8">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 ${
                    index === currentIndex ? "w-10 h-1.5 bg-[#3CA948]" : "w-6 h-1.5 bg-white hover:bg-white/70"
                  }`}
                  aria-label={`Go to carousel item ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Menu */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-20">
        <div className="relative flex flex-row items-center gap-0">
          {/* Menu Items */}
          <div className="flex flex-col items-end gap-1 mr-2">
            {menuItems.map((item, index) => {
              return (
                <div
  key={index}
  className={`transition-all duration-500 ease-out ${
    isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
  }`}
  style={{ transitionDelay: isOpen ? `${item.delay}ms` : "0ms" }}
>
  {item.type === "info" ? (
    <button
      onClick={() => toggleItem(item.label)}
      className="group relative w-12 h-12 md:w-14 md:h-14 bg-white rounded-full hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
      aria-label={item.label}
    >
      <img
        src={item.image}
        alt={item.label}
        className="w-8 h-8 object-contain"
      />

      {/* Info bubble */}
      {activeItem === item.label && (
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap transition-all duration-300">
          {item.displayText}
        </span>
      )}
    </button>
  ) : (
    <a href={item.link} target="_blank" rel="noopener noreferrer">
      <button
        className="group relative w-12 h-12 md:w-14 md:h-14 bg-white rounded-full hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label={item.label}
      >
        <img
          src={item.image}
          alt={item.label}
          className="w-8 h-8 object-contain"
        />
      </button>
    </a>
  )}
</div>

              )
            })}

            {/* Contact Us Button (appears only when menu is open) */}
            {/* <div
              className={`transition-all duration-500 ease-out ${
                isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
              }`}
              style={{ transitionDelay: isOpen ? "200ms" : "0ms" }}
            >
              <a href="/contact">
                <button className="group relative w-36 h-12 md:w-24 md:h-14 lg:w-26 lg:h-14 bg-gradient-to-r from-[#329ACD] to-[#3AB257] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">Contact Us</span>
                  <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                    Contact Us
                  </span>
                </button>
              </a>
            </div> */}
          </div>

          {/* Main Floating Toggle Button */}
          <button
            onClick={toggleMenu}
            className="relative w-10 h-16 lg:w-8 lg:h-24 bg-gradient-to-r from-[#329ACD] to-[#3AB257] rounded-l-lg transition-all duration-300 flex items-center justify-center z-10"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <ChevronsLeft
              className={`w-6 h-6 md:w-7 md:h-7 text-white transition-transform duration-500 ease-out ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
            <div
              className={`absolute inset-0 rounded-full bg-white transition-all duration-700 ${
                isOpen ? "scale-150 opacity-0" : "scale-0 opacity-30"
              }`}
            ></div>
          </button>
        </div>
      </div>
    </div>
  )
}