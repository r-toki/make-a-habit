import { useEffect, useState } from 'react';

import { HabitDoc, HabitRecordDoc } from '@/fire/docs';
import { useMe } from '@/providers/me';
import { assertDefined } from '@/utils/assert-defined';

export const useHabit = (habitId: string) => {
  const { me } = useMe();

  const [loading, setLoading] = useState(false);

  const [habit, setHabit] = useState<HabitDoc>();
  const [habitRecord, setHabitRecord] = useState<HabitRecordDoc>();

  useEffect(() => {
    (async () => {
      setLoading(true);

      const habit = await me.habitsCollection.findOne(habitId);
      const habitRecord = await habit.habitRecordsCollection.findTodayHabitRecord();

      setHabit(habit);
      setHabitRecord(habitRecord ?? HabitRecordDoc.create(habit.habitRecordsCollection));

      setLoading(false);
    })();
  }, [habitId]);

  const mutate = async (cb: () => void) => {
    if (loading) return;
    assertDefined(habitRecord);

    setLoading(true);

    cb();
    await habitRecord.save();
    setHabitRecord(habitRecord.rebuild());

    setLoading(false);
  };

  const toggleDone = () =>
    mutate(() => {
      assertDefined(habitRecord);
      habitRecord.toggleDone();
    });

  const doComment = (comment: string) =>
    mutate(() => {
      assertDefined(habitRecord);
      habitRecord.doComment(comment);
    });

  return { loading, habit, habitRecord, toggleDone, doComment };
};
