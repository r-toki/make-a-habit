import {
  addDays,
  differenceInCalendarDays,
  endOfToday,
  format,
  isBefore,
  isPast,
  isSameDay,
  isToday,
  startOfToday,
  subDays,
} from 'date-fns';
import { FireDocument } from 'fire-hose-web';
import { Timestamp } from 'firebase/firestore';
import { v4 } from 'uuid';

import { Identity } from '@/lib/identity';
import { insertEntity } from '@/utils/store-helper';

import { HabitsCollection } from '../collections';

export interface HabitData {
  content: string;
  targetDaysCount: number;
  startedAt: Timestamp;
  scheduledEndedAt: Timestamp;
  gaveUpAt: Timestamp | null;
  habitRecords: HabitRecord[];
}

export interface HabitDoc extends HabitData {}
export class HabitDoc extends FireDocument<HabitData> {
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

  get todayHabitRecord() {
    return (
      this.habitRecords.find((h) => isToday(h.createdAt.toDate())) ?? new HabitRecordEntity({}).data
    );
  }

  get hasDoneToday() {
    return !!this.todayHabitRecord?.done;
  }

  get hasEnded() {
    return isPast(this.scheduledEndedAt.toDate());
  }

  get habitRecordsWithBlankFilled() {
    const res: HabitRecord[] = [];
    let d = this.startedAt.toDate();

    while (
      isBefore(
        d,
        this.gaveUpAt
          ? this.gaveUpAt.toDate()
          : this.hasEnded
          ? this.scheduledEndedAt.toDate()
          : new Date()
      )
    ) {
      const habitRecord = this.habitRecords.find((h) => isSameDay(h.createdAt.toDate(), d));

      if (habitRecord) {
        res.push(habitRecord);
      } else {
        res.push({ id: v4(), done: false, comment: '', createdAt: Timestamp.fromDate(d) });
      }

      d = addDays(d, 1);
    }

    return res.reverse();
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
        habitRecords: [],
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

  insertHabitRecord(habitRecordEntity: HabitRecordEntity) {
    return this.edit({ habitRecords: insertEntity(this.habitRecords, habitRecordEntity.data) });
  }

  toggleDoneToday() {
    return this.insertHabitRecord(new HabitRecordEntity(this.todayHabitRecord).toggleDone());
  }

  doCommentToday(comment: string) {
    return this.insertHabitRecord(new HabitRecordEntity(this.todayHabitRecord).doComment(comment));
  }
}

export interface HabitRecord {
  id: string;
  done: boolean;
  comment: string;
  createdAt: Timestamp;
}

export interface HabitRecordEntity extends HabitRecord {}
export class HabitRecordEntity {
  constructor(data: Partial<HabitRecord>) {
    Object.assign(this, this.defaultData, data);
  }

  get data() {
    const { ...fields } = this;
    return fields;
  }

  get defaultData(): HabitRecord {
    return { id: v4(), done: false, comment: '', createdAt: Timestamp.now() };
  }

  toggleDone(done?: boolean | undefined) {
    if (typeof done === 'boolean') {
      return Object.assign(this, { done });
    }
    return Object.assign(this, { done: !this.done });
  }

  doComment(comment: string) {
    return Object.assign(this, { comment });
  }
}

// NOTE: for View
export const formattedHabitPeriod = (habit: HabitDoc) => {
  const f = (ts: Timestamp) => format(ts.toDate(), 'yyyy/MM/dd');
  return `${f(habit.startedAt)} ~ ${f(habit.scheduledEndedAt)}`;
};
