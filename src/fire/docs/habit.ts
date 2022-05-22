import { addWeeks, endOfDay, subDays } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

import { assertDefined } from '@/utils/assert-defined';
import { formatDate } from '@/utils/format';

import { HabitsCollection } from '../collections/habits';
import { FireDocument } from '../lib/fire-document';

export const daysOptions = [
  { label: 'Mon.', value: 'Monday' },
  { label: 'Tue.', value: 'Tuesday' },
  { label: 'Wed.', value: 'Wednesday' },
  { label: 'Thu.', value: 'Thursday' },
  { label: 'Fri.', value: 'Friday' },
  { label: 'Sat.', value: 'Saturday' },
  { label: 'Sun.', value: 'Sunday' },
];

const getLabel = (v: string) => {
  const found = daysOptions.find((o) => o.value === v);
  assertDefined(found);
  return found.label;
};

export type HabitData = {
  content: string;
  days: string[];
  createdAt: Timestamp;
  scheduledArchivedAt: Timestamp;
  archivedAt: Timestamp | null;
};

export interface HabitDoc extends HabitData {}
export class HabitDoc extends FireDocument<HabitData> {
  get formattedDays() {
    return this.days.map(getLabel).join(' ');
  }

  get formattedPeriod() {
    return `${formatDate(this.createdAt)} ~ ${formatDate(this.scheduledArchivedAt)}`;
  }

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
