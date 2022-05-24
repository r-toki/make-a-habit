import { Route, Routes } from 'react-router-dom';

import { HabitHistoriesIndex } from './HabitHistoriesIndex';
import { HabitsAllIndex } from './HabitsAllIndex';
import { HabitShow } from './HabitShow';
import { HabitsIndex } from './HabitsIndex';
import { HabitsNew } from './HabitsNew';

export const HabitsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<HabitsIndex />} />
      <Route path="new" element={<HabitsNew />} />
      <Route path=":habitId" element={<HabitShow />} />
      <Route path="all" element={<HabitsAllIndex />} />
      <Route path=":habitId/histories" element={<HabitHistoriesIndex />} />
    </Routes>
  );
};
