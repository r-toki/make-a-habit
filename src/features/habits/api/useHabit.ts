import { useEffect, useState } from 'react';

import { HabitDoc } from '@/fire/docs';
import { useMe } from '@/providers/me';

export const useHabit = (habitId: string) => {
  const { me } = useMe();

  const [habit, setHabit] = useState<HabitDoc>();

  useEffect(() => {
    me.habitsCollection.findOne(habitId).then(setHabit);
  }, [habitId]);

  return { habit };
};
