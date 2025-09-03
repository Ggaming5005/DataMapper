# DataMapper

A modern web app to transform Excel/CSV files into structured data. Upload a file, visually map columns to output fields, preview the result live, and export in multiple formats.

## Tech Stack

- Next.js (App Router, React 18)
- Tailwind CSS v4
- XLSX (client-side parsing)

## Features

- Upload Excel/CSV via drag & drop or file picker
- Column discovery and visual mapping UI
- Dynamic fields: add, rename, remove, and re-order by drag & drop
- Live preview with fixed-height scrollable panel
- Export formats: JSON, JSX, SQL, CSV, NDJSON, XML
- Internationalization: English and Georgian with a global language switcher
- Dark, minimal UI with subtle grid background

## Getting Started

```bash
cd DataMapper
npm install
npm run dev
```

Open `http://localhost:3000`.

## Usage

1. Go to Mapper.
2. Upload a `.xls`, `.xlsx`, or `.csv` file.
3. Pick a preset or add custom fields. Drag rows to re-order.
4. Map each field to a detected column.
5. Choose an export format and click Export to copy.

## Project Structure

- `app/` — Next.js pages and layout
- `components/` — UI components (Navbar, UploadBox, MappingPanel, PreviewPane, etc.)
- `app/mapper/page.jsx` — Upload, mapping, preview, and export logic

## Roadmap

- Save/load mapping presets (local storage and JSON import/export)
- Data validation rules per field
- SQL dialect options (MySQL, Postgres, MSSQL)

## License

MIT
