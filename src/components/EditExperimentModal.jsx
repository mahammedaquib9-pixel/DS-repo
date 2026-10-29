import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { saveExperimentEdit, resetExperimentEdit } from "../utils/experimentStore";

export default function EditExperimentModal({ experiment, onClose, onSaved }) {
  const [form, setForm] = useState({
    number: experiment.number,
    title: experiment.title,
    description: experiment.description,
    module: experiment.module,
    difficulty: experiment.difficulty,
    aim: experiment.subExperiments?.[0]?.aim ?? "",
    procedure: (experiment.subExperiments?.[0]?.procedure ?? []).join("\n"),
    code: experiment.subExperiments?.[0]?.code ?? "",
    output: experiment.subExperiments?.[0]?.output ?? "",
    tools: experiment.tools.join(", "),
  });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = () => {
    const edited = {
      ...experiment,
      number: form.number,
      title: form.title,
      description: form.description,
      module: form.module,
      difficulty: form.difficulty,
      tools: form.tools.split(",").map((t) => t.trim()).filter(Boolean),
      subExperiments: experiment.subExperiments.map((s, i) => i === 0 ? { ...s, aim: form.aim, procedure: form.procedure.split("\n").filter(Boolean), code: form.code, output: form.output } : s),
    };
    saveExperimentEdit(edited);
    onSaved();
  };

  const reset = () => { resetExperimentEdit(experiment.id); onSaved(); };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} className="glass-strong max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-xl font-bold">EDIT EXPERIMENT</h2>
          {[["Experiment Number", "number"], ["Title", "title"], ["Module", "module"], ["Difficulty", "difficulty"], ["Tools", "tools"]].map(([l, k]) => (
            <label key={k} className="block text-xs text-slate-400">{l}<input value={form[k]} onChange={set(k)} className="w-full mt-1 p-2.5 rounded-lg bg-white/5 border border-white/10 outline-none" /></label>
          ))}
          {[["Description", "description"], ["Aim", "aim"], ["Procedure (one step per line)", "procedure"], ["Output", "output"]].map(([l, k]) => (
            <label key={k} className="block text-xs text-slate-400">{l}<textarea rows={3} value={form[k]} onChange={set(k)} className="w-full mt-1 p-2.5 rounded-lg bg-white/5 border border-white/10 outline-none" /></label>
          ))}
          <label className="block text-xs text-slate-400">Code<textarea rows={8} value={form.code} onChange={set("code")} className="w-full mt-1 p-2.5 rounded-lg bg-white/5 border border-white/10 outline-none font-mono" /></label>
          <div className="flex justify-between gap-3">
            <button onClick={reset} className="btn-ghost text-sm">Reset to Default</button>
            <div className="flex gap-3">
              <button onClick={onClose} className="btn-ghost text-sm">Cancel</button>
              <button onClick={save} className="btn-primary text-sm">Save Changes</button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
