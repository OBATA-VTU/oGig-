
import { db } from '../firebase/config';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  deleteDoc, 
  doc, 
  onSnapshot 
} from 'firebase/firestore';
import { Job } from '../types';

/**
 * FIRESTORE SECURITY RULES (Copy this to your Firebase Console):
 * 
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     match /jobs/{jobId} {
 *       // Allow anyone to read jobs
 *       allow read: if true;
 *       // Allow authenticated users to create jobs
 *       allow create: if request.auth != null;
 *       // Allow the creator or an admin (if custom claims set) to delete/update
 *       allow update, delete: if request.auth != null && 
 *         (resource.data.creatorId == request.auth.uid || request.resource.data.isAdminPosted == true);
 *     }
 *   }
 * }
 */

const JOBS_COLLECTION = 'jobs';

export const storageService = {
  // Listen to real-time updates with robust error handling
  subscribeToJobs: (callback: (jobs: Job[]) => void, onError?: (error: any) => void) => {
    try {
      const q = query(collection(db, JOBS_COLLECTION), orderBy('postedAt', 'desc'));
      return onSnapshot(q, (snapshot) => {
        const jobs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Job[];
        callback(jobs);
      }, (error) => {
        console.error("Firestore Subscription Error:", error);
        if (onError) onError(error);
      });
    } catch (err) {
      console.error("Critical Subscription Error:", err);
      return () => {};
    }
  },

  getJobs: async (): Promise<Job[]> => {
    const q = query(collection(db, JOBS_COLLECTION), orderBy('postedAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Job[];
  },

  saveJob: async (job: Omit<Job, 'id'>) => {
    try {
      await addDoc(collection(db, JOBS_COLLECTION), job);
    } catch (error: any) {
      if (error.code === 'permission-denied') {
        throw new Error("Security check failed. Please ensure you are logged in or contact OBA for admin access.");
      }
      throw error;
    }
  },

  deleteJob: async (id: string) => {
    await deleteDoc(doc(db, JOBS_COLLECTION, id));
  }
};
