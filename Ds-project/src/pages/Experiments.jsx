import { useMemo, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import ExperimentCard from "../components/ExperimentCard";
import EditExperimentModal from "../components/EditExperimentModal";
import { getExperiments } from "../utils/experimentStore";

const TECHS = ["All", "Python", "NumPy", "Pandas", "Matplotlib", "Statistics", "Machine Learning", "Deep Learning"];

export default function Experiments() {
  const [tick, setTick] = useState(0);
  const [query, setQuery] = useState("");
  const [module, setModule] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [tech, setTech] = useState("All");
  const [sort, setSort] = useState("number");
  const [editing, setEditing] = useState(null);

  const experiments = useMemo(() => getExperiments(), [tick]);
  const modules = ["All", ...new Set(experiments.map((e) => e.module))];

  const filtered = experiments
    .filter((e) => (module === "All" || e.module === module) && (difficulty === "All" || e.difficulty === difficulty) && (tech === "All" || e.tools.includes(tech)) && (`${e.title} ${e.description}`.toLowerCase().includes(query.toLowerCase())))
    .sort((a, b) => sort === "title" ? a.title.localeCompare(b.title) : a.number.localeCompare(b.number));

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Experiments" }]} />
      <h1 className="text-3xl font-bold">Experiments</h1>

      <div className="glass p-4 grid sm:grid-cols-2 lg:grid-cols-5 gap-3 text-sm">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="p-2.5 rounded-lg bg-white/5 border border-white/10 outline-none" />
        <select value={module} onChange={(e) => setModule(e.target.value)} className="p-2.5 rounded-lg bg-slate-900 border border-white/10">{modules.map((m) => <option key={m}>{m}</option>)}</select>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="p-2.5 rounded-lg bg-slate-900 border border-white/10">{["All", "Beginner", "Intermediate", "Advanced"].map((d) => <option key={d}>{d}</option>)}</select>
        <select value={tech} onChange={(e) => setTech(e.target.value)} className="p-2.5 rounded-lg bg-slate-900 border border-white/10">{TECHS.map((t) => <option key={t}>{t}</option>)}</select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="p-2.5 rounded-lg bg-slate-900 border border-white/10"><option value="number">Sort: Number</option><option value="title">Sort: Title</option></select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-slate-400 py-16">No experiments found. Try another search.</p>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((e) => (
            <div key={e.id} className="relative">
              <ExperimentCard experiment={e} />
              <button onClick={() => setEditing(e)} className="absolute top-4 right-4 text-[10px] tracking-widest text-slate-500 hover:text-blue-400 transition">EDIT EXPERIMENT</button>
            </div>
          ))}
        </div>
      )}

      {editing && <EditExperimentModal experiment={editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); setTick((t) => t + 1); }} />}
    </div>
  );
}
