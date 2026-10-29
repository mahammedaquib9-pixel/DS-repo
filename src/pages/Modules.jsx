import ModuleCard from "../components/ModuleCard";
import Breadcrumbs from "../components/Breadcrumbs";
import { modules } from "../data/modules";

export default function Modules() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Modules" }]} />
      <h1 className="text-3xl font-bold mb-6">Data Science Modules</h1>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {modules.map((m) => <ModuleCard key={m.id} module={m} />)}
      </div>
    </div>
  );
}
