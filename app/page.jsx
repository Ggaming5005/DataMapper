"use client";

import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  const { t } = useI18n();
  return (
    <main className="min-h-screen bg-grid">
      <Navbar />
      <div className="relative z-10">
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {t("landing_heading")}
          </h1>
          <p className="mt-4 [color:rgb(var(--color-foreground)/0.7)] text-lg md:text-xl">
            {t("landing_desc")}
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/mapper"
              className="px-5 py-3 rounded-md bg-white text-black font-medium hover:[background-color:rgb(255_255_255/0.9)] transition"
            >
              {t("landing_cta")}
            </Link>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-md border [border-color:rgb(var(--color-border))] hover:[background-color:rgb(255_255_255/0.05)] transition"
            >
              {t("docs")}
            </a>
          </div>
        </section>
        <Footer />
      </div>
    </main>
  );
}
