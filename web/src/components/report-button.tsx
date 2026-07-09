import { Download } from 'lucide-react';

import { generateReport } from '../http/generate-report';

export function ReportButton() {
  async function handleDownload() {
    const reportUrl = await generateReport();

    const link = document.createElement('a');

    link.href = reportUrl;
    link.download = 'links-report.csv';
    link.click();
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="flex h-8 items-center gap-1.5 rounded bg-[#E4E6EC] px-2 text-xs font-semibold leading-4 text-[#4D505C] transition hover:bg-[#D8DBE4] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Download size={16} />
      Baixar CSV
    </button>
  );
}
