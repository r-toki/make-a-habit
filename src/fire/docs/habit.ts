import { addWeeks, differenceInDays, endOfDay, isPast, isToday, subDays } from 'date-fns';
import { addDays } from 'date-fns/esm';
import { Timestamp } from 'firebase/firestore';
import { v4 } from 'uuid';

import { Identity } from '@/lib/identity';
import { formatDate } from '@/utils/format';

import { HabitsCollection } from '../collections/habits';
import { FireDocument } from '../lib/fire-document';

type History = {
  id: string;
  done: boolean;
  comment: string;
  createdAt: Timestamp;
};

export type HabitData = {
  content: string;
  targetWeeksCount: number;
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
        differenceInDays(this.gaveUpAt.toDate(), this.startedAt.toDate()) /
        differenceInDays(this.scheduledEndedAt.toDate(), this.startedAt.toDate());

      return ratio * 100;
    }

    if (isPast(this.scheduledEndedAt.toDate())) {
      return 100;
    }

    const ratio =
      differenceInDays(addDays(new Date(), 1), this.startedAt.toDate()) /
      differenceInDays(this.scheduledEndedAt.toDate(), this.startedAt.toDate());

    return ratio * 100;
  }

  get hasDoneToday() {
    return this.histories.some((h) => isToday(h.createdAt.toDate()) && h.done);
  }

  get todayHistory() {
    return this.histories.find((h) => isToday(h.createdAt.toDate()));
  }

  static create(
    collection: HabitsCollection,
    { content, targetWeeksCount }: Pick<HabitData, 'content' | 'targetWeeksCount'>
  ) {
    const scheduledEndedAt = Identity.of(new Date())
      .map((d) => addWeeks(d, targetWeeksCount))
      .map((d) => subDays(d, 1))
      .map(endOfDay)
      .map(Timestamp.fromDate).value;

    return new HabitDoc(
      this.makeCreateInput(collection, null, {
        content,
        targetWeeksCount,
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
      return this.edit({
        histories: this.histories
          .filter((h) => h.id !== todayHistory.id)
          .concat({ ...todayHistory, done: true }),
      });
    }

    return this.edit({
      histories: this.histories.concat({
        id: v4(),
        done: true,
        comment: '',
        createdAt: Timestamp.now(),
      }),
    });
  }

  undoToday() {
    if (!this.hasDoneToday) return this;

    const { todayHistory } = this;

    if (todayHistory) {
      return this.edit({
        histories: this.histories
          .filter((h) => h.id !== todayHistory.id)
          .concat({ ...todayHistory, done: false }),
      });
    }

    return this.edit({
      histories: this.histories.concat({
        id: v4(),
        done: false,
        comment: '',
        createdAt: Timestamp.now(),
      }),
    });
  }

  commentToday(comment: string) {
    const { todayHistory } = this;

    if (todayHistory) {
      return this.edit({
        histories: this.histories
          .filter((h) => h.id !== todayHistory.id)
          .concat({ ...todayHistory, comment }),
      });
    }

    return this.edit({
      histories: this.histories.concat({
        id: v4(),
        done: false,
        comment,
        createdAt: Timestamp.now(),
      }),
    });
  }
}
