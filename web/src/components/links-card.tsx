import { LinksTable } from './links-table';
import { ReportButton } from './report-button';
import { Card } from './ui/card';

export function LinksCard() {
  return (
    <Card>
      <div className="flex flex-col gap-5">
        <div className="flex min-h-8 items-center justify-between gap-4">
          <h2 className="text-lg font-bold leading-6 text-[#1F2025]">
            Meus links
          </h2>

          <ReportButton />
        </div>

        <LinksTable />
      </div>
    </Card>
  );
}
