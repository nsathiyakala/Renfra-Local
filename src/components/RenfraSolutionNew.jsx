"use client";
 
import { useState, useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { axiosGet } from "@/lib/api";
import { IMG_ENDPOINT } from "@/lib/config";
 
export default function RenfraSolutionNew() {
  const [solutionDetails, setSolutionDetails] = useState({});
  const cardStackRef = useRef(null);
 
  const solutionCards = [
    {
      id: "1",
      fallbackImage: "/images/sol-inner.png",
      title: "Solar",
      description:
        "As the leading player in solar greenfield project solutions, we have helped numerous clients to harness the power of the Sun! We offer end-to-end solutions ",
    },
    {
      id: "2",
      fallbackImage: "/images/solution-banner.png",
      title: "Wind",
      description:
        "In a short span of time, Renfra Energy has successfully delivered 49.50 MW of wind energy projects and is currently executing an additional 56.10 MW, reinforcing our expertise in the renewable energy sector.",
    },
    {
      id: "3",
      fallbackImage: "/images/energy-banner.svg",
      title: "Battery Energy Storage System",
      aliases: ["BESS", "Energy Storage"],
      description:
        "As a provider of end-to-end energy solutions, Renfra Energy manufactures and builds Energy Storage Systems for our clients, enabling a more efficient, reliable power supply to their facilities.",
    },
  ];

  useEffect(() => {
    const fetchSolutionIds = async () => {
      try {
        const response = await axiosGet.get(
          "masters/solutions/get/?web_sts=1&active_status=1"
        );
        const solutions = response.data?.data || [];
        const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

        const details = solutions.reduce((result, solution) => {
          const normalizedTitle = normalize(solution.title || "");
          const card = solutionCards.find((item) => {
            const cardTitles = [item.title, ...(item.aliases || [])].map(normalize);
            return cardTitles.some(
              (cardTitle) =>
                normalizedTitle === cardTitle ||
                normalizedTitle.includes(cardTitle) ||
                cardTitle.includes(normalizedTitle)
            );
          });

          if (card && solution.data_uniq_id) {
            result[card.id] = {
              id: solution.data_uniq_id,
              imagePath: solution.card_image_path,
            };
          }
          return result;
        }, {});

        setSolutionDetails(details);
      } catch (error) {
        console.error("Solution IDs Error:", error);
      }
    };

    fetchSolutionIds();
  }, []);

  useEffect(() => {
    const updateCardDepth = () => {
      const cards = cardStackRef.current?.querySelectorAll("[data-stack-card]");
      if (!cards) return;

      const stickyTop = window.matchMedia("(min-width: 640px)").matches ? 88 : 72;
      const travelDistance = Math.max(window.innerHeight - stickyTop, 1);

      cards.forEach((card, index) => {
        const nextCard = cards[index + 1];
        if (!nextCard) return;

        const nextTop = nextCard.getBoundingClientRect().top;
        const progress = Math.max(
          0,
          Math.min(1, (window.innerHeight - nextTop) / travelDistance)
        );

        card.style.setProperty("--stack-scale", (1 - progress * 0.1).toFixed(3));
        card.style.setProperty("--stack-brightness", (1 - progress * 0.28).toFixed(3));
      });
    };

    window.addEventListener("scroll", updateCardDepth, { passive: true });
    window.addEventListener("resize", updateCardDepth);
    updateCardDepth();

    return () => {
      window.removeEventListener("scroll", updateCardDepth);
      window.removeEventListener("resize", updateCardDepth);
    };
  }, []);
 
  return (
    <section className="w-full px-4 py-12 md:px-8 md:py-12">
      <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4 flex justify-center">
          <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold  text-[#293E52] flex items-center gap-2">
            Our Solutions
           <a href="/solutions"><ExternalLink className="w-7 h-7 "  style={{ stroke: "url(#grad)" }}/></a>
          </h2>
        </div>
 
        {/* Subtitle */}
        <p className="mb-8 mx-auto max-w-3xl text-center text-sm leading-7 md:text-base">
          Renfra Energy develops and delivers solar, wind, and battery energy
          storage solutions for commercial and industrial clients, supporting a
          reliable and sustainable energy transition.
        </p>

        <div className="flex justify-center pb-4">
          <a
            href="/solutions"
            className=" px-6 py-3 rounded-full text-white font-semibold
        bg-gradient-to-r from-[#3AB257] to-[#329ACD]
        hover:opacity-90 transition-all duration-300
        flex items-center gap-2 cursor-pointer"
          >
            Know More
          </a>
        </div>
 
        {/* Sticky image-card stack */}
        <div ref={cardStackRef} className="relative mx-auto max-w-[76rem]">
          {solutionCards.map((card, index) => {
            const imagePath = solutionDetails[card.id]?.imagePath;
            const imageSrc = imagePath
              ? imagePath.startsWith("http")
                ? imagePath
                : `${IMG_ENDPOINT}${imagePath.replace(/^\/+/, "")}`
              : card.fallbackImage;

            return (
              <article
                key={card.id}
                data-stack-card
                className="sticky top-[72px] h-[min(54svh,500px)] min-h-[360px] sm:top-[88px] sm:min-h-[400px]"
                style={{
                  zIndex: index + 1,
                  paddingTop: `${index * 40}px`,
                }}
              >
                <Link
                  href={`/solutions-details/?id=${encodeURIComponent(solutionDetails[card.id]?.id || card.id)}`}
                  className="group relative block h-full overflow-hidden rounded-2xl bg-[#173b42] shadow-[0_24px_64px_rgba(11,37,40,0.3)] transition-[transform,filter] duration-150 ease-out"
                  style={{
                    transform: "scale(var(--stack-scale, 1))",
                    filter: "brightness(var(--stack-brightness, 1))",
                    transformOrigin: "center center",
                  }}
                >
                  <img
                    src={imageSrc}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#102d32]/65 via-[#102d32]/25 to-[#102d32]/0" />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#102d32]/40 to-transparent" />

                  <div className="relative z-10 flex h-full max-w-2xl flex-col justify-end p-6 sm:p-10 md:p-14">
                    {/* <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-[#a9e6b4] sm:text-sm">
                      <span className="h-px w-8 bg-[#a9e6b4]" />
                      0{index + 1} / Renewable Solutions
                    </p> */}
                    <h3 className="mb-4 max-w-[18ch] text-2xl lg:text-3xl font-bold leading-tight text-white sm:text-2xl md:text-3xl">
                      {card.title}
                    </h3>
                    <p className="max-w-xl text-sm leading-7 text-white/90 text-sm sm:text-sm md:text-base lg:text-base">
                      {card.description}
                    </p>
                    <span className="mt-7 inline-flex w-fit items-center gap-3 text-sm font-semibold text-white sm:text-base">
                      Explore solution
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-white/60 transition-colors group-hover:bg-white group-hover:text-[#173b42]">
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}