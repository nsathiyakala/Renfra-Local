"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, ArrowRight, Quote } from "lucide-react"
import { axiosGet } from "@/lib/api"



export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(3)
  const containerRef = useRef(null)
  const [testimonials, setTestimonial] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axiosGet.get(`masters/testimonials/get/?web_sts=1&active_status=1`)
      setTestimonial(response.data.data || [])
    } catch (error) {
      console.error("Error:", error)
      setTestimonial([]) // ensure state is set
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  // Responsive card count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setVisibleCards(1)
      else if (window.innerWidth < 1024) setVisibleCards(2)
      else setVisibleCards(3)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = testimonials.length - visibleCards

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1))
  }

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1))
    }, 4000)
    return () => clearInterval(interval)
  }, [maxIndex])

   if (loading) {
    return (
      <section className="w-full py-16 text-center text-[#293E52] text-lg font-semibold">
        Loading...
      </section>
    )
  }

  // -----------------------------------------
  // 🚫 No Testimonials Found
  // -----------------------------------------
  if (!loading && testimonials.length === 0) {
    return (
      <section className="w-full py-16 text-center text-[#293E52] text-lg font-semibold">
        <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 text-[#293E52]">
          Client Testimonials
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6 text-center">
          Read how Renfra Energy brings a noticeable change to the operations of our clients through our renewable energy solutions
        </p>

        No Data Found
      </section>
    )
  }

  return (
    <section
      className="w-full py-16 px-4 md:px-8 lg:px-16 relative bg-cover bg-center"
      style={{ backgroundImage: "url('/images/test-bg.png')" }}
    >
      <div className="relative max-w-[85rem] 2xl:max-w-[90rem] mx-auto">
        <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 text-[#293E52]">
          Client Testimonials
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6 text-center">
          Read how Renfra Energy brings a noticeable change to the operations of our clients through our renewable energy solutions
        </p>

        <div className="relative overflow-hidden">
          {/* Carousel wrapper */}
          <div
            ref={containerRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${(100 / visibleCards) * currentIndex}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.data_uniq_id}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-3"
              >
                <div className="bg-white/90 rounded-lg p-8 flex flex-col justify-between h-full">
                  <div className="text-green-500 text-4xl mb-2">
                    <Quote className="fill-current text-green-500" strokeWidth={0} />
                  </div>
                  <div
                    className="text-foreground mb-6 flex-grow leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: testimonial.feedback }}
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-muted-foreground text-sm">{testimonial.designation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots + Navigation in same line */}
          <div className="flex items-center justify-between mt-6">
            {/* Dots centered */}
            <div className="flex-1 flex justify-center">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors mx-1 ${index === currentIndex ? "bg-green-500" : "bg-gray-300"
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation on right */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={goToPrevious}
                className="w-10 h-10 rounded-full border-2 border-[#293E52] flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Previous testimonials"
              >
                <ArrowLeft className="w-5 h-5 text-[#293E52]" />
              </button>
              <button
                onClick={goToNext}
                className="w-10 h-10 rounded-full border-2 border-[#293E52] flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Next testimonials"
              >
                <ArrowRight className="w-5 h-5 text-[#293E52]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
