import React from 'react';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ViewMode } from './Containers/ViewMode';
import { Route, Routes } from 'react-router-dom';
import { Settings } from './Containers/Settings';

import { Toolbar } from './Components/Toolbar';
import './App.css';

const pages = [
  { title: 'View Mode', path: '/view-mode' },
  { title: 'Settings', path: '/settings' },
];

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ flexGrow: 1 }} height="100vh">
        <Toolbar pages={pages} />
        <Routes>
          <Route path="/" element={<ViewMode />} />
          <Route path="/view-mode" element={<ViewMode />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Box>
    </LocalizationProvider>
  );
}

export default App;
