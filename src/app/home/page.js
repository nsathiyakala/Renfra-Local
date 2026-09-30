import AboutUsSection from "@/components/Home-About";
import CareerSection from "@/components/Home-Career";
import CTA from "@/components/CTA";
import OurProjects, { OurProjectsSection, ProjectHomeSection } from "@/components/Home-Project";
import SolutionsSection from "@/components/Home-Solutions";
import { Navbar } from "@/components/Navbar";
import NewsMedia from "@/components/News-Media";
import SolutionsRenfra from "@/components/Renfra-Solution";
import { TestimonialsSection } from "@/components/Testimonials";
import VideoBannerSection, { VideoBanner } from "@/components/Video-Banner";
import Image from "next/image";
import { TestimonialsNew } from "@/components/TestimonialNew";
import ClientLogos from "@/components/ClientLogos";
import ClientLogosGrid from "@/components/ClientLogosGrid";
import RenfraSolutionNew from "@/components/RenfraSolutionNew";

export default function Home() {
  return (
<>
{/* <VideoBanner /> */}
<VideoBannerSection />
<AboutUsSection />
<RenfraSolutionNew/>
{/* <SolutionsRenfra /> */}
{/* <SolutionsSection /> */}
{/* <ProjectHomeSection /> */}
{/* <OurProjects /> */}
<OurProjectsSection />
{/* <NewsMedia /> */}

<TestimonialsNew/>
{/* <TestimonialsSection /> */}
<ClientLogos />
{/* <ClientLogosGrid /> */}
{/* <CareerSection /> */}
<CTA />

</>
  );
}
