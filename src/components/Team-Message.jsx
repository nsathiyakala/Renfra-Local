"use client"

import { useState } from "react"
import Image from "next/image"

const tabsData = [
  {
    id: "cmd-message",
    label: "CMD Message",
    image: "/images/cmd.png",
    name: "Dr. Muthuraj Periyasamy",
    designation: "Chairman & Managing Director",
    team: "Speed Team Group",
    title: "CMD Message",
    paragraphs: [
      {
        intro: "Dear Stakeholders,",
        content:
          "At Renfra Energy India Limited, we are committed to building a cleaner and more sustainable future through innovative solar, wind, and energy storage solutions. Our mission is to deliver reliable, efficient, and cost-effective renewable energy that helps businesses achieve energy independence while reducing their environmental impact.",
      },
       {
        content:
          "We provide end-to-end renewable energy solutions—from design and engineering to installation, commissioning, and long-term maintenance. Every project is tailored to meet our customers' unique requirements, ensuring maximum performance, long-term savings, and operational excellence.",
      },
        {
        content:
          "Customer satisfaction is at the core of everything we do. We build lasting relationships through quality, transparency, timely execution, and dedicated after-sales support. Our success is measured not only by the energy we generate but also by the trust and confidence our customers place in us.",
      },
       {
        content:
          "Driven by innovation, integrity, and a passionate team of professionals, we remain committed to creating sustainable value for our customers, partners, employees, investors, and communities.",
      },
       {
        content:
          "Thank you for your continued trust and support. Together, we are powering progress and building a sustainable tomorrow.",
      },
    ],
  },
  {
    id: "md-message",
    label: "Director Message",
    image: "/images/md1.png",
    name: "Mr.Jayendran Periyasamy",
    designation: "Director",
    team: "Speed Team",
    title: "Director Message",
    paragraphs: [
      {
        intro: "Dear Patrons,",
        content:
          "At Renfra Energy India Limited, we are committed to delivering innovative and reliable renewable energy solutions through solar, wind, and Battery Energy Storage Systems (BESS). From design and construction to commissioning and long-term Operation & Maintenance, we provide end-to-end services that maximize performance and value.",
      },
      {
        content:
          "Driven by quality, innovation, and customer satisfaction, we deliver every project with safety, excellence, and on-time execution. We value the trust our customers place in us and strive to build lasting partnerships that power a sustainable future.",
      },
       {
        content:
          "Thank you for your confidence in Renfra Energy. Together, let's build a cleaner, greener tomorrow.",
      },
      
    ],
  },
  {
    id: "key-management",
    label: "Directors",
    title: "Directors",
    images: [
      {
        id: 1,
        src: "/images/cmd.png",
        alt: "Management Member 1",
        name: "Dr.Muthuraj Periyasamy",
        position: "Chairman & Managing Director",
        company: "Speed Team Group",
      },
      {
        id: 2,
        src: "/images/md1.png",
        alt: "Management Member 2",
        name: "Mr.Jayendran Periyasamy",
        position: "Director",
        company: "Speed Team",
      },
      // {
      //   id: 3,
      //   src: "/images/team3.png",
      //   alt: "Management Member 3",
      //   name: "Mr.Armuga Raja",
      //   position: "Joint Managing Director",
      //   company: "Speed Team",
      // },
    ],
  },
]

export default function ExecutiveMessageTabs() {
  const [activeTab, setActiveTab] = useState("cmd-message")
  const [showMore, setShowMore] = useState(false)
  const activeContent = tabsData.find((tab) => tab.id === activeTab)

  // Reset "Read More" state when switching tabs
  const handleTabChange = (id) => {
    setActiveTab(id)
    setShowMore(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#329ACD] to-[#3AB257] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs Navigation */}
        <div className="flex gap-4 mb-12 justify-center flex-wrap">
          {tabsData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-white text-[#293E52] shadow-lg"
                  : "bg-transparent text-white hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Section */}
        {activeContent && (
          <div className="animate-fade-in">
            {activeContent.id === "key-management" ? (
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-white text-center">
                  {activeContent.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeContent.images?.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-xl"
                    >
                      <div className="relative w-full h-64 sm:h-72 md:h-80">
                        <Image
                          src={item.src || "/placeholder.svg"}
                          alt={item.alt}
                          fill
                          className="object-cover p-3"
                          priority
                        />
                      </div>
                      <div className="p-4 flex flex-col justify-center">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm font-semibold text-gray-700 mb-1">
                          {item.position}
                        </p>
                        {/* <p className="text-sm text-green-600 font-medium">
                          {item.company}
                        </p> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* Left Side */}
                <div className="flex flex-col items-center lg:items-start h-full">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-xl w-full h-full flex flex-col">
                    <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-full lg:min-h-96">
                      <Image
                        src={activeContent.image || "/placeholder.svg"}
                        alt={activeContent.name}
                        fill
                        className="object-cover p-3 rounded-2xl"
                        priority
                      />
                    </div>
                    <div className="p-3 flex flex-col justify-center flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {activeContent.name}
                      </h3>
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        {activeContent.designation}
                      </p>
                      {/* <p className="text-sm text-green-600 font-medium">
                        {activeContent.team}
                      </p> */}
                    </div>
                  </div>
                </div>

                {/* Right Side - Message Content */}
                <div className="text-white flex flex-col justify-center h-full">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                    {activeContent.title}
                  </h2>
                  <div className="space-y-5">
                    {(showMore
                      ? activeContent.paragraphs
                      : activeContent.paragraphs.slice(0, 2)
                    ).map((para, index) => (
                      <div key={index}>
                        {para.intro && (
                          <p className="text-base md:text-lg font-semibold mb-3">
                            {para.intro}
                          </p>
                        )}
                        <p className="text-sm md:text-base leading-relaxed text-white/95">
                          {para.content}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Read More / Less Button */}
                  {activeContent.paragraphs.length > 2 && (
                    <button
                      onClick={() => setShowMore(!showMore)}
                      className="mt-6 text-sm font-medium w-[120px] bg-white text-[#293E52] px-5 py-2 rounded-full hover:bg-white/90 transition cursor-pointer"
                    >
                      {showMore ? "Read Less" : "Read More"}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  )
}
