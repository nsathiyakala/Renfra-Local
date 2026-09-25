"use client";

import { useEffect, useState } from "react";
import { axiosGet } from "@/lib/api";
import { CareerCard } from "./Career-Card";
import JobDetailsPage from "@/app/career-details/page";


export default function MainCareerSection() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);



  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        const res = await axiosGet.get("/masters/career/get/?web_sts=1&has_limit=0&active_status=1");

        console.log("API Response:", res.data);

        const data = res.data.data || [];

        const formatted = data.map((item) => ({
          id: item.data_uniq_id,
          title: item.title,
          job_id: item.job_id,
          requirements: item.description,
          level: item.role_type,
          salary: item.salary_range,
          location: item.city_name,
          experience: item.no_experience,
        }));

        setJobs(formatted);
      } catch (error) {
        console.log("Career fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-12 px-4">
        <div className="max-w-7xl mx-auto text-center text-[#293E52] text-lg font-semibold">
          <p className="text-center mb-4 text-[#293E52] max-w-5xl mx-auto text-sm sm:text-sm md:text-base lg:text-base">
          At Renfra Energy, we are committed to building a cleaner, greener
          world through innovative solar, wind, and energy storage projects. If
          you are passionate about renewable energy and want to make a real
          impact, explore career opportunities with us.
        </p>

        <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12 text-[#293E52]">
          Join Us in Powering a Sustainable Future
        </h1>
          
          Loading...
        </div>
      </section>
    );
  }

  // --------------------- NO DATA FOUND ---------------------
  if (noData) {
    return (
      <section className="w-full py-12 px-4">
        <div className="max-w-7xl mx-auto text-center text-red-600 text-lg font-semibold">
          <p className="text-center mb-4 text-[#293E52] max-w-5xl mx-auto text-sm sm:text-sm md:text-base lg:text-base">
          At Renfra Energy, we are committed to building a cleaner, greener
          world through innovative solar, wind, and energy storage projects. If
          you are passionate about renewable energy and want to make a real
          impact, explore career opportunities with us.
        </p>

        <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12 text-[#293E52]">
          Join Us in Powering a Sustainable Future
        </h1>


          No Jobs Found
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-center mb-4 text-[#293E52] max-w-5xl mx-auto text-sm sm:text-sm md:text-base lg:text-base">
          At Renfra Energy, we are committed to building a cleaner, greener
          world through innovative solar, wind, and energy storage projects. If
          you are passionate about renewable energy and want to make a real
          impact, explore career opportunities with us.
        </p>

        <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#293E52]">
          Join Us in Powering a Sustainable Future
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 px-10">
          {jobs.map((job) => (
            <CareerCard key={job.id} job={job} />
          ))}
        </div>
            
      </div>
    </section>
  );
}
