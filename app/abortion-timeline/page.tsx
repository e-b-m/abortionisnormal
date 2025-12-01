"use client";

import { useState, FormEvent } from "react";
import CategoryFilter from "../../components/CategoryFilter";
import SiteFooter from "../../components/SiteFooter";

const initialTimeline = [
  {
    era: "1500 BCE - 500 CE",
    title: "Ancient World: “The Herbal Era”",
    body:
      "Egypt, Mesopotamia, Greece, and Rome. Herbal abortifacients such as pennyroyal, silphium, hellebore; honey-acacia pessaries; early mechanical insertion using plant fibres and reeds; medical notes in Egyptian, Greek, and Roman sources.",
  },
  {
    era: "500 - 1500 CE",
    title: "Middle Ages & Islamic Golden Age",
    body:
      "Midwives use rue, savine, mugwort, and ergot. Islamic physicians including Avicenna document herbal compounds. Abortions before “quickening” often interpreted differently in law and doctrine.",
  },
  {
    era: "1500 - 1800",
    title: "Renaissance to Enlightenment",
    body:
      "Apothecaries offer abortive powders; early dilation tools emerge; male physicians expand control over reproductive health; community herbal knowledge is increasingly suppressed.",
  },
  {
    era: "1800 - 1900",
    title: "19th Century: Criminalisation & Control",
    body:
      "Aseptic surgery evolves; dilation & curettage becomes common. Many Western nations criminalise abortion, pushing people toward underground methods and unsafe chemical abortifacients.",
  },
  {
    era: "1900 - 1940",
    title: "Early 20th Century: Clandestine Clinics",
    body:
      "Sterile technique improves; early aspiration prototypes appear. Despite legal bans, clandestine clinics and informal networks continue providing care under significant risk.",
  },
  {
    era: "1940 - 2000",
    title: "Mid-Late 20th Century: Technological Era",
    body:
      "Manual and electric vacuum aspiration become standard. The Karman cannula revolutionises early abortion safety. D&E is developed for later abortions. Mifepristone is approved in 1988, followed by combined medical regimens.",
  },
  {
    era: "2000 - 2025",
    title: "21st Century: Medication & Telemedicine",
    body:
      "Medication abortion becomes a first-line method. Misoprostol-only regimens expand access where restricted. Vacuum aspiration remains standard. Virtual telemedicine and self-managed care grow worldwide.",
  },
];

type TimelineEntry = {
  era: string;
  title: string;
  body: string;
};

export default function AbortionTimelinePage() {
  const [entries, setEntries] = useState<TimelineEntry[]>(initialTimeline);
  const [draft, setDraft] = useState<TimelineEntry>({
    era: "",
    title: "",
    body: "",
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.era.trim() || !draft.title.trim() || !draft.body.trim()) {
      setStatus("Please complete every field before adding to the timeline.");
      return;
    }
    setEntries((prev) => [...prev, draft]);
    setDraft({ era: "", title: "", body: "" });
    setStatus("Entry added. The archive keeps growing.");
  };

  return (
    <main className="min-h-screen bg-pink-100 py-12 text-rose-900">
      <div className="px-6 pb-4">
        <CategoryFilter />
      </div>
      <section
        className="timeline-landscape"
        aria-label="3500 years of abortion methods"
      >
        <header className="timeline-landscape__header">
          <p className="timeline-landscape__tag">Archiving abortion</p>
          <h1 style={{ fontFamily: "var(--font-queer-map)" }}>
            3500 Years of Abortion Methods: An Archival Timeline
          </h1>
          <p>
            Follow a horizontal line of care innovations—from herbal lore to telemedicine—each era holding notes from the people who made abortions possible.
          </p>
        </header>

        <div className="timeline-track" role="list">
          {entries.map((entry, index) => (
            <article
              key={entry.title}
              className={`timeline-node ${
                index % 2 === 0 ? "timeline-node--left" : "timeline-node--right"
              }`}
              role="listitem"
            >
              <span className="timeline-marker" aria-hidden />
              <div className="timeline-card">
                <div className="timeline-era">{entry.era}</div>
                <h3>{entry.title}</h3>
                <p>{entry.body}</p>
              </div>
            </article>
          ))}
        </div>

        <form className="timeline-form" onSubmit={handleSubmit}>
          <p>
            Add another marker to this living archive. Share an era, a title, and a short note about the method or movement.
          </p>
          <div className="timeline-form-grid">
            <label>
              Era / Date range
              <input
                type="text"
                value={draft.era}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, era: event.target.value }))
                }
                placeholder="e.g. 2025 - present"
              />
            </label>
            <label>
              Title
              <input
                type="text"
                value={draft.title}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, title: event.target.value }))
                }
                placeholder="Name this era or technique"
              />
            </label>
            <label className="timeline-form-full">
              Description
              <textarea
                rows={3}
                value={draft.body}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, body: event.target.value }))
                }
                placeholder="Describe what made this moment or method matter…"
              />
            </label>
          </div>
          <button type="submit">Add to the timeline</button>
          {status && <p className="timeline-form-status">{status}</p>}
        </form>
      </section>
      <SiteFooter />
    </main>
  );
}
