import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventRegistrationPage from './EventRegistrationPage'; // Import the EventRegistrationPage component

const EventsList = () => {
    const [events, setEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [newEvent, setNewEvent] = useState({ name: '', description: '', date: '', location: '' });
    const [editEvent, setEditEvent] = useState(null);

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

    const handleRegisterClick = (eventId) => {
        setSelectedEventId(eventId);
    };

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
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await axios.delete(`/api/events/${eventId}`);
            setEvents(events.filter(event => event._id !== eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleEditEvent = (event) => {
        setEditEvent(event);
    };

    const handleUpdateEvent = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/events/${editEvent._id}`, editEvent);
            setEvents(events.map(event => (event._id === editEvent._id ? response.data : event)));
            setEditEvent(null);
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditEvent({ ...editEvent, [name]: value });
    };

    return (
        <div>
            <h2>All Events</h2>
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

            <div>
                {events.map(event => (
                    <div key={event._id} style={{ border: '1px solid #ccc', padding: '16px', margin: '16px 0' }}>
                        <h3>{event.name}</h3>
                        <p>{event.description}</p>
                        <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                        <p>Location: {event.location}</p>
                        <button onClick={() => handleRegisterClick(event._id)}>Register</button>
                        <button onClick={() => handleDeleteEvent(event._id)}>Delete</button>
                        <button onClick={() => handleEditEvent(event)}>Edit</button>
                        {selectedEventId === event._id && (
                            <EventRegistrationPage eventId={event._id} />
                        )}
                    </div>
                ))}
            </div>

            {editEvent && (
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
            )}
        </div>
    );
};

export default EventsList;