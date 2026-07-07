import { PageHeader } from "../components/page-header";
import { CreateLinkCard } from "../components/create-link-card";
import { LinksCard } from "../components/links-card";

export function HomePage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 p-8">
      <PageHeader />

      <CreateLinkCard />

      <LinksCard />
    </main>
  );
}