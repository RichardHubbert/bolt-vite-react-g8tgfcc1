import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { app, db } from './firebase';
import type { SignUpData, SignInData, User } from '@/types/auth';

export const auth = getAuth(app);

export async function signUp({ email, password, name }: SignUpData): Promise<User> {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName: name });
  
  // Store additional user data in Firestore
  await setDoc(doc(db, 'users', user.uid), {
    email,
    name,
    createdAt: new Date().toISOString()
  });

  return {
    id: user.uid,
    email: user.email!,
    name: user.displayName!
  };
}

export async function signIn({ email, password }: SignInData): Promise<User> {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return {
    id: user.uid,
    email: user.email!,
    name: user.displayName!
  };
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      callback({
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        name: firebaseUser.displayName!
      });
    } else {
      callback(null);
    }
  });
}