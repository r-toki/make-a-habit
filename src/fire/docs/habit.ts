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

import { HabitsCollection } from '../collections';

export type History = {
  id: string;
  done: boolean;
  comment: string;
  createdAt: Timestamp;
};

export type HabitData = {
  content: string;
  targetDaysCount: number;
  startedAt: Timestamp;
  scheduledEndedAt: Timestamp;
  gaveUpAt: Timestamp | null;
  histories: History[];
};

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

  get hasDoneToday() {
    return this.histories.some((h) => isToday(h.createdAt.toDate()) && h.done);
  }

  get todayHistory() {
    return this.histories.find((h) => isToday(h.createdAt.toDate()));
  }

  get hasEnded() {
    return isPast(this.scheduledEndedAt.toDate());
  }

  get displayedHistories() {
    const res: History[] = [];
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
      const history = this.histories.find((h) => isSameDay(h.createdAt.toDate(), d));

      if (history) {
        res.push(history);
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

  private get defaultHistory(): History {
    return {
      id: v4(),
      done: false,
      comment: '',
      createdAt: Timestamp.now(),
    };
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
        histories: [],
      })
    );
  }

  rebuild() {
    return new HabitDoc({ id: this.id, ref: this.ref, data: () => this.data });
  }

  doToday() {
    if (this.hasDoneToday) return this;

    const { todayHistory } = this;

    if (todayHistory) {
      return this.edit({
        histories: this.histories.map((h) =>
          h.id === todayHistory.id ? { ...todayHistory, done: true } : h
        ),
      });
    }

    return this.edit({ histories: this.histories.concat({ ...this.defaultHistory, done: true }) });
  }

  undoToday() {
    if (!this.hasDoneToday) return this;

    const { todayHistory } = this;

    if (todayHistory) {
      return this.edit({
        histories: this.histories.map((h) =>
          h.id === todayHistory.id ? { ...todayHistory, done: false } : h
        ),
      });
    }

    return this.edit({
      histories: this.histories.concat({ ...this.defaultHistory }),
    });
  }

  commentToday(comment: string) {
    const { todayHistory } = this;

    if (todayHistory) {
      return this.edit({
        histories: this.histories.map((h) =>
          h.id === todayHistory.id ? { ...todayHistory, comment } : h
        ),
      });
    }

    return this.edit({
      histories: this.histories.concat({ ...this.defaultHistory, comment }),
    });
  }

  giveUp() {
    return this.edit({
      gaveUpAt: Timestamp.now(),
    });
  }
}

// NOTE: for View
export const formattedHabitPeriod = (habit: HabitDoc) => {
  const f = (ts: Timestamp) => format(ts.toDate(), 'yyyy/MM/dd');
  return `${f(habit.startedAt)} ~ ${f(habit.scheduledEndedAt)}`;
};
