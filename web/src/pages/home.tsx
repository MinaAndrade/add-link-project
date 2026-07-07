import { CreateLinkForm } from "../components/create-link-form";
import { LinksTable } from "../components/links-table";
import { PageHeader } from "../components/page-header";

export function HomePage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 p-8">
      <PageHeader />

      <CreateLinkForm />

      <LinksTable />
    </main>
  );
}