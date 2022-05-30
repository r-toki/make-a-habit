import { FireDocument } from 'fire-hose-web';
import { Timestamp } from 'firebase/firestore';

import { HabitRecordsCollection } from '../collections';

export interface HabitRecordData {
  done: boolean;
  comment: string;
  createdAt: Timestamp;
}

export interface HabitRecordDoc extends HabitRecordData {}
export class HabitRecordDoc extends FireDocument<HabitRecordData> {
  static create(collection: HabitRecordsCollection) {
    return new HabitRecordDoc(
      this.makeConstructorInput(collection, null, {
        done: false,
        comment: '',
        createdAt: Timestamp.now(),
      })
    );
  }

  rebuild() {
    return new HabitRecordDoc({ id: this.id, ref: this.ref, data: () => this.data });
  }

  toggleDone(done?: boolean | undefined) {
    if (typeof done === 'boolean') return this.edit({ done });
    return this.edit({ done: !this.done });
  }

  doComment(comment: string) {
    return this.edit({ comment });
  }
}
