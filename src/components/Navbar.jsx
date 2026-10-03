
// "use client";

// import { Suspense, useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname, useSearchParams } from "next/navigation";
// import { axiosGet } from "@/lib/api";

// export function Navbar() {
//   return (
//     <Suspense fallback={null}>
//       <NavbarContent />
//     </Suspense>
//   );
// }

// function NavbarContent() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [solutions, setSolutions] = useState([]);

//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const activeTabParam = searchParams.get("tab");

//   /* ---------------- Fetch Solutions ---------------- */
//   useEffect(() => {
//     const fetchSolutions = async () => {
//       try {
//         const response = await axiosGet.get(
//           "masters/solutions/get/?web_sts=1&active_status=1&order_type=asc&order_field=created_date"
//         );
//         setSolutions(response.data.data || []);
//       } catch (error) {
//         console.error("Navbar Solutions Error:", error);
//       }
//     };

//     fetchSolutions();
//   }, []);

//   /* ---------------- Navigation ---------------- */
//   const navItems = [
//     { label: "Home", href: "/" },
//     { label: "About Us", href: "/about" },
//     {
//       label: "Our Solutions",
//       href: "/solutions",
//       children: solutions,
//     },
//     {
//       label: "Investor Relations",
//       children: [
//         {
//           title: "DRHP Documents",
//           href: "/investor-relations?tab=drhp",
//           tabId: "drhp",
//         },
//         {
//           title: "Management",
//           href: "/investor-relations?tab=management",
//           tabId: "management",
//         },
//         {
//           title: "REG 46",
//           href: "/investor-relations?tab=reg46",
//           tabId: "reg46",
//         },
//         {
//           title: "Financials",
//           href: "/investor-relations?tab=financials",
//           tabId: "financials",
//         },
//         {
//           title: "Investor Contacts",
//           href: "/investor-relations?tab=investor",
//           tabId: "investor",
//         },
//         {
//           title: "SEBI AVS",
//           href: "/investor-relations?tab=sebi",
//           tabId: "sebi",
//         },
//         {
//           title: "Stock Exchange Compliance",
//           href: "/investor-relations?tab=compliance",
//           tabId: "compliance",
//         },
//         // {
//         //   title: "News Paper Publication",
//         //   href: "/investor-relations?tab=newspaper",
//         //   tabId: "newspaper",
//         // },
//       ],
//     },
//     { label: "Projects", href: "/projects" },
//     { label: "IMS @ Renfra", href: "/ims@renfra" },
//     { label: "News & Media", href: "/news" },
//     { label: "Career", href: "/career" },
//     // { label: "Corporate", href: "/corporate" },
//     { label: "Contact Us", href: "/contact" },
//   ];

//   const isActive = (href) => {
//     if (href === "/solutions") {
//       return (
//         pathname === "/solutions" ||
//         pathname === "/solutions-details"
//       );
//     }
//     return pathname === href;
//   };

//   // Check if any Investor Relations child tab is currently active
//   const isInvestorChildActive = (tabId) => {
//     return pathname === "/investor-relations" && activeTabParam === tabId;
//   };

//   // Check if Investor Relations parent label should be highlighted
//   const isInvestorRelationsActive = () => {
//     return pathname === "/investor-relations";
//   };

//   const [openMobileMenu, setOpenMobileMenu] = useState(null);

//   const toggleMobileMenu = (label) => {
//     setOpenMobileMenu(openMobileMenu === label ? null : label);
//   };

//   return (
//     <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
//       <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">

//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-2">
//             <Image
//               src="/images/renfra-logo.svg"
//               alt="ReNfra Logo"
//               width={220}
//               height={65}
//               className="object-contain"
//               priority
//             />
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center gap-8">
//             {navItems.map((item) => {
//               // Our Solutions Dropdown
//               if (item.label === "Our Solutions") {
//                 return (
//                   <div key={item.label} className="relative group">
//                     <div className="flex items-center gap-1 cursor-pointer font-bold text-[#293E52]">
//                       <Link
//                         href={item.href}
//                         className={`text-sm ${
//                           isActive(item.href)
//                             ? "bg-gradient-to-r from-[#3AB257] to-[#329ACD] bg-clip-text text-transparent"
//                             : "hover:text-teal-600"
//                         }`}
//                       >
//                         {item.label}
//                       </Link>

