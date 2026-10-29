import { Globe, Briefcase, GraduationCap, IdCard } from "lucide-react";
import { student } from "../data/student";

const isUrl = (v) => typeof v === "string" && v.startsWith("http");

const initials = student.name
  .split(" ")
  .map((w) => w[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

export default function StudentCard() {
  return (
    <aside className="glass overflow-hidden">
      {/* Card header */}
      <div className="bg-gradient-to-br from-blue-600/80 via-purple-600/70 to-teal-500/70 px-5 py-4 flex items-center gap-3">
        <IdCard className="w-5 h-5 text-white/90" />
        <div>
          <p className="text-[10px] tracking-[0.25em] text-white/70">STUDENT ID CARD</p>
          <p className="text-xs text-white/90 font-medium">Mohan Babu University</p>
        </div>
      </div>

      {/* Avatar + name */}
      <div className="px-5 pt-5 flex items-center gap-4">
        <div className="w-14 h-14 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 grid place-items-center text-white font-bold text-lg ring-2 ring-white/20">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="font-semibold truncate">{student.name}</p>
          <p className="text-xs text-slate-400">{student.branch} • {student.section}</p>
        </div>
      </div>

      {/* Details */}
      <div className="px-5 py-4 grid grid-cols-2 gap-3">
        <Row label="Student ID" value={student.rollNumber} />
        <Row label="Roll Number" value={student.rollNumber} />
        <Row label="Branch" value={student.branch} />
        <Row label="Section" value={student.section} />
      </div>

      {/* Faculty */}
      <div className="mx-5 pb-4 border-t border-white/10 pt-4 space-y-3">
        <p className="text-xs tracking-widest text-purple-400 flex items-center gap-1.5">
          <GraduationCap className="w-3.5 h-3.5" /> FACULTY
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Row label="Name" value={student.faculty.name} />
          <Row label="Designation" value={student.faculty.designation} />
        </div>
      </div>

      {/* Socials */}
      <div className="mx-5 mb-5 flex gap-3">
        <Social href={student.github} icon={<Globe className="w-4 h-4" />} label="GitHub" />
        <Social href={student.linkedin} icon={<Briefcase className="w-4 h-4" />} label="LinkedIn" />
      </div>
    </aside>
  );
}

function Row({ label, value }) {
  return (
    <div className="rounded-lg bg-white/5 border border-white/5 px-3 py-2">
      <p className="text-[10px] tracking-widest text-slate-500">{label}</p>
      <p className="font-medium text-sm truncate">{value}</p>
    </div>
  );
}

function Social({ href, icon, label }) {
  if (!isUrl(href)) {
    return <span className="flex items-center gap-1.5 text-xs text-slate-600 border border-white/10 rounded-lg px-3 py-1.5 cursor-not-allowed">{icon}{label}</span>;
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs border border-white/10 rounded-lg px-3 py-1.5 hover:bg-white/10 transition">{icon}{label}</a>
  );
}
