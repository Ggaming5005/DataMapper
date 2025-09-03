"use client";

import { useI18n } from "@/components/I18nProvider";

export default function ColumnList({ columns = [], selectedColumn, onSelect }) {
  const { t } = useI18n();
  return (
    <div className="space-y-2">
      <div className="text-sm [color:rgb(var(--color-foreground)/0.6)]">
        {t("detected_columns")}
      </div>
      <ul className="space-y-1">
        {columns.map((col) => (
          <li key={col}>
            <button
              className={`w-full text-left px-3 py-2 rounded border ${
                selectedColumn === col
                  ? "[border-color:rgb(var(--color-foreground))] [background-color:rgb(255_255_255/0.1)]"
                  : "[border-color:rgb(var(--color-border))] hover:[background-color:rgb(255_255_255/0.05)]"
              }`}
              onClick={() => onSelect?.(col)}
            >
              {col}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
