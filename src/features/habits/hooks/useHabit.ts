import { useEffect, useState } from 'react';

import { HabitDoc } from '@/fire/docs';
import { useMe } from '@/providers/me';

export const useHabit = (habitId: string) => {
  const { me } = useMe();

  const [loading, setLoading] = useState(false);

  const [habit, setHabit] = useState<HabitDoc>();

  useEffect(() => {
    setLoading(true);

    me.habitsCollection
      .findOne(habitId)
      .then(setHabit)
      .then(() => setLoading(false));
  }, [habitId]);

  const mutate = async (cb: () => void) => {
    if (!habit || loading) return;

    setLoading(true);

    cb();
    await habit.save();
    setHabit(habit.rebuild());

    setLoading(false);
  };

  const doToday = () => mutate(() => habit?.doToday());

  const undoToday = () => mutate(() => habit?.undoToday());

  const commentToday = (comment: string) => mutate(() => habit?.commentToday(comment));

  return { loading, habit, doToday, undoToday, commentToday };
};
