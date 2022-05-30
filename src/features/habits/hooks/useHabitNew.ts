import { HabitDoc } from '@/fire/docs';
import { useMe } from '@/providers/me';

export const useHabitsNew = () => {
  const { me } = useMe();

  const createHabit = async ({
    content,
    targetDaysCount,
  }: {
    content: string;
    targetDaysCount: number;
  }) => {
    const habit = HabitDoc.create(me.habitsCollection, {
      content,
      targetDaysCount,
    });
    await habit.save();
  };

  return { createHabit };
};
