import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { doc, onSnapshot, updateDoc, increment } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface PollOption {
  text: string;
  votes: number;
}

export interface Poll {
  id?: string; // Firestore will generate this
  question: string;
  options: PollOption[];
}

@Injectable({ providedIn: 'root' })
export class PollService {
  private firestore: Firestore = inject(Firestore);
  private pollsCollection = collection(this.firestore, 'polls');

  // Method to create a new poll in Firestore
  async createPoll(poll: { question: string, options: string[] }) {
    const newPoll: Poll = {
      question: poll.question,
      options: poll.options.map(optionText => ({ text: optionText, votes: 0 }))
    };
    const docRef = await addDoc(this.pollsCollection, newPoll);
    return docRef.id; // Return the ID of the new poll
  }

  getPoll(id: string): Observable<Poll | null> {
  const docRef = doc(this.firestore, 'polls', id);
  return new Observable(observer => {
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        observer.next({ id: docSnap.id, ...docSnap.data() } as Poll);
      } else {
        observer.next(null); // Poll not found
      }
    });
    // Return the unsubscribe function to be called when the observable is unsubscribed
    return unsubscribe;
  });
}

// Vote on an option
async vote(pollId: string, currentOptions: PollOption[], optionIndex: number) {
  const docRef = doc(this.firestore, 'polls', pollId);
  const updatedOptions = [...currentOptions];
  updatedOptions[optionIndex].votes++;
  
  // Using updateDoc is simpler here than a transaction
  await updateDoc(docRef, { options: updatedOptions });
}
}