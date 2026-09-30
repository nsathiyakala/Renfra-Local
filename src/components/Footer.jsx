// "use client"
// import { useState, useEffect } from "react"
// import { axiosPostForm } from "@/lib/api"
// import { ArrowUp } from "lucide-react"

// export default function Footer() {
//   const [showScrollTop, setShowScrollTop] = useState(false)
//   const [email, setEmail] = useState("")
//   const [subscribed, setSubscribed] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [errorMsg, setErrorMsg] = useState("")

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 300) {
//         setShowScrollTop(true)
//       } else {
//         setShowScrollTop(false)
//       }
//     }
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     })
//   }

// const handleSubscription = async (e) => {
//   e.preventDefault()
//   setLoading(true)
//   setErrorMsg("")
//   setSubscribed(false)

//   try {
//     const payload = { email }

//     const response = await axiosPostForm.post(
//       "/masters/subscription/?web_sts=1",
//       JSON.stringify(payload)
//     )

//     // 🔴 IMPORTANT CHECK
//     if (response.data?.action === "success") {
//       setSubscribed(true)
//       setEmail("")
//       setTimeout(() => setSubscribed(false), 3000)
//     } else {
//       // Backend error but axios didn't throw
//       setErrorMsg(response.data?.message || "Subscription failed")
//     }

//   } catch (error) {
//     // Network / real exception
//     if (error.response?.data?.message) {
//       const msg = error.response.data.message
//       setErrorMsg(typeof msg === "object" ? Object.values(msg)[0] : msg)
//     } else {
//       setErrorMsg("Server not reachable")
//     }
//   } finally {
//     setLoading(false)
//   }
// }



//   return (
//     <footer className="relative w-full bg-white mt-48">
//       {/* Curved dark blue background */}
//       <div className="relative w-full bg-[#293E52] pb-8 ">
//         <div
//           className="absolute top-0 -left-20 h-full w-[500px] bg-no-repeat bg-left bg-contain opacity-100 hidden lg:block z-0 pointer-events-none"
//           style={{
//             backgroundImage: "url('/images/Footer-tall.gif')",
//           }}
//         ></div>

//         {/* Mobile image - visible only on mobile (< 768px) */}
//         <img
//           src="/images/Mobile-Footer.gif"
//           alt="Curved Top"
//           className="absolute top-1 left-0 w-full md:hidden -translate-y-full"
//         />

//         {/* Tablet image - visible only on tablet (768px - 1023px) */}
//         <img
//           src="/images/Tab-footer.gif"
//           alt="Curved Top"
//           className="absolute top-1 left-0 w-full hidden md:block lg:hidden -translate-y-full"
//         />

//         {/* Desktop image - visible only on desktop (1024px and above) */}
//         <img
//           src="/images/Desktop-footer1.gif"
//           alt="Curved Top"
//           className="absolute top-1 left-0 w-full hidden lg:block -translate-y-full"
//         />

//         <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-6 relative z-10">
//           {/* Main footer content */}
//           <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-6 mb-2">
//             {/* Left Section - Logo and Social */}
//             <div className="md:col-span-2 lg:col-span-2 flex flex-col items-start lg:ml-2">
//               <div className="mb-4">
//                 {/* Logo Circle */}
//                 <div className="flex items-center ">
//                   <div className="flex items-center">
//                     <img src="/images/logow.svg" alt="Logo" className="w-50 h-50 object-contain" />
//                   </div>
//                 </div>
//               </div>

//               {/* Social Media Icons */}
//               {/* <div className="flex gap-8 ">
//                 <a href="#" className="transition-colors">
//                   <img
//                     src="/images/facebook.svg"
//                     alt="Facebook"
//                     className="w-5 h-5 hover:brightness-125 hover:scale-110 transition-transform duration-200 object-contain"
//                   />
//                 </a>
//                 <a href="#" className="transition-colors">
//                   <img
//                     src="/images/whatsapp.svg"
//                     alt="Message"
//                     className="w-5 h-5 hover:brightness-125 hover:scale-110 transition-transform duration-200"
//                   />
//                 </a>
//                 <a href="#" className="transition-colors">
//                   <img
//                     src="/images/insta.svg"
//                     alt="Instagram"
//                     className="w-5 h-5 hover:brightness-125 hover:scale-110 transition-transform duration-200"
//                   />
//                 </a>
//                 <a href="#" className="transition-colors">
//                   <img
//                     src="/images/youtube.svg"
//                     alt="YouTube"
//                     className="w-7 h-7 hover:brightness-125 hover:scale-110 transition-transform duration-200"
//                   />
//                 </a>
//               </div> */}
//             </div>

