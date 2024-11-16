import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ResourcesLibrary from './pages/ResourcePage/ResourcePage';
import AdminRes from './pages/AdminResources';
import AdminLogin from './pages/AdminPage/index';
import UserLogin from './pages/UserPage/index';
import AdminResi from './pages/AdminResources/index2';
import Login from './pages/Signin';
import Signup from './pages/Signup';
import SearchBar from './components/searchBar';
import "./App.css"

function App() {
  const [searchTerm, setSearchTerm] = useState(''); // State to manage search term

  return (
    <Router>
      <div>
        <nav>
          <Link to="/ResourcesLibrary">Resource Library</Link>
          <Link to="/">Register For Events</Link>
          <Link to="/AdminRes">AdminRes</Link>
          <Link to="/admin-login">Admin User</Link>
          <Link to="/user-login">User </Link>
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </nav>

        <Routes>
          <Route path="/ResourcesLibrary" element={<ResourcesLibrary searchTerm={searchTerm} />}  />
          <Route path="/admin-login" component={<AdminLogin /> } />
          <Route path="/user-login" component={<UserLogin />} />
          <Route path="/AdminRes" element={<AdminRes />} />
          <Route path="/AdminResi" element={<AdminResi />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
