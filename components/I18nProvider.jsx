"use client";

import { createContext, useContext, useMemo, useState, useEffect } from "react";

const messages = {
  ka: {
    app_title: "DataMapper",
    nav_home: "საწყისი",
    nav_mapper: "მაიპერი",
    upload_title: "ატვირთვა",
    upload_hint: "გადმოაგდე ან აირჩიე ფაილი",
    upload_support: "მხარდაჭერა: .xls, .xlsx, .csv",
    choose_file: "აირჩიე ფაილი",
    detected_columns: "აღმოჩენილი სვეტები",
    mapping: "მაპინგი",
    clear: "გასუფთავება",
    preview: "პრევიუ",
    export: "ექსპორტი",
    cancel: "გაუქმება",
    copy: "კოპირება",
    copied: "გაკოპირებულია",
    export_close: "დახურვა",
    landing_heading: "Excel → JSON / JSX / SQL",
    landing_desc:
      "ატვირთე Excel ან CSV ფაილი, დააკავშირე სვეტები სასურველ ველებთან და ექსპორტი გააკეთე წამებში.",
    landing_cta: "ატვირთე ფაილი",
    docs: "დოკუმენტაცია",
    note_minimal_prefix: "შენიშვნა: დაიწყე მინიმალური ველებით — ",
    language: "ენა",
    preset: "პრესეტი",
    add_field: "ველის დამატება",
    field_name_placeholder: "ველის სახელი",
    remove: "წაშლა",
  },
  en: {
    app_title: "DataMapper",
    nav_home: "Home",
    nav_mapper: "Mapper",
    upload_title: "Upload",
    upload_hint: "Drag & drop or choose a file",
    upload_support: "Supported: .xls, .xlsx, .csv",
    choose_file: "Choose file",
    detected_columns: "Detected columns",
    mapping: "Mapping",
    clear: "Clear",
    preview: "Preview",
    export: "Export",
    cancel: "Cancel",
    copy: "Copy",
    copied: "Copied",
    export_close: "Close",
    landing_heading: "Excel → JSON / JSX / SQL",
    landing_desc:
      "Upload an Excel or CSV file, map columns to fields, and export in seconds.",
    landing_cta: "Upload file",
    docs: "Docs",
    note_minimal_prefix: "Note: start with minimal fields — ",
    language: "Language",
    preset: "Preset",
    add_field: "Add field",
    field_name_placeholder: "Field name",
    remove: "Remove",
  },
};

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLang] = useState("en");
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);
  const t = useMemo(() => {
    return (key) => messages[lang]?.[key] ?? key;
  }, [lang]);
  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
