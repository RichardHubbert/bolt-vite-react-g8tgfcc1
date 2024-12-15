import { SurveyQuestion, Survey } from "@/types/survey";
import { QuestionCard } from "./QuestionCard";

interface SurveyPreviewProps {
  survey: Survey;
}

export function SurveyPreview({ survey }: SurveyPreviewProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-2">{survey.title}</h2>
        <p className="text-gray-600 mb-6">{survey.description}</p>

        <div className="space-y-6">
          {survey.questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onDelete={() => {}}
              onUpdate={() => {}}
              isPreview={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}