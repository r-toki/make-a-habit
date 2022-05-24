import {
  addDays,
  differenceInDays,
  endOfDay,
  isBefore,
  isPast,
  isSameDay,
  isToday,
  subDays,
} from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import { v4 } from 'uuid';

import { Identity } from '@/lib/identity';
import { formatDate } from '@/utils/format';

import { HabitsCollection } from '../collections/habits';
import { FireDocument } from '../lib/fire-document';

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
  get formattedPeriod() {
    return `${formatDate(this.startedAt)} ~ ${formatDate(this.scheduledEndedAt)}`;
  }

  get progressPercent() {
    if (this.gaveUpAt) {
      const ratio =
        (differenceInDays(this.gaveUpAt.toDate(), this.startedAt.toDate()) + 1) /
        (differenceInDays(this.scheduledEndedAt.toDate(), this.startedAt.toDate()) + 1);

      return ratio * 100;
    }

    if (isPast(this.scheduledEndedAt.toDate())) {
      return 100;
    }

    const ratio =
      (differenceInDays(new Date(), this.startedAt.toDate()) + 1) /
      (differenceInDays(this.scheduledEndedAt.toDate(), this.startedAt.toDate()) + 1);

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

  get filledHistories() {
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

    return res;
  }

  static create(
    collection: HabitsCollection,
    { content, targetDaysCount }: Pick<HabitData, 'content' | 'targetDaysCount'>
  ) {
    const scheduledEndedAt = Identity.of(new Date())
      .map((d) => addDays(d, targetDaysCount))
      .map((d) => subDays(d, 1))
      .map(endOfDay)
      .map(Timestamp.fromDate).value;

    return new HabitDoc(
      this.makeCreateInput(collection, null, {
        content,
        targetDaysCount,
        startedAt: Timestamp.now(),
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
      const histories = this.histories.map((h) =>
        h.id === todayHistory.id ? { ...todayHistory, done: true } : h
      );
      return this.edit({ histories });
    }

    const histories = this.histories.concat({
      id: v4(),
      done: true,
      comment: '',
      createdAt: Timestamp.now(),
    });
    return this.edit({ histories });
  }

  undoToday() {
    if (!this.hasDoneToday) return this;

    const { todayHistory } = this;

    if (todayHistory) {
      const histories = this.histories.map((h) =>
        h.id === todayHistory.id ? { ...todayHistory, done: false } : h
      );
      return this.edit({ histories });
    }

    const histories = this.histories.concat({
      id: v4(),
      done: false,
      comment: '',
      createdAt: Timestamp.now(),
    });
    return this.edit({ histories });
  }

  commentToday(comment: string) {
    const { todayHistory } = this;

    if (todayHistory) {
      const histories = this.histories.map((h) =>
        h.id === todayHistory.id ? { ...todayHistory, comment } : h
      );
      return this.edit({ histories });
    }

    const histories = this.histories.concat({
      id: v4(),
      done: false,
      comment,
      createdAt: Timestamp.now(),
    });
    return this.edit({ histories });
  }

  giveUp() {
    return this.edit({
      gaveUpAt: Timestamp.now(),
    });
  }
}
