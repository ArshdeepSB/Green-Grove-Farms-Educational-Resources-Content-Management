import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import ResourcesLibrary from './pages/ResourcesLibrary';
// import AdminLogin from './pages/AdminLogin';
// import UserLogin from './pages/UserLogin';
// import AdminRes from './pages/AdminRes';
// import AdminResi from './pages/AdminResi';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
import EventsList from './pages/EventRegistration/Events'; // Import the EventsList component
import EventRegistrationPage from './pages/EventRegistration/EventRegistrationPage'; // Import the EventRegistrationPage component
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <nav>
          {/* <Link to="/ResourcesLibrary">Resource Library</Link>
          <Link to="/event-registration">Register For Events</Link>
          <Link to="/AdminRes">AdminRes</Link>
          <Link to="/admin-login">Admin User</Link>
          <Link to="/user-login">User</Link> */}
          <Link to="/events">Events</Link>
          <Link to="/event-registration">Register For Events</Link>
        </nav>

        <Routes>
          <Route path="/events" element={<EventsList />} />
          <Route path="/event-registration" element={<EventRegistrationPage/>} />
          {/* <Route path="/ResourcesLibrary" element={<ResourcesLibrary />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/AdminRes" element={<AdminRes />} />
          <Route path="/AdminResi" element={<AdminResi />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
