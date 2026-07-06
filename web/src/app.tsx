import { CreateLinkForm } from "./components/create-link-form";
import { LinksTable } from "./components/links-table";
import { ReportButton } from "./components/report-button";

export function App() {
  return (
    <main className="mx-auto mt-16 max-w-5xl space-y-8">
      <h1 className="text-4xl font-bold">
        Encurtador de Links
      </h1>

      <CreateLinkForm />

      <LinksTable />

      <ReportButton />
    </main>
  );
}