import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ExperimentCard({ experiment }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="glass p-5 flex flex-col gap-3">
      <p className="text-[10px] tracking-widest text-blue-400">EXPERIMENT {experiment.number}</p>
      <h3 className="font-semibold text-lg leading-snug">{experiment.title}</h3>
      <p className="text-sm text-slate-400 line-clamp-2">{experiment.description}</p>
      <div className="flex flex-wrap gap-1.5 text-[10px]">
        <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">{experiment.module}</span>
        <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">{experiment.difficulty}</span>
        {experiment.tools.slice(0, 2).map((t) => <span key={t} className="px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">{t}</span>)}
      </div>
      <Link to={`/experiments/${experiment.id}/overview`} className="mt-auto text-sm text-blue-400 hover:underline">Overview →</Link>
    </motion.div>
  );
}
