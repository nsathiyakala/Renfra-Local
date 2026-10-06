"use client";

import Image from "next/image";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Quote,
  Leaf,
  UsersRound,
  Sparkles,
  MessageCircle,
  ShieldCheck,
  ClipboardCheck,
  HardHat,
  FileCheck2,
  Clock3,
  Handshake,
} from "lucide-react";



// ─────────────────────────────────────────────────────────────
// Rating Icon
// ─────────────────────────────────────────────────────────────

const testimonials = [
  {
    "id": 1,
    "company_name": "Aachi Masala Foods Pvt Ltd",
    "logo_path": "/images/testimonials/Aachi.jpg",
    "designation": "",
    "date": "",
    "is_verified": true,
    "feedback": "We have had a positive experience working with Renfra Energy. The team was responsive, supportive and professional in handling our requirements. The quality of work and service delivery has been good, and we've always been able to communicate our needs clearly. We also appreciate the regular updates, timely support during critical situations and their focus on health and safety. Overall, we're happy with their service and support.",
    "overall_satisfaction": 92,
    "ratings": [
      { "label": "Employee response", "value": 100 },
      { "label": "Quality of work", "value": 90 },
      { "label": "Communication", "value": 100 }
    ]
  },

  {
    "id": 2,
    "company_name": "Indus TMT Industries Ltd",
    "logo_path": "/images/testimonials/indus.jpg",
    "designation": "",
    "date": "",
    "is_verified": true,
    "feedback": "Our experience with Renfra Energy has been very positive. Whenever we have questions or requirements, the team is quick to respond and easy to communicate with. We are satisfied with the quality of work and their commitment to delivering the services as agreed. The reporting process was well organised and kept us informed with regular updates. We also value the team's timely support during critical situations and their attention to workplace safety, PPE and maintaining clean working areas. The team's professional approach at our site has made our overall experience smooth and hassle-free.",
    "overall_satisfaction": 92,
    "ratings": [
      { "label": "Employee response", "value": 100 },
      { "label": "Quality of work", "value": 90 },
      { "label": "Communication", "value": 100 }
    ]
  },

  {
    "id": 3,
    "company_name": "Kaleesuwari Refinery",
    "logo_path": "/images/testimonials/kaleeswari.png",
    "designation": "",
    "date": "",
    "is_verified": true,
    "feedback": "We've had a positive experience working with Renfra Energy. The site team has been committed throughout the project and has worked towards completing the work on time. We appreciate how promptly the team responds to our feedback and takes the necessary action. While government approvals were understandably outside the team's direct control, we found Renfra Energy proactive in managing the process and keeping things moving. Their commitment, responsiveness and end-to-end approach made our overall experience smooth and reassuring.",
    "overall_satisfaction": 92,
    "ratings": [
      { "label": "Employee response", "value": 100 },
      { "label": "Quality of work", "value": 90 },
      { "label": "Communication", "value": 100 }
    ]
  },

  {
    "id": 4,
    "company_name": "Abikiran Agro Farms Asia",
    "logo_path": "/images/testimonials/abikiran.png",
    "designation": "",
    "date": "",
    "is_verified": true,
    "feedback": "We have had a good experience working with Renfra Energy. The team communicates well, delivers the work as committed and maintains good quality throughout. Employees were cooperative and responsive, which made it easy for us to share our requirements and get the support we need. We also appreciate the way reports are submitted and how the team responds during critical situations. Their focus on workplace safety, PPE requirements, cleanliness and professional conduct has made our overall experience positive.",
    "overall_satisfaction": 92,
    "ratings": [
      { "label": "Employee response", "value": 100 },
      { "label": "Quality of work", "value": 90 },
      { "label": "Communication", "value": 100 }
    ]
  },
   {
    "id": 5,
    "company_name": "SCM Garments Pvt Ltd",
    "logo_path": "/images/testimonials/scm.jpg",
    "designation": "",
    "date": "",
    "is_verified": true,
    "feedback": "We appreciate the consistent support we've received from Renfra Energy. The team was cooperative and responsive, kept us regularly updated on the progress, and consistently delivered work that met our expectations. We've also had a good experience with their support during urgent situations and their approach to workplace safety and cleanliness. It was reassuring to work with a team that takes these aspects seriously.",
    "overall_satisfaction": 92,
    "ratings": [
      { "label": "Employee response", "value": 100 },
      { "label": "Quality of work", "value": 90 },
      { "label": "Communication", "value": 100 }
    ]
  },
  
  {
    "id": 6,
    "company_name": "Schloss Chennai Pvt Ltd",
    "logo_path": "/images/testimonials/scholas.png",
    "designation": "",
    "date": "",
    "is_verified": true,
    "feedback": "Renfra Energy team was responsive and attentive to our requirements. The work delivery was good and we received regular updates along the way. We also value the team's support during critical situations and their attention to safety, PPE and cleanliness at the workplace. Overall, we're pleased with the way Renfra Energy has supported us and maintained a professional approach throughout our association.",
    "overall_satisfaction": 92,
    "ratings": [
      { "label": "Employee response", "value": 100 },
      { "label": "Quality of work", "value": 90 },
      { "label": "Communication", "value": 100 }
    ]
  },
 
  {
    "id": 7,
    "company_name": "Sree Santhosh Garments",
    "logo_path": "/images/testimonials/sree-symbol.png",
    "designation": "",
    "date": "",
    "is_verified": true,
    "feedback": "We're happy with the service from Renfra Energy. The team was supportive and responsive, with good coordination and timely assistance. Their professional approach and focus on workplace safety have made our experience positive.",
    "overall_satisfaction": 92,
    "ratings": [
      { "label": "Employee response", "value": 100 },
      { "label": "Quality of work", "value": 90 },
      { "label": "Communication", "value": 100 }
    ]
  }
]

