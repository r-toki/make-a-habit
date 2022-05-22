import { HabitDoc } from '@/fire/docs';
import { useMe } from '@/providers/me';

export const useCreateHabit = () => {
  const { me } = useMe();

  const createHabit = async ({
    content,
    targetWeeksCount,
  }: {
    content: string;
    targetWeeksCount: string;
  }) => {
    const habit = HabitDoc.create(me.habitsCollection, {
      content,
      targetWeeksCount: Number(targetWeeksCount),
    });
    await habit.save();
  };

  return { createHabit };
};
