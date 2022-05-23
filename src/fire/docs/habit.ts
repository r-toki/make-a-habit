import { addWeeks, endOfDay, subDays } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

import { Identity } from '@/lib/identity';
import { formatDate } from '@/utils/format';

import { HabitsCollection } from '../collections/habits';
import { FireDocument } from '../lib/fire-document';

export type HabitData = {
  content: string;
  targetWeeksCount: number;
  createdAt: Timestamp;
  scheduledArchivedAt: Timestamp;
  archivedAt: Timestamp | null;
};

export interface HabitDoc extends HabitData {}
export class HabitDoc extends FireDocument<HabitData> {
  get formattedPeriod() {
    return `${formatDate(this.createdAt)} ~ ${formatDate(this.scheduledArchivedAt)}`;
  }

  static create(
    collection: HabitsCollection,
    { content, targetWeeksCount }: Pick<HabitData, 'content' | 'targetWeeksCount'>
  ) {
    const scheduledArchivedAt = Identity.of(new Date())
      .map((d) => addWeeks(d, targetWeeksCount))
      .map((d) => subDays(d, 1))
      .map(endOfDay)
      .map(Timestamp.fromDate).value;

    return new HabitDoc(
      this.makeCreateInput(collection, null, {
        content,
        targetWeeksCount,
        createdAt: Timestamp.now(),
        scheduledArchivedAt,
        archivedAt: null,
      })
    );
  }

  rebuild() {
    return new HabitDoc({ id: this.id, ref: this.ref, data: () => this.data });
  }
}
