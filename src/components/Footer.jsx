import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 py-10 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-sm text-slate-400">
        <div>
          <h3 className="font-bold text-white">MOHAN BABU UNIVERSITY</h3>
          <p>Data Science Learning Portal</p>
        </div>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/modules" className="hover:text-white">Modules</Link>
          <Link to="/experiments" className="hover:text-white">Experiments</Link>
          <Link to="/tools" className="hover:text-white">Tools</Link>
        </div>
        <div className="flex gap-4">
          <span>GitHub</span><span>LinkedIn</span>
        </div>
      </div>
      <p className="text-center text-xs text-slate-600 mt-8">© 2026 Mohan Babu University</p>
    </footer>
  );
}
