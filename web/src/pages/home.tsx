import { CreateLinkCard } from '../components/create-link-card';
import { LinksCard } from '../components/links-card';
import { PageHeader } from '../components/page-header';

export function HomePage() {
  return (
    <main className="min-h-screen bg-[#E4E6EC] px-6 py-12 text-[#1F2025] md:px-12 lg:px-[14.1%] lg:py-[88px]">
      <div className="mx-auto flex w-full max-w-[980px] flex-col gap-8">
        <PageHeader />

        <section className="grid gap-5 lg:grid-cols-[380px_minmax(0,580px)] lg:items-start">
          <CreateLinkCard />
          <LinksCard />
        </section>
      </div>
    </main>
  );
}
