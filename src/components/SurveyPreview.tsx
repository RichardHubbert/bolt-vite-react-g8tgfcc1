import React from 'react';
import { Survey } from '../types/survey';

interface SurveyPreviewProps {
  survey: Survey;
}

export function SurveyPreview({ survey }: SurveyPreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">{survey.title}</h2>
      <p className="text-gray-600 mb-6">{survey.description}</p>

      <div className="space-y-6">
        {survey.questions.map((question) => (
          <div key={question.id} className="border-b pb-4">
            <p className="font-medium mb-2">
              {question.question}
              {question.required && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </p>

            {question.type === 'text' && (
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Your answer"
                disabled
              />
            )}

            {question.type === 'multipleChoice' && (
              <div className="space-y-2">
                {question.options?.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      disabled
                    />
                    <label>{option}</label>
                  </div>
                ))}
              </div>
            )}

            {question.type === 'checkbox' && (
              <div className="space-y-2">
                {question.options?.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input type="checkbox" disabled />
                    <label>{option}</label>
                  </div>
                ))}
              </div>
            )}

            {question.type === 'rating' && (
              <div className="flex gap-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center"
                    disabled
                  >
                    {value}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}