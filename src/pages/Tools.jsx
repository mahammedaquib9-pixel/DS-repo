import ToolCard from "../components/ToolCard";
import Breadcrumbs from "../components/Breadcrumbs";
import { tools } from "../data/tools";

const categories = [...new Set(tools.map((t) => t.category))];

export default function Tools() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Tools" }]} />
      <h1 className="text-3xl font-bold">Data Science Tools</h1>
      {categories.map((cat) => (
        <section key={cat}>
          <h2 className="text-lg font-bold mb-3 text-teal-400">{cat}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.filter((t) => t.category === cat).map((t) => <ToolCard key={t.id} tool={t} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
