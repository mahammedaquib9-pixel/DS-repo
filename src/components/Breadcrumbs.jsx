import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ items }) {
  // items: [{label, to}]
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-slate-400 mb-6">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-3 h-3" />}
          {it.to ? <Link to={it.to} className="hover:text-blue-400 transition">{it.label}</Link> : <span className="text-slate-200">{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}
