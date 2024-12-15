import { useState } from 'react';
import { submitSurveyResponse } from '@/lib/survey';

export function useSurveyResponses() {
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResponseChange = (questionId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const submitResponses = async (surveyId: string) => {
    try {
      setSubmitting(true);
      setError(null);
      await submitSurveyResponse(surveyId, responses);
      return true;
    } catch (err) {
      setError('Failed to submit survey responses');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    responses,
    submitting,
    error,
    handleResponseChange,
    submitResponses,
  };
}