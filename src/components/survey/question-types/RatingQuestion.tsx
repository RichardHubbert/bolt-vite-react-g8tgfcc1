import { Button } from "@/components/ui/button"

interface RatingQuestionProps {
  value?: number
  onChange?: (value: number) => void
  disabled?: boolean
  maxRating?: number
}

export function RatingQuestion({ 
  value, 
  onChange, 
  disabled, 
  maxRating = 5 
}: RatingQuestionProps) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: maxRating }, (_, i) => i + 1).map((rating) => (
        <Button
          key={rating}
          variant={value === rating ? "primary" : "outline"}
          size="sm"
          onClick={() => onChange?.(rating)}
          disabled={disabled}
          className="w-10 h-10"
        >
          {rating}
        </Button>
      ))}
    </div>
  )
}