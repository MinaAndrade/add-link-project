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
      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-[#020817] transition hover:border-[#ef4444] hover:text-[#ef4444]"
    >
      <Download size={18} />
      Baixar relatorio
    </button>
  );
}
