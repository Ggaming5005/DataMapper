"use client";

import { useState } from "react";

export default function ExportModal({ content = "", onClose }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 [background-color:rgb(0_0_0/0.7)]"
        onClick={onClose}
      />
      <div className="relative w-[90vw] max-w-3xl [background-color:rgb(var(--color-card))] border [border-color:rgb(var(--color-border))] rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="font-medium">ექსპორტი</div>
          <button
            className="[color:rgb(var(--color-foreground)/0.7)] hover:[color:rgb(var(--color-foreground))]"
            onClick={onClose}
          >
            დახურვა
          </button>
        </div>
        <pre className="h-72 overflow-auto [background-color:rgb(0_0_0/0.4)] border [border-color:rgb(var(--color-border))] rounded p-3 text-xs whitespace-pre-wrap">
          {content}
        </pre>
        <div className="mt-3 flex items-center justify-end gap-2">
          <button
            className="px-4 py-2 rounded border [border-color:rgb(var(--color-border))] hover:[background-color:rgb(255_255_255/0.05)]"
            onClick={onClose}
          >
            გაუქმება
          </button>
          <button
            className="px-4 py-2 rounded bg-white text-black font-medium hover:[background-color:rgb(255_255_255/0.9)]"
            onClick={copy}
          >
            {copied ? "გაკოპირებულია" : "კოპირება"}
          </button>
        </div>
      </div>
    </div>
  );
}
