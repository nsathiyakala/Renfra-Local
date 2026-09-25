import InnerBanner from "@/components/Inner-banner";
import MapSection from "@/components/Map";
import ProjectsSection from "@/components/Projects";
import CompletedProjects from "@/components/Projects-Map";
import TamilnaduMap from "@/components/Tamilnadu-Map";
import InteractiveProjectsMap from "@/components/InteractiveProjectsMap";
import InteractiveProSec from "@/components/InteractiveProSec";


export default function Projects() {
  return (
<>

<InnerBanner title="Projects" bgImage="/images/project-bg.png" />
<ProjectsSection />
{/* <MapSection /> */}
{/* <TamilnaduMap/> */}
{/* <CompletedProjects /> */}
<InteractiveProjectsMap />
{/* <InteractiveProSec/> */}
</>
  );
}
