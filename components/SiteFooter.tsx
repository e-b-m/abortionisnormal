export default function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-rose-200 bg-rose-50/60 px-6 py-6 text-center text-xs uppercase tracking-[0.35em] text-rose-600">
      <p className="mb-4">
        Abortion is normal · Built with care ·{" "}
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Contribute
        </a>
      </p>
      <div>
        <p className="mb-2 text-[0.7rem]">Information & resources</p>
        <nav className="flex flex-wrap justify-center gap-3 text-[0.6rem] tracking-[0.25em]">
          <a
            href="/information"
            className="text-rose-700 underline decoration-dotted underline-offset-4"
          >
            Information
          </a>
        </nav>
      </div>
    </footer>
  );
}
