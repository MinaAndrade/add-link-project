import { useQuery } from '@tanstack/react-query';
import { Download } from 'lucide-react';

import { fetchLinks } from '../http/fetch-links';
import { generateReport } from '../http/generate-report';

export function ReportButton() {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['links'],
    queryFn: fetchLinks,
  });
  const isDisabled = isLoading || Boolean(error) || data.length === 0;

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
      disabled={isDisabled}
      className="flex h-8 items-center gap-1.5 rounded bg-surface-canvas px-2 text-xs font-semibold leading-4 text-content-body transition hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Download size={16} />
      Baixar CSV
    </button>
  );
}
