import { useEffect, useState } from 'react';

import { HabitDoc, HabitRecordDoc, habitRecordsWithBlankFilled } from '@/fire/docs';
import { useMe } from '@/providers/me';

export const useHabitHistoriesIndex = (habitId: string) => {
  const { me } = useMe();

  const [loading, setLoading] = useState(false);

  const [habit, setHabit] = useState<HabitDoc>();
  const [habitRecords, setHabitRecords] = useState<HabitRecordDoc[]>();

  useEffect(() => {
    (async () => {
      setLoading(true);

      const habit = await me.habitsCollection.findOne(habitId);
      const _habitRecords = await habit.habitRecordsCollection.findManyByQuery((ref) => ref);

      setHabit(habit);
      setHabitRecords(habitRecordsWithBlankFilled(habit, _habitRecords));

      setLoading(false);
    })();
  }, [habitId]);

  return { loading, habit, habitRecords };
};
