import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import PdfViewer from "../components/PdfViewer";
import { materials } from "../data/materials";

export default function MaterialViewer() {
  const { materialId } = useParams();
  const m = materials.find((x) => x.id === materialId);
  if (!m) return <p className="py-20 text-center text-slate-400">Material not found.</p>;
  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Modules", to: "/modules" }, { label: m.title }]} />
      <h1 className="text-2xl font-bold mb-6">{m.title}</h1>
      <PdfViewer material={m} />
    </div>
  );
}
