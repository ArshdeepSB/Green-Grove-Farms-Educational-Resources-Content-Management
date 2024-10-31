// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventList from './components/EventList';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/register/:eventId" element={<RegistrationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
