import { motion } from "framer-motion";

export default function ArchitectureDiagram({ steps }) {
  return (
    <div className="flex flex-col items-center gap-2 py-6">
      {steps.map((s, i) => (
        <div key={s} className="flex flex-col items-center gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className="glass px-6 py-2.5 text-xs tracking-widest font-medium text-blue-300 min-w-[220px] text-center"
          >
            {s.toUpperCase()}
          </motion.div>
          {i < steps.length - 1 && (
            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.15 }} className="text-blue-400">↓</motion.span>
          )}
        </div>
      ))}
    </div>
  );
}
