import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { searchAll } from "../data/searchIndex";

export default function SearchBar({ placeholder = "Search experiments, modules, tools..." }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const boxRef = useRef(null);

  useEffect(() => {
    setResults(searchAll(query).slice(0, 8));
    setActive(0);
    setOpen(query.trim().length > 0);
  }, [query]);

  useEffect(() => {
    const h = (e) => { if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const go = (item) => { navigate(item.path); setQuery(""); setOpen(false); };

  const onKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    if (e.key === "Enter" && results[active]) go(results[active]);
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <div ref={boxRef} className="relative w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKey}
        onFocus={() => query && setOpen(true)}
        placeholder={placeholder}
        aria-label="Global search"
        className="w-full pl-11 pr-10 py-3 rounded-xl glass bg-transparent outline-none focus:ring-2 focus:ring-blue-500/50 placeholder:text-slate-500"
      />
      {query && (
        <button aria-label="Clear search" onClick={() => { setQuery(""); setOpen(false); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      )}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }} className="absolute z-50 w-full mt-2 glass-strong shadow-2xl overflow-hidden">
            {results.length === 0 ? (
              <p className="p-4 text-sm text-slate-400">No results found. Try another search.</p>
            ) : (
              results.map((r, i) => (
                <button
                  key={r.type + r.path}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r)}
                  className={`w-full text-left px-4 py-3 flex items-center justify-between gap-3 transition ${i === active ? "bg-white/10" : ""}`}
                >
                  <span>
                    <span className="block font-medium">{r.label}</span>
                    <span className="block text-xs text-slate-400">{r.sub}</span>
                  </span>
                  <span className="text-[10px] tracking-widest text-blue-400 border border-blue-400/30 rounded-full px-2 py-0.5">{r.type}</span>
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
