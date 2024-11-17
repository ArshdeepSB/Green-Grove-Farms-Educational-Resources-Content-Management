import React, { useState } from 'react';
import axios from 'axios';

const EventRegistration = ({ eventId }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5002/api/registerEvent', { email, eventId });
            setMessage(response.data.message || 'Registration successful!');
        } catch (error) {
            setMessage('Error registering for event: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <div>
            <h3>Register for this Event</h3>
            <form onSubmit={handleRegister}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EventRegistration;