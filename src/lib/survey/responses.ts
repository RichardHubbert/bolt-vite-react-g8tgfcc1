import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { auth } from '../auth';
import { validateResponse } from './validation';
import type { SurveyResponse } from '@/types/survey';

const RESPONSES_COLLECTION = 'survey_responses';

export async function submitSurveyResponse(
  surveyId: string, 
  responses: SurveyResponse['responses']
): Promise<string> {
  if (!auth.currentUser) {
    throw new Error('User must be authenticated to submit a response');
  }

  const error = validateResponse(responses);
  if (error) throw new Error(error);

  const response: Omit<SurveyResponse, 'id'> = {
    surveyId,
    responses,
    submittedAt: new Date().toISOString(),
    submittedBy: auth.currentUser.uid,
  };

  const docRef = await addDoc(collection(db, RESPONSES_COLLECTION), response);
  return docRef.id;
}

export async function getSurveyResponses(surveyId: string): Promise<SurveyResponse[]> {
  if (!auth.currentUser) {
    return [];
  }

  const q = query(
    collection(db, RESPONSES_COLLECTION),
    where('surveyId', '==', surveyId),
    where('submittedBy', '==', auth.currentUser.uid)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    ...(doc.data() as SurveyResponse),
    id: doc.id,
  }));
}