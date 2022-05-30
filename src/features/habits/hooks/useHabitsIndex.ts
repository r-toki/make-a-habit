import { query, Timestamp, where } from 'firebase/firestore';
import { orderBy } from 'lodash-es';
import { useEffect, useState } from 'react';

import { HabitDoc, HabitRecordDoc } from '@/fire/docs';
import { useMe } from '@/providers/me';

export const useHabitsIndex = () => {
  const { me } = useMe();

  const [loading, setLoading] = useState(false);

  const [habits, setHabits] = useState<HabitDoc[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const _habits = await me.habitsCollection.findManyByQuery((ref) =>
        query(ref, where('scheduledEndedAt', '>', Timestamp.now()))
      );

      setHabits(
        orderBy(
          _habits.filter((e) => !e.gaveUpAt),
          (h) => h.startedAt,
          'desc'
        )
      );

      setLoading(false);
    })();
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

export const useHabitsIndexHabitItem = (habit: HabitDoc) => {
  const [loading, setLoading] = useState(false);

  const [habitRecord, setHabitRecord] = useState<HabitRecordDoc>();

  useEffect(() => {
    (async () => {
      setLoading(true);

      const _habit = await habit.habitRecordsCollection.findTodayHabitRecord();
      setHabitRecord(_habit);

      setLoading(false);
    })();
  }, [habit]);

  return { loading, habitRecord };
};
