export function FAQ({ items }: { items: Array<{ question: string; answer: string }> }) {
  if (items.length === 0) return null;

  return (
    <section className="px-4 py-8 container mx-auto border-t border-edge/50">
      <h2 className="text-xl font-semibold text-fg mb-6">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <details key={i} className="group border border-edge rounded-md">
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-fg font-medium hover:bg-elevated/30 transition-colors rounded-md">
              {item.question}
              <span className="text-fg-muted ml-4 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
            </summary>
            <div className="px-5 pb-4 text-fg-secondary text-base leading-relaxed">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
