import { Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { TextQuestion, ChoiceQuestion, RatingQuestion } from "./question-types";
import { QuestionOptions } from "./QuestionOptions";
import { QUESTION_TYPES } from "./question-types/constants";
import { getDefaultValueForType, getDefaultOptionsForType } from "./question-types/utils";
import type { SurveyQuestion } from "@/types/survey";

interface QuestionCardProps {
  question: SurveyQuestion;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<SurveyQuestion>) => void;
  isPreview?: boolean;
  isResponse?: boolean;
}

export function QuestionCard({ 
  question, 
  onDelete, 
  onUpdate,
  isPreview = false,
  isResponse = false
}: QuestionCardProps) {
  const handleTypeChange = (type: SurveyQuestion['type']) => {
    onUpdate(question.id, {
      type,
      options: getDefaultOptionsForType(type),
      value: getDefaultValueForType(type)
    });
  };

  const handleOptionChange = (options: string[]) => {
    onUpdate(question.id, { options });
  };

  const handleValueChange = (value: string | string[] | number) => {
    onUpdate(question.id, { value });
  };

  const renderQuestionInput = () => {
    switch (question.type) {
      case "text":
        return (
          <TextQuestion
            value={question.value as string}
            onChange={handleValueChange}
            placeholder="Enter your answer"
            disabled={isPreview && !isResponse}
          />
        );
      case "multipleChoice":
      case "checkbox":
        return (
          <div className="space-y-4">
            <ChoiceQuestion
              type={question.type === "multipleChoice" ? "radio" : "checkbox"}
              name={`question-${question.id}`}
              options={question.options || []}
              value={question.value}
              onChange={handleValueChange}
              disabled={isPreview && !isResponse}
              isPreview={isPreview && !isResponse}
            />
            {!isPreview && !isResponse && (
              <QuestionOptions
                options={question.options || []}
                onChange={handleOptionChange}
              />
            )}
          </div>
        );
      case "rating":
        return (
          <RatingQuestion
            value={Number(question.value) || undefined}
            onChange={handleValueChange}
            disabled={isPreview && !isResponse}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-4 mb-4">
        {!isPreview && !isResponse && (
          <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
        )}
        {isPreview || isResponse ? (
          <h3 className="flex-1 text-lg font-medium">
            {question.question}
            {question.required && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </h3>
        ) : (
          <Input
            value={question.question}
            onChange={(e) => onUpdate(question.id, { question: e.target.value })}
            className="flex-1 text-lg"
            placeholder="Enter your question"
          />
        )}
        {!isPreview && !isResponse && (
          <>
            <Button
              variant="ghost"
              onClick={() => onUpdate(question.id, { required: !question.required })}
              className={question.required ? "text-red-500" : "text-gray-400"}
            >
              Required
            </Button>
            <Button
              variant="ghost"
              onClick={() => onDelete(question.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      <div className="space-y-4">
        {!isPreview && !isResponse && (
          <Select
            value={question.type}
            onChange={(e) => handleTypeChange(e.target.value as SurveyQuestion['type'])}
            className="w-48"
          >
            {Object.entries(QUESTION_TYPES).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </Select>
        )}
        {renderQuestionInput()}
      </div>
    </div>
  );
}