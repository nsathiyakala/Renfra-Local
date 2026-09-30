"use client";

export default function MapSection() {
  return (
    <section className="flex flex-col items-center justify-center px-4 bg-white">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#1A202C] text-center mb-6">
Renewable Reach
      </h2>

      {/* Map Image */}
      <div className="w-full max-w-[85rem] 2xl:max-w-[90rem] flex justify-center">
        <img
          src="/images/map.png" // Replace with your map image path
          alt="Location Map"
          className=" "
        />
      </div>
    </section>
  );
}
