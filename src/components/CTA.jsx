"use client"

import Link from "next/link"
import Image from "next/image"

export default function CTA() {
  return (
    <section className="w-[90%] mx-auto mt-16 mb-70">
      <div className="relative rounded-3xl overflow-hidden min-h-[320px] flex items-center">

        {/* Background image */}
        <Image
          src="/images/project-bg.png"
          alt="CTA Background"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f13]/90 via-[#0a1f13]/75 to-[#0a1f13]/40" />

        {/* Decorative green glow */}
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-[#3AB257]/20 blur-[100px] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-8 px-8 sm:px-12 md:px-16 py-14 md:py-16">

          {/* Left */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-[#3AB257]/20 border border-[#3AB257]/40 px-4 py-1.5 rounded-full mb-5">
              <span className="w-2 h-2 rounded-full bg-[#3AB257] animate-pulse" />
              <span className="text-[#4ADE80] text-xs font-semibold tracking-widest uppercase">
                Let's Build Together
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-white leading-tight mb-4">
              Ready to Switch to <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#3AB257] to-[#329ACD] bg-clip-text text-transparent">
                Clean Energy?
              </span>
            </h2>

            <p className="text-slate-300 text-base md:text-lg max-w-md leading-relaxed">
              Our experts are ready to design the perfect solar or wind solution for your needs. Get in touch today.
            </p>
          </div>

          {/* Right */}
          <div className="shrink-0 flex flex-col items-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#3AB257] to-[#329ACD] hover:opacity-90 text-white font-bold text-base px-9 py-4 rounded-full shadow-xl shadow-[#3AB257]/30 transition-all duration-200 hover:scale-105"
            >
              Contact Us
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>

            <p className="text-slate-400 text-xs">No commitment. Free consultation.</p>
          </div>

        </div>
      </div>
    </section>
  )
}
