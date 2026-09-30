"use client";

import { useState } from "react";
import NewsSection from "@/components/News-Section";
import MediaSection from "@/components/Media-Section";
import InnerBanner from "@/components/Inner-banner";

const linkedInPosts = [
  {
    title: "Renfra Energy renewable energy update",
    postId: "7480800757101776896",
    url: "https://www.linkedin.com/posts/renfraenergy_renfraenergy-ipo-renewableenergy-activity-7480800757101776896-3nzy",
  },
  {
    title: "Renfra Energy 50 MW solar park",
    postId: "7486643996371374080",
    url: "https://www.linkedin.com/posts/renfraenergy_50mw-solar-park-activity-7486643996371374080-fEfG",
  },
];

function LinkedInPosts() {
  return (
    <section className="mt-16" aria-labelledby="linkedin-posts-heading">
      <h2
        id="linkedin-posts-heading"
        className="text-2xl md:text-3xl font-semibold text-[#293E52] mb-8"
      >
        LinkedIn Updates
      </h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {linkedInPosts.map((post) => (
          <article key={post.postId} className="min-w-0">
            <iframe
              src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${post.postId}`}
              title={post.title}
              className="w-full rounded-lg border border-gray-200 bg-white"
              height="560"
              loading="lazy"
              allowFullScreen
            />
            <a
              href={post.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm font-medium text-[#176B87] hover:underline"
            >
              View post on LinkedIn
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function NewsMedia() {
  const [activeTab, setActiveTab] = useState("news");

  return (
    <>
      <InnerBanner title="Media & News" bgImage="/images/news-ban.png" />

      <main className="min-h-screen bg-background">
        <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 py-12">
          {/* Tab Navigation */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab("news")}
              className={`px-8 py-2 rounded-full font-medium transition-colors cursor-pointer ${
                activeTab === "news"
                  ? "text-white bg-gradient-to-r from-[#3CA948] to-[#329ACD]"
                  : "bg-white text-[#293E52] hover:bg-gray-300"
              }`}
            >
              News
            </button>
            <button
              onClick={() => setActiveTab("media")}
              className={`px-8 py-2 rounded-full font-medium transition-colors cursor-pointer ${
                activeTab === "media"
                  ? "text-white bg-gradient-to-r from-[#3CA948] to-[#329ACD]"
                  : "bg-white text-[#293E52] hover:bg-gray-300"
              }`}
            >
              Media
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "news" && <NewsSection />}
          {activeTab === "media" && <MediaSection />}
          {/* <LinkedInPosts /> */}
        </div>
      </main>
    </>
  );
}
