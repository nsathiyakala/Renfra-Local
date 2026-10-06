"use client";

import { useEffect, useRef, useState } from "react";
import { Linkedin } from "lucide-react";
import InnerBanner from "@/components/Inner-banner";

/* ─────────────────────────────────────────────────────────────────────────
   LinkedIn posts — embedSrc from "Embed this post", postUrl is the real
   post link (used for the "Read more..." overlay link).
   ───────────────────────────────────────────────────────────────────────── */
const POSTS = [
  { embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7511430618443005952?collapsed=1", postUrl: "https://www.linkedin.com/feed/update/urn:li:share:7511430618443005952" },
  { embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7510567024398602240?collapsed=1", postUrl: "https://www.linkedin.com/feed/update/urn:li:share:7510567024398602240" },
  { embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7509473091429888000?collapsed=1", postUrl: "https://www.linkedin.com/feed/update/urn:li:share:7509473091429888000" },
  { embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7509222571389870081?collapsed=1", postUrl: "https://www.linkedin.com/feed/update/urn:li:share:7509222571389870081" },
  { embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7503719316807192576?collapsed=1", postUrl: "https://www.linkedin.com/feed/update/urn:li:share:7503719316807192576" },
  { embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7503422349191385089?collapsed=1", postUrl: "https://www.linkedin.com/feed/update/urn:li:share:7503422349191385089" },
];

// Height of LinkedIn's action bar (Like · Comment · Share · Send)
const ACTION_BAR_H = 52;

/* ─────────────────────────────────────────────────────────────────────────
   EmbedCard
   ───────────────────────────────────────────────────────────────────────── */
function EmbedCard({ embedSrc, postUrl, index }) {
  const iframeRef = useRef(null);
  const [iframeH, setIframeH] = useState(670);

  useEffect(() => {
    function onMessage(e) {
      if (
        e.origin === "https://www.linkedin.com" &&
        e.data?.msg === "lp_resize" &&
        typeof e.data?.data?.height === "number" &&
        iframeRef.current &&
        e.source === iframeRef.current.contentWindow
      ) {
        setIframeH(e.data.data.height + 2);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const wrapperH = iframeH - ACTION_BAR_H;

  return (
    <div
      className="break-inside-avoid mb-5 rounded-2xl border border-[#e2e8f0] bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
      style={{ overflow: "hidden", height: wrapperH, position: "relative" }}
    >
      <iframe
        ref={iframeRef}
        src={embedSrc}
        title={`LinkedIn post ${index + 1}`}
        width="100%"
        height={iframeH}
        frameBorder="0"
        allowFullScreen
        scrolling="no"
        className="block w-full border-0"
        loading="lazy"
      />

      {/* LinkedIn wordmark mask */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 160,
          height: 70,
          background: "white",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      {/*
        Full-card transparent overlay — intercepts ALL clicks on the iframe
        (including LinkedIn's own "...more" expand button) and instead opens
        the real LinkedIn post in a new tab. cursor:pointer signals it's clickable.
      */}
      <a
        href={postUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="View full post on LinkedIn"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 20,
          cursor: "pointer",
          display: "block",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Section
   ───────────────────────────────────────────────────────────────────────── */
function LinkedInPosts() {
  return (
    <section aria-labelledby="linkedin-heading">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-[2px] bg-[#3AB257]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#3AB257]">
              Social Updates
            </span>
          </div>
          <h2
            id="linkedin-heading"
            className="text-2xl sm:text-3xl font-bold text-[#293E52] leading-tight"
          >
            Latest News{" "}
            {/* <span className="bg-gradient-to-r from-[#329ACD] to-[#3AB257] bg-clip-text text-transparent">
              LinkedIn
            </span> */}
          </h2>
        </div>

        <a
          href="https://www.linkedin.com/company/renfraenergy"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-[#0A66C2] hover:bg-[#004182] text-white text-sm font-semibold px-5 py-2.5 rounded-md shadow-sm transition-colors shrink-0"
        >
          <Linkedin className="h-4 w-4" />
          Follow on LinkedIn
        </a>
      </div>

      {/* 3-col masonry */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
        {POSTS.map((post, i) => (
          <EmbedCard
            key={post.embedSrc}
            embedSrc={post.embedSrc}
            postUrl={post.postUrl}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}

export default function NewsMedia() {
  return (
    <>
      <InnerBanner title="Media & News" bgImage="/images/news-ban.png" />
      <main className="min-h-screen bg-background">
        <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 py-12 pb-0 sm:pb-12">
          <LinkedInPosts />
        </div>
      </main>
    </>
  );
}
