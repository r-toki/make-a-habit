import { useEffect, useState } from 'react';

import { HabitDoc } from '@/fire/docs';
import { useMe } from '@/providers/me';
import { assertDefined } from '@/utils/assert-defined';

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

  const toggleDone = () =>
    mutate(async () => {
      assertDefined(habit);
      habit.toggleDoneToday();
    });

  const doComment = (comment: string) =>
    mutate(async () => {
      assertDefined(habit);
      habit.doCommentToday(comment);
    });

  return { loading, habit, toggleDone, doComment };
};
