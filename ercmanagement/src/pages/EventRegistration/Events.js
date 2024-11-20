import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

const EventsList = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ name: '', description: '', date: '', location: '' });
    const [editEvent, setEditEvent] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [showRegisteredUsersModal, setShowRegisteredUsersModal] = useState(false);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5002/api/createEvent', newEvent);
            setEvents([...events, response.data]);
            setNewEvent({ name: '', description: '', date: '', location: '' });
            setShowCreateModal(false); // Close modal after creating
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await axios.delete(`http://localhost:5002/api/events/${eventId}`);
            setEvents(events.filter(event => event._id !== eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleEditEvent = (event) => {
        setEditEvent(event);
        setShowEditModal(true); // Show the edit modal
    };

    const handleUpdateEvent = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5002/api/events/${editEvent._id}`, editEvent);
            setEvents(events.map(event => (event._id === editEvent._id ? response.data : event)));
            setEditEvent(null);
            
            setShowEditModal(false); // Close modal after updating
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditEvent({ ...editEvent, [name]: value });
    };

    const handleRegisterClick = (event) => {
        setSelectedEvent(event);
        setShowRegisterModal(true);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5002/api/registerEvent', { email, name, eventId: selectedEvent._id });
            setMessage(response.data.message || 'Registration successful!');
            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            setMessage('Error registering for event: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    const handleShowRegisteredUsers = async (eventId) => {
        try {
            const response = await axios.get(`http://localhost:5002/api/regInfo/${eventId}`);
            setRegisteredUsers(response.data);
            console.log('Registered users:', response.data);
            setShowRegisteredUsersModal(true);
        } catch (error) {
            console.error('Error fetching registered users:', error);
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
                            <button onClick={() => handleDeleteEvent(event._id)}>Delete</button>
                            <button onClick={() => handleEditEvent(event)}>Edit</button>
                            <button onClick={() => handleShowRegisteredUsers(event._id)}>Registered Users</button>
                        </div>
                    </div>
                ))}
            </div>
            <button
                className="plus-button"
                onClick={() => setShowCreateModal(true)}
            >
                +
            </button>

            {/* Create Event Modal */}
            {showCreateModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowCreateModal(false)}>&times;</span>
                        <form onSubmit={handleCreateEvent}>
                            <h3>Create New Event</h3>
                            <label>
                                Name:
                                <input type="text" name="name" value={newEvent.name} onChange={handleInputChange} required />
                            </label>
                            <br />
                            <label>
                                Description:
                                <textarea name="description" value={newEvent.description} onChange={handleInputChange} required />
                            </label>
                            <br />
                            <label>
                                Date:
                                <input type="date" name="date" value={newEvent.date} onChange={handleInputChange} required />
                            </label>
                            <br />
                            <label>
                                Location:
                                <input type="text" name="location" value={newEvent.location} onChange={handleInputChange} required />
                            </label>
                            <br />
                            <button type="submit">Create Event</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Event Modal */}
            {showEditModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowEditModal(false)}>&times;</span>
                        <form onSubmit={handleUpdateEvent}>
                            <h3>Edit Event</h3>
                            <label>
                                Name:
                                <input type="text" name="name" value={editEvent.name} onChange={handleEditInputChange} required />
                            </label>
                            <br />
                            <label>
                                Description:
                                <textarea name="description" value={editEvent.description} onChange={handleEditInputChange} required />
                            </label>
                            <br />
                            <label>
                                Date:
                                <input type="date" name="date" value={editEvent.date} onChange={handleEditInputChange} required />
                            </label>
                            <br />
                            <label>
                                Location:
                                <input type="text" name="location" value={editEvent.location} onChange={handleEditInputChange} required />
                            </label>
                            <br />
                            <button type="submit">Update Event</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Register Event Modal */}
            {showRegisterModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowRegisterModal(false)}>&times;</span>
                        <form onSubmit={handleRegister}>
                            <h3>Register for {selectedEvent?.name}</h3>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </label>
                            <br></br>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </label>
                            <br />
                            <button type="submit">Register</button>
                        </form>
                        {message && <p>{message}</p>}
                    </div>
                </div>
            )}

            {showRegisteredUsersModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowRegisteredUsersModal(false)}>&times;</span>
                        <h3>Registered Users</h3>
                        <ul>
                            {registeredUsers.map(user => (
                                <li key={user._id}>
                                    {user.name} - {user.email} - {new Date(user.registration_date).toLocaleDateString()}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventsList;
