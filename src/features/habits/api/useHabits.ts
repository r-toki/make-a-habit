import { orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { HabitDoc } from '@/fire/docs';
import { useMe } from '@/providers/me';

export const useHabits = () => {
  const { me } = useMe();

  const [habits, setHabits] = useState<HabitDoc[]>([]);

  useEffect(() => {
    me.habitsCollection
      .findManyByQuery((ref) => query(ref, orderBy('createdAt', 'desc')))
      .then(setHabits);
  }, []);

  return { habits };
};
