export default function Footer() {
  return (
    <footer className="py-10 border-t [border-color:rgb(var(--color-border)/0.6)] text-center [color:rgb(var(--color-foreground)/0.6)] text-sm">
      <div className="max-w-6xl mx-auto px-6">
        © {new Date().getFullYear()} DataMapper by gio
      </div>
    </footer>
  );
}