const getRatingIcon = (label = "") => {
  const text = label.toLowerCase();

  if (
    text.includes("employee") ||
    text.includes("response") ||
    text.includes("approach")
  ) {
    return UsersRound;
  }

  if (text.includes("quality")) {
    return Sparkles;
  }

  if (text.includes("communication")) {
    return MessageCircle;
  }

  if (text.includes("safety") || text.includes("ppe")) {
    return HardHat;
  }

  if (text.includes("report")) {
    return FileCheck2;
  }

  if (text.includes("clean")) {
    return Sparkles;
  }

  if (text.includes("delivery") || text.includes("commitment")) {
    return Clock3;
  }

  if (text.includes("support")) {
    return Handshake;
  }

  if (text.includes("service")) {
    return ShieldCheck;
  }

  return ClipboardCheck;
};

// ─────────────────────────────────────────────────────────────
// Rating Bar
// ─────────────────────────────────────────────────────────────

function RatingBar({ label, value }) {
  const Icon = getRatingIcon(label);

  return (
    <div className="flex items-center gap-2.5 min-w-0">
      {/* Icon */}
      <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
        <Icon
          className="w-3.5 h-3.5 text-emerald-600"
          strokeWidth={1.8}
        />
      </div>

      {/* Label + Progress */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[10px] sm:text-[11px] text-slate-500 truncate">
            {label}
          </span>

          <span className="text-[10px] font-semibold text-slate-600 shrink-0">
            {value || 0}%
          </span>
        </div>

        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{
              width: `${value || 0}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Circular Progress
// ─────────────────────────────────────────────────────────────

function CircularProgress({ value = 0, size = 52 }) {
  const r = (size - 8) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        transform: "rotate(-90deg)",
      }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#dbeee5"
        strokeWidth="5"
      />

      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#10b981"
        strokeWidth="5"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Testimonial Card
// ─────────────────────────────────────────────────────────────

function TestimonialCard({ testimonial, position }) {
  const isCenter = position === "center";
  const feedbackRef = useRef(null);

  const companyName =
    testimonial.company_name ||
    testimonial.name ||
    "Client";

  const designation =
    testimonial.designation || "";

  const feedback =
    testimonial.feedback || "";

  useLayoutEffect(() => {
    const feedbackElement = feedbackRef.current;

    if (!feedbackElement) {
      return;
    }

    const lineHeight = Number.parseFloat(
      window.getComputedStyle(feedbackElement).lineHeight,
    );
    const collapsedHeight = lineHeight * 4;

    feedbackElement.style.maxHeight = isCenter
      ? `${feedbackElement.scrollHeight}px`
      : `${collapsedHeight}px`;
  }, [feedback, isCenter]);

  const logoPath =
    testimonial.logo_path ||
    testimonial.image_path ||
    null;

  const isVerified =
    testimonial.is_verified ??
    testimonial.verified ??
    true;

  const dateStr =
    testimonial.date ||
    testimonial.created_date ||
    "";

  const overall = parseInt(
    testimonial.overall_satisfaction ??
      testimonial.overall_score ??
      92,
  );

  const ratings =
    testimonial.ratings || [];

  const getRating = (key, fallback) => {
    const found = ratings.find((r) =>
      (r.label || r.key || "")
        .toLowerCase()
        .includes(key),
    );

    return found
      ? parseInt(
          found.value ??
            found.score ??
            fallback,
        )
      : fallback;
  };

  let ratingItems =
    ratings.length > 0
      ? ratings.map((r) => ({
          label:
            r.label ||
            r.key ||
            "Rating",

          value: parseInt(
            r.value ??
              r.score ??
              90,
          ),
        }))
      : [
          {
            label: "Employee response",
            value: getRating(
              "employee",
              100,
            ),
          },
          {
            label: "Quality of work",
            value: getRating(
              "quality",
              90,
            ),
          },
          {
            label: "Communication",
            value: getRating(
              "commun",
              100,
            ),
          },
        ];

  // Keep cards compact.
  // Center card can show 4 ratings,
  // side cards only show 3.
  if (isCenter) {
    ratingItems =
      ratingItems.slice(0, 4);
  } else {
    ratingItems =
      ratingItems.slice(0, 3);
  }

  const formattedDate = (() => {
    if (!dateStr) return "";

    try {
      const d = new Date(dateStr);

      if (isNaN(d)) {
        return dateStr;
      }

      return d
        .toLocaleDateString("en-GB")
        .replace(/\//g, ".");
    } catch {
      return dateStr;
    }
  })();

  const initials = companyName
    .split(" ")
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`
        relative
        bg-white
        border
        border-white/80
        rounded-2xl
        flex
        flex-col
        h-full
        shadow-[0_15px_40px_rgba(15,23,42,0.10)]
        overflow-hidden
        transition-all
        duration-500

        ${
          isCenter
            ? "p-3 sm:p-7 sm:pt-4"
            : "p-4 sm:p-5"
        }
      `}
    >
      {/* ───────────────── Header ───────────────── */}

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">

          {/* Logo */}

          {logoPath ? (
            <div
              className={`border rounded-xl overflow-hidden shrink-0 ${
                isCenter ? "w-11 h-11 md:w-12 md:h-12" : "w-11 h-11"
              }`}
            >
              <Image
                src={logoPath}
                alt={companyName}
                width={44}
                height={44}
                className="h-full w-full scale-125 object-contain p-1"
              />
            </div>
          ) : (
            <div
              className={`
                rounded-xl
                border
                border-emerald-100
                bg-emerald-50
                flex
                items-center
                justify-center
                shrink-0
                overflow-hidden

                ${
                  isCenter
                    ? "w-11 h-11"
                    : "w-9 h-9"
                }
              `}
            >
              <span className="
                text-[10px]
                font-bold
                text-emerald-700
              ">
                {initials}
              </span>
            </div>
          )}

          {/* Company */}

          <div className="min-w-0">
            <p
              className={`
                font-bold
                text-[#173b42]
                leading-tight
                truncate

                ${
                  isCenter
                    ? "text-[13px]"
                    : "text-[12px]"
                }
              `}
            >
              {companyName}
            </p>

            {designation && (
              <p className="
                text-[10px]
                text-slate-400
                truncate
                mt-0.5
              ">
                {designation}
              </p>
            )}

            {formattedDate && (
              <div className="
                flex
                items-center
                gap-1
                mt-1
              ">
                <svg
                  className="
                    w-3
                    h-3
                    text-slate-400
                  "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="18"
                    rx="2"
                  />

                  <line
                    x1="16"
                    y1="2"
                    x2="16"
                    y2="6"
                  />

                  <line
                    x1="8"
                    y1="2"
                    x2="8"
                    y2="6"
                  />

                  <line
                    x1="3"
                    y1="10"
                    x2="21"
                    y2="10"
                  />
                </svg>

                <span className="
                  text-[9px]
                  text-slate-400
                ">
                  {formattedDate}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Verified */}

        {isCenter &&
          isVerified && (
            <div
              className="
                flex
                items-center
                gap-1
                bg-emerald-50
                border
                border-emerald-100
                rounded-full
                px-2.5
                py-1
                shrink-0
              "
            >
              <CheckCircle2
                className="
                  w-3
                  h-3
                  text-emerald-500
                "
              />

              <span
                className="
                  text-[9px]
                  font-semibold
                  text-emerald-700
                  hidden
                  sm:inline
                "
              >
                Verified Customer
              </span>
            </div>
          )}
      </div>

      {/* ───────────────── Quote ───────────────── */}

      <div
        className={`
          relative
          mt-4
          rounded-xl
          bg-[#f3faf7]
          border
          border-emerald-50

          ${
            isCenter
              ? "px-5 py-4"
              : "px-3.5 py-3"
          }
        `}
      >
        <Quote
          className="
            absolute
            top-3
            left-3
            w-4
            h-4
            text-emerald-500
            fill-emerald-500
          "
          strokeWidth={0}
        />

        <div
          ref={feedbackRef}
          className={`
            pl-6
            text-[12px]
            sm:text-[14px]
            text-slate-600
            leading-relaxed
            overflow-hidden
            transition-[max-height]
            duration-[650ms]
            ease-[cubic-bezier(0.4,0,0.2,1)]
          `}
          dangerouslySetInnerHTML={{
            __html: feedback,
          }}
        />
      </div>

      {/* ───────────────── Ratings ───────────────── */}

      {/* <div
        className={`
          mt-5
          grid
          gap-x-6
          gap-y-4

          ${
            isCenter
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1"
          }
        `}
      >
        {ratingItems.map(
          (item, i) => (
            <RatingBar
              key={i}
              label={item.label}
              value={item.value}
            />
          ),
        )}
      </div> */}

      {/* ───────────────── Footer ───────────────── */}

      {/* <div
        className="
          mt-auto
          pt-4
          border-t
          border-slate-100
          flex
          items-center
          justify-between
          gap-3
        "
      >
       

        <div className="
          flex
          items-center
          gap-2.5
        ">
          <div
            className="
              relative
              flex
              items-center
              justify-center
              shrink-0
            "
            style={{
              width:
                isCenter
                  ? 48
                  : 42,
              height:
                isCenter
                  ? 48
                  : 42,
            }}
          >
            <CircularProgress
              value={overall}
              size={
                isCenter
                  ? 48
                  : 42
              }
            />

            <span
              className="
                absolute
                text-[10px]
                font-bold
                text-emerald-700
              "
            >
              {overall}%
            </span>
          </div>

          <div>
            <p
              className="
                text-[9px]
                font-semibold
                text-slate-600
                leading-tight
              "
            >
              Overall Customer
            </p>

            <p
              className="
                text-[9px]
                font-semibold
                text-slate-600
                leading-tight
              "
            >
              Satisfaction
            </p>
          </div>
        </div>

       

        {isCenter && (
          <div
            className="
              flex
              items-center
              gap-1
              text-[9px]
              text-emerald-600
              font-semibold
              text-right
            "
          >
            <Leaf
              className="
                w-3
                h-3
                shrink-0
              "
            />

            <span className="
              hidden
              sm:block
            ">
              Clean Energy /
              Sustainable Tomorrow
            </span>
          </div>
        )}
      </div> */}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

export function TestimonialsNew() {

  const [centerIdx, setCenterIdx] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState(null);
  const autoRef = useRef(null);
  const slideTimeoutRef = useRef(null);
  const touchStartRef = useRef(null);


  // ───────────────── Auto Slider ─────────────────

  const startAuto = () => {

    if (autoRef.current) {
      clearInterval(autoRef.current);
    }

    if (testimonials.length <= 1) {
      return;
    }

    autoRef.current =
      setInterval(() => {

        setSlideDirection("next");
        setCenterIdx((prev) => {
          return prev + 1 >= testimonials.length ? 0 : prev + 1;
        });

      }, 5000);
  };


  useEffect(() => {

    if (testimonials.length <= 1) {
      return;
    }

    startAuto();

    return () => {

      if (autoRef.current) {
        clearInterval(
          autoRef.current,
        );
      }

      if (
        slideTimeoutRef.current
      ) {
        clearTimeout(
          slideTimeoutRef.current,
        );
      }

    };

  }, [testimonials.length]);


  // ───────────────── Navigation ─────────────────

  const changeSlide = (
    nextIndex,
    direction = nextIndex > centerIdx ? "next" : "previous",
  ) => {

    if (
      testimonials.length <= 1 ||
      isSliding
    ) {
      return;
    }

    setIsSliding(true);
    setSlideDirection(direction);

    setCenterIdx(nextIndex);

    if (autoRef.current) {
      clearInterval(
        autoRef.current,
      );
    }

    slideTimeoutRef.current =
      setTimeout(() => {

        setIsSliding(false);

        startAuto();

      }, 650);
  };


  const goNext = () => {

    if (testimonials.length <= 1) {
      return;
    }

    const next =
      centerIdx + 1 >=
      testimonials.length
        ? 0
        : centerIdx + 1;

    changeSlide(next, "next");
  };


  const goPrev = () => {

    if (testimonials.length <= 1) {
      return;
    }

    const prev =
      centerIdx - 1 < 0
        ? testimonials.length - 1
        : centerIdx - 1;

    changeSlide(prev, "previous");
  };


  const goTo = (index) => {

    if (
      index === centerIdx ||
      testimonials.length <= 1 ||
      isSliding
    ) {
      return;
    }

    changeSlide(index);
  };

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleTouchEnd = (event) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;

    if (!start) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) {
      goNext();
    } else {
      goPrev();
    }
  };


  // ───────────────── Relative Position ─────────────────

  const getRelativePosition = (
    index,
  ) => {

    const total =
      testimonials.length;

    if (total === 0) {
      return 0;
    }

    let diff =
      index - centerIdx;

    /*
      This makes the carousel circular.

      Example:

      Current = last item

      Previous = item before last
      Center   = last item
      Next     = first item

      So the first item can smoothly
      enter from the right.
    */

    if (diff > total / 2) {
      diff -= total;
    }

    if (diff < -total / 2) {
      diff += total;
    }

    return diff;
  };


  // ───────────────── Main ─────────────────

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-gradient-to-b
        from-[#329ACD]
        to-[#3AB257]
        py-12
        sm:py-14
        md:py-16
        px-4
      "
    >

      {/* ───────────────── Header ───────────────── */}

      <div
        className="
          max-w-[85rem] 2xl:max-w-[90rem]
          mx-auto
          text-center
          px-8 sm:px-6 lg:px-8
          mb-8
          sm:mb-10
        "
      >

        <div
          className="
            flex
            items-center
            justify-center
            gap-3
            mb-3
          "
        >

          <span
            className="
              w-8
              sm:w-10
              h-[2px]
              bg-white
            "
          />

          <span
            className="
              text-[10px]
              sm:text-xs
              font-bold
              uppercase
              tracking-[0.18em]
              text-white
            "
          >
            Customer Testimonials
          </span>

          <span
            className="
              w-8
              sm:w-10
              h-[2px]
              bg-white
            "
          />

        </div>


        <h2
          className="
            text-2xl
            sm:text-3xl
            lg:text-[38px]
            font-semibold
            leading-tight
            text-white
          "
        >
          Real Feedback.{" "}
          <span className="
            text-slate-900
          ">
            Real Impact.
          </span>
        </h2>


        <p
          className="
            mt-2
            text-xs
            sm:text-sm
            text-white/90
            max-w-xl
            mx-auto
            leading-relaxed
          "
        >
          We value every opinion. Here's what our
          customers have to say about their experience
          with Renfra Energy.
        </p>

      </div>


      {/* ───────────────── Slider ───────────────── */}

     {/* ───────────────── Slider ───────────────── */}

<div
  className="
    relative
    max-w-[85rem] 2xl:max-w-[90rem]
    mx-auto
    px-0
    sm:px-4
    lg:px-8
  "
>
  {/* Previous Button */}
  {testimonials.length > 1 && (
    <button
      onClick={goPrev}
      disabled={isSliding}
      className="
        hidden
        lg:flex
        absolute
        left-0
        top-1/2
        -translate-y-1/2
        z-40
        w-9
        h-9
        rounded-full
        bg-white
        items-center
        justify-center
        shadow-md
        text-slate-700
        hover:text-emerald-600
        hover:scale-105
        transition-all
        disabled:opacity-50
      "
      aria-label="Previous testimonial"
    >
      <ArrowLeft className="w-4 h-4" />
    </button>
  )}

  {/* ───────────────── Slider Stage ───────────────── */}

  <div
    className="
      relative
      w-full
      overflow-visible
      py-6
    "
  >
    {/* 
      Invisible sizing card.

      This keeps the slider height based on the
      actual center card content instead of using
      a fixed height.
    */}
    <div
      className="
        hidden
        min-[800px]:block
        invisible
        w-full
        min-[800px]:w-1/2
        px-2
      "
    >
      <TestimonialCard
        testimonial={testimonials[centerIdx]}
        position="center"
      />
    </div>


    {/* ───────────────── Desktop Cards ───────────────── */}

    <div
      className="
        hidden
        min-[800px]:block
        absolute
        inset-x-0
        top-6
        bottom-6
      "
    >
      {testimonials.map(
        (testimonial, index) => {
          const position =
            getRelativePosition(index);

          let left = "33.333%";
          let transform =
            "translateX(0) translateY(0) scale(1)";
          let opacity = 0;
          let zIndex = 1;
          let pointerEvents = "none";

          {/* CENTER */}
          if (position === 0) {
            left = "25%";

            transform =
              "translateX(0) translateY(0) scale(1.05)";

            opacity = 1;
            zIndex = 30;
            pointerEvents = "auto";
          } 
          
          else if (position === -1) { {/* LEFT */}
            left = "0%";

            transform =
              "translateX(0) translateY(-50%) scale(0.86)";

            opacity = 0.72;
            zIndex = 10;
            pointerEvents = "auto";
          }

        
          else if (position === 1) {   {/* RIGHT */}
            left = "75%";

            transform =
              "translateX(0) translateY(-50%) scale(0.86)";

            opacity = 0.72;
            zIndex = 10;
            pointerEvents = "auto";
          }

          
          else if (position === -2) { {/* FAR LEFT */}
            left = "-25%";

            transform =
              "translateX(0) translateY(-50%) scale(0.86)";

            opacity = 0;
            zIndex = 1;
          }

          
          else if (position === 2) { {/* FAR RIGHT */}
            left = "100%";

            transform =
              "translateX(0) translateY(-50%) scale(0.86)";

            opacity = 0;
            zIndex = 1;
          }

          return (
            <div
              key={
                testimonial.id ??
                index
              }
              className={`
                absolute
                ${position === 0 ? "top-0" : "top-1/2"}
                px-2
                transition-all
                duration-[650ms]
                ease-[cubic-bezier(0.4,0,0.2,1)]
                will-change-transform
                ${position === 0 ? "w-1/2" : "w-1/4"}
              `}
              style={{
                left,
                transform,
                opacity,
                zIndex,
                pointerEvents,
              }}
            >
              <TestimonialCard
                testimonial={testimonial}
                position={position === 0 ? "center" : "side"}
              />
            </div>
          );
        },
      )}
    </div>


    {/* ───────────────── Mobile Card ───────────────── */}

    <div
      className={`
        min-[800px]:hidden
        w-full
        overflow-hidden
        ${slideDirection ? `testimonial-slide-enter-${slideDirection}` : ""}
      `}
      key={centerIdx}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: "pan-y" }}
    >
      <TestimonialCard
        testimonial={
          testimonials[centerIdx]
        }
        position="center"
      />
    </div>
  </div>


  {/* Next Button */}
  {testimonials.length > 1 && (
    <button
      onClick={goNext}
      disabled={isSliding}
      className="
        hidden
        lg:flex
        absolute
        right-0
        top-1/2
        -translate-y-1/2
        z-40
        w-9
        h-9
        rounded-full
        bg-white
        items-center
        justify-center
        shadow-md
        text-slate-700
        hover:text-emerald-600
        hover:scale-105
        transition-all
        disabled:opacity-50
      "
      aria-label="Next testimonial"
    >
      <ArrowRight className="w-4 h-4" />
    </button>
  )}
</div>


      {/* ───────────────── Dots ───────────────── */}

      {testimonials.length > 1 && (
        <div
          className="
            flex
            justify-center
            items-center
            gap-1.5
            mt-5
          "
        >

          {testimonials.map(
            (_, i) => (

              <button
                key={i}
                onClick={() =>
                  goTo(i)
                }
                disabled={isSliding}
                aria-label={`Go to testimonial ${
                  i + 1
                }`}
                className={`
                  rounded-full
                  transition-all
                  duration-300
                  disabled:cursor-not-allowed

                  ${
                    i === centerIdx
                      ? "w-6 h-2 bg-white"
                      : "w-2 h-2 bg-white/40 hover:bg-white/70"
                  }
                `}
              />

            ),
          )}

        </div>
      )}

    </section>
  );
}