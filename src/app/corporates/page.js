import InnerBanner from "@/components/Inner-banner";
import { TeamCard } from "@/components/Corporate";

const teams = [
  {
    id: 1,
    title: "Speed Team Group",
        website: { name: "www.speedteamgroup.com", url: "https://www.speedteamgroup.com" },
    description:
      "Speed Team Group is dedicated to creating a sustainable future through advanced renewable energy solutions. We specialize in solar PV systems and other clean energy projects, ensuring efficiency, reliability, and innovation at every stage. Our mission is to make clean energy accessible and affordable, reducing carbon footprints across communities. With a focus on quality and sustainability. ",
    image: "/images/cor1.png",
    logo: "/images/speed-logo.png",
  },
  {
    id: 2,
    title: "G Wind",
        website: { name: "www.speedteamgroup.com", url: "https://www.speedteamgroup.com" },
    description:
      "Speed Team Group is dedicated to creating a sustainable future through advanced renewable energy solutions. We specialize in solar PV systems and other clean energy projects, ensuring efficiency, reliability, and innovation at every stage. Our mission is to make clean energy accessible and affordable, reducing carbon footprints across communities. With a focus on quality and sustainability. ",
    image: "/images/cor2.png",
    logo: "/images/speed-logo.png",
  },
  {
    id: 3,
    title: "DLI",
        website: { name: "www.speedteamgroup.com", url: "https://www.speedteamgroup.com" },
    description:
      "Speed Team Group is dedicated to creating a sustainable future through advanced renewable energy solutions. We specialize in solar PV systems and other clean energy projects, ensuring efficiency, reliability, and innovation at every stage. Our mission is to make clean energy accessible and affordable, reducing carbon footprints across communities. With a focus on quality and sustainability.",
    image: "/images/cor1.png",
    logo: "/images/speed-logo.png",
  },
  {
    id: 4,
    title: "Wandse",
        website: { name: "www.speedteamgroup.com", url: "https://www.speedteamgroup.com" },
    description:
      "Speed Team Group is dedicated to creating a sustainable future through advanced renewable energy solutions. We specialize in solar PV systems and other clean energy projects, ensuring efficiency, reliability, and innovation at every stage. Our mission is to make clean energy accessible and affordable, reducing carbon footprints across communities. With a focus on quality and sustainability. ",
    image: "/images/cor2.png",
    logo: "/images/speed-logo.png",
  },
    {
    id: 5,
    title: "Speed Mechatronics",
        website: { name: "www.speedteamgroup.com", url: "https://www.speedteamgroup.com" },
    description:
      "Speed Team Group is dedicated to creating a sustainable future through advanced renewable energy solutions. We specialize in solar PV systems and other clean energy projects, ensuring efficiency, reliability, and innovation at every stage. Our mission is to make clean energy accessible and affordable, reducing carbon footprints across communities. With a focus on quality and sustainability. ",
    image: "/images/cor2.png",
    logo: "/images/speed-logo.png",
  },
] 

export default function CorporateMain() {
  return (
<>

<InnerBanner title="Corporate" bgImage="/images/corporate-bg.png" />

<main className="bg-background">
      {/* Header Section */}
      <section className="py-12">
        <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          {/* <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">Speed Team Group</h1> */}
          <p className="text-sm sm:text-sm md:text-base lg:text-base text-[#293E52] leading-relaxed text-pretty text-center max-w-6xl mx-auto">
            Speed Team Group is a diversified organization committed to driving growth through innovation, sustainability, and technological excellence. With a strong presence across multiple industries, the group continuously invests in forward-thinking solutions that create long-term value for businesses, communities, and the environment. Guided by a vision of progress with purpose, Speed Team Group blends expertise, integrity, and innovation to build a smarter and more sustainable future.
          </p>
        </div>
      </section>

      {/* Cards Grid Section */}
      <section className=" py-12">
        <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {teams.map((team) => (
              <TeamCard key={team.id} {...team} />
            ))}
          </div>
        </div>
      </section>
    </main>

</>
  );
}
