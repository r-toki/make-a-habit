import { addWeeks, endOfDay, subDays } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

import { HabitsCollection } from '../collections/habits';
import { FireDocument } from '../lib/fire-document';

export type HabitData = {
  content: string;
  days: string[];
  createdAt: Timestamp;
  scheduledArchivedAt: Timestamp;
  archivedAt: Timestamp | null;
};

export interface HabitDoc extends HabitData {}
export class HabitDoc extends FireDocument<HabitData> {
  static create(
    collection: HabitsCollection,
    { content, days }: Pick<HabitData, 'content' | 'days'>
  ) {
    const fourWeeksLater = addWeeks(new Date(), 4);
    const scheduledArchivedAt = Timestamp.fromDate(endOfDay(subDays(fourWeeksLater, 1)));

    return new HabitDoc(
      this.makeCreateInput(collection, null, {
        content,
        days,
        createdAt: Timestamp.now(),
        scheduledArchivedAt,
        archivedAt: null,
      })
    );
  }
}
