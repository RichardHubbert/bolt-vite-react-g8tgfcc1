import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { auth } from '../auth';
import { cleanSurveyData } from './utils';
import { validateSurvey } from './validation';
import type { Survey } from '@/types/survey';
import type { SurveyFilters, SurveyWithId } from './types';

const SURVEYS_COLLECTION = 'surveys';

export async function createSurvey(survey: Survey): Promise<string> {
  if (!auth.currentUser) {
    throw new Error('User must be authenticated to create a survey');
  }

  const error = validateSurvey(survey);
  if (error) throw new Error(error);

  const cleanedSurvey = cleanSurveyData(survey);
  
  const docRef = await addDoc(collection(db, SURVEYS_COLLECTION), {
    ...cleanedSurvey,
    userId: auth.currentUser.uid,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  return docRef.id;
}

export async function updateSurvey(id: string, survey: Survey): Promise<void> {
  if (!auth.currentUser) {
    throw new Error('User must be authenticated to update a survey');
  }

  const error = validateSurvey(survey);
  if (error) throw new Error(error);

  const cleanedSurvey = cleanSurveyData(survey);
  
  const docRef = doc(db, SURVEYS_COLLECTION, id);
  await updateDoc(docRef, {
    ...cleanedSurvey,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteSurvey(id: string): Promise<void> {
  if (!auth.currentUser) {
    throw new Error('User must be authenticated to delete a survey');
  }

  await deleteDoc(doc(db, SURVEYS_COLLECTION, id));
}

export async function getSurvey(id: string): Promise<Survey | null> {
  const docRef = doc(db, SURVEYS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    return null;
  }

  return docSnap.data() as Survey;
}

export async function getAllSurveys(filters: SurveyFilters = {}): Promise<SurveyWithId[]> {
  if (!auth.currentUser) {
    return [];
  }

  const constraints = [where('userId', '==', auth.currentUser.uid)];
  if (filters.status) {
    constraints.push(where('status', '==', filters.status));
  }

  const q = query(collection(db, SURVEYS_COLLECTION), ...constraints);
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    ...(doc.data() as Survey),
    id: doc.id,
  }));
}