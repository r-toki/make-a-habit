import { useEffect, useState } from 'react';

import { HabitDoc, HabitRecord } from '@/fire/docs';
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
      const todayHabitRecord = habit.todayHabitRecord;
      if (todayHabitRecord) {
        habit.insertHabitRecord(new HabitRecord(todayHabitRecord).toggleDone(true).data);
      } else {
        habit.insertHabitRecord(HabitRecord.create().toggleDone().data);
      }
    });

  const doComment = (comment: string) =>
    mutate(async () => {
      assertDefined(habit);
      const todayHabitRecord = habit.todayHabitRecord;
      if (todayHabitRecord) {
        habit.insertHabitRecord(new HabitRecord(todayHabitRecord).doComment(comment).data);
      } else {
        habit.insertHabitRecord(HabitRecord.create().doComment(comment).data);
      }
    });

  return { loading, habit, toggleDone, doComment };
};