//                       <svg
//                         className="w-4 h-4 transition-transform group-hover:rotate-180"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M19 9l-7 7-7-7"
//                         />
//                       </svg>
//                     </div>

//                     <div className="absolute top-full left-0 mt-3 w-64 bg-white shadow-lg rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//                       {item.children.length > 0 ? (
//                         item.children.map((child) => (
//                           <Link
//                             key={child.data_uniq_id}
//                             href={`/solutions-details?id=${child.data_uniq_id}`}
//                             className="block px-5 py-3 text-sm text-[#293E52] hover:bg-gray-100 rounded-xl"
//                           >
//                             {child.title}
//                           </Link>
//                         ))
//                       ) : (
//                         <div className="px-5 py-3 text-sm text-gray-400">
//                           Loading...
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 );
//               }

//               // Investor Relations Dropdown
//               if (item.label === "Investor Relations") {
//                 return (
//                   <div key={item.label} className="relative group">
//                     <div className="flex items-center gap-1 cursor-pointer font-bold text-[#293E52]">
//                       <span
//                         className={`text-sm ${
//                           isInvestorRelationsActive()
//                             ? "bg-gradient-to-r from-[#3AB257] to-[#329ACD] bg-clip-text text-transparent"
//                             : "hover:text-teal-600"
//                         }`}
//                       >
//                         Investor Relations
//                       </span>

//                       <svg
//                         className="w-4 h-4 transition-transform group-hover:rotate-180"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M19 9l-7 7-7-7"
//                         />
//                       </svg>
//                     </div>

//                     <div className="absolute top-full left-0 mt-3 w-72 bg-white shadow-lg rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//                       {item.children.map((child) => (
//                         <Link
//                           key={child.href}
//                           href={child.href}
//                           className={`block px-5 py-3 text-sm font-medium transition-colors duration-150 ${
//                             isInvestorChildActive(child.tabId)
//                               ? "bg-gradient-to-r from-[#3AB257] to-[#329ACD] bg-clip-text text-transparent font-bold"
//                               : "text-[#293E52] hover:bg-gray-100"
//                           }`}
//                         >
//                           {child.title}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 );
//               }

//               // Normal Menu Items
//               return (
//                 <Link
//                   key={item.label}
//                   href={item.href}
//                   className={`text-sm transition-colors font-bold ${
//                     isActive(item.href)
//                       ? "bg-gradient-to-r from-[#3AB257] to-[#329ACD] bg-clip-text text-transparent"
//                       : "text-[#293E52] hover:text-teal-600"
//                   }`}
//                 >
//                   {item.label}
//                 </Link>
//               );
//             })}
//           </div>

