import type { Survey, SurveyQuestion } from '@/types/survey';

export function cleanSurveyData(survey: Survey): Survey {
  return {
    ...survey,
    questions: survey.questions.map(cleanQuestionData)
  };
}

export function cleanQuestionData(question: SurveyQuestion): SurveyQuestion {
  const { value, ...cleanQuestion } = question;
  return cleanQuestion;
}

export function initializeQuestionValue(type: SurveyQuestion['type']): any {
  switch (type) {
    case 'text':
      return '';
    case 'multipleChoice':
      return '';
    case 'checkbox':
      return [];
    case 'rating':
      return null;
    default:
      return null;
  }
}