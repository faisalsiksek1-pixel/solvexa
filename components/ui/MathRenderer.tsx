"use client";

import { useEffect, useRef, useState } from "react";

interface MathRendererProps {
  latex: string;
  display?: boolean;
  className?: string;
}

export function MathRenderer({ latex, display = false, className }: MathRendererProps) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    import("katex").then((katex) => {
      try {
        const rendered = katex.default.renderToString(latex, {
          displayMode: display,
          throwOnError: false,
          strict: false,
          trust: true,
        });
        setHtml(rendered);
      } catch {
        setHtml(`<span style="font-family:monospace">${latex}</span>`);
      }
    });
  }, [latex, display]);

  if (!html) {
    return <span className={`font-mono text-sm text-slate-600 ${className ?? ""}`}>{latex}</span>;
  }

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
