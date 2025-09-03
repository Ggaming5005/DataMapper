import "./globals.css";
import { Inter } from "next/font/google";
import { I18nProvider } from "@/components/I18nProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DataMapper — Excel to JSON/JSX/SQL",
  description: "Upload Excel/CSV, map columns, and export to JSON/JSX/SQL.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-grid`}>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
