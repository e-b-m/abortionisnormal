// app/about/page.tsx
import Link from "next/link";

const sections = [
  {
    title: "Archiving care",
    body:
      "Every pin is a reminder that abortion is woven into daily life. We collect anonymous notes to show lawmakers, neighbors, and ourselves that care is everywhere.",
  },
  {
    title: "Built together",
    body:
      "The map is open-source. Designers, devs, researchers, and storytellers are all invited. Suggest features, file issues, or submit pull requests.",
  },
  {
    title: "Community rules",
    body:
      "Stories stay anonymous. No hate speech, no outing. We moderate with a harm-reduction lens and remove entries that target or endanger others.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-pink-100 text-rose-900">
      <div className="mx-auto max-w-5xl px-6 py-16 space-y-16 font-sans">
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-600">
            About the project
          </p>
          <h1
            className="text-5xl font-bold uppercase tracking-widest text-rose-800"
            style={{ fontFamily: "var(--font-queer-map)" }}
          >
            Abortion Is Normal
          </h1>
          <p className="text-lg text-rose-600">
            Inspired by Queering the Map, this experiment documents abortion
            stories, rituals, awe, and grief across every geography.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-rose-200 bg-white p-6 shadow-lg"
            >
              <h2 className="text-sm uppercase tracking-[0.3em] text-rose-500">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-rose-700">
                {section.body}
              </p>
            </article>
          ))}
        </section>

        <section className="rounded-[32px] border border-rose-200 bg-white p-8 text-center shadow-2xl">
          <h3
            className="text-3xl font-semibold uppercase tracking-wide text-rose-800"
            style={{ fontFamily: "var(--font-queer-map)" }}
          >
            Ready to add your story?
          </h3>
          <p className="mt-3 text-rose-600">
            Head back to the map, drop a pin, and leave a note. Want to shape
            the platform itself? Jump into the repo and make it better.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-rose-700"
            >
              Launch the map
            </Link>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-rose-300 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-rose-700 transition hover:bg-rose-50"
            >
              View the repo
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
