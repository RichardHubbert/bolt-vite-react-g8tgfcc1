import { Input } from "@/components/ui/input"

interface TextQuestionProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

export function TextQuestion({ value, onChange, placeholder, disabled }: TextQuestionProps) {
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
    />
  )
}