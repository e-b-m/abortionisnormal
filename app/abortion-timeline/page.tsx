const timeline = [
  {
    era: "1500 BCE – 500 CE",
    title: "Ancient World – “The Herbal Era”",
    body:
      "Egypt, Mesopotamia, Greece, and Rome. Herbal abortifacients such as pennyroyal, silphium, hellebore; honey–acacia pessaries; early mechanical insertion using plant fibres and reeds; medical notes in Egyptian, Greek, and Roman sources.",
  },
  {
    era: "500 – 1500 CE",
    title: "Middle Ages & Islamic Golden Age",
    body:
      "Midwives use rue, savine, mugwort, and ergot. Islamic physicians including Avicenna document herbal compounds. Abortions before “quickening” often interpreted differently in law and doctrine.",
  },
  {
    era: "1500 – 1800",
    title: "Renaissance to Enlightenment",
    body:
      "Apothecaries offer abortive powders; early dilation tools emerge; male physicians expand control over reproductive health; community herbal knowledge is increasingly suppressed.",
  },
  {
    era: "1800 – 1900",
    title: "19th Century – Criminalisation & Control",
    body:
      "Aseptic surgery evolves; dilation & curettage becomes common. Many Western nations criminalise abortion, pushing people toward underground methods and unsafe chemical abortifacients.",
  },
  {
    era: "1900 – 1940",
    title: "Early 20th Century – Clandestine Clinics",
    body:
      "Sterile technique improves; early aspiration prototypes appear. Despite legal bans, clandestine clinics and informal networks continue providing care under significant risk.",
  },
  {
    era: "1940 – 2000",
    title: "Mid–Late 20th Century – Technological Era",
    body:
      "Manual and electric vacuum aspiration become standard. The Karman cannula revolutionises early abortion safety. D&E is developed for later abortions. Mifepristone is approved in 1988, followed by combined medical regimens.",
  },
  {
    era: "2000 – 2025",
    title: "21st Century – Medication & Telemedicine",
    body:
      "Medication abortion becomes a first-line method. Misoprostol-only regimens expand access where restricted. Vacuum aspiration remains standard. Virtual telemedicine and self-managed care grow worldwide.",
  },
];

export default function AbortionTimelinePage() {
  return (
    <main className="min-h-screen bg-pink-100 py-12 text-rose-900">
      <section
        className="timeline-landscape"
        aria-label="3500 years of abortion methods"
      >
        <header className="timeline-landscape__header">
          <p className="timeline-landscape__tag">Archiving abortion</p>
          <h1>
            3500 Years of Abortion Methods: An Archival Timeline
          </h1>
          <p>
            Follow a horizontal line of care innovations—from herbal lore to telemedicine—each era holding notes from the people who made abortions possible.
          </p>
        </header>

        <div className="timeline-track">
          {timeline.map((entry, index) => (
            <article key={entry.title} className="timeline-card">
              <span className="timeline-dot" aria-hidden />
              {index < timeline.length - 1 && (
                <span className="timeline-connector" aria-hidden />
              )}
              <div className="timeline-era">{entry.era}</div>
              <h3>{entry.title}</h3>
              <p>{entry.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
