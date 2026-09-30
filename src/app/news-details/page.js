"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { axiosGet, BASE_URL } from "@/lib/api";
import NewsCard from "@/components/News-Card";
import InnerBanner from "@/components/Inner-banner";
import { ArrowLeft } from "lucide-react"

function formatToDec08(dateInput) {
  const date = new Date(dateInput);

  return date.toLocaleDateString("en-US", {
    month: "short", // Dec
    day: "2-digit", // 08
    year: "numeric",
  });
}

function NewsInnerContent() {
  const searchParams = useSearchParams();
  const newsId = searchParams.get("data_uniq_id");

  const [news, setNews] = useState(null);
  const [related, setRelated] = useState([]);

  const fetchProject = useCallback(async () => {
    try {
      const singleRes = await axiosGet.get(
        `/masters/news/get/?web_sts=1&data_uniq_id=${newsId}`
      );

      const singleList = singleRes.data.data;

      if (Array.isArray(singleList) && singleList.length > 0) {
        const item = singleList[0];

        // Extract video URL
        const videoMedia = item.media?.find((m) => m.file_type === "video");
        const videoUrl = videoMedia?.url
          ? videoMedia.url
              .replace("youtu.be/", "www.youtube.com/embed/")
              .split("?")[0]
          : null;

        // Extract image with position 1 (for fallback when no video)
        const position1Image = item.media?.find(
          (m) => m.file_type === "image" && m.position === 1
        );
        const heroImage = position1Image
          ? BASE_URL + position1Image.file_path
          : null;

        // Extract images for grid section
        // If video exists, show all images (including position 1)
        // If no video, position 1 is used as hero, so show all OTHER positions (2, 3, 4, etc.)
        const gridImages =
          item.media
            ?.filter((m) => {
              if (m.file_type !== "image") return false;
              // If there's a video, show all images
              if (videoUrl) return true;
              // If no video, exclude position 1 (it's used as hero), show all others
              return m.position !== 1;
            })
            .sort((a, b) => a.position - b.position)
            .map((m) => BASE_URL + m.file_path) || [];

        // Extract content by position
        const content1 =
          item.content?.find((c) => c.position === 1)?.description || "";
        const content2 =
          item.content?.find((c) => c.position === 2)?.description || "";

        setNews({
          id: item.data_uniq_id,
          title: item.title,
          date: item.date,
          videoUrl,
          heroImage,
          content1,
          content2,
          gridImages,
        });
      }

      // Fetch related
      const allRes = await axiosGet.get(`/masters/news/get/?web_sts=1`);
      const data = allRes.data.data || [];

      const relatedNews = data
        .filter(
          (item) => item.data_uniq_id !== newsId && item.active_status === 1
        )
        .slice(0, 4)
        .map((item) => {
          const imgObj = item.media?.find((m) => m.file_type === "image");

          return {
            id: item.data_uniq_id,
            title: item.title,
            date: item.created_date.split(" | ")[0],
            image: imgObj ? BASE_URL + imgObj.file_path : "/placeholder.svg",
            description:
              (item.content?.[0]?.description || "")
                .replace(/<[^>]+>/g, "")
                .slice(0, 80) + "...",
          };
        });

      setRelated(relatedNews);
    } catch (err) {
      console.error("Error loading news:", err);
    }
  }, [newsId]);

  useEffect(() => {
    if (newsId) {
      fetchProject();
    }
  }, [fetchProject, newsId]);

  if (!news)
    return <p className="p-10 text-center text-[#293E52]">Loading...</p>;

  return (
    <main className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-[#293E52]">
          {news.title}
        </h1>
        <p className="text-[#293E52] text-sm">{formatToDec08(news.date)}</p>
      </div>

      {/* Video Section OR Hero Image */}
      {news.videoUrl ? (
        // Display video if available
        <div
          className="relative w-full mb-8 rounded-lg overflow-hidden"
          style={{ aspectRatio: "16/9" }}
        >
          <iframe
            src={news.videoUrl}
            title={news.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : news.heroImage ? (
        // Display position 1 image if no video
        <div
          className="relative w-full mb-8 rounded-lg overflow-hidden"
          style={{ aspectRatio: "16/9" }}
        >
          <Image
            src={news.heroImage}
            alt={news.title}
            fill
            className="object-cover"
          />
        </div>
      ) : null}

      {/* Content Position 1 */}
      {news.content1 && (
        <div
          className="text-[#293E52] text-base mb-8 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: news.content1 }}
        />
      )}

      {/* Grid Section - Images based on video availability */}
      {news.gridImages.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {news.gridImages.map((img, idx) => (
            <div
              key={idx}
              className="relative w-full h-64 rounded-lg overflow-hidden"
            >
              <Image
                src={img}
                alt={`Grid Image ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Content Position 2 */}
      {news.content2 && (
        <div
          className="text-[#293E52] text-base mb-8 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: news.content2 }}
        />
      )}

        {/* Go Back to Solutions Page */}
        <div className="bg-white">
        <div className="w-full max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-[#293E52] hover:text-[#3CA948] font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Go back to News
          </Link>
        </div>
        </div>

      {/* Related News */}
      <div className="pt-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">
          Related News
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((item) => (
            <NewsCard
              key={item.id}
              data_uniq_id={item.id}
              image={item.image}
              title={item.title}
              date={item.date}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default function NewsInnerPage() {
  return (
    <>
      <InnerBanner title="News" bgImage="/images/news-banner.png" />

      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen text-[#293E52]">
            Loading...
          </div>
        }
      >
        <NewsInnerContent />
      </Suspense>
    </>
  );
}
