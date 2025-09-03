export default function GridBackground({ children }) {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
