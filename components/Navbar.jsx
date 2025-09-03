"use client";

import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
  return (
    <header className="px-6 py-4 border-b [border-color:rgb(var(--color-border)/0.6)] sticky top-0 z-50 backdrop-blur [background-color:rgb(var(--color-background)/0.6)]">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="font-semibold">
          {t("app_title")}
        </Link>
        <nav className="flex items-center gap-6 text-sm [color:rgb(var(--color-foreground)/0.7)]">
          <Link className="hover:[color:rgb(var(--color-foreground))]" href="/">
            {t("nav_home")}
          </Link>
          <Link
            className="hover:[color:rgb(var(--color-foreground))]"
            href="/mapper"
          >
            {t("nav_mapper")}
          </Link>
          <div className="flex items-center gap-2">
            <label className="text-xs [color:rgb(var(--color-foreground)/0.6)]">
              {t("language")}:
            </label>
            <select
              className="border rounded px-2 py-1 bg-transparent [border-color:rgb(var(--color-border))]"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              <option value="ka">ქართული</option>
              <option value="en">English</option>
            </select>
          </div>
        </nav>
      </div>
    </header>
  );
}
