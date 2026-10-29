import { experiments } from "./experiments";
import { modules } from "./modules";
import { tools } from "./tools";
import { materials } from "./materials";

export function getAllSearchItems() {
  const items = [];
  experiments.forEach((e) => {
    items.push({ type: "EXPERIMENT", label: e.title, sub: `Experiment ${e.number}`, path: `/experiments/${e.id}/overview`, keywords: `${e.title} ${e.module} ${e.tools.join(" ")}` });
    e.subExperiments.forEach((s) => {
      items.push({ type: "SUB-EXPERIMENT", label: s.title, sub: `${e.title} · ${s.id}`, path: `/experiments/${e.id}/${s.id}`, keywords: `${s.title} ${e.title}` });
    });
  });
  modules.forEach((m) => items.push({ type: "MODULE", label: m.title, sub: `Module ${m.number}`, path: `/modules/${m.id}`, keywords: `${m.title} ${m.topics.join(" ")}` }));
  tools.forEach((t) => items.push({ type: "TOOL", label: t.name, sub: t.category, path: `/tools/${t.id}`, keywords: `${t.name} ${t.category} ${t.description}` }));
  materials.forEach((m) => items.push({ type: "MATERIAL", label: m.title, sub: "Study Material", path: `/materials/${m.id}`, keywords: m.title }));
  return items;
}

export function searchAll(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return getAllSearchItems().filter((item) => `${item.label} ${item.sub} ${item.keywords}`.toLowerCase().includes(q));
}
