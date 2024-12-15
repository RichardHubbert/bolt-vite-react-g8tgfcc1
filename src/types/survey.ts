export type QuestionType = 'text' | 'multipleChoice' | 'checkbox' | 'rating';

export interface SurveyQuestion {
  id: string;
  type: QuestionType;
  question: string;
  required: boolean;
  options?: string[];
  value?: string | string[] | number; // For storing responses
}

export interface Survey {
  title: string;
  description: string;
  questions: SurveyQuestion[];
}

export interface SurveyResponse {
  surveyId: string;
  responses: {
    [questionId: string]: string | string[] | number;
  };
  submittedAt: string;
  submittedBy: string;
}