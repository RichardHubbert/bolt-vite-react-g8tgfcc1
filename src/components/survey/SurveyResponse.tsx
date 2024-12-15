import { QuestionCard } from './QuestionCard';
import type { Survey } from '@/types/survey';

interface SurveyResponseProps {
  survey: Survey;
  responses: Record<string, any>;
  onChange: (questionId: string, value: any) => void;
}

export function SurveyResponse({ survey, responses, onChange }: SurveyResponseProps) {
  const getQuestionWithResponse = (question: Survey['questions'][0]) => ({
    ...question,
    value: responses[question.id]
  });

  return (
    <div className="space-y-6">
      {survey.questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={getQuestionWithResponse(question)}
          onDelete={() => {}}
          onUpdate={(id, updates) => {
            if ('value' in updates) {
              onChange(id, updates.value);
            }
          }}
          isResponse={true}
        />
      ))}
    </div>
  );
}