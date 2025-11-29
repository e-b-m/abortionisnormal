// app/information/page.tsx
import Link from "next/link";

const resourceSections = [
  {
    title: "Immediate support (UK)",
    items: [
      {
        label: "BPAS",
        description:
          "24/7 helpline for appointments, counselling, and aftercare across England, Wales, and Scotland.",
        url: "https://www.bpas.org/",
      },
      {
        label: "MSI Reproductive Choices UK",
        description:
          "Book NHS-funded or private care, access telemedicine pills by post, and speak with nurses.",
        url: "https://www.msichoices.org.uk/",
      },
    ],
  },
  {
    title: "Funding & logistics",
    items: [
      {
        label: "Abortion Support Network",
        description:
          "Practical support, grants, and travel coordination for people in Northern Ireland, the Isle of Man, Malta, Gibraltar, and beyond.",
        url: "https://www.asn.org.uk/",
      },
      {
        label: "Derry Girls Rock / Alliance for Choice",
        description:
          "Grassroots organisers helping people in Northern Ireland navigate appointments, flights, and accommodation.",
        url: "https://allianceforchoiceni.org/",
      },
    ],
  },
  {
    title: "Information & community",
    items: [
      {
        label: "Brook",
        description:
          "Sexual health charity with detailed abortion info tailored to young people in the UK.",
        url: "https://www.brook.org.uk/",
      },
      {
        label: "Abortion Talk",
        description:
          "Peer-led spaces and storytelling projects centring UK abortion experiences.",
        url: "https://www.abortiontalk.com/",
      },
    ],
  },
];

export default function InformationPage() {
  return (
    <main className="min-h-screen bg-pink-100 text-rose-900">
      <div className="mx-auto max-w-5xl px-6 py-16 space-y-10 font-sans">
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-600">
            Information
          </p>
          <h1
            className="text-5xl font-bold uppercase tracking-widest text-rose-800"
            style={{ fontFamily: "var(--font-queer-map)" }}
          >
            Resources for care and organising
          </h1>
          <p className="text-lg text-rose-600">
            Curated links for UK-based support, funding, and storytelling so you
            can quickly find trusted information or share it with someone who
            needs it.
          </p>
        </header>

        <section className="space-y-6">
          {resourceSections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-rose-200 bg-white p-6 shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-rose-800">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4">
                {section.items.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-rose-100 bg-rose-50/60 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-lg font-semibold text-rose-800">
                          {item.label}
                        </p>
                        <p className="text-sm text-rose-600">
                          {item.description}
                        </p>
                      </div>
                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-rose-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-rose-700"
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-rose-200 bg-white p-6 text-center shadow-lg">
          <h3 className="text-2xl font-semibold text-rose-800">
            Want to suggest a resource?
          </h3>
          <p className="mt-2 text-rose-600">
            This list is community-maintained. Drop a link or story via the map,
            open an issue in the repo, or send a pull request with additions.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-rose-700"
            >
              Back to map
            </Link>
            <Link
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-rose-300 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-rose-700 transition hover:bg-rose-50"
            >
              Contribute
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
