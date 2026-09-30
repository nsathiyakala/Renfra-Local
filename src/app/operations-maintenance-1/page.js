import OMPage from "@/components/OM-Page";
import InnerBanner from "@/components/Inner-banner";

export const metadata = {
  title: "Operations & Maintenance | Renfra Energy",
  description:
    "Renfra Energy delivers integrated Renewable Energy Operations & Maintenance (O&M), Asset Management, Inspection, Testing and Specialized Technical Services.",
};

export default function OperationsMaintenance() {
  return (
    <>
      <InnerBanner
        title="Operations & Maintenance"
        bgImage="/images/operation-banner.svg"
      />
      <OMPage />
    </>
  );
}
