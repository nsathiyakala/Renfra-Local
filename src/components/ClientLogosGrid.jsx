"use client";

import Image from "next/image";
import Link from "next/link";
import { clientLogos } from "@/lib/client-logos";

export default function ClientLogosGrid({ limit, showViewAll = false }) {
  const logos = limit ? clientLogos.slice(0, limit) : clientLogos;

  return (
    <section className="relative w-full py-16 bg-white overflow-hidden">
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" />

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-emerald-50 blur-[80px] opacity-60" />
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-sky-50 blur-[80px] opacity-60" />
      </div>

      <div className="relative max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-10 h-[2px] bg-gradient-to-r from-[#329ACD] to-[#3AB257] inline-block" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#3AB257]">
              Our Clients
            </span>
            <span className="w-10 h-[2px] bg-gradient-to-r from-[#3AB257] to-[#329ACD] inline-block" />
          </div>
          <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#293E52]">
            Trusted by Industry Leaders
           
          </h2>
          <p className="mt-3 text-sm text-slate-500 max-w-md mx-auto">
            Proud to partner with leading companies across industries in their journey towards clean energy.
          </p>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {logos.map((logo, i) => (
            <div
              key={logo.src}
              className="group relative bg-white border border-slate-100 rounded-2xl p-5 flex items-center justify-center shadow-sm hover:shadow-lg hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-50 to-sky-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={56}
                className="relative object-contain max-h-20 w-auto transition-all duration-300"
              />
            </div>
          ))}
        </div>

        {showViewAll && (
          <div className="mt-10 text-center">
            <Link
              href="/clients"
              className="inline-flex items-center justify-center rounded-md bg-[#3AB257] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#329ACD]"
            >
              View all clients
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
