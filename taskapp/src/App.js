import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TaskDashboard from './Components/Taskdashboard/Taskdashboard.jsx';
import TaskDetails from './Components/Taskdetail/Taskdetail.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/tasks" element={<TaskDashboard />} />
      <Route path="/tasks/:id" element={<TaskDetails />} />
    </Routes>
  );
};

export default App;