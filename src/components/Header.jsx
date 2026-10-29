import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Sun, Moon, GraduationCap } from "lucide-react";
import SearchBar from "./SearchBar";

const links = [
  { to: "/", label: "HOME" },
  { to: "/modules", label: "MODULES" },
  { to: "/experiments", label: "EXPERIMENTS" },
  { to: "/tools", label: "TOOLS" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(document.documentElement.classList.contains("dark"));

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("mbu_theme", next ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-40 glass-strong border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <GraduationCap className="w-7 h-7 text-blue-400" />
          <span className="leading-tight font-bold tracking-wide">
            <span className="block text-sm">MOHAN BABU UNIVERSITY</span>
            <span className="block text-[10px] text-slate-400 tracking-widest">DS LEARNING PORTAL</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-5 ml-4">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={({ isActive }) => `text-xs tracking-widest transition ${isActive ? "text-blue-400" : "text-slate-400 hover:text-white"}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex-1 hidden sm:block max-w-md ml-auto">
          <SearchBar placeholder="Search experiments, modules, tools..." />
        </div>

        <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-lg hover:bg-white/10 transition">
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 grid place-items-center font-bold text-sm" title="Aquib">A</div>
        <button className="md:hidden p-2" aria-label="Menu" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <nav className="md:hidden px-4 pb-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-sm tracking-widest text-slate-300">{l.label}</Link>
          ))}
          <SearchBar />
        </nav>
      )}
    </header>
  );
}
