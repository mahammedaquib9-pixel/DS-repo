import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ModuleCard({ module }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="glass p-5 flex flex-col gap-3">
      <p className="text-[10px] tracking-widest text-purple-400">MODULE {module.number}</p>
      <h3 className="font-semibold text-lg">{module.title}</h3>
      <p className="text-sm text-slate-400">{module.description}</p>
      <div className="flex flex-wrap gap-1 text-[10px]">
        {module.topics.map((t) => <span key={t} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">{t}</span>)}
      </div>
      <div className="flex justify-between text-xs text-slate-400">
        <span>{module.materialIds.length} materials</span>
        <span>{module.experimentIds.length} experiments</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${module.progress}%` }} />
      </div>
      <Link to={`/modules/${module.id}`} className="text-sm text-blue-400 hover:underline mt-auto">Open Module →</Link>
    </motion.div>
  );
}
