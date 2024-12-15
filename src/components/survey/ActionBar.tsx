import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SaveButton } from "@/components/ui/save-button";

interface ActionBarProps {
  onSave: () => void;
  onCancel: () => void;
  isSaving?: boolean;
}

export function ActionBar({ onSave, onCancel, isSaving }: ActionBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isSaving}
          className="flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          Cancel
        </Button>
        <SaveButton
          onClick={onSave}
          saving={isSaving}
          className="min-w-[100px]"
        >
          Save Survey
        </SaveButton>
      </div>
    </div>
  );
}