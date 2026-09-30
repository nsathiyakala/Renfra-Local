"use client";

import { useState,useEffect } from "react";
import { axiosGet, BASE_URL } from "@/lib/api";
import { ExternalLink, Play } from "lucide-react";

const NewsItem = ({ item }) => {
  const formatToDec08 = (dateString) => {
      const options = { year: "numeric", month: "short", day: "2-digit" };
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, options);
    };

  return(

  
  <div className="flex gap-4 pb-4 border-b border-slate-200">
    <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
      <img
        src={BASE_URL+item.media?.[0]?.file_path || "/placeholder.svg"}
        alt={item.title}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-1">
      <p className="text-sm text-slate-500 mb-1">{formatToDec08(item.date)}</p>
      <p className="text-slate-700 text-sm line-clamp-3">{item.title}</p>
    </div>
    <a href="/news">
      <ExternalLink className="w-5 h-5 text-teal-500 flex-shrink-0" />
    </a>
  </div>
);
}

function SimpleMediaThumbnail({ file, className = "" }) {
  // Build image source
  const imageSrc = `${BASE_URL}${file.file_path?.replace(/^\/+/, "")}`;

  // YouTube detection
  const url = file.url || "";
  const isYouTube = url.includes("youtu");

  // Convert YouTube into embed format
  const getEmbed = (url) => {
    if (url.includes("youtu.be"))
      return url.replace("youtu.be/", "www.youtube.com/embed/");
    if (url.includes("watch?v=")) return url.replace("watch?v=", "embed/");
    return url;
  };

  const embedUrl = isYouTube ? getEmbed(url) + "?modestbranding=1&rel=0" : null;

  return (
    <div
      className={`relative rounded-lg overflow-hidden bg-gray-200 group cursor-pointer ${className}`}
    >
      {isYouTube ? (
        <div className="relative w-full h-full">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            title="YouTube video player"
          ></iframe>
          
        </div>
      ) : (
        <div className="relative w-full h-full">
          <Image
            src={imageSrc}
            alt={file.title || "Media"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
    </div>
  );
}




export default function NewsHomeSection() {
  const [activeTab, setActiveTab] = useState("news");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const [mediaFiles, setMediaFiles] = useState([]);
  const[mediaData,setMediaData]=useState([])

   const fetchNews = async () => {
      try {
        setLoading(true);
  
        const response = await axiosGet.get(
          `/masters/news/get/?web_sts=1&order_type=asc&order_field=created_date&has_limit=0`
        );
  
        const data = response.data?.data || [];
  
        setNewsData(data);
        setNoData(data.length === 0);
      } catch (error) {
        console.error("Error:", error);
        setNoData(true);
      } finally {
        setLoading(false);
      }
    };

    const fetchMedia = async () => {
        try {
          setLoading(true);
    
          const res = await axiosGet.get(`/masters/media/content/get/?web_sts=1`);
          const data = res.data?.data || [];
    
          if (!data.length) {
            setNoData(true);
            setLoading(false);
            return;
          }
    
          
          const videoSection = data.find((s) => s.file_type === "video");
          
    
         
    
          const videos = videoSection?.files || [];
          
    
          setMediaData([...videos]);
    
          setNoData(videos.length === 0);
        } catch (error) {
          console.error("MEDIA FETCH ERROR:", error);
          setNoData(true);
        } finally {
          setLoading(false);
        }
      };
  
    useEffect(() => {
      fetchNews();
      fetchMedia();
    }, []);

    const FirstItem = newsData.slice(0, 1);
    const currentItems = newsData.slice(1, 4);
    const formatToDec08 = (dateString) => {
      const options = { year: "numeric", month: "short", day: "2-digit" };
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, options);
    };

  return (
    <div className="w-full bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
              News & Media
            </h1>
            <a href="/news">
              <ExternalLink
                className="w-7 h-7 ml-2"
                strokeWidth={2}
                style={{
                  stroke: "url(#grad)",
                }}
              />
              <svg width="0" height="0">
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3AB257" />
                  <stop offset="100%" stopColor="#329ACD" />
                </linearGradient>
              </svg>
            </a>
          </div>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Explore the latest happenings at Renfra and its group companies.
            Click on the news to read more.
          </p>
        </div>

        {/* Tabs Section */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab("news")}
            className={`px-8 py-3 rounded-full font-semibold transition-all cursor-pointer ${
              activeTab === "news"
                ? "bg-gradient-to-r from-[#3AB257] to-[#329ACD] text-white shadow-lg"
                : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
            }`}
          >
            News
          </button>
          <button
            onClick={() => setActiveTab("media")}
            className={`px-8 py-3 rounded-full font-semibold transition-all cursor-pointer ${
              activeTab === "media"
                ? "bg-gradient-to-r from-[#3AB257] to-[#329ACD] text-white shadow-lg"
                : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
            }`}
          >
            Media
          </button>
        </div>

        {/* Content Section */}
        {activeTab === "news" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {FirstItem.map((item) => (
              
              <div key={item.id} className="lg:col-span-1">
                <div className="relative overflow-hidden rounded-lg shadow-md h-64 sm:h-80">
                  <img
                    src={BASE_URL +item.media?.[0]?.file_path || ""}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
            
                
                <div>
  <p className="text-sm text-slate-500 mt-4">
    {formatToDec08(item.date)}
  </p>

  <div className="flex items-start justify-between gap-2">
    <p className="text-slate-700 mt-2 flex-1">
      {item.title}
    </p>

    <a href="/news" className="mt-2 flex-shrink-0">
      <ExternalLink className="w-5 h-5 text-teal-500" />
    </a>
  </div>
</div>

                
              </div>
              
              
            )
              )}

            {/* Right Column - Latest News List */}
            <div className="lg:col-span-1 space-y-6">
              {currentItems.map((newsItem) => (
                <NewsItem key={newsItem.id} item={newsItem} />
              ))}
            </div>
          </div>
        ) : (
          // Media Grid - 3 cards
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
  {mediaData.length > 0 ? (
    mediaData.slice(0, 3).map((file) => (
      <SimpleMediaThumbnail
        key={file.data_uniq_id}
        file={file}
        className="h-64"
      />
    ))
  ) : (
    <div className="col-span-full flex justify-center mt-6">
      <p className="text-gray-700">No Media Found</p>
    </div>
  )}
</div>

        )}
      </div>
    </div>
  );
}
