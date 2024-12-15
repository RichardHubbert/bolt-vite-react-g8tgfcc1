import { 
  createSurvey,
  updateSurvey,
  deleteSurvey,
  getSurvey,
  getAllSurveys 
} from './api';

import {
  submitSurveyResponse,
  getSurveyResponses
} from './responses';

import {
  validateSurvey,
  validateQuestion,
  validateResponse
} from './validation';

import {
  cleanSurveyData,
  cleanQuestionData,
  initializeQuestionValue
} from './utils';

import type {
  SurveyWithId,
  SurveyResponseWithId,
  SurveyFilters
} from './types';

export {
  // API functions
  createSurvey,
  updateSurvey,
  deleteSurvey,
  getSurvey,
  getAllSurveys,
  
  // Response functions
  submitSurveyResponse,
  getSurveyResponses,
  
  // Validation functions
  validateSurvey,
  validateQuestion,
  validateResponse,
  
  // Utility functions
  cleanSurveyData,
  cleanQuestionData,
  initializeQuestionValue,
  
  // Types
  type SurveyWithId,
  type SurveyResponseWithId,
  type SurveyFilters
};