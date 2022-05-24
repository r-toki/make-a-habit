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

  const doToday = async () => {
    if (!habit || loading) return;

    setLoading(true);

    habit.doToday();
    await habit.save();
    setHabit(habit.rebuild());

    setLoading(false);
  };

  const undoToday = async () => {
    if (!habit || loading) return;

    setLoading(true);

    habit.undoToday();
    await habit.save();
    setHabit(habit.rebuild());

    setLoading(false);
  };

  const commentToday = async (comment: string) => {
    if (!habit || loading) return;

    setLoading(true);

    habit.commentToday(comment);
    await habit.save();
    setHabit(habit.rebuild());

    setLoading(false);
  };

  return { loading, habit, doToday, undoToday, commentToday };
};