//             {/* Quick Links */}
//             <div className="md:col-span-1 lg:col-span-1">
//               <h4 className="text-white font-semibold mb-4">Quick Link</h4>
//               <ul className="space-y-2">
//                 {[
//                   { label: "Home", href: "/" },
//                   { label: "About Us", href: "/about" },
//                   { label: "Our Solutions", href: "/solutions" },
//                   { label: "Projects", href: "/projects" },
//                   { label: "IMS @ Renfra", href: "/ims@renfra" },
//                   { label: "News & Media Page", href: "/news" },
//                   { label: "Career", href: "/career" },
//                   { label: "Corporate", href: "/corporate" },
//                   { label: "Contact Us", href: "/contact" },
//                 ].map((link) => (
//                   <li key={link.label}>
//                     <a href={link.href} className="text-gray-300 hover:text-green-400 transition-colors text-sm">
//                       {link.label}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Our Solution */}
//             <div className="md:col-span-1 lg:col-span-1">
//               <h4 className="text-white font-semibold mb-4">Our Solution</h4>
//               <ul className="space-y-2">
//                 {["Solar PV", "Wind", "Commercial & Industrial", "Energy Storage System", "Operations & Maintenance"].map(
//                   (solution) => (
//                     <li key={solution}>
//                       <a href="/solutions" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
//                         {solution}
//                       </a>
//                     </li>
//                   ),
//                 )}
//               </ul>
//             </div>

//             {/* Contact Us */}
//             <div className="md:col-span-2 lg:col-span-2">
//               <h4 className="text-white font-semibold mb-4">Contact Us</h4>
//               <div className="space-y-4">
//                 {/* Head Office */}
//                 <div className="flex gap-3">
//                   <img src="/images/con-loc.png" alt="Head Office" className="w-5 h-5 mt-0.5" />
//                   <div>
//                     <p className="text-white text-sm font-medium">Head Office</p>
//                     <p className="text-gray-400 text-sm">
//                       ‌IndiQube Ocean Bay, 5th floor, A-19&20, <br />
//                       SIDCO Thiru Vi Ka Industrial Estate, Guindy, <br />
//                       Chennai – 600032, Tamil Nadu, India
//                     </p>
//                   </div>
//                 </div>

//                 {/* Call Us */}
//                 <div className="flex gap-3">
//                   <img src="/images/con-call.png" alt="Call Us" className="w-5 h-5 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <p className="text-white text-sm font-medium">Call Us</p>
//                     <a href="tel:+917094488909" className="text-gray-400 text-sm ">
//                       +91 70944 88909
//                     </a>{" "}
//                   </div>
//                 </div>

//                 {/* Email Us */}
//                 <div className="flex gap-3">
//                   <img src="/images/con-mail.png" alt="Email Us" className="w-5 h-5 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <p className="text-white text-sm font-medium">Email Us</p>
//                     <a href="mailto:info@renfraenergy.com" className="text-gray-400 text-sm ">
//                       info@renfraenergy.com
//                     </a>{" "}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* <div className="md:col-span-2 lg:col-span-2 flex flex-col justify-start">
//               <h4 className="text-white font-semibold mb-2">Stay Updated</h4>
//               <p className="text-gray-300 text-sm mb-4">Subscribe to our newsletter for latest updates and offers.</p>
//               <form onSubmit={handleSubscription} className="flex flex-col gap-3">
//                 <input
//                   type="email"
//                   placeholder="Your Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="px-4 py-2 rounded bg-gray-200 text-gray-800 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//                   required
//                 />
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-6 py-2 w-[120px] bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors text-sm"
//                 >
//                   {subscribed ? "Subscribed!" : "Subscribe"}
//                 </button>
//                 {errorMsg && (
//                   <p className="text-red-600 text-sm mt-2">{errorMsg}</p>
//                 )}
//               </form>
//               {subscribed && <p className="text-green-400 text-xs mt-2">Thank you for subscribing!</p>}
//             </div> */}

