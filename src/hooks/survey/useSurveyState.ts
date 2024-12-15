import { useState, useCallback } from 'react';
import { Survey, SurveyQuestion } from '@/types/survey';
import { createSurvey, updateSurvey } from '@/lib/survey';
import { generateId } from '@/lib/utils';

const DEFAULT_SURVEY: Survey = {
  title: 'Untitled Survey',
  description: 'Survey description',
  questions: [],
};

export function useSurveyState(initialId?: string) {
  const [survey, setSurvey] = useState<Survey>(DEFAULT_SURVEY);
  const [surveyId, setSurveyId] = useState<string | undefined>(initialId);
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addQuestion = useCallback(() => {
    const newQuestion: SurveyQuestion = {
      id: generateId(),
      type: 'text',
      question: '',
      required: false,
      options: [],
      value: ''
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

  const saveSurvey = useCallback(async () => {
    try {
      setIsSaving(true);
      setError(null);

      // Validate survey data
      if (!survey.title.trim()) {
        throw new Error('Survey title is required');
      }

      if (survey.questions.length === 0) {
        throw new Error('Survey must have at least one question');
      }

      // Clean up question data before saving
      const cleanedSurvey = {
        ...survey,
        questions: survey.questions.map(q => ({
          ...q,
          value: undefined // Remove temporary value field before saving
        }))
      };

      if (surveyId) {
        await updateSurvey(surveyId, cleanedSurvey);
      } else {
        const newId = await createSurvey(cleanedSurvey);
        setSurveyId(newId);
      }
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save survey');
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [survey, surveyId]);

  const resetSurvey = useCallback(() => {
    if (window.confirm('Are you sure you want to reset the survey? All changes will be lost.')) {
      setSurvey(DEFAULT_SURVEY);
      setSurveyId(undefined);
      setError(null);
    }
  }, []);

  return {
    survey,
    surveyId,
    showPreview,
    isSaving,
    error,
    setShowPreview,
    addQuestion,
    deleteQuestion,
    updateQuestion,
    updateSurveyMeta,
    saveSurvey,
    resetSurvey,
    setSurvey,
  };
}