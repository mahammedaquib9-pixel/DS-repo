import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CodeBlock({ code, language = "python" }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  };
  return (
    <div className="relative glass overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 text-xs text-slate-400">
        <span>{language}</span>
        <button onClick={copy} className="flex items-center gap-1 hover:text-white transition">
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {copied ? "Copied" : "Copy Code"}
        </button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto text-slate-300"><code>{code}</code></pre>
    </div>
  );
}
