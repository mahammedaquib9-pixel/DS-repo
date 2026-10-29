import { useState } from "react";
import { Download, ExternalLink, Maximize, ZoomIn, ZoomOut } from "lucide-react";

export default function PdfViewer({ material }) {
  const [zoom, setZoom] = useState(100);
  if (!material?.url) {
    return (
      <div className="glass p-10 text-center space-y-3">
        <p className="text-4xl">📄</p>
        <h3 className="font-semibold">{material?.title ?? "Material"}</h3>
        <p className="text-sm text-slate-400">Unable to load material. No PDF file has been connected yet. Add a real file URL in <code>data/materials.js</code> to enable preview.</p>
      </div>
    );
  }
  return (
    <div className="glass p-4 space-y-4">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <button onClick={() => setZoom((z) => Math.max(50, z - 10))} className="btn-ghost !px-3 !py-1.5" aria-label="Zoom out"><ZoomOut className="w-4 h-4" /></button>
        <span>{zoom}%</span>
        <button onClick={() => setZoom((z) => Math.min(200, z + 10))} className="btn-ghost !px-3 !py-1.5" aria-label="Zoom in"><ZoomIn className="w-4 h-4" /></button>
        <a href={material.url} download className="btn-ghost !px-3 !py-1.5 flex items-center gap-1"><Download className="w-4 h-4" />Download</a>
        <a href={material.url} target="_blank" rel="noreferrer" className="btn-ghost !px-3 !py-1.5 flex items-center gap-1"><ExternalLink className="w-4 h-4" />Open</a>
        <button onClick={() => window.open(material.url, "_blank")} className="btn-ghost !px-3 !py-1.5 flex items-center gap-1"><Maximize className="w-4 h-4" />Fullscreen</button>
      </div>
      <iframe title={material.title} src={material.url} style={{ width: `${zoom}%`, height: 600 }} className="rounded-xl border border-white/10" />
    </div>
  );
}
