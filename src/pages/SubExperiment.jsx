import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import CodeBlock from "../components/CodeBlock";
import Sandbox from "../components/Sandbox";
import { getExperiment } from "../utils/experimentStore";

export default function SubExperiment() {
  const { experimentId, subExperimentId } = useParams();
  const e = getExperiment(experimentId);
  const s = e?.subExperiments.find((x) => x.id === subExperimentId);
  if (!e || !s) return <p className="py-20 text-center text-slate-400">Sub-experiment not found.</p>;

  return (
    <div className="space-y-10">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Experiments", to: "/experiments" }, { label: `Experiment ${e.number}`, to: `/experiments/${e.id}/overview` }, { label: s.title }]} />
      <h1 className="text-3xl font-bold">{s.id} — {s.title}</h1>

      <section>
        <h2 className="text-lg font-bold mb-2">AIM</h2>
        <p className="text-slate-400">{s.aim}</p>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-2">PROCEDURE</h2>
        <ol className="list-decimal pl-5 space-y-1 text-slate-300 text-sm">{s.procedure.map((p, i) => <li key={i}>{p}</li>)}</ol>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-2">CODE</h2>
        <CodeBlock code={s.code} />
      </section>

      <section>
        <h2 className="text-lg font-bold mb-2">OUTPUT</h2>
        <pre className="glass p-4 text-sm font-mono text-slate-300 whitespace-pre-wrap">{s.output}</pre>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-2">SANDBOX</h2>
        <Sandbox initialCode={s.code} initialOutput={s.output} />
      </section>
    </div>
  );
}
