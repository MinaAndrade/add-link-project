import { LinksTable } from './links-table';
import { ReportButton } from './report-button';
import { Card } from './ui/card';

export function LinksCard() {
  return (
    <Card>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#020817]">Links</h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Gerencie seus links encurtados e acompanhe os acessos.
            </p>
          </div>

          <ReportButton />
        </div>

        <LinksTable />
      </div>
    </Card>
  );
}
