import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import ProjectPage from './pages/ProjectPage';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/project/:id" element={<ProjectPage />} />
    </Routes>
  );
}

export default AppRouter;
