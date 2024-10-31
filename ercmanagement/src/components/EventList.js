// src/EventList.js
import React from 'react';
import { Link } from 'react-router-dom';
import mockEvents from './mockData';

function EventList() {
  return (
    <div>
      <h1>Available Events</h1>
      {mockEvents.map((event) => (
        <div key={event.id} style={{ marginBottom: '20px' }}>
          <h2>{event.name}</h2>
          <p>{event.description}</p>
          <p>Date: {event.date.month}/{event.date.day}/{event.date.year}</p>
          <p>Time: {event.time.hour}:{event.time.minute.toString().padStart(2, '0')}</p>
          <p>Location: {event.location}</p>
          <Link to={`/register/${event.id}`}>Register</Link>
        </div>
      ))}
    </div>
  );
}

export default EventList;
