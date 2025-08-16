import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

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
}