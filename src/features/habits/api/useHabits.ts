import { query, Timestamp, where } from 'firebase/firestore';
import { orderBy } from 'lodash-es';
import { useEffect, useState } from 'react';

import { HabitDoc } from '@/fire/docs';
import { useMe } from '@/providers/me';

export const useHabits = () => {
  const { me } = useMe();

  const [habits, setHabits] = useState<HabitDoc[]>([]);

  useEffect(() => {
    me.habitsCollection
      .findManyByQuery((ref) => query(ref, where('scheduledEndedAt', '>', Timestamp.now())))
      .then((v) => setHabits(orderBy(v, (d) => d.startedAt, 'desc')));
  }, []);

  return { habits };
};
