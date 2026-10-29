import { useParams, Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import CodeBlock from "../components/CodeBlock";
import { tools } from "../data/tools";
import { getExperiments } from "../utils/experimentStore";

export default function ToolDetails() {
  const { toolId } = useParams();
  const t = tools.find((x) => x.id === toolId);
  if (!t) return <p className="py-20 text-center text-slate-400">Tool not found.</p>;
  const usedIn = getExperiments().filter((e) => e.tools.includes(t.name));

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Tools", to: "/tools" }, { label: t.name }]} />
      <div>
        <span className="text-4xl">{t.icon}</span>
        <h1 className="text-3xl font-bold mt-2">{t.name}</h1>
        <p className="text-xs tracking-widest text-teal-400 mt-1">{t.category.toUpperCase()}</p>
        <p className="text-slate-400 mt-3">{t.description}</p>
      </div>
      <section><h2 className="text-lg font-bold mb-2">Features</h2><ul className="list-disc pl-5 text-slate-300 text-sm">{t.features.map((f) => <li key={f}>{f}</li>)}</ul></section>
      <section><h2 className="text-lg font-bold mb-2">Installation</h2><CodeBlock code={t.install} language="bash" /></section>
      <section><h2 className="text-lg font-bold mb-2">Basic Usage</h2><CodeBlock code={t.usage} /></section>
      <section><h2 className="text-lg font-bold mb-2">Examples</h2><p className="text-slate-400 text-sm">{t.examples}</p></section>
      <section><h2 className="text-lg font-bold mb-2">Experiments Using This Tool</h2>
        {usedIn.length ? usedIn.map((e) => <Link key={e.id} to={`/experiments/${e.id}/overview`} className="block glass p-3 mb-2 text-sm hover:bg-white/10 transition">Experiment {e.number} — {e.title}</Link>) : <p className="text-slate-500 text-sm">No experiments linked yet.</p>}
      </section>
      <section><h2 className="text-lg font-bold mb-2">Documentation</h2><p className="text-slate-400 text-sm">Official documentation link can be added when available.</p></section>
    </div>
  );
}
