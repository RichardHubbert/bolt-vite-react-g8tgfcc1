import { useState, useCallback } from 'react';
import type { Survey, SurveyQuestion } from '@/types/survey';
import { generateId } from '@/lib/utils';

const DEFAULT_SURVEY: Survey = {
  title: 'Untitled Survey',
  description: 'Survey description',
  questions: [],
};

export function useSurveyForm(initialSurvey: Survey = DEFAULT_SURVEY) {
  const [survey, setSurvey] = useState<Survey>(initialSurvey);
  const [showPreview, setShowPreview] = useState(false);

  const addQuestion = useCallback(() => {
    const newQuestion: SurveyQuestion = {
      id: generateId(),
      type: 'text',
      question: '',
      required: false,
    };
    setSurvey((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  }, []);

  const deleteQuestion = useCallback((id: string) => {
    setSurvey((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== id),
    }));
  }, []);

  const updateQuestion = useCallback((id: string, updates: Partial<SurveyQuestion>) => {
    setSurvey((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === id ? { ...q, ...updates } : q
      ),
    }));
  }, []);

  const updateSurveyMeta = useCallback((updates: Partial<Survey>) => {
    setSurvey((prev) => ({ ...prev, ...updates }));
  }, []);

  return {
    survey,
    showPreview,
    setShowPreview,
    addQuestion,
    deleteQuestion,
    updateQuestion,
    updateSurveyMeta,
    setSurvey,
  };
}