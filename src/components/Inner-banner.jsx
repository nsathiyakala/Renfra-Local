"use client"
import { useState,useEffect } from "react"
import { Phone, Mail, Download, ChevronsLeft } from "lucide-react"
import { axiosGet,BASE_URL } from "@/lib/api"

export default function InnerBanner({ title, bgImage }) {
  const [isOpen, setIsOpen] = useState(false)
  const [menuItems,setMenuItems]=useState([])
  const [activeTab, setActiveTab] = useState(0);
  const [tabsData, setTabsData] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
   const currentTab = tabsData[activeTab]; // ✅ correct

  const menusItems = [
  {
    image: "/images/con-call.png",
    label: "Call",
    value: "+91 70944 88909",
    type: "info",
    delay: 0,
  },
  {
    image: "/images/mail1.svg",
    label: "Email",
    value: "info@renfraenergy.com",
    type: "info",
    delay: 50,
  },
  {
    image: "/images/whatsapp1.png",
    label: "WhatsApp",
    value: "+91 70944 88909",
    type: "info",
    delay: 150,
  },
  {
    image: "/images/new-down.svg",
    label: "Download",
    link: "/news",
    type: "link",
    delay: 100,
  },
];


    const fetchContentData = async (uniqId) => {
      if (!uniqId) return;
  
      setLoading(true);
      try {
        const response = await axiosGet.get(
          `masters/solutions/content/get/?solution_id=${uniqId}&web_sts=1`
        );
  
        const contentObj = response.data.data?.[0]?.data;
        setMenuItems(contentObj || null);
      } catch (err) {
        console.error("Content Error:", err);
        setMenuItems(null);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (currentTab?.data_uniq_id) {
        fetchContentData(currentTab.data_uniq_id);
      }
    }, [activeTab]);

 const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <section className="relative w-full h-[150px] md:h-[250px] lg:h-[360px] flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Overlay (optional) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#193F3D]"></div>

      {/* Content */}
      <div className="relative z-10 max-w-[85rem] 2xl:max-w-[90rem] mx-auto w-full px-6 md:px-10">
        <div className="text-white space-y-3">
          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-normal">{title || "Page Title"}</h1>

          {/* Divider line */}
          <div className="max-w-[85rem] 2xl:max-w-[90rem] h-[1px] bg-white/70"></div>

          {/* Breadcrumb */}
          <div className="text-sm md:text-base text-gray-200">
            <a href="/" className="text-white font-bold hover:underline">
              Home
            </a>
            {/* <span className="mx-2 text-white">›</span>
            <a href="/solutions" className="text-white font-bold hover:underline">
              Solutions
            </a> */}
            <span className="mx-2 text-white">›</span>
            <span className="text-[#1dec50]">{title || "Page"}</span>
          </div>
        </div>
      </div>

      <div className="fixed -right-2 top-2/4 -translate-y-1/2 md:-right-2 lg:-right-0 z-20">
        <div className="relative flex flex-row items-center gap-3">
          {/* Menu Items */}
          <div className="flex flex-col items-end gap-1">
            {menusItems.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`transition-all duration-500 ease-out ${
                    isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16 pointer-events-none"
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${item.delay}ms` : "0ms",
                  }}
                >
                 <div
  key={index}
  className={`transition-all duration-500 ease-out ${
    isOpen
      ? "opacity-100 translate-x-0"
      : "opacity-0 translate-x-16 pointer-events-none"
  }`}
  style={{ transitionDelay: isOpen ? `${item.delay}ms` : "0ms" }}
>
  {/* LINK TYPE (Download) */}
  {item.type === "link" ? (
    <a href={item.link} target="_blank" rel="noopener noreferrer">
      <button className="group relative w-12 h-12 bg-white rounded-full hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center">
        <img src={item.image} alt={item.label} className="w-6 h-6" />
      </button>
    </a>
  ) : (
    /* INFO TYPE (Call / Email / WhatsApp) */
    <button
      onClick={() =>
        setActiveMenu(activeMenu === index ? null : index)
      }
      className="group relative w-12 h-12 bg-white rounded-full hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
    >
      <img src={item.image} alt={item.label} className="w-6 h-6" />

      {/* INFO POPUP */}
      <span
        className={`absolute right-full mr-3 px-3 py-1.5 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap transition-all duration-300 ${
          activeMenu === index
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        {item.value}
      </span>
    </button>
  )}
</div>

                </div>
              )
            })}
          </div>

          {/* Main Floating Toggle Button */}
          <button
            onClick={toggleMenu}
            className="relative w-10 h-16 lg:w-8 lg:h-24 bg-gradient-to-r from-[#329ACD] to-[#3AB257] rounded-none transition-all duration-300 flex items-center justify-center z-10"
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
    </section>
  )
}