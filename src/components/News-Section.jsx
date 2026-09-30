"use client";

import { useEffect, useState } from "react";
import { axiosGet, BASE_URL } from "@/lib/api";
import NewsCard from "./News-Card";

const ITEMS_PER_PAGE = 12;

export default function NewsSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);


  // Load dynamic API data
  const fetchProject = async () => {
    try {
      setLoading(true);

      const response = await axiosGet.get(
        `/masters/news/get/?web_sts=1&order_type=asc&order_field=created_date&has_limit=0&active_status=1`
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

  useEffect(() => {
    fetchProject();
  }, []);


  // Pagination logic
  const totalPages = Math.ceil(newsData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = currentPage * ITEMS_PER_PAGE;
  const currentItems = newsData.slice(startIndex, endIndex);
  const formatToDec08 = (dateString) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  if (loading) {
    return (
      <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-[#293E52] font-semibold">
        Loading...
      </div>
    );
  }

  
  if (noData) {
    return (
      <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-red-600 font-semibold">
        No News Found
      </div>
    );
  }


  return (
    <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentItems
          .filter((item) => item.active_status === 1)

          .map((item) => (
            <NewsCard
              key={item.data_uniq_id}
              data_uniq_id={item.data_uniq_id}
              image={
                BASE_URL +
                (item.media?.find((m) => m.file_type === "image")?.file_path ||
                  "")
              }
              title={item.title}
              date={formatToDec08(item.date)}
              description={item.content?.[0]?.description || ""}
            />
          ))}
      </div>

      {/* Pagination */}
      {totalPages !== 0 ? (
        <div className="flex justify-center mt-6 items-center space-x-2">
          {/* Previous */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-[#3CA948] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      ) : (
        <div className="flex justify-center mt-6 items-center space-x-2">
          <p className="text-gray-700">No News Found</p>
        </div>
      )}
    </div>
  );
}
