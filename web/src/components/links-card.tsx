import { Card } from "./ui/card";
import { LinksTable } from "./links-table";

export function LinksCard() {
  return (
    <Card>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          Meus Links
        </h2>

        <LinksTable />
      </div>
    </Card>
  );
}