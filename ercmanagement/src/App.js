import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ResourcesLibrary from './pages/ResourcePage/ResourcePage';
import AdminRes from './pages/AdminResources';
import AdminLogin from './pages/AdminPage/index';
import UserLogin from './pages/UserPage/index';
import AdminResi from './pages/AdminResources/index2';
import Login from './pages/Signin';
import Signup from './pages/Signup';
import EventsList from './pages/EventRegistration/Events'; // Import the EventsList component
import SearchBar from './components/searchBar';
import "./App.css"
import UEventsList from './pages/userEvents';

function App() {
  const [searchTerm, setSearchTerm] = useState(''); // State to manage search term

  return (
    <Router>
      <div>
        <nav>
          <Link to="/ResourcesLibrary">Resource Library</Link>
          <Link to="/events">Admin Events</Link>
          <Link to="/AdminRes">Admin Resources</Link>
          <Link to="/user-events">Events</Link>
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </nav>

        <Routes>
          <Route path="/ResourcesLibrary" element={<ResourcesLibrary searchTerm={searchTerm} />}  />
          <Route path="/events" element={<EventsList />} />
          <Route path="/AdminRes" element={<AdminRes />} />

          <Route path="/user-events" element={< UEventsList/>} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
