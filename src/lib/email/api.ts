import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { validateEmail } from './validation';
import type { EmailData } from './types';

const EMAIL_QUEUE_COLLECTION = 'email_queue';

export async function sendEmail(emailData: EmailData): Promise<string> {
  const error = validateEmail(emailData);
  if (error) throw new Error(error);

  // Add to Firebase email queue collection
  // This would typically be processed by a Cloud Function
  const docRef = await addDoc(collection(db, EMAIL_QUEUE_COLLECTION), {
    ...emailData,
    status: 'pending',
    createdAt: new Date().toISOString()
  });

  return docRef.id;
}