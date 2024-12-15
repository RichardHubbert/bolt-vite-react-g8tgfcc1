import { Select } from "@/components/ui/select"
import { QuestionType } from "@/types/survey"

interface QuestionTypeSelectProps {
  value: QuestionType
  onChange: (value: QuestionType) => void
}

export function QuestionTypeSelect({ value, onChange }: QuestionTypeSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as QuestionType)}
      className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
    >
      <option value="text">Text</option>
      <option value="multipleChoice">Multiple Choice</option>
      <option value="checkbox">Checkbox</option>
      <option value="rating">Rating</option>
    </select>
  )
}