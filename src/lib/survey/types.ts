import type { Survey, SurveyResponse } from '@/types/survey';

export interface SurveyWithId extends Survey {
  id: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SurveyResponseWithId extends SurveyResponse {
  id: string;
}

export interface SurveyFilters {
  userId?: string;
  status?: 'draft' | 'published';
}