"use client";

import { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UploadBox from "@/components/UploadBox";
import ColumnList from "@/components/ColumnList";
import MappingPanel from "@/components/MappingPanel";
import PreviewPane from "@/components/PreviewPane";
import ExportModal from "@/components/ExportModal";
import { useI18n } from "@/components/I18nProvider";

const DEFAULT_FIELDS = ["id", "name", "email"];

export default function MapperPage() {
  const { t } = useI18n();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [mapping, setMapping] = useState({});
  const [mode, setMode] = useState("json"); // json | jsx | sql | csv | ndjson | xml
  const [showExport, setShowExport] = useState(false);

  const handleFile = async (file) => {
    const buffer = await file.arrayBuffer();
    const wb = XLSX.read(buffer, { type: "array" });
    const first = wb.SheetNames[0];
    const sheet = wb.Sheets[first];
    const json = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    setRows(json);
    const cols = Object.keys(json[0] || {});
    setColumns(cols);
    setSelectedColumn(cols[0] || "");
  };

  const mappedRows = useMemo(() => {
    if (!rows.length) return [];
    return rows.map((r) => {
      const obj = {};
      Object.keys(mapping).forEach((out) => {
        const src = mapping[out];
        obj[out] = src ? r[src] : "";
      });
      return obj;
    });
  }, [rows, mapping]);

  const toCSV = (arr) => {
    const keys = Object.keys(mapping);
    if (!keys.length) return "";
    const header = keys.join(",");
    const lines = arr.map((row) =>
      keys.map((k) => `"${String(row[k]).replace(/"/g, '""')}"`).join(",")
    );
    return [header, ...lines].join("\n");
  };

  const toNDJSON = (arr) => arr.map((r) => JSON.stringify(r)).join("\n");

  const toXML = (arr) => {
    const keys = Object.keys(mapping);
    const rowsXml = arr
      .map(
        (r) =>
          `<row>` +
          keys
            .map(
              (k) =>
                `<${k}>${String(r[k])
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")}</${k}>`
            )
            .join("") +
          `</row>`
      )
      .join("");
    return `<rows>${rowsXml}</rows>`;
  };

  const previewContent = useMemo(() => {
    const sample = mappedRows.slice(0, 20);
    if (mode === "json") return JSON.stringify(sample, null, 2);
    if (mode === "jsx")
      return sample
        .map(
          (r, i) =>
            `<Row key={${i}} ${Object.entries(r)
              .map(([k, v]) => `${k}={${JSON.stringify(v)}}`)
              .join(" ")} />`
        )
        .join("\n");
    if (mode === "sql") {
      const keys = Object.keys(mapping);
      if (!keys.length) return "";
      const values = sample
        .map(
          (r) =>
            `(${keys
              .map((k) => `'${String(r[k]).replace(/'/g, "''")}'`)
              .join(", ")})`
        )
        .join(",\n");
      return `INSERT INTO table_name (${keys.join(", ")}) VALUES\n${values};`;
    }
    if (mode === "csv") return toCSV(sample);
    if (mode === "ndjson") return toNDJSON(sample);
    if (mode === "xml") return toXML(sample);
    return "";
  }, [mode, mappedRows, mapping]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-3 space-y-4">
          <div className="text-xl font-semibold">{t("upload_title")}</div>
          <UploadBox onFile={handleFile} />
          <div className="pt-2">
            <ColumnList
              columns={columns}
              selectedColumn={selectedColumn}
              onSelect={setSelectedColumn}
            />
          </div>
        </section>
        <section className="lg:col-span-5 space-y-4">
          <div className="text-xl font-semibold">{t("mapping")}</div>
          <MappingPanel
            columns={columns}
            mapping={mapping}
            setMapping={setMapping}
            outputFields={DEFAULT_FIELDS}
          />
          <div className="text-xs [color:rgb(var(--color-foreground)/0.6)]">
            {t("note_minimal_prefix")}
            {DEFAULT_FIELDS.join(", ")}
          </div>
        </section>
        <section className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold">{t("preview")}</div>
            <div className="flex items-center gap-2">
              <select
                className="bg-transparent border [border-color:rgb(var(--color-border))] rounded px-3 py-2 text-sm appearance-none focus:[background-color:rgb(0_0_0/0.2)]"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              >
                <option value="json">JSON</option>
                <option value="jsx">JSX</option>
                <option value="sql">SQL</option>
                <option value="csv">CSV</option>
                <option value="ndjson">NDJSON</option>
                <option value="xml">XML</option>
              </select>
              <button
                className="px-3 py-2 rounded bg-white text-black text-sm font-medium"
                onClick={() => setShowExport(true)}
              >
                {t("export")}
              </button>
            </div>
          </div>
          <PreviewPane mode={mode} content={previewContent} />
        </section>
      </main>
      <Footer />

      {showExport && (
        <ExportModal
          content={previewContent}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  );
}
