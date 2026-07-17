import { getFrontendUrl } from '../lib/frontend-url';

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-canvas px-3 font-sans text-content-strong sm:m-[10px] sm:min-h-[calc(100vh-20px)] sm:bg-white sm:px-4">
      <section className="inline-flex w-full max-w-[366px] -translate-y-10 flex-col items-center justify-center gap-6 rounded-lg bg-surface-card px-5 py-12 sm:max-w-[580px] sm:translate-y-0 sm:px-12 sm:py-16">
        <img
          src="/meta/404.svg"
          alt="404"
          width={194}
          height={85}
          className="h-[72px] w-[164px] object-contain sm:h-20 sm:w-48"
        />

        <h1 className="self-stretch text-center font-sans text-2xl font-bold leading-8 text-content-strong">
          Link não encontrado
        </h1>

        <div className="flex flex-col items-center justify-start gap-1 self-stretch">
          <p className="text-center font-sans text-sm font-semibold leading-[18px] text-content-body">
            O link que você está tentando acessar não existe, foi removido ou é
            uma URL inválida. Saiba mais em{' '}
            <a href={getFrontendUrl('/')} className="text-brand underline">
              brev.ly
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
