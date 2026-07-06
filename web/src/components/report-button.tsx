import { generateReport } from "../http/generate-report";

export function ReportButton() {
  async function handleDownload() {
    const blob = await generateReport();

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "report.csv";

    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleDownload}
      className="rounded bg-green-600 px-4 py-2 text-white"
    >
      Baixar relatório
    </button>
  );
}