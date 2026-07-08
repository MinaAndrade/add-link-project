import { CreateLinkCard } from '../components/create-link-card';
import { LinksCard } from '../components/links-card';
import { PageHeader } from '../components/page-header';

export function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-10 sm:px-8">
      <PageHeader />

      <CreateLinkCard />

      <LinksCard />
    </main>
  );
}
