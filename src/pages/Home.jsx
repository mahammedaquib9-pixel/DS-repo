import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import StudentCard from "../components/StudentCard";
import ExperimentCard from "../components/ExperimentCard";
import { getExperiments } from "../utils/experimentStore";
import { modules } from "../data/modules";

export default function Home() {
  const experiments = getExperiments();

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
      {/* LEFT: main content */}
      <div className="space-y-10 min-w-0 order-2 lg:order-1">
        <section className="text-center py-6">
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-extrabold">
            <span className="gradient-text">MOHAN BABU UNIVERSITY</span>
          </motion.h1>
          <p className="tracking-[0.3em] text-xs text-slate-400 mt-2">DATA SCIENCE LEARNING PORTAL</p>
          <p className="mt-4 text-lg">Learn • Experiment • Analyze • Build</p>
          <p className="text-slate-400 max-w-2xl mx-auto mt-2 text-sm">An interactive learning environment for Data Science students to explore modules, experiments, tools, documentation and practical code.</p>
          <div className="flex justify-center gap-4 mt-6">
            <Link to="/experiments" className="btn-primary">Explore Experiments</Link>
            <Link to="/modules" className="btn-ghost">Explore Modules</Link>
          </div>
        </section>

        <SearchBar />

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Experiments</h2>
            <Link to="/experiments" className="text-xs text-blue-400 hover:text-blue-300 transition">View all →</Link>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {experiments.slice(0, 6).map((e) => <ExperimentCard key={e.id} experiment={e} />)}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-xl font-bold mb-4">Learning Progress</h2>
            <div className="glass p-5 space-y-3">
              {modules.map((m) => (
                <div key={m.id}>
                  <div className="flex justify-between text-xs text-slate-400 mb-1"><span>{m.title}</span><span>{m.progress}%</span></div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden"><div className="h-full bg-gradient-to-r from-blue-500 to-teal-400" style={{ width: `${m.progress}%` }} /></div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <ul className="glass p-5 space-y-2 text-sm text-slate-400">
              {experiments.slice(0, 4).map((e) => <li key={e.id}>• Viewed Experiment {e.number} — {e.title}</li>)}
            </ul>
          </section>
        </div>
      </div>

      {/* RIGHT: student ID card */}
      <aside className="order-1 lg:order-2 lg:sticky lg:top-24">
        <StudentCard />
      </aside>
    </div>
  );
}
