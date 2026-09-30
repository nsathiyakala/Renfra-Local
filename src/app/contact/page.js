import { ContactForm } from "@/components/Contact-Form"
import { ContactInfo } from "@/components/Contact-Info"
import MapSectionContact from "@/components/Contact-Map"
import MapMainContact from "@/components/Contact-Map"
import InnerBanner from "@/components/Inner-banner"

export default function Contact() {
  return (
    <>
    <InnerBanner title="Contact" bgImage="/images/contact-banner.png" />
    
   
    <main className=" bg-background">
      <div className="mx-auto max-w-[85rem] 2xl:max-w-[90rem] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column - Contact Information */}
          <ContactInfo />

          {/* Right Column - Contact Form */}
          <ContactForm />
        </div>
      </div>
    </main>
<MapSectionContact />
     </>
  )
}
