import ClientLogosGrid from "@/components/ClientLogosGrid";
import InnerBanner from "@/components/Inner-banner";

export const metadata = {
  title: "Our Clients | Renfra Energy",
};

export default function ClientsPage() {
  return (
    <>
      <InnerBanner title="Our Clients" bgImage="/images/banner-about.png" />
      <ClientLogosGrid />
    </>
  );
}