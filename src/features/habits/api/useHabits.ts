import { orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { HabitDoc } from '@/fire/docs';
import { useMe } from '@/providers/me';
import { assertDefined } from '@/utils/assert-defined';

export const useHabits = () => {
  const { me } = useMe();

  const [habits, setHabits] = useState<HabitDoc[]>([]);

  const getOne = (id: string) => {
    const one = habits.find((h) => h.id === id);
    assertDefined(one);
    return one;
  };

  useEffect(() => {
    me.habitsCollection
      .findManyByQuery((ref) => query(ref, orderBy('createdAt', 'desc')))
      .then(setHabits);
  }, []);

  return { habits, getOne };
};