// <div className="md:col-span-2 lg:col-span-2 flex flex-col justify-start">
//   <h4 className="text-white font-semibold mb-2">Stay Updated</h4>

//   <form onSubmit={handleSubscription} className="flex flex-col gap-3">
//     <input
//       type="email"
//       placeholder="Your Email"
//       value={email}
//       onChange={(e) => setEmail(e.target.value)}
//       className="px-4 py-2 rounded bg-gray-200 text-gray-800 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//       required
//     />

//     <button
//       type="submit"
//       disabled={loading}
//       className="px-6 py-2 w-[120px] bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors text-sm"
//     >
//       {subscribed ? "Subscribed!" : "Subscribe"}
//     </button>

//     {/* Social Icons */}
//     <div className="flex gap-8 mt-6">
//       {/* <a href="#" className="transition-colors">
//         <img
//           src="/images/facebook.svg"
//           alt="Facebook"
//           className="w-5 h-5 hover:brightness-125 hover:scale-110 transition-transform duration-200 object-contain"
//         />
//       </a> */}

//       <a href="#" className="transition-colors">
//         <img
//           src="/images/whatsapp.svg"
//           alt="Message"
//           className="w-5 h-5 hover:brightness-125 hover:scale-110 transition-transform duration-200"
//         />
//       </a>

//       <a href="https://www.instagram.com/speedteamgroup" className="transition-colors">
//         <img
//           src="/images/insta.svg"
//           alt="Instagram"
//           className="w-5 h-5 hover:brightness-125 hover:scale-110 transition-transform duration-200"
//         />
//       </a>

//       <a href="https://youtube.com/@speedteamgroup" className="transition-colors">
//         <img
//           src="/images/youtube.svg"
//           alt="YouTube"
//           className="w-7 h-7 hover:brightness-125 hover:scale-110 transition-transform duration-200"
//         />
//       </a>
//     </div>

//     {errorMsg && (
//       <p className="text-red-600 text-sm mt-2">{errorMsg}</p>
//     )}
//   </form>

//   {subscribed && (
//     <p className="text-green-400 text-xs mt-2">
//       Thank you for subscribing!
//     </p>
//   )}
// </div>

            
//           </div>

          

//           {/* Bottom Bar */}
//           <div className="border-t border-gray-700 pt-2 flex flex-col md:flex-row justify-between items-center text-white text-sm lg:ml-2">
//             <p>© 2025 - Renfra Energy</p>
//             <div className="flex gap-4 mt-4 md:mt-0">
//               <a href="/terms&conditions" className="text-white transition-colors">
//                 Terms & Conditions
//               </a>
//               <span className="text-gray-600">|</span>
//               <a href="/privacy-policy" className="text-white transition-colors">
//                 Privacy Policy
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Scroll to Top Button */}
//       {showScrollTop && (
//         <button
//           onClick={scrollToTop}
//           className="fixed bottom-6 right-6 bg-gradient-to-b from-[#329ACD] to-[#3AB257] hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-transform transform hover:scale-110 z-50"
//           aria-label="Scroll to Top"
//         >
//           <ArrowUp className="w-6 h-6" />
//         </button>
//       )}
//     </footer>
//   )
// }


