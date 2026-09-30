import InnerBanner from "@/components/Inner-banner";
import OM2Page from "@/components/OM2-Page";

export const metadata = {
  title: "Operations & Maintenance | Renfra Energy",
  description:
    "Renfra Energy delivers integrated Renewable Energy Operations & Maintenance (O&M), Asset Management, Inspection, Testing and Specialized Technical Services across 432.9 MW AC / 553.5 MW DC portfolio.",
};

export default function OperationsMaintenance2() {
  return (
    <>
      <InnerBanner
        title="Operations & Maintenance"
        bgImage="/images/operation-banner.svg"
      />
      <OM2Page />
    </>
  );
}
