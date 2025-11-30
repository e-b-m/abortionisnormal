// app/about/page.tsx
import Link from "next/link";

const sections = [
  {
    title: "Archiving care",
    body:
      "Every pin is a reminder that abortion is a part of daily life. We collect anonymous notes to show lawmakers, neighbours and ourselves that care is everywhere. Now more than ever compassion is crucial. Though our opinions may differ the right to bodily autonomy is a fundamental.",
  },
  {
    title: "Built together",
    body:
      "The map is open-source. Designers, devs, researchers and storytellers are all invited. Suggest features, file issues, or submit pull requests.",
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
          <Link href="/" aria-label="Back to the map">
            <h1
              className="text-5xl font-bold uppercase tracking-widest text-rose-800 transition hover:text-rose-600"
              style={{ fontFamily: "var(--font-queer-map)" }}
            >
              Abortion Is Normal
            </h1>
          </Link>
        </header>

        <section className="rounded-3xl border border-rose-200 bg-white p-6 text-left shadow-lg">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-500">
            About the maker
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-rose-800">
            A personal project rooted in care
          </h2>
          <p className="mt-4 text-rose-600">
            I&apos;m a storyteller, writer and visual communicator who had an
            abortion in 2022 at the height of Roe v. Wade. It remains one of the
            most difficult choices I have had to make and one that I didn&apos;t
            make lightly, yet I struggled for a long time with acknowledging
            this decision. Like many who experience or encounter abortion it is
            complex, layered and is not always easy to prepare for. Community
            support matters. Building this map is my way of providing a space
            for archiving stories, thoughts, and learnings on the subject of
            abortion and women&apos;s health surrounding it. It&apos;s to
            catalogue history and information to inform and empower generations
            to come—most importantly to destigmatise and encourage discourse.
            It&apos;s part art piece, part resource, and part love letter to
            everyone who has needed an abortion or helped someone through one.
          </p>
          <p className="mt-3 text-rose-600">
            Outside of this project, I host teach-ins, collaborate with mutual
            aid groups, and document oral histories so our stories don’t get
            erased. If you want to collaborate or just say hi, reach out through
            the feedback form or reach me via the Contact page. 
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-rose-200 bg-white p-6 shadow-lg"
            >
              <h2 className="text-sm uppercase tracking-[0.3em] text-rose-500">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-rose-600">
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
