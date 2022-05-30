import { endOfToday, startOfToday } from 'date-fns';
import { FireCollection } from 'fire-hose-web';
import { CollectionReference, query, Timestamp, where } from 'firebase/firestore';
import { head } from 'lodash-es';

import { HabitRecordData, HabitRecordDoc } from '../docs';

export class HabitRecordsCollection extends FireCollection<HabitRecordData, HabitRecordDoc> {
  constructor(ref: CollectionReference) {
    super(ref, (snap) => new HabitRecordDoc(snap));
  }

  async findTodayHabitRecord() {
    const docs = await this.findManyByQuery((ref) =>
      query(
        ref,
        where('createdAt', '>=', Timestamp.fromDate(startOfToday())),
        where('createdAt', '<=', Timestamp.fromDate(endOfToday()))
      )
    );
    return head(docs);
  }
}
