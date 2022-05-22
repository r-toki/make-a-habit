import { addWeeks, endOfDay, isSameDay, subDays } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import { last, uniqWith } from 'lodash-es';

import { formatDate } from '@/utils/format';

import { HabitsCollection } from '../collections/habits';
import { FireDocument } from '../lib/fire-document';

// export const daysOfWeekOptions = [
//   { label: 'Mon.', value: 'Monday' },
//   { label: 'Tue.', value: 'Tuesday' },
//   { label: 'Wed.', value: 'Wednesday' },
//   { label: 'Thu.', value: 'Thursday' },
//   { label: 'Fri.', value: 'Friday' },
//   { label: 'Sat.', value: 'Saturday' },
//   { label: 'Sun.', value: 'Sunday' },
// ];

// const getLabel = (v: string) => {
//   const found = daysOfWeekOptions.find((o) => o.value === v);
//   assertDefined(found);
//   return found.label;
// };

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
    if (this.archivedAt) {
      return `${formatDate(this.createdAt)} ~ ${formatDate(this.scheduledArchivedAt)}`;
    }
    return `${formatDate(this.createdAt)} ~ in progress`;
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
    const targetWeeksLater = addWeeks(new Date(), targetWeeksCount);
    const scheduledArchivedAt = Timestamp.fromDate(endOfDay(subDays(targetWeeksLater, 1)));

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
    return this.edit({
      doneAtList: uniqWith([...this.doneAtList, Timestamp.now()], (a, b) =>
        isSameDay(a.toDate(), b.toDate())
      ),
    });
  }

  undoToday() {
    return this.edit({
      doneAtList: this.doneAtList.filter((d) => !isSameDay(d.toDate(), new Date())),
    });
  }
}
