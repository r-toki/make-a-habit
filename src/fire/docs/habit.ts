import { Timestamp } from 'firebase/firestore';

import { FireDocument } from '../base/fire-document';

export type HabitData = {
  content: string;
  days: string[];
  createdAt: Timestamp;
  archivedAt: Timestamp;
};

export interface HabitDoc extends HabitData {}
export class HabitDoc extends FireDocument<HabitData> {}
