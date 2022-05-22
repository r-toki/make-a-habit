import { HabitDoc } from '../../../fire/docs';
import { useMe } from '../../../providers/me';

export const useCreateHabit = () => {
  const { me } = useMe();

  const createHabit = async ({ content, days }: { content: string; days: string[] }) => {
    const habit = HabitDoc.create(me.habitsCollection, { content, days });
    await habit.save();
  };

  return { createHabit };
};
