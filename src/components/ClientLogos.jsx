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
        <div className="flex slider-track" style={{ gap: "var(--logo-gap)" }}>
          {track.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-center hover:shadow-md hover:border-emerald-200 transition-shadow duration-300"
              style={{ width: "var(--logo-w)", height: "var(--logo-h)", padding: "0 var(--logo-px)" }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={130}
                height={60}
                className="object-contain w-auto"
                style={{ maxHeight: "var(--logo-img-h)" }}
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
        </Link>
      </div>

      <style jsx>{`
        /* mobile: 2 logos visible */
        :root, .slider-track {
          --logo-w: calc((100vw - 48px) / 4);
          --logo-h: 60px;
          --logo-gap: 12px;
          --logo-px: 12px;
          --logo-img-h: 50px;
        }
        /* sm ≥640px: 3 logos */
        @media (min-width: 640px) {
          :root, .slider-track {
            --logo-w: calc((100vw - 60px) / 3);
            --logo-h: 88px;
            --logo-gap: 16px;
            --logo-px: 14px;
            --logo-img-h: 44px;
          }
        }
        /* md ≥768px: 4 logos */
        @media (min-width: 768px) {
          :root, .slider-track {
            --logo-w: calc((100vw - 72px) / 6);
            --logo-h: 92px;
            --logo-gap: 18px;
            --logo-px: 16px;
            --logo-img-h: 48px;
          }
        }
        /* lg ≥1024px: 5 logos */
        @media (min-width: 1024px) {
          :root, .slider-track {
            --logo-w: calc((100vw - 96px) / 6);
            --logo-h: 96px;
            --logo-gap: 20px;
            --logo-px: 20px;
            --logo-img-h: 52px;
          }
        }
        /* xl ≥1280px: 6 logos */
        @media (min-width: 1280px) {
          :root, .slider-track {
            --logo-w: calc((100vw - 120px) / 9);
            --logo-h: 96px;
            --logo-gap: 20px;
            --logo-px: 24px;
            --logo-img-h: 52px;
          }
        }
        /* 2xl ≥1536px: 7 logos */
        @media (min-width: 1536px) {
          :root, .slider-track {
            --logo-w: calc((100vw - 144px) / 9);
            --logo-h: 100px;
            --logo-gap: 20px;
            --logo-px: 24px;
            --logo-img-h: 56px;
          }
        }
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
