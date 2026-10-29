import { useState } from "react";
import { Play, RotateCcw, Copy } from "lucide-react";

// Demo sandbox: simulates execution. Structured so a real Python backend
// (e.g. a future /api/execute endpoint) can replace `simulateRun`.
async function simulateRun(code) {
  await new Promise((r) => setTimeout(r, 500));
  if (!code.trim()) throw new Error("No code provided.");
  return ">>> Simulated run\n" + code.split("\n").filter((l) => l.startsWith("print")).map(() => "(output preview — connect a Python backend to execute for real)").join("\n") || "(no print statements — connect a Python backend to execute for real)";
}

export default function Sandbox({ initialCode = "", initialOutput = "" }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState(initialOutput);
  const [error, setError] = useState(null);
  const [running, setRunning] = useState(false);

  const run = async () => {
    setRunning(true); setError(null);
    try { setOutput(await simulateRun(code)); } catch (e) { setError(e.message); }
    setRunning(false);
  };

  return (
    <div className="space-y-4">
      <div className="glass overflow-hidden">
        <div className="px-4 py-2 border-b border-white/10 text-xs tracking-widest text-slate-400">CODE</div>
        <textarea value={code} onChange={(e) => setCode(e.target.value)} rows={8} aria-label="Code editor" className="w-full bg-transparent p-4 font-mono text-sm outline-none" />
        <div className="flex gap-2 px-4 pb-4">
          <button onClick={run} className="btn-primary flex items-center gap-1.5 text-sm"><Play className="w-4 h-4" />{running ? "Running..." : "Run"}</button>
          <button onClick={() => { setCode(initialCode); setOutput(initialOutput); setError(null); }} className="btn-ghost flex items-center gap-1.5 text-sm"><RotateCcw className="w-4 h-4" />Reset</button>
          <button onClick={() => navigator.clipboard.writeText(code)} className="btn-ghost flex items-center gap-1.5 text-sm"><Copy className="w-4 h-4" />Copy</button>
        </div>
      </div>
      <div className="glass overflow-hidden">
        <div className="px-4 py-2 border-b border-white/10 text-xs tracking-widest text-slate-400">OUTPUT</div>
        {error ? <p className="p-4 text-sm text-red-400">{error}</p> : <pre className="p-4 text-sm font-mono text-slate-300 whitespace-pre-wrap">{output || "Run the code to see output here."}</pre>}
      </div>
    </div>
  );
}
