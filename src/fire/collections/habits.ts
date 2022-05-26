import { FireCollection } from 'fire-hose-web';
import { CollectionReference } from 'firebase/firestore';

import { HabitData, HabitDoc } from '../docs';

export class HabitsCollection extends FireCollection<HabitData, HabitDoc> {
  constructor(ref: CollectionReference) {
    super(ref, (snap) => new HabitDoc(snap));
  }
}
