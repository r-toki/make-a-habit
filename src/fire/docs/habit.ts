import { addWeeks, endOfDay, subDays } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

import { assertDefined } from '@/utils/assert-defined';
import { formatDate } from '@/utils/format';

import { HabitsCollection } from '../collections/habits';
import { FireDocument } from '../lib/fire-document';

export const daysOfWeekOptions = [
  { label: 'Mon.', value: 'Monday' },
  { label: 'Tue.', value: 'Tuesday' },
  { label: 'Wed.', value: 'Wednesday' },
  { label: 'Thu.', value: 'Thursday' },
  { label: 'Fri.', value: 'Friday' },
  { label: 'Sat.', value: 'Saturday' },
  { label: 'Sun.', value: 'Sunday' },
];

const getLabel = (v: string) => {
  const found = daysOfWeekOptions.find((o) => o.value === v);
  assertDefined(found);
  return found.label;
};

export type HabitData = {
  content: string;
  targetWeeksCount: number;
  targetDaysOfWeek: string[];
  createdAt: Timestamp;
  scheduledArchivedAt: Timestamp;
  archivedAt: Timestamp | null;
  succeededAtList: Timestamp[];
};

export interface HabitDoc extends HabitData {}
export class HabitDoc extends FireDocument<HabitData> {
  get formattedDays() {
    return this.targetDaysOfWeek.map(getLabel).join(' ');
  }

  get formattedPeriod() {
    if (this.archivedAt) {
      return `${formatDate(this.createdAt)} ~ ${formatDate(this.scheduledArchivedAt)}`;
    }
    return `${formatDate(this.createdAt)} ~ (in progress)`;
  }

  get successDaysCount() {
    return this.succeededAtList.length;
  }

  get targetDaysCount() {
    return this.targetWeeksCount * this.targetDaysOfWeek.length;
  }

  get achievementPercent() {
    return this.successDaysCount / this.targetDaysCount;
  }

  get achievementRate() {
    return `${this.successDaysCount} / ${this.targetDaysCount}`;
  }

  static create(
    collection: HabitsCollection,
    { content, targetDaysOfWeek }: Pick<HabitData, 'content' | 'targetDaysOfWeek'>
  ) {
    const targetWeeksCount = 3;
    const fourWeeksLater = addWeeks(new Date(), targetWeeksCount);
    const scheduledArchivedAt = Timestamp.fromDate(endOfDay(subDays(fourWeeksLater, 1)));

    return new HabitDoc(
      this.makeCreateInput(collection, null, {
        content,
        targetWeeksCount,
        targetDaysOfWeek,
        createdAt: Timestamp.now(),
        scheduledArchivedAt,
        archivedAt: null,
        succeededAtList: [],
      })
    );
  }
}
