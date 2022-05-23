import { addWeeks, endOfDay, isToday, subDays } from 'date-fns';
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
  createdAt: Timestamp;
  scheduledArchivedAt: Timestamp;
  archivedAt: Timestamp | null;
  histories: History[];
};

export interface HabitDoc extends HabitData {}
export class HabitDoc extends FireDocument<HabitData> {
  get formattedPeriod() {
    return `${formatDate(this.createdAt)} ~ ${formatDate(this.scheduledArchivedAt)}`;
  }

  get hasDoneToday() {
    return this.histories.some((v) => isToday(v.createdAt.toDate()) && v.done);
  }

  get todayHistory() {
    return this.histories.find((v) => isToday(v.createdAt.toDate()));
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
