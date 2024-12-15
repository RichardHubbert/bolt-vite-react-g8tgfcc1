import { PlusCircle } from 'lucide-react';
import { SurveyQuestion } from '@/types/survey';
import { QuestionCard } from './QuestionCard';

interface QuestionListProps {
  questions: SurveyQuestion[];
  onAddQuestion: () => void;
  onDeleteQuestion: (id: string) => void;
  onUpdateQuestion: (id: string, updates: Partial<SurveyQuestion>) => void;
}

export function QuestionList({
  questions,
  onAddQuestion,
  onDeleteQuestion,
  onUpdateQuestion,
}: QuestionListProps) {
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          onDelete={onDeleteQuestion}
          onUpdate={onUpdateQuestion}
        />
      ))}
      
      <button
        onClick={onAddQuestion}
        className="w-full mt-4 flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-blue-500 hover:border-blue-500 transition-colors"
      >
        <PlusCircle className="h-5 w-5" />
        Add Question
      </button>
    </div>
  );
}