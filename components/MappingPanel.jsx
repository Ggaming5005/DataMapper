"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/I18nProvider";

const PRESETS = {
  minimal: ["id", "name", "email"],
  person: ["id", "firstName", "lastName", "email", "age", "country"],
};

export default function MappingPanel({
  columns = [],
  mapping = {},
  setMapping,
  outputFields = [],
}) {
  const { t } = useI18n();
  const [fields, setFields] = useState(
    outputFields.length ? outputFields : PRESETS.minimal
  );
  const [newField, setNewField] = useState("");
  const available = useMemo(() => columns || [], [columns]);
  const [dragIndex, setDragIndex] = useState(null);

  const applyPreset = (key) => {
    const next = PRESETS[key] || [];
    setFields(next);
    const nextMap = {};
    next.forEach((f) => (nextMap[f] = mapping[f] || ""));
    setMapping?.(nextMap);
  };

  const addField = () => {
    const name = newField.trim();
    if (!name || fields.includes(name)) return;
    const next = [...fields, name];
    setFields(next);
    setMapping?.({ ...mapping, [name]: "" });
    setNewField("");
  };

  const removeField = (name) => {
    const next = fields.filter((f) => f !== name);
    setFields(next);
    const { [name]: _, ...rest } = mapping;
    setMapping?.(rest);
  };

  const onDragStart = (index) => setDragIndex(index);
  const onDragOver = (e, overIndex) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === overIndex) return;
    const next = [...fields];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(overIndex, 0, moved);
    setFields(next);
    setDragIndex(overIndex);
  };
  const onDragEnd = () => setDragIndex(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm [color:rgb(var(--color-foreground)/0.6)]">
          {t("mapping")}
        </div>
        <button
          className="text-xs [color:rgb(var(--color-foreground)/0.7)] hover:[color:rgb(var(--color-foreground))] underline"
          onClick={() => setMapping?.({})}
        >
          {t("clear")}
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <label className="[color:rgb(var(--color-foreground)/0.6)]">
          {t("preset")}:
        </label>
        <select
          className="border rounded px-2 py-1 bg-transparent [border-color:rgb(var(--color-border))]"
          onChange={(e) => applyPreset(e.target.value)}
        >
          <option value="minimal">minimal</option>
          <option value="person">person</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          className="flex-1 bg-transparent border [border-color:rgb(var(--color-border))] rounded px-3 py-2 text-sm"
          placeholder={t("field_name_placeholder")}
          value={newField}
          onChange={(e) => setNewField(e.target.value)}
        />
        <button
          className="px-3 py-2 rounded border [border-color:rgb(var(--color-border))] hover:[background-color:rgb(255_255_255/0.05)] text-sm"
          onClick={addField}
        >
          {t("add_field")}
        </button>
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={`f-${index}`}
            className="grid grid-cols-6 gap-2 items-center"
            draggable
            onDragStart={() => onDragStart(index)}
            onDragOver={(e) => onDragOver(e, index)}
            onDragEnd={onDragEnd}
          >
            <input
              className="col-span-2 bg-transparent border [border-color:rgb(var(--color-border))] rounded px-3 py-2 text-sm"
              value={field}
              onChange={(e) => {
                const nextName = e.target.value;
                setFields((prev) =>
                  prev.map((f, i) => (i === index ? nextName : f))
                );
                const { [field]: oldVal, ...rest } = mapping;
                setMapping?.({ ...rest, [nextName]: oldVal });
              }}
            />
            <select
              className="col-span-3 bg-transparent border [border-color:rgb(var(--color-border))] rounded px-3 py-2 text-sm focus:outline-none focus:[border-color:rgb(var(--color-foreground))]"
              value={mapping[field] || ""}
              onChange={(e) =>
                setMapping?.({ ...mapping, [field]: e.target.value })
              }
            >
              <option value="">—</option>
              {available.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button
              className="text-xs px-2 py-2 rounded border [border-color:rgb(var(--color-border))] hover:[background-color:rgb(255_255_255/0.05)]"
              onClick={() => removeField(field)}
            >
              {t("remove")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
