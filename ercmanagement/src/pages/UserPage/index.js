import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [user, setUser] = useState(null);
    const history = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            history.push('/login');
        } else {
            // Verify the token with the backend if necessary
            setUser(true); // For demonstration, we set user to true if token exists
        }
    }, [history]);

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            {user && <p>You are logged in!</p>}
        </div>
    );
};

export default Home;
