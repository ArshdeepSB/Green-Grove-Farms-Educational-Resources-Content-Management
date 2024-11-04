import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ResourcesLibrary from './components/ResourcePage';
import AdminRes from './pages/AdminResources';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation */}
        <nav>
          <Link to="/ResourcesLibrary">Resource Library</Link>
          <Link to="/">Register For Events</Link>
          <Link to="/AdminRes">AdminRes</Link>

        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/ResourcesLibrary" element={<ResourcesLibrary />} />
          <Route path="/AdminRes" element={<AdminRes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
