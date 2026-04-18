const ITEMS = [
  'AI Tools', 'Website Development', 'AI Automation',
  'AI Chatbots', 'LLMs', 'Smart Assistants',
];

export default function MarqueeStrip() {
  // Duplicate for seamless loop
  const allItems = [...ITEMS, ...ITEMS];

  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {allItems.map((item, i) => (
          <span key={i}>
            {item}
            <span className="marquee-dot"> ● </span>
          </span>
        ))}
      </div>
    </div>
  );
}
