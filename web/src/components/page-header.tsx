export function PageHeader() {
  return (
    <header className="flex h-6 items-center justify-center gap-4 lg:justify-start">
      <img
        alt="brev.ly"
        loading="lazy"
        width="26.67"
        height="22.67"
        decoding="async"
        src="/meta/brevly-logo.svg"
      />
      <div className="justify-center font-brand text-lg font-bold text-brand">
        brev.ly
      </div>
    </header>
  );
}
