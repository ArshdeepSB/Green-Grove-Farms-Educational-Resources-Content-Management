import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/navbar'; // Import Navbar
import SearchBar from './components/searchBar';
import ResourcesLibrary from './pages/ResourcePage/ResourcePage';
import AdminRes from './pages/AdminResources';
import EventsList from './pages/EventRegistration/Events';
import UEventsList from './pages/userEvents';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleRoleSwitch = () => setIsAdmin(!isAdmin);

  return (
    <Router>
      <div>
        {/* Navbar Component */}
        <Navbar className="Navbar" isAdmin={isAdmin} onRoleSwitch={handleRoleSwitch} />
        <br></br>
        <br></br>

        <br></br>
        

      

       

     


        {/* SearchBar for users */}
        {!isAdmin && <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />}
        
        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ResourcesLibrary" element={<ResourcesLibrary searchTerm={searchTerm} />} />
          <Route path="/events" element={<EventsList />} />
          <Route path="/AdminRes" element={<AdminRes />} />
          <Route path="/user-events" element={<UEventsList searchTerm={searchTerm} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
