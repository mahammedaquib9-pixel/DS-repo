import { experiments } from "../data/experiments";

const KEY = "mbu_experiment_edits";

export function getExperimentEdits() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveExperimentEdit(edited) {
  const edits = getExperimentEdits();
  edits[edited.id] = edited;
  localStorage.setItem(KEY, JSON.stringify(edits));
}

export function resetExperimentEdit(id) {
  const edits = getExperimentEdits();
  delete edits[id];
  localStorage.setItem(KEY, JSON.stringify(edits));
}

export function resetAllExperimentEdits() {
  localStorage.removeItem(KEY);
}

// Merge user edits over the default structured data.
export function getExperiments() {
  const edits = getExperimentEdits();
  return experiments.map((e) => (edits[e.id] ? { ...e, ...edits[e.id], overview: e.overview, subExperiments: edits[e.id].subExperiments ?? e.subExperiments } : e));
}

export function getExperiment(id) {
  return getExperiments().find((e) => e.id === id);
}
