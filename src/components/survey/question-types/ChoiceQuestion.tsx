import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface ChoiceQuestionProps {
  type: "radio" | "checkbox";
  name?: string;
  options: string[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  disabled?: boolean;
  isPreview?: boolean;
}

export function ChoiceQuestion({
  type,
  name,
  options,
  value = type === "radio" ? "" : [],
  onChange,
  disabled,
  isPreview = false,
}: ChoiceQuestionProps) {
  const handleChange = (option: string) => {
    if (!onChange || isPreview) return;

    if (type === "radio") {
      onChange(option);
    } else {
      const currentValue = Array.isArray(value) ? value : [];
      const newValue = currentValue.includes(option)
        ? currentValue.filter((v) => v !== option)
        : [...currentValue, option];
      onChange(newValue);
    }
  };

  const isChecked = (option: string) => {
    if (type === "radio") {
      return value === option;
    }
    return Array.isArray(value) && value.includes(option);
  };

  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type={type}
            id={`${name}-${index}`}
            name={name}
            value={option}
            checked={isChecked(option)}
            onChange={() => handleChange(option)}
            disabled={disabled || isPreview}
            className={cn(
              "h-4 w-4 border-gray-300",
              type === "radio" ? "rounded-full" : "rounded",
              "focus:ring-blue-500",
              isPreview && "cursor-not-allowed opacity-60"
            )}
          />
          <Label 
            htmlFor={`${name}-${index}`} 
            className={cn(
              "text-sm",
              isPreview && "cursor-not-allowed"
            )}
          >
            {option}
          </Label>
        </div>
      ))}
    </div>
  );
}