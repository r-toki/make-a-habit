import { orderBy } from 'lodash-es';
import { useEffect, useState } from 'react';

import { HabitDoc } from '@/fire/docs';
import { useMe } from '@/providers/me';

export const useHabitsAll = () => {
  const { me } = useMe();

  const [loading, setLoading] = useState(false);

  const [habits, setHabits] = useState<HabitDoc[]>([]);

  useEffect(() => {
    setLoading(true);
    me.habitsCollection
      .findManyByQuery((ref) => ref)
      .then((v) => setHabits(orderBy(v, (d) => d.startedAt, 'desc')))
      .then(() => setLoading(false));
  }, []);

  return { loading, habits };
};
