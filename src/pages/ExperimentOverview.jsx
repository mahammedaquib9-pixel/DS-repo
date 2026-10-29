import { useParams, Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import ArchitectureDiagram from "../components/ArchitectureDiagram";
import { getExperiment } from "../utils/experimentStore";

export default function ExperimentOverview() {
  const { experimentId } = useParams();
  const e = getExperiment(experimentId);
  if (!e) return <p className="py-20 text-center text-slate-400">Experiment not found.</p>;

  return (
    <div className="space-y-10">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Experiments", to: "/experiments" }, { label: `Experiment ${e.number}` }]} />
      <div>
        <p className="text-xs tracking-widest text-blue-400">EXPERIMENT {e.number}</p>
        <h1 className="text-3xl font-bold mt-1">{e.title}</h1>
      </div>

      <section>
        <h2 className="text-lg font-bold mb-2">## Experiment Overview — Summary</h2>
        <p className="text-slate-400">{e.overview.summary}</p>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-3">Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center text-sm">
          {[["Experiment Number", e.number], ["Module", e.module], ["Difficulty", e.difficulty], ["Sub Experiments", e.subExperiments.length], ["Tools", e.tools.join(", ")]].map(([l, v]) => (
            <div key={l} className="glass p-4"><p className="text-[10px] tracking-widest text-slate-500">{l.toUpperCase()}</p><p className="font-semibold mt-1">{v}</p></div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-3">Architecture</h2>
        <div className="glass p-4"><ArchitectureDiagram steps={e.overview.architecture} /></div>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-3">Sub-Experiments</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {e.subExperiments.map((s) => (
            <Link key={s.id} to={`/experiments/${e.id}/${s.id}`} className="glass p-5 hover:bg-white/10 transition">
              <p className="text-xs tracking-widest text-teal-400">{s.id}</p>
              <h3 className="font-semibold mt-1">{s.title}</h3>
              <p className="text-xs text-slate-500 mt-2">Open →</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
