import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ToolCard({ tool }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="glass p-5 flex flex-col gap-2">
      <span className="text-3xl">{tool.icon}</span>
      <h3 className="font-semibold">{tool.name}</h3>
      <p className="text-[10px] tracking-widest text-teal-400">{tool.category.toUpperCase()}</p>
      <p className="text-sm text-slate-400 line-clamp-2">{tool.description}</p>
      <Link to={`/tools/${tool.id}`} className="text-sm text-blue-400 hover:underline mt-auto">Documentation →</Link>
    </motion.div>
  );
}
