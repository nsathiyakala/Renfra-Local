"use client";

import Image from "next/image";

const isoData = [
  {
    id: 1,
    image: "/images/iso.png",
    title: "ISO 9001:2015 Annex",
    title1: "Quality Management System ",
    subtitle: "Turnkey Projects and O&M",
    pdf: "/images/document/ISO-9001-2015-Annex.pdf",
  },
  {
    id: 2,
    image: "/images/iso.png",
    title: "ISO 9001:2015 Certificate",
    title1: "Quality Management System ",
    subtitle: "Turnkey Projects and O&M",
    pdf: "/images/document/ISO-9001-2015-Certificate.pdf",
  },
  {
    id: 3,
    image: "/images/iso.png",
    title: "ISO 14001:2015 Annex",
    title1: "Environment Management",
    subtitle: "Turnkey Projects and O&M",
    pdf: "/images/document/ISO-4001-2015-Annex.pdf",
  },
  {
    id: 4,
    image: "/images/iso.png",
    title: "ISO 14001:2015 Certificate",
    title1: "Environment Management",
    subtitle: "Turnkey Projects and O&M",
    pdf: "/images/document/ISO-14001-2015-Certificate.pdf",
  },
  {
    id: 5,
    image: "/images/iso.png",
    title: "ISO 45001:2018 Annex",
    title1: "Occupational Health & Safety ",
    subtitle: "Turnkey Projects and O&M",
    pdf: "/images/document/ISO-45001-2018-Annex.pdf",
  },
  {
    id: 6,
    image: "/images/iso.png",
    title: "ISO 45001:2018 Certificate",
    title1: "Occupational Health & Safety ",
    subtitle: "Turnkey Projects and O&M",
    pdf: "/images/document/ISO-45001-2018-Certificate.pdf",
  },
  {
    id: 7,
    image: "/images/policy.png",
    title: "IMS Policy",
    // subtitle: "(Operation and Maintenance)",
    pdf: "/images/document/renfra energy - ims-policy.pdf",
  },
  {
    id: 8,
    image: "/images/policy.png",
    title: "HSE Policy",
    // subtitle: "(Operation and Maintenance)",
    pdf: "/images/document/renfra-energy - hse-policy.pdf",
  },
  {
    id: 9,
    image: "/images/policy.png",
    title: "Grievance Policy",
    // subtitle: "(Operation and Maintenance)",
    pdf: "/ims@renfra",
  },
  {
    id: 10,
    image: "/images/policy.png",
    title: "POSH Policy",
    // subtitle: "(Operation and Maintenance)",
    pdf: "/ims@renfra",
  },
  {
    id: 11,
    image: "/images/policy.png",
    title: "Insider-Trading Policy",
    // subtitle: "(Operation and Maintenance)",
    pdf: "/ims@renfra",
  },
  {
    id: 12,
    image: "/images/policy.png",
    title: "Vigil Mechanism (Whistleblower) Policy",
    // subtitle: "(Operation and Maintenance)",
    pdf: "/ims@renfra",
  },
];

export default function IsoCertificationSection() {
  const openPDF = (pdfPath) => {
    window.open(pdfPath, "_blank");
  };

  return (
    <section className="w-full bg-[#f5f5f5] py-12 md:py-16">
      <div className="mx-auto max-w-[85rem] 2xl:max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl font-bold text-[#293E52] sm:text-2xl md:text-3xl lg:4xl">
            Our Certifications
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {isoData.map((item) => (
            <div
              key={item.id}
              onClick={() => openPDF(item.pdf)}
              className="cursor-pointer rounded-xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="mb-8 flex justify-center">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={120}
                  height={120}
                  className="h-auto w-[100px] sm:w-[120px]"
                />
              </div>

              <h3 className="text-lg font-semibold text-[#42A52A] lg:text-xl">
                {item.title}
              </h3>
              <h3 className="mt-3 text-lg font-semibold text-[#42A52A] lg:text-xl">
                {item.title1}
              </h3>
              <p className="mt-3 text-sm text-[#1E2A39] sm:text-base">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
