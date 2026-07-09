import { getFrontendUrl } from '../lib/frontend-url';

export function NotFoundPage() {
  return (
    <main className="m-[10px] flex min-h-[calc(100vh-20px)] items-center justify-center bg-white px-4 text-[#020817]">
      <section className="inline-flex w-[580px] flex-col items-center justify-center gap-6 rounded-lg bg-gray-50 px-12 py-16">
        <img
          src="/meta/404.svg"
          alt="404"
          width={194}
          height={85}
          className="h-20 w-48 object-contain"
        />

        <h1 className="self-stretch text-center font-['Open_Sans'] text-2xl font-bold leading-8 text-neutral-800">
          Link não encontrado
        </h1>

        <div className="self-stretch flex flex-col items-center justify-start gap-1">
          <p className="text-center font-['Open_Sans'] text-sm font-semibold leading-4 text-zinc-600">
            O link que você está tentando acessar não existe, foi removido ou é
            uma URL inválida. Saiba mais em{' '}
            <a href={getFrontendUrl('/')} className="text-blue-800 underline">
              brev.ly
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
