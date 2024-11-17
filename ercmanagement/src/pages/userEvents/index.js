import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

const UEventsList = () => {
    const [events, setEvents] = useState([]);

    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/events');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);





    const handleRegisterClick = (event) => {
        setSelectedEvent(event);
        setShowRegisterModal(true);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5002/api/registerEvent', { email, name, eventId: selectedEvent._id });
            setMessage(response.data.message || 'Registration successful!');
        } catch (error) {
            setMessage('Error registering for event: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <div className="events-container">
            <h2>All Events</h2>

            <div className="events-grid">
                {events.map(event => (
                    <div key={event._id} className="event-card">
                        <h3>{event.name}</h3>
                        <p>{event.description}</p>
                        <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                        <p>Location: {event.location}</p>
                        <div className="event-actions">
                            <button onClick={() => handleRegisterClick(event)}>Register</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Register Event Modal */}
            {showRegisterModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowRegisterModal(false)}>&times;</span>
                        <form onSubmit={handleRegister}>
                            <h3>Register for {selectedEvent?.name} Event</h3>
                            <label>
                                Name:
                            </label>
                            <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            <br></br>
                            <label>
                                Email:
                                
                            </label>
                            <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            <br />
                            <button type="submit">Register</button>
                        </form>
                        {message && <p>{message}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UEventsList;
