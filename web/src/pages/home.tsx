import { CreateLinkCard } from '../components/create-link-card';
import { LinksCard } from '../components/links-card';
import { PageHeader } from '../components/page-header';

export function HomePage() {
  return (
    <main className="min-h-screen bg-surface-canvas px-3 py-8 font-sans text-content-strong md:px-12 lg:px-desktop-x lg:py-[88px]">
      <div className="mx-auto flex w-full max-w-[980px] flex-col gap-6 lg:gap-8">
        <PageHeader />

        <section className="grid grid-cols-1 gap-3 lg:grid-cols-[380px_minmax(0,580px)] lg:items-start lg:gap-5">
          <CreateLinkCard />
          <LinksCard />
        </section>
      </div>
    </main>
  );
}
