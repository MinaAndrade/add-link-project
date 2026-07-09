import { CreateLinkForm } from './create-link-form';
import { Card } from './ui/card';

export function CreateLinkCard() {
  return (
    <Card>
      <div className="space-y-6">
        <h2 className="text-lg font-bold leading-6 text-[#1F2025]">
          Novo link
        </h2>

        <CreateLinkForm />
      </div>
    </Card>
  );
}
