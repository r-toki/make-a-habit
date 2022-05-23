import { addWeeks, endOfDay, isSameDay, subDays } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import { last, uniqWith } from 'lodash-es';

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
  doneAtList: Timestamp[];
};

export interface HabitDoc extends HabitData {}
export class HabitDoc extends FireDocument<HabitData> {
  get formattedPeriod() {
    return `${formatDate(this.createdAt)} ~ ${formatDate(this.scheduledArchivedAt)}`;
  }

  get successDaysCount() {
    return this.doneAtList.length;
  }

  get targetDaysCount() {
    return this.targetWeeksCount * 7;
  }

  get achievementPercent() {
    return (this.successDaysCount / this.targetDaysCount) * 100;
  }

  get achievementRate() {
    return `${this.successDaysCount} / ${this.targetDaysCount}`;
  }

  get hasDoneToday() {
    const latestDoneAt = last(this.doneAtList);
    if (!latestDoneAt) return false;
    return isSameDay(latestDoneAt.toDate(), new Date());
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
        doneAtList: [],
      })
    );
  }

  rebuild() {
    return new HabitDoc({ id: this.id, ref: this.ref, data: () => this.data });
  }

  doToday() {
    const doneAtList = uniqWith([...this.doneAtList, Timestamp.now()], (a, b) =>
      isSameDay(a.toDate(), b.toDate())
    );
    return this.edit({ doneAtList });
  }

  undoToday() {
    const doneAtList = this.doneAtList.filter((d) => !isSameDay(d.toDate(), new Date()));
    return this.edit({ doneAtList });
  }
}
