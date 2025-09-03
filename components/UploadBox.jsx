"use client";

import { useCallback, useRef, useState } from "react";
import { useI18n } from "@/components/I18nProvider";

export default function UploadBox({ onFile }) {
  const { t } = useI18n();
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const file = e.dataTransfer?.files?.[0];
      if (file) onFile?.(file);
    },
    [onFile]
  );

  const onChange = useCallback(
    (e) => {
      const file = e.target?.files?.[0];
      if (file) onFile?.(file);
    },
    [onFile]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      className={`border-2 border-dashed rounded-lg p-6 text-center transition ${
        isDragging
          ? "[border-color:rgb(255_255_255/0.8)] [background-color:rgb(255_255_255/0.05)]"
          : "[border-color:rgb(var(--color-border))] hover:[background-color:rgb(255_255_255/0.05)]"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".xls,.xlsx,.csv"
        className="hidden"
        onChange={onChange}
      />
      <div className="text-lg font-medium">{t("upload_hint")}</div>
      <div className="mt-2 text-sm [color:rgb(var(--color-foreground)/0.6)]">
        {t("upload_support")}
      </div>
      <button
        className="mt-4 px-4 py-2 rounded-md bg-white text-black text-sm font-medium hover:[background-color:rgb(255_255_255/0.9)]"
        onClick={() => inputRef.current?.click()}
      >
        {t("choose_file")}
      </button>
    </div>
  );
}
