import { query, Timestamp, where } from 'firebase/firestore';
import { orderBy } from 'lodash-es';
import { useEffect, useState } from 'react';

import { HabitDoc } from '@/fire/docs';
import { useMe } from '@/providers/me';

export const useHabits = () => {
  const { me } = useMe();

  const [loading, setLoading] = useState(false);

  const [habits, setHabits] = useState<HabitDoc[]>([]);

  useEffect(() => {
    setLoading(true);
    me.habitsCollection
      .findManyByQuery((ref) => query(ref, where('scheduledEndedAt', '>', Timestamp.now())))
      .then((v) =>
        setHabits(
          orderBy(
            v.filter((e) => !e.gaveUpAt),
            (d) => d.startedAt,
            'desc'
          )
        )
      )
      .then(() => setLoading(false));
  }, []);

  const giveUp = async (habit: HabitDoc) => {
    setLoading(true);
    habit.giveUp();
    await habit.save();
    setHabits((prev) => prev.filter((h) => h.id !== habit.id));
    setLoading(false);
  };

  return { loading, habits, giveUp };
};
