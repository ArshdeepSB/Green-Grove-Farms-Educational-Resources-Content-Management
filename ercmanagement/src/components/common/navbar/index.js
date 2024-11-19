import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Navbar = ({ isAdmin, onRoleSwitch }) => {
  return (
    // <nav className='navbar'>
    //   <Link to="/">Home</Link>
    //   <Link to="/ResourcesLibrary">Resource Library</Link>
    //   <Link to="/user-events">Events</Link>
    //   {isAdmin && <Link to="/AdminRes">Manage Resources</Link>}
    //   {isAdmin && <Link to="/events">Manage Events</Link>}
    //   <button className="role-switch-btn" onClick={onRoleSwitch}>
    //     {isAdmin ? 'Switch to User' : 'Switch to Admin'}
    //   </button>
    // </nav>
    <header className="header">
    <Link to='/'><a href='/' className="logo">GreenFarms.</a></Link>
        <nav className="navbar">
            <a href="/">Home</a>
            <a href="/ResourcesLibrary">Resource Library</a>
            <a href="/user-events">Events</a>

            {isAdmin && <a href="/AdminRes">Manage Resources</a>}
            {isAdmin && <a href="/events">Manage Events</a> }
        <a  onClick={onRoleSwitch}>
            {isAdmin ? 'Switch to User' : 'Switch to Admin'}
        </a>
            

        </nav>
    
</header>
  );
};

export default Navbar;
