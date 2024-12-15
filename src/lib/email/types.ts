export interface EmailData {
  to: string[];
  subject: string;
  message: string;
  surveyId: string;
  senderId: string;
}

export interface EmailTemplate {
  subject: string;
  message: string;
}