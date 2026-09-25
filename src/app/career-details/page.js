"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import InnerBanner from "@/components/Inner-banner";
import { axiosGet, axiosPostForm } from "@/lib/api";
import parse from "html-react-parser";
import ReCAPTCHA from "react-google-recaptcha";

function JobDetailsContent() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const [fileName, setFileName] = useState("");

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noJobFound, setNoJobFound] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);


  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    cv_name: "",
    cv: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🚀 FETCH JOB DETAILS
  useEffect(() => {
  async function fetchJob() {
    if (!jobId) return;

    try {
      setLoading(true);
        
      setNoJobFound(false);

      const res = await axiosGet.get(
        `/masters/career/get/?job_id=${jobId}&web_sts=1`
      );

      const raw = res.data.data || [];

      const formatted = raw.map((item) => ({
        id: item.data_uniq_id,
        title: item.title,
        type: item.job_type,
        requirements: item.description,
        level: item.role_type,
        salary: item.salary_range,
        data_uniq_id: item.data_uniq_id,
        key_responsibilities: item.key_responsibilities,
        job_id: item.job_id,
        location: item.city_name || item.state_name,
        ref_job_id: item.data_uniq_id,
        ref_location_id: item.city_id,
        required_skills: item.required_skills,
      }));

      setJob(formatted[0] || null);
    } catch (error) {
      console.log("Job Details Error:", error);
      setNoJobFound(true);
    } finally {
      setLoading(false);
    }
  }

  fetchJob();
}, [jobId]);


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading job details...
      </div>
    );
  }

  if (noJobFound || !job) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center">
        <h1 className="text-xl font-bold text-red-500 mb-4">
          Job Not Found
        </h1>
        <Link href="/career" className="text-blue-600 underline">
          Back to Careers
        </Link>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex justify-center items-center min-h-screen text-center">
        <h1 className="text-xl font-bold text-red-500 mb-4">Job Not Found</h1>
        <Link href="/career" className="text-blue-600 underline">
          Back to Careers
        </Link>
      </div>
    );
  }

  // 🔥 FORM HANDLERS
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    // Reset any previous error handling (optional)
    // setUploadError({ status: "", message: "" });

    const file = event.target.files?.[0];
    if (!file) return;

    // If you want size check like your example
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert("File size should be less than 5MB");
      event.target.value = "";
      return;
    }

    // Store selected file name in UI and formData immediately
    setFileName(file.name);
    console.log(file.name, "file.name");

    // ⭐ Set cv_name immediately (synchronously)
    setFormData((prev) => ({
      ...prev,
      cv_name: file.name,
    }));

    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result.split(",")[1];

      // ⭐ Store Base64 directly into formData.cv
      setFormData((prev) => ({
        ...prev,
        cv: base64String, // ONLY BASE64 STRING
      }));
    };

    reader.onerror = () => {
      alert("Error reading the file. Please try again.");
    };

    reader.readAsDataURL(file);
  };

  // 🚀 SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData, "formData");

    try {
      const payload = {
        data_uniq_id: job.data_uniq_id,
        name: formData.name,
        email: formData.email,
        mobile: formData.phone,
        qualification: "B.E",
        // ref_location_id: job.ref_location_id,
        ref_job_id: job.ref_job_id,
        image_name: formData.cv_name,
        image: formData.cv,
        message: formData.message || "Submitted",
        captcha_token:captchaToken,
      };

      console.log("FINAL PAYLOAD SENDING:", payload);

      const response = await axiosPostForm.post(
        "/masters/registration/?web_sts=1",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          maxBodyLength: Infinity,
          maxContentLength: Infinity,
          transformRequest: (data, headers) => {
            delete headers.common?.Authorization; // prevent backend rejection
            return JSON.stringify(data);
          },
        }
      );

      alert("Application submitted successfully!");

      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
        cv: "",
        cv_name: "",
      });
      setFileName("");
    } catch (error) {
      console.log("Registration Error:", error);
      alert("Something went wrong. Try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/career"
            className="inline-flex items-center gap-2 text-[#329ACD]"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Careers
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <h1 className="text-3xl font-bold text-[#293E52] mb-3">
            {job.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-[#293E52] text-sm">
            {/* <span className="flex items-center gap-2">
              <img src="/images/sal.svg" className="w-4 h-4" />
              {job.salary}
            </span> */}

            {job?.salary ? (
          <div className="flex items-center gap-2">
            <img src="/images/sal.svg" alt="Salary" className="w-4 h-4" />
            <span className="text-sm text-[#293E52]">{job.salary}</span>
          </div>
        ) : null}
        
            {job.location && (
              <div className="flex items-center gap-2">
                <img src="/images/loc.svg" alt="Location" className="w-4 h-4" />
                <span className="text-sm text-[#293E52]">{job.location}</span>
              </div>
            )}

            {job.type && (
              <span className="flex items-center gap-2">
                <img src="/images/work.svg" alt="Employment type" className="w-4 h-4" />
                {job.type}
              </span>
            )}
          </div>

          <h2 className="text-xl font-semibold mb-3">Key Responsibilities</h2>
          <div
            className="[&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 text-[#293E52]"
            dangerouslySetInnerHTML={{ __html: job.key_responsibilities }}
          />

          <h2 className="text-xl font-semibold mb-3">Job Requirements</h2>
          <div
            className="[&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 text-[#293E52]"
            dangerouslySetInnerHTML={{ __html: job.requirements }}
          />

          <h2 className="text-xl font-semibold mb-3">Required Skills</h2>
          <div
            className="[&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 text-[#293E52]"
            dangerouslySetInnerHTML={{ __html: job.required_skills }}
          />

          <div className="flex flex-col gap-2">
            <p className="text-md text-[#293E52] font-semibold">
              Send your complete CV with expected salary to{" "}
              <a
                href="mailto:hr@renfraenergy.com"
                className="text-[#329ACD] hover:underline"
              >
                hr@renfraenergy.com
              </a>{" "}
              mentioning the Job ID and vacancy in the subject, or fill out the
              form with relevant details.
            </p>
            <p className="text-sm text-[#293E52]">
              <span className="font-semibold text-red-600">*</span> Please note
              that only shortlisted candidates will be contacted.
            </p>
          </div>
        </div>

        <div className="bg-white border rounded-lg shadow-md p-6 h-fit sticky top-24">
          <h2 className="text-2xl font-bold text-[#293E52] mb-6">Apply Now</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded"
              placeholder="Full Name"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded"
              placeholder="Phone Number"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded"
              placeholder="Email Address"
            />

            <textarea
              name="message"
              maxLength={500}
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border rounded"
              placeholder="Your Message"
            />

            {/* <input
              type="file"
              name="cv"
              placeholder="upload CV"
              onChange={handleFileChange}
              required
              accept=".pdf,.doc,.docx"
              className="w-full border p-2 rounded"
            /> */}

            <div className="relative inline-block w-full">
              {/* Actual file input */}
              <input
                type="file"
                id="file-input"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e)}
                required
              />

              {/* Display input */}
              <input
                type="text"
                value={fileName || "Upload CV"}
                readOnly
                onClick={() => document.getElementById("file-input").click()}
                className={`w-full py-2 pr-9 pl-3 border border-gray-300 rounded cursor-pointer bg-white ${
                  fileName ? "text-black" : "text-gray-500"
                }`}
              />

              {/* Clear (X) button */}
              {fileName && (
                <span
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer text-lg text-red-500 font-bold"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFileName("");
                    setFormData((prev) => ({ ...prev, cv_name: "", cv: "" }));
                    document.getElementById("file-input").value = "";
                  }}
                >
                  ✖
                </span>
              )}
            </div>

         




            <div className="flex items-start gap-2 text-sm text-[#293E52]">
  <input
    type="checkbox"
    id="terms"
    checked={acceptTerms}
    onChange={(e) => setAcceptTerms(e.target.checked)}
    className="mt-1"
  />
  <label htmlFor="terms">
    I agree to the{" "}
    <Link href="/terms-and-conditions" className="text-[#329ACD] underline">
      Terms & Conditions
    </Link>{" "}
    and Privacy Policy.
  </label>
</div>


            <button
  type="submit"
  disabled={isSubmitting || !acceptTerms}
  className={`w-full py-3 rounded-lg font-semibold text-white
    ${
      acceptTerms
        ? "bg-gradient-to-r from-[#329ACD] to-[#3AB257]"
        : "bg-gray-400 cursor-not-allowed"
    }`}
>
  {isSubmitting ? "Submitting..." : "Submit Application"}
</button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default function JobDetailsPage() {
  return (
    <>
      <InnerBanner title="Career Details" bgImage="/images/career-bg.svg" />
      <Suspense
        fallback={
          <div className="min-h-screen flex justify-center items-center">
            Loading...
          </div>
        }
      >
        <JobDetailsContent />
      </Suspense>
    </>
  );
}
