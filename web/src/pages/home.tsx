import { CreateLinkCard } from '../components/create-link-card';
import { LinksCard } from '../components/links-card';
import { PageHeader } from '../components/page-header';

export function HomePage() {
  return (
    <main className="m-[10px] min-h-[calc(100vh-20px)] bg-white text-[#020817]">
      <div className="flex min-h-[calc(100vh-20px)] flex-col gap-6">
        <PageHeader />

        <section className="grid flex-1 gap-6 xl:grid-cols-[380px_minmax(0,1fr)] xl:items-start">
          <CreateLinkCard />
          <LinksCard />
        </section>
      </div>
    </main>
  );
}
