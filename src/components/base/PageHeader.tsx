export default function PageHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="bg-primary-800 text-background-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <p className="text-accent-300 font-semibold uppercase tracking-wider text-sm mb-2">{eyebrow}</p>
        <h1 className="text-3xl md:text-5xl font-bold mb-3">{title}</h1>
        <p className="text-foreground-100 max-w-2xl md:text-lg">{text}</p>
      </div>
    </section>
  );
}