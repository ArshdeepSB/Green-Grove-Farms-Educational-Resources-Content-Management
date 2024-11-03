import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ResourceLibrary from './components/ResourcePage';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation */}
        <nav>
          <Link to="/resources">Resource Library</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/resources" element={<ResourceLibrary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