"use client"
import { useState, useEffect } from "react"
import { axiosPostForm, axiosGet } from "@/lib/api"
import { ArrowUp } from "lucide-react"

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [solutions, setSolutions] = useState([])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  /* ---------------- Fetch Solutions (Same as Navbar) ---------------- */
  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const response = await axiosGet.get(
          "masters/solutions/get/?web_sts=1&active_status=1&order_type=asc&order_field=created_date"
        )
        setSolutions(
          (response.data.data || []).filter(
            (item) =>
              !item.title?.toLowerCase().includes("operations") &&
              !item.title?.toLowerCase().includes("maintenance") &&
              !item.title?.toLowerCase().includes("o&m") &&
              !item.title?.toLowerCase().includes("o & m")
          )
        )
      } catch (error) {
        console.error("Footer Solutions Error:", error)
      }
    }

    fetchSolutions()
  }, [])

  const handleSubscription = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg("")
    setSubscribed(false)

    try {
      const payload = { email }

      const response = await axiosPostForm.post(
        "/masters/subscription/?web_sts=1",
        JSON.stringify(payload)
      )

      // 🔴 IMPORTANT CHECK
      if (response.data?.action === "success") {
        setSubscribed(true)
        setEmail("")
        setTimeout(() => setSubscribed(false), 3000)
      } else {
        // Backend error but axios didn't throw
        setErrorMsg(response.data?.message || "Subscription failed")
      }

    } catch (error) {
      // Network / real exception
      if (error.response?.data?.message) {
        const msg = error.response.data.message
        setErrorMsg(typeof msg === "object" ? Object.values(msg)[0] : msg)
      } else {
        setErrorMsg("Server not reachable")
      }
    } finally {
      setLoading(false)
    }
  }



  return (
    <footer className="relative w-full bg-white mt-48">
      {/* Curved dark blue background */}
      <div className="relative w-full bg-[#293E52] pb-8 ">
        <div
          className="absolute top-0 -left-20 h-full w-[500px] bg-no-repeat bg-left bg-contain opacity-100 hidden lg:block z-0 pointer-events-none"
          style={{
            backgroundImage: "url('/images/Footer-tall.gif')",
          }}
        ></div>

        {/* Mobile image - visible only on mobile (< 768px) */}
        <img
          src="/images/Mobile-Footer.gif"
          alt="Curved Top"
          className="absolute top-1 left-0 w-full md:hidden -translate-y-full"
        />

        {/* Tablet image - visible only on tablet (768px - 1023px) */}
        <img
          src="/images/Tab-footer.gif"
          alt="Curved Top"
          className="absolute top-1 left-0 w-full hidden md:block lg:hidden -translate-y-full"
        />

        {/* Desktop image - visible only on desktop (1024px and above) */}
        <img
          src="/images/Desktop-footer1.gif"
          alt="Curved Top"
          className="absolute top-1 left-0 w-full hidden lg:block -translate-y-full"
        />

        <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-6 relative z-10">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-6 mb-2">
            {/* Left Section - Logo and Social */}
            <div className="md:col-span-2 lg:col-span-2 flex flex-col items-start lg:ml-2">
              <div className="mb-4">
                {/* Logo Circle */}
                <div className="flex items-center ">
                  <div className="flex items-center">
                    <img src="/images/logow.svg" alt="Logo" className="w-50 h-50 object-contain" />
                  </div>
                </div>
              </div>

              {/* Social Media Icons */}
              {/* <div className="flex gap-8 ">
                <a href="#" className="transition-colors">
                  <img
                    src="/images/facebook.svg"
                    alt="Facebook"
                    className="w-5 h-5 hover:brightness-125 hover:scale-110 transition-transform duration-200 object-contain"
                  />
                </a>
                <a href="#" className="transition-colors">
                  <img
                    src="/images/whatsapp.svg"
                    alt="Message"
                    className="w-5 h-5 hover:brightness-125 hover:scale-110 transition-transform duration-200"
                  />
                </a>
                <a href="#" className="transition-colors">
                  <img
                    src="/images/insta.svg"
                    alt="Instagram"
                    className="w-5 h-5 hover:brightness-125 hover:scale-110 transition-transform duration-200"
                  />
                </a>
                <a href="#" className="transition-colors">
                  <img
                    src="/images/youtube.svg"
                    alt="YouTube"
                    className="w-7 h-7 hover:brightness-125 hover:scale-110 transition-transform duration-200"
                  />
                </a>
              </div> */}
            </div>

            {/* Quick Links */}
            <div className="md:col-span-1 lg:col-span-1">
              <h4 className="text-white font-semibold mb-4">Quick Link</h4>
              <ul className="space-y-2">
                {[
                  { label: "Home", href: "/" },
                  { label: "About Us", href: "/about" },
                  { label: "Our Solutions", href: "/solutions" },
                  { label: "Projects", href: "/projects" },
                  { label: "IMS @ Renfra", href: "/ims@renfra" },
                  { label: "News & Media Page", href: "/news" },
                  { label: "Career", href: "/career" },
                  { label: "Investor Relations", href: "/investor-relations?tab=drhp" },
                  { label: "Contact Us", href: "/contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Solution - API Integrated */}
            <div className="md:col-span-1 lg:col-span-1">
              <h4 className="text-white font-semibold mb-4">Our Solution</h4>
              <ul className="space-y-2">
                {solutions.length > 0 ? (
                  solutions.map((solution) => (
                    <li key={solution.data_uniq_id}>
                      <a
                        href={`/solutions-details?id=${solution.data_uniq_id}`}
                        className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                      >
                        {solution.title}
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400 text-sm">Loading solutions...</li>
                )}
              </ul>
            </div>

            {/* Contact Us */}
            <div className="md:col-span-2 lg:col-span-2">
              <h4 className="text-white font-semibold mb-4">Contact Us</h4>
              <div className="space-y-4">
                {/* Head Office */}
                <div className="flex gap-3">
                  <img src="/images/con-loc.png" alt="Head Office" className="w-5 h-5 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-medium">Head Office</p>
                    <p className="text-gray-400 text-sm">
                      ‌IndiQube Ocean Bay, 5th floor, A-19&20, <br />
                      SIDCO Thiru Vi Ka Industrial Estate, Guindy, <br />
                      Chennai – 600032, Tamil Nadu, India
                    </p>
                  </div>
                </div>

                {/* Call Us */}
                <div className="flex gap-3">
                  <img src="/images/con-call.png" alt="Call Us" className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-medium">Call Us</p>
                    <a href="tel:+917094488909" className="text-gray-400 text-sm ">
                      Service: +91 70944 88909
                    </a>{" "} <br />
                    <a href="tel:+919965515120" className="text-gray-400 text-sm ">
                      Career: +91 99655 15120
                    </a>{" "}
                  </div>
                </div>

                {/* Email Us */}
                <div className="flex gap-3">
                  <img src="/images/con-mail.png" alt="Email Us" className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-medium">Email Us</p>
                    <a href="mailto:info@renfraenergy.com" className="text-gray-400 text-sm ">
                      info@renfraenergy.com
                    </a>{" "}
                  </div>
                </div>
              </div>
            </div>

            {/* Stay Updated */}
            <div className="md:col-span-2 lg:col-span-2 flex flex-col justify-start">
              <h4 className="text-white font-semibold mb-2">Stay Updated</h4>

              <form onSubmit={handleSubscription} className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 rounded bg-gray-200 text-gray-800 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 w-[120px] bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors text-sm"
                >
                  {subscribed ? "Subscribed!" : "Subscribe"}
                </button>

                {/* Social Icons */}
                <div className="flex gap-8 mt-6">
                  {/* <a href="#" className="transition-colors">
                    <img
                      src="/images/facebook.svg"
                      alt="Facebook"
                      className="w-5 h-5 hover:brightness-125 hover:scale-110 transition-transform duration-200 object-contain"
                    />
                  </a> */}

                 <a
  href="https://wa.me/917094488909"
  target="_blank"
  rel="noopener noreferrer"
  className="transition-colors"
>
  <img
    src="/images/whatsapp.svg"
    alt="WhatsApp"
    className="w-5 h-5 hover:brightness-125 hover:scale-110 transition-transform duration-200"
  />
</a>

                  <a href="https://www.instagram.com/speedteamgroup" className="transition-colors">
                    <img
                      src="/images/insta.svg"
                      alt="Instagram"
                      className="w-5 h-5 hover:brightness-125 hover:scale-110 transition-transform duration-200"
                    />
                  </a>

                  <a href="https://youtube.com/@speedteamgroup" className="transition-colors">
                    <img
                      src="/images/youtube.svg"
                      alt="YouTube"
                      className="w-7 h-7 hover:brightness-125 hover:scale-110 transition-transform duration-200"
                    />
                  </a>
                </div>

                {errorMsg && (
                  <p className="text-red-600 text-sm mt-2">{errorMsg}</p>
                )}
              </form>

              {subscribed && (
                <p className="text-green-400 text-xs mt-2">
                  Thank you for subscribing!
                </p>
              )}
            </div>

            
          </div>

          

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-2 flex flex-col md:flex-row justify-between items-center text-white text-sm lg:ml-2">
  <p>© {new Date().getFullYear()} - Renfra Energy India Limited</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="/terms&conditions" className="text-white transition-colors">
                Terms & Conditions
              </a>
              <span className="text-gray-600">|</span>
              <a href="/privacy-policy" className="text-white transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gradient-to-b from-[#329ACD] to-[#3AB257] hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-transform transform hover:scale-110 z-50"
          aria-label="Scroll to Top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </footer>
  )

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
}
