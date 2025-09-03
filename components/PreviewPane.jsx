"use client";

export default function PreviewPane({ mode = "json", content = "" }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm [color:rgb(var(--color-foreground)/0.6)]">
          Preview
        </div>
        <div className="text-xs [color:rgb(var(--color-foreground)/0.5)] uppercase tracking-wide">
          {mode}
        </div>
      </div>
      <div className="h-[520px] border [border-color:rgb(var(--color-border))] rounded overflow-hidden">
        <pre className="h-full overflow-auto [background-color:rgb(0_0_0/0.5)] p-3 text-xs leading-relaxed whitespace-pre-wrap">
          {content}
        </pre>
      </div>
    </div>
  );
}
