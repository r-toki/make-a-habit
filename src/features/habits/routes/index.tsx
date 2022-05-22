import { Route, Routes } from 'react-router-dom';

import { NewHabit } from './new';

export const HabitsRoutes = () => {
  return (
    <Routes>
      <Route path="new" element={<NewHabit />} />
    </Routes>
  );
};
