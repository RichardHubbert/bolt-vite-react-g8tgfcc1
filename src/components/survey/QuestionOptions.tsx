import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, X } from "lucide-react";

interface QuestionOptionsProps {
  options: string[];
  onChange: (options: string[]) => void;
}

export function QuestionOptions({ options, onChange }: QuestionOptionsProps) {
  // Track which options have been focused/edited
  const [touchedOptions, setTouchedOptions] = useState<Set<number>>(new Set());

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    onChange(newOptions);
  };

  const handleOptionFocus = (index: number) => {
    if (!touchedOptions.has(index)) {
      setTouchedOptions(new Set([...touchedOptions, index]));
      // Clear default text only on first focus
      if (options[index].startsWith('Option ')) {
        handleOptionChange(index, '');
      }
    }
  };

  const addOption = () => {
    const newIndex = options.length;
    onChange([...options, `Option ${newIndex + 1}`]);
  };

  const removeOption = (index: number) => {
    if (options.length > 1) {
      onChange(options.filter((_, i) => i !== index));
      // Update touched options after removal
      const newTouched = new Set([...touchedOptions].filter(i => i !== index));
      setTouchedOptions(newTouched);
    }
  };

  return (
    <div className="space-y-2">
      {options.map((option, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            onFocus={() => handleOptionFocus(index)}
            placeholder={`Option ${index + 1}`}
          />
          {options.length > 1 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeOption(index)}
              className="text-gray-500 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addOption}
        className="mt-2"
      >
        <PlusCircle className="w-4 h-4 mr-2" />
        Add Option
      </Button>
    </div>
  );
}