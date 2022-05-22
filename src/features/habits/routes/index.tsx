import { Route, Routes } from 'react-router-dom';

import { Habits } from './Habits';
import { NewHabit } from './NewHabit';

export const HabitsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Habits />} />
      <Route path="new" element={<NewHabit />} />
    </Routes>
  );
};
