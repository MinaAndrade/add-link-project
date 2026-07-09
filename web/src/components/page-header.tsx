export function PageHeader() {
  return (
    <header className="flex h-6 gap-4 items-center">
      <img
        alt="brev.ly"
        loading="lazy"
        width="26.67"
        height="22.67"
        decoding="async"
        src="/meta/brevly-logo.svg"
      />
      <div className="justify-center text-blue-800 text-lg font-bold font-['Quicksand']">
        brev.ly
      </div>
    </header>
  );
}
