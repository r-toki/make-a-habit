import { serverTimestamp, Timestamp } from 'firebase/firestore';

import { HabitsCollection } from '../collections/habits';
import { FireDocument } from '../lib/fire-document';

export type HabitData = {
  content: string;
  days: string[];
  createdAt: Timestamp;
  archivedAt: Timestamp | null;
};

export interface HabitDoc extends HabitData {}
export class HabitDoc extends FireDocument<HabitData> {
  static create(
    collection: HabitsCollection,
    { content, days }: Pick<HabitData, 'content' | 'days'>
  ) {
    return new HabitDoc(
      this.makeCreateInput(collection, null, {
        content,
        days,
        createdAt: serverTimestamp() as Timestamp,
        archivedAt: null,
      })
    );
  }
}
