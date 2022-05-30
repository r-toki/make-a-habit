import { orderBy } from 'lodash-es';
import { useEffect, useState } from 'react';

import { HabitDoc } from '@/fire/docs';
import { useMe } from '@/providers/me';

export const useHabitsAllIndex = () => {
  const { me } = useMe();

  const [loading, setLoading] = useState(false);

  const [habits, setHabits] = useState<HabitDoc[]>([]);

  useEffect(() => {
    setLoading(true);
    me.habitsCollection
      .findManyByQuery((ref) => ref)
      .then((v) =>
        setHabits(orderBy(v, [(d) => d.inProgress, (d) => d.startedAt], ['desc', 'desc']))
      )
      .then(() => setLoading(false));
  }, []);

  const remove = async (habit: HabitDoc) => {
    setLoading(true);
    await habit.delete();
    setHabits((prev) => prev.filter((h) => h.id !== habit.id));
    setLoading(false);
  };

  return { loading, habits, remove };
};
