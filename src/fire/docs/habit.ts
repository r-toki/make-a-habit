import {
  addDays,
  differenceInCalendarDays,
  endOfToday,
  format,
  isBefore,
  isPast,
  isSameDay,
  startOfToday,
  subDays,
} from 'date-fns';
import { FireDocument } from 'fire-hose-web';
import { collection, Timestamp } from 'firebase/firestore';

import { Identity } from '@/lib/identity';

import { HabitRecordsCollection, HabitsCollection } from '../collections';
import { HabitRecordDoc } from './habit-record';

export interface HabitData {
  content: string;
  targetDaysCount: number;
  startedAt: Timestamp;
  scheduledEndedAt: Timestamp;
  gaveUpAt: Timestamp | null;
}

export interface HabitDoc extends HabitData {}
export class HabitDoc extends FireDocument<HabitData> {
  habitRecordsCollection = new HabitRecordsCollection(collection(this.ref, 'habitRecords'));

  get progressPercent() {
    if (this.gaveUpAt) {
      const ratio =
        (differenceInCalendarDays(this.gaveUpAt.toDate(), this.startedAt.toDate()) + 1) /
        (differenceInCalendarDays(this.scheduledEndedAt.toDate(), this.startedAt.toDate()) + 1);

      return ratio * 100;
    }

    if (isPast(this.scheduledEndedAt.toDate())) {
      return 100;
    }

    const ratio =
      (differenceInCalendarDays(new Date(), this.startedAt.toDate()) + 1) /
      (differenceInCalendarDays(this.scheduledEndedAt.toDate(), this.startedAt.toDate()) + 1);

    return ratio * 100;
  }

  get hasEnded() {
    return isPast(this.scheduledEndedAt.toDate());
  }

  get inProgress() {
    return !this.hasEnded && !this.gaveUpAt;
  }

  static create(
    collection: HabitsCollection,
    { content, targetDaysCount }: Pick<HabitData, 'content' | 'targetDaysCount'>
  ) {
    const scheduledEndedAt = Identity.of(endOfToday())
      .map((d) => addDays(d, targetDaysCount))
      .map((d) => subDays(d, 1))
      .map(Timestamp.fromDate).value;

    return new HabitDoc(
      this.makeConstructorInput(collection, null, {
        content,
        targetDaysCount,
        startedAt: Timestamp.fromDate(startOfToday()),
        scheduledEndedAt,
        gaveUpAt: null,
      })
    );
  }

  rebuild() {
    return new HabitDoc({ id: this.id, ref: this.ref, data: () => this.data });
  }

  giveUp() {
    return this.edit({
      gaveUpAt: Timestamp.now(),
    });
  }
}

export const formattedHabitPeriod = (habit: HabitDoc) => {
  const f = (ts: Timestamp) => format(ts.toDate(), 'yyyy/MM/dd');
  return `${f(habit.startedAt)} ~ ${f(habit.scheduledEndedAt)}`;
};

export const habitRecordsWithBlankFilled = (habit: HabitDoc, habitRecords: HabitRecordDoc[]) => {
  const res: HabitRecordDoc[] = [];
  let d = habit.startedAt.toDate();

  while (
    isBefore(
      d,
      habit.gaveUpAt
        ? habit.gaveUpAt.toDate()
        : habit.hasEnded
        ? habit.scheduledEndedAt.toDate()
        : new Date()
    )
  ) {
    const habitRecord = habitRecords.find((h) => isSameDay(h.createdAt.toDate(), d));

    if (habitRecord) {
      res.push(habitRecord);
    } else {
      res.push(HabitRecordDoc.create(habit.habitRecordsCollection));
    }

    d = addDays(d, 1);
  }

  return res.reverse();
};
