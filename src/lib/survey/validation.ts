import type { Survey, SurveyQuestion, SurveyResponse } from '@/types/survey';

export function validateSurvey(survey: Survey): string | null {
  if (!survey.title?.trim()) {
    return 'Survey title is required';
  }

  if (!Array.isArray(survey.questions) || survey.questions.length === 0) {
    return 'Survey must have at least one question';
  }

  for (const question of survey.questions) {
    const error = validateQuestion(question);
    if (error) return error;
  }

  return null;
}

export function validateQuestion(question: SurveyQuestion): string | null {
  if (!question.question?.trim()) {
    return 'Question text is required';
  }

  if (question.type === 'multipleChoice' || question.type === 'checkbox') {
    if (!Array.isArray(question.options) || question.options.length === 0) {
      return 'Choice questions must have at least one option';
    }
  }

  return null;
}

export function validateResponse(responses: SurveyResponse['responses']): string | null {
  if (!responses || typeof responses !== 'object') {
    return 'Invalid response format';
  }

  // Add any additional response validation logic here
  return null;
}