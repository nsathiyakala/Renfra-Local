"use client";

import Image from "next/image";
import Link from "next/link";
import { clientLogos } from "@/lib/client-logos";

const track = [...clientLogos.slice(0, 10), ...clientLogos.slice(0, 10)];

export default function ClientLogos() {
  return (
    <section className="relative w-full py-14 bg-white overflow-hidden">
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#329ACD] via-[#3AB257] to-[#329ACD]" />

      {/* Header */}
      <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
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
      </div>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

      {/* Slider track */}
      <div className="w-full overflow-hidden">
        <div className="flex gap-6 slider-track">
          {track.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-44 h-24 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-center px-2 hover:shadow-md hover:border-emerald-200 transition-shadow duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={130}
                height={60}
                className="object-contain max-h-14 w-auto"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/clients"
          className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#3AB257] to-[#329ACD] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#3AB257]/30 transition-all duration-200 hover:scale-105 hover:opacity-90"
        >
          View all clients
          {/* <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-white/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span> */}
        </Link>
      </div>

      <style jsx>{`
        .slider-track {
          width: max-content;
          animation: slide 30s linear infinite;
        }
        .slider-track:hover {
          animation-play-state: paused;
        }
        @keyframes slide {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