//           {/* Mobile menu button */}
//           <div className="lg:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="p-2 rounded-md"
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d={
//                     isOpen
//                       ? "M6 18L18 6M6 6l12 12"
//                       : "M4 6h16M4 12h16M4 18h16"
//                   }
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div
//           className={`lg:hidden fixed inset-0 bg-white z-50 transition-transform duration-300 overflow-y-auto ${
//             isOpen ? "translate-x-0" : "translate-x-full"
//           }`}
//         >
//           <div className="flex justify-between items-center px-6 pt-6">
//             <Image
//               src="/images/renfra-logo.svg"
//               alt="Logo"
//               width={150}
//               height={50}
//             />
//             <button onClick={() => setIsOpen(false)}>✕</button>
//           </div>

//           <div className="flex flex-col px-6 mt-10 pb-10">
//             {navItems.map((item) =>
//               item.children ? (
//                 <div
//                   key={item.label}
//                   className="border-b border-gray-200 py-3"
//                 >
//                   <button
//                     onClick={() => toggleMobileMenu(item.label)}
//                     className="w-full flex justify-between items-center text-lg font-semibold text-[#293E52]"
//                   >
//                     <span
//                       className={
//                         item.label === "Investor Relations" && isInvestorRelationsActive()
//                           ? "bg-gradient-to-r from-[#3AB257] to-[#329ACD] bg-clip-text text-transparent"
//                           : ""
//                       }
//                     >
//                       {item.label}
//                     </span>

//                     <svg
//                       className={`w-5 h-5 transition-transform duration-300 ${
//                         openMobileMenu === item.label ? "rotate-180" : ""
//                       }`}
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 9l-7 7-7-7"
//                       />
//                     </svg>
//                   </button>

//                   {openMobileMenu === item.label && (
//                     <div className="pl-4 pt-3 flex flex-col gap-3">
//                       {item.label === "Our Solutions"
//                         ? item.children.map((child) => (
//                             <Link
//                               key={child.data_uniq_id}
//                               href={`/solutions-details?id=${child.data_uniq_id}`}
//                               onClick={() => setIsOpen(false)}
//                               className="text-base text-[#293E52]"
//                             >
//                               {child.title}
//                             </Link>
//                           ))
//                         : item.children.map((child) => (
//                             <Link
//                               key={child.href}
//                               href={child.href}
//                               onClick={() => setIsOpen(false)}
//                               className={`text-base font-medium transition-colors ${
//                                 isInvestorChildActive(child.tabId)
//                                   ? "bg-gradient-to-r from-[#3AB257] to-[#329ACD] bg-clip-text text-transparent font-bold"
//                                   : "text-[#293E52]"
//                               }`}
//                             >
//                               {child.title}
//                             </Link>
//                           ))}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <Link
//                   key={item.label}
//                   href={item.href}
//                   onClick={() => setIsOpen(false)}
//                   className="border-b border-gray-200 py-4 text-lg font-semibold text-[#293E52]"
//                 >
//                   {item.label}
//                 </Link>
//               )
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }


"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { axiosGet } from "@/lib/api";

export function Navbar() {
  return (
    <Suspense fallback={null}>
      <NavbarContent />
    </Suspense>
  );
}

function NavbarContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [solutions, setSolutions] = useState([]);
  const [investorRelations, setInvestorRelations] = useState([]);
  const [loadingSolutions, setLoadingSolutions] = useState(true);
  const [loadingInvestor, setLoadingInvestor] = useState(true);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTabParam = searchParams.get("tab");

  /* ---------------- Fetch Solutions ---------------- */
  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        setLoadingSolutions(true);
        const response = await axiosGet.get(
          "masters/solutions/get/?web_sts=1&active_status=1&order_type=asc&order_field=created_date"
        );
        console.log("[v0] Solutions Response:", response.data);
        setSolutions(
          (response.data?.data || []).filter(
            (item) =>
              !item.title?.toLowerCase().includes("operations") &&
              !item.title?.toLowerCase().includes("maintenance") &&
              !item.title?.toLowerCase().includes("o&m") &&
              !item.title?.toLowerCase().includes("o & m")
          )
        );
      } catch (error) {
        console.error("Navbar Solutions Error:", error);
        setSolutions([]);
      } finally {
        setLoadingSolutions(false);
      }
    };

    fetchSolutions();
  }, []);

  /* ---------------- Fetch Investor Relations ---------------- */
  useEffect(() => {
    const fetchInvestorRelations = async () => {
      try {
        setLoadingInvestor(true);
        const response = await axiosGet.get(
          "masters/investors/get/?web_sts=1&active_status=1&order_type=asc&order_field=created_date"
        );
        console.log("[v0] Investor Relations Response:", response.data);
        // FIX: Extract data.data just like Solutions
        setInvestorRelations(response.data?.data || []);
      } catch (error) {
        console.error("Navbar Investor Relations Error:", error);
        setInvestorRelations([]);
      } finally {
        setLoadingInvestor(false);
      }
    };

    fetchInvestorRelations();
  }, []);

  /* ---------------- Navigation ---------------- */
  const navItems = [
    { label: "Home", href: "/" },
    {
      label: "About Us",
      href: "/about",
      children: [{ title: "Clients", href: "/clients" }],
    },
    {
      label: "Our Solutions",
      href: "/solutions",
      children: solutions,
    },
    {
      label: "Investor Relations",
      children: investorRelations,
    },
    { label: "Projects", href: "/projects" },
    { label: "O & M", href: "/operations-maintenance" },
    { label: "IMS @ Renfra", href: "/ims@renfra" },
    { label: "News & Media", href: "/news" },
    { label: "Career", href: "/career" },
    { label: "Contact Us", href: "/contact" },
  ];

  const isActive = (href) => {
    if (href === "/solutions") {
      return (
        pathname === "/solutions" ||
        pathname === "/solutions-details"
      );
    }
    return pathname === href;
  };

  const isInvestorChildActive = (tabId) => {
    return pathname === "/investor-relations" && activeTabParam === tabId;
  };

  const isInvestorRelationsActive = () => {
    return pathname === "/investor-relations";
  };

  const isAboutActive = () => pathname === "/about" || pathname === "/clients";

  const [openMobileMenu, setOpenMobileMenu] = useState(null);

  const toggleMobileMenu = (label) => {
    setOpenMobileMenu(openMobileMenu === label ? null : label);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/renfra-logo.svg"
              alt="ReNfra Logo"
              width={220}
              height={65}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              // Our Solutions Dropdown
              if (item.label === "Our Solutions") {
                return (
                  <div key={item.label} className="relative group">
                    <div className="flex items-center gap-1 cursor-pointer font-bold text-[#293E52]">
                      <Link
                        href={item.href}
                        className={`text-sm ${
                          isActive(item.href)
                            ? "bg-gradient-to-r from-[#3AB257] to-[#329ACD] bg-clip-text text-transparent"
                            : "hover:text-teal-600"
                        }`}
                      >
                        {item.label}
                      </Link>

                      <svg
                        className="w-4 h-4 transition-transform group-hover:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>

                    <div className="absolute top-full left-0 mt-3 w-64 bg-white shadow-lg rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {loadingSolutions ? (
                        <div className="px-5 py-3 text-sm text-gray-400">
                          Loading Solutions...
                        </div>
                      ) : item.children.length > 0 ? (
                        item.children.map((child) => (
                          <Link
                            key={child.data_uniq_id}
                            href={`/solutions-details?id=${child.data_uniq_id}`}
                            className="block px-5 py-3 text-sm text-[#293E52] hover:bg-gray-100 rounded-xl"
                          >
                            {child.title}
                          </Link>
                        ))
                      ) : (
                        <div className="px-5 py-3 text-sm text-gray-400">
                          No solutions available
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              if (item.label === "About Us") {
                return (
                  <div key={item.label} className="relative group">
                    <div className="flex items-center gap-1 cursor-pointer font-bold text-[#293E52]">
                      <Link
                        href={item.href}
                        className={`text-sm ${
                          isAboutActive()
                            ? "bg-gradient-to-r from-[#3AB257] to-[#329ACD] bg-clip-text text-transparent"
                            : "hover:text-teal-600"
                        }`}
                      >
                        {item.label}
                      </Link>
                      <svg
                        className="w-4 h-4 transition-transform group-hover:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    <div className="absolute top-full left-0 mt-3 w-48 bg-white shadow-lg rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-5 py-3 text-sm text-[#293E52] hover:bg-gray-100 rounded-xl"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              // Investor Relations Dropdown
              if (item.label === "Investor Relations") {
                return (
                  <div key={item.label} className="relative group">
                    <div className="flex items-center gap-1 cursor-pointer font-bold text-[#293E52]">
                      <span
                        className={`text-sm ${
                          isInvestorRelationsActive()
                            ? "bg-gradient-to-r from-[#3AB257] to-[#329ACD] bg-clip-text text-transparent"
                            : "hover:text-teal-600"
                        }`}
                      >
                        Investor Relations
                      </span>

                      <svg
                        className="w-4 h-4 transition-transform group-hover:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>

                    <div className="absolute top-full left-0 mt-3 w-72 bg-white shadow-lg rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {loadingInvestor ? (
                        <div className="px-5 py-3 text-sm text-gray-400">
                          Loading Investor Relations...
                        </div>
                      ) : item.children.length > 0 ? (
                        item.children.map((child) => (
                          <Link
                            key={child.data_uniq_id}
                            href={`/investor-relations?tab=${child.data_uniq_id}`}
                            className={`block px-5 py-3 text-sm font-medium transition-colors duration-150 ${
                              isInvestorChildActive(child.data_uniq_id)
                                ? "bg-gradient-to-r from-[#3AB257] to-[#329ACD] bg-clip-text text-transparent font-bold"
                                : "text-[#293E52] hover:bg-gray-100"
                            }`}
                          >
                            {child.title}
                          </Link>
                        ))
                      ) : (
                        <div className="px-5 py-3 text-sm text-gray-400">
                          No investor relations available
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              // Normal Menu Items
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm transition-colors font-bold ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-[#3AB257] to-[#329ACD] bg-clip-text text-transparent"
                      : "text-[#293E52] hover:text-teal-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 bg-white z-50 transition-transform duration-300 overflow-y-auto ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center px-6 pt-6">
            <Image
              src="/images/renfra-logo.svg"
              alt="Logo"
              width={150}
              height={50}
            />
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="flex flex-col px-6 mt-10 pb-10">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="border-b border-gray-200 py-3"
                >
                  <div className="w-full flex justify-between items-center text-lg font-semibold text-[#293E52]">
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={
                          (item.label === "About Us" && isAboutActive()) ||
                          (item.label === "Our Solutions" && isActive(item.href))
                            ? "bg-gradient-to-r from-[#3AB257] to-[#329ACD] bg-clip-text text-transparent"
                            : ""
                        }
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toggleMobileMenu(item.label)}
                        className={`text-left ${
                          item.label === "Investor Relations" && isInvestorRelationsActive()
                            ? "bg-gradient-to-r from-[#3AB257] to-[#329ACD] bg-clip-text text-transparent"
                            : ""
                        }`}
                      >
                        {item.label}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleMobileMenu(item.label)}
                      aria-label={`Toggle ${item.label} submenu`}
                      aria-expanded={openMobileMenu === item.label}
                      className="p-1"
                    >
                      <svg
                        className={`w-5 h-5 transition-transform duration-300 ${
                          openMobileMenu === item.label ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>

                  {openMobileMenu === item.label && (
                    <div className="pl-4 pt-3 flex flex-col gap-3">
                      {item.label === "Our Solutions"
                        ? item.children.map((child) => (
                            <Link
                              key={child.data_uniq_id}
                              href={`/solutions-details?id=${child.data_uniq_id}`}
                              onClick={() => setIsOpen(false)}
                              className="text-base text-[#293E52]"
                            >
                              {child.title}
                            </Link>
                          ))
                        : item.label === "About Us"
                          ? item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setIsOpen(false)}
                                className="text-base text-[#293E52]"
                              >
                                {child.title}
                              </Link>
                            ))
                          : item.children.map((child) => (
                            <Link
                              key={child.data_uniq_id}
                              href={`/investor-relations?tab=${child.data_uniq_id}`}
                              onClick={() => setIsOpen(false)}
                              className={`text-base font-medium transition-colors ${
                                isInvestorChildActive(child.data_uniq_id)
                                  ? "bg-gradient-to-r from-[#3AB257] to-[#329ACD] bg-clip-text text-transparent font-bold"
                                  : "text-[#293E52]"
                              }`}
                            >
                              {child.title}
                            </Link>
                          ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="border-b border-gray-200 py-4 text-lg font-semibold text-[#293E52]"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}