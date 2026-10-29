import { useParams, Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { modules } from "../data/modules";
import { materials } from "../data/materials";
import { getExperiments } from "../utils/experimentStore";
import { tools } from "../data/tools";

export default function ModuleDetails() {
  const { moduleId } = useParams();
  const mod = modules.find((m) => m.id === moduleId);
  if (!mod) return <p className="py-20 text-center text-slate-400">Module not found.</p>;
  const exps = getExperiments().filter((e) => mod.experimentIds.includes(e.id));
  const mats = materials.filter((m) => m.moduleId === mod.id);
  const modTools = tools.filter((t) => mod.tools.includes(t.name));

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Modules", to: "/modules" }, { label: `Module ${mod.number}` }]} />
      <div>
        <p className="text-xs tracking-widest text-purple-400">MODULE {mod.number}</p>
        <h1 className="text-3xl font-bold mt-1">{mod.title}</h1>
        <p className="text-slate-400 mt-2">{mod.description}</p>
      </div>
      <Section title="Learning Objectives"><ul className="list-disc pl-5 text-slate-300 text-sm space-y-1">{mod.topics.map((t) => <li key={t}>Understand {t}.</li>)}</ul></Section>
      <Section title="Topics"><div className="flex flex-wrap gap-2">{mod.topics.map((t) => <span key={t} className="glass px-3 py-1 text-xs">{t}</span>)}</div></Section>
      <Section title="Experiments">{exps.map((e) => <Link key={e.id} to={`/experiments/${e.id}/overview`} className="block glass p-3 mb-2 hover:bg-white/10 transition text-sm">Experiment {e.number} — {e.title}</Link>)}</Section>
      <Section title="Study Materials">{mats.map((m) => <Link key={m.id} to={`/materials/${m.id}`} className="block glass p-3 mb-2 hover:bg-white/10 transition text-sm">📄 {m.title}</Link>)}</Section>
      <Section title="Tools">{modTools.map((t) => <Link key={t.id} to={`/tools/${t.id}`} className="inline-block glass px-3 py-1 mr-2 mb-2 text-sm">{t.icon} {t.name}</Link>)}</Section>
    </div>
  );
}

function Section({ title, children }) {
  return <section><h2 className="text-lg font-bold mb-3">{title}</h2>{children}</section>;
}
