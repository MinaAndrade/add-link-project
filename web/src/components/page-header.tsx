import { getApiUrl } from '../lib/api-url';

export function PageHeader() {
  return (
    <header className="flex w-full flex-col gap-6 rounded-lg border border-slate-200 bg-white px-6 py-6 shadow-sm lg:px-8">
      <nav className="flex items-center justify-between gap-4">
        <img
          alt="brevly Logo"
          loading="lazy"
          width="80"
          height="30"
          decoding="async"
          data-nimg="1"
          style={{ color: 'transparent' }}
          src="/meta/brevly-logo.svg"
        />

        <a
          href={getApiUrl('/docs')}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-[#020817] transition hover:border-[#ef4444] hover:text-[#ef4444]"
        >
          API Docs
        </a>
      </nav>

      <div className="max-w-4xl space-y-3">
        <p className="text-sm font-semibold uppercase text-[#ef4444]">
          Encurtador de links
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-[#020817] sm:text-5xl">
          Links curtos, simples e rastreáveis.
        </h1>

        <p className="max-w-3xl text-base leading-7 text-[#64748B]">
          Crie URLs encurtadas, acompanhe os acessos de cada link e exporte
          relatórios em CSV com uma experiência direta e organizada.
        </p>
      </div>
    </header>
  );
}
