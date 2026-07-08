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
      className="
        flex
        items-center
        gap-2
        rounded-lg
        bg-green-600
        px-4
        py-3
        text-white
        transition
        hover:bg-green-700
      "
    >
      <Download size={18} />
      Baixar relatório
    </button>
  );
}
