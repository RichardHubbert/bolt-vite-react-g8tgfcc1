import React from 'react';
import { Trash2, GripVertical, AlertCircle } from 'lucide-react';
import { SurveyQuestion, QuestionType } from '../types/survey';

interface QuestionCardProps {
  question: SurveyQuestion;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedQuestion: Partial<SurveyQuestion>) => void;
}

export function QuestionCard({ question, onDelete, onUpdate }: QuestionCardProps) {
  const handleTypeChange = (type: QuestionType) => {
    onUpdate(question.id, { type });
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(question.options || [])];
    newOptions[index] = value;
    onUpdate(question.id, { options: newOptions });
  };

  const addOption = () => {
    const newOptions = [...(question.options || []), ''];
    onUpdate(question.id, { options: newOptions });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GripVertical className="text-gray-400 cursor-move" size={20} />
          <input
            type="text"
            value={question.question}
            onChange={(e) => onUpdate(question.id, { question: e.target.value })}
            className="text-lg font-medium bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 w-full"
            placeholder="Enter your question"
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onUpdate(question.id, { required: !question.required })}
            className={`flex items-center gap-1 text-sm ${
              question.required ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            <AlertCircle size={16} />
            Required
          </button>
          <button
            onClick={() => onDelete(question.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <select
        value={question.type}
        onChange={(e) => handleTypeChange(e.target.value as QuestionType)}
        className="mb-4 bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-sm"
      >
        <option value="text">Text</option>
        <option value="multipleChoice">Multiple Choice</option>
        <option value="checkbox">Checkbox</option>
        <option value="rating">Rating</option>
      </select>

      {(question.type === 'multipleChoice' || question.type === 'checkbox') && (
        <div className="space-y-2">
          {question.options?.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder={`Option ${index + 1}`}
              />
            </div>
          ))}
          <button
            onClick={addOption}
            className="text-blue-500 text-sm hover:text-blue-600"
          >
            + Add Option
          </button>
        </div>
      )}
    </div>
  );
}