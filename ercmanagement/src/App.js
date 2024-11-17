import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ResourcesLibrary from './pages/ResourcePage/ResourcePage';
import AdminRes from './pages/AdminResources';
import AdminLogin from './pages/AdminPage/index';
import UserLogin from './pages/UserPage/index';
import AdminResi from './pages/AdminResources/index2';
import Login from './pages/Signin';
import Signup from './pages/Signup';
import EventsList from './pages/EventRegistration/Events';
import SearchBar from './components/searchBar';
import "./App.css"
import UEventsList from './pages/userEvents';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const AdminNavBar = () => (
    <nav>
      <Link to="/ResourcesLibrary">Resource Library</Link>
      <Link to="/user-events">Events</Link>
      <Link to="/AdminRes">Admin Resources</Link>
      <Link to="/events">Admin Events</Link>
      <Link to="/admin-login">Admin User</Link>
      <button className="role-switch-btn" onClick={() => setIsAdmin(false)}>
          Switch to User
      </button>
    </nav>
  );

  const UserNavBar = () => (
    <nav>
      <Link to="/ResourcesLibrary">Resource Library</Link>
      <Link to="/user-events">Events</Link>
      <Link to="/user-login">User </Link>
      <button className="role-switch-btn" onClick={() => setIsAdmin(true)}>
          Switch to Admin
      </button>
    </nav>
  );

  return (
    <Router>
      <div>
        {isAdmin ? <AdminNavBar /> : <UserNavBar />}
        {!isAdmin && (
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        )}
        <Routes>
          <Route path="/ResourcesLibrary" element={<ResourcesLibrary searchTerm={searchTerm} />}  />
          <Route path="/admin-login" component={<AdminLogin /> } />
          <Route path="/user-login" component={<UserLogin />} />
          <Route path="/AdminRes" element={<AdminRes />} />
          <Route path="/AdminResi" element={<AdminResi />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/events" element={<EventsList />} />
          

          <Route path="/user-events" element={< UEventsList/>} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
