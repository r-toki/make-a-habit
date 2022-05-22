import { useEffect, useState } from 'react';

import { HabitDoc } from '@/fire/docs';
import { useMe } from '@/providers/me';

export const useHabit = (habitId: string) => {
  const { me } = useMe();

  const [habit, setHabit] = useState<HabitDoc>();

  useEffect(() => {
    me.habitsCollection.findOne(habitId).then(setHabit);
  }, [habitId]);

  const doToday = async () => {
    if (!habit) return;
    habit.doToday();
    await habit.save();
    setHabit(new HabitDoc({ id: habit.id, ref: habit.ref, data: () => habit.data }));
  };

  const undoToday = async () => {
    if (!habit) return;
    habit.undoToday();
    await habit.save();
    setHabit(new HabitDoc({ id: habit.id, ref: habit.ref, data: () => habit.data }));
  };

  return { habit, doToday, undoToday };
};
