import { HabitDoc } from '@/fire/docs';
import { useMe } from '@/providers/me';

export const useCreateHabit = () => {
  const { me } = useMe();

  const createHabit = async ({
    content,
    targetDaysOfWeek,
  }: {
    content: string;
    targetDaysOfWeek: string[];
  }) => {
    const habit = HabitDoc.create(me.habitsCollection, { content, targetDaysOfWeek });
    await habit.save();
  };

  return { createHabit };
};
