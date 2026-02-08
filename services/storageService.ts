
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

const JOBS_COLLECTION = 'jobs';

export const storageService = {
  // Listen to real-time updates
  subscribeToJobs: (callback: (jobs: Job[]) => void) => {
    const q = query(collection(db, JOBS_COLLECTION), orderBy('postedAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const jobs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Job[];
      callback(jobs);
    });
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
    await addDoc(collection(db, JOBS_COLLECTION), job);
  },

  deleteJob: async (id: string) => {
    await deleteDoc(doc(db, JOBS_COLLECTION, id));
  }
};
