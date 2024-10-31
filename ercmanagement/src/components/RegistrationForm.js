// src/components/RegistrationForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createEvent } from 'ics';
const eventDetails = {
    name: 'React Basics Workshop',
    date: { year: 2024, month: 11, day: 10 },
    time: { hour: 14, minute: 0 },
    location: 'Online - Zoom',
  };
  

const RegistrationForm = ({ eventDetails = { name: "Sample Event", date: { year: 2024, month: 11, day: 15 }, time: { hour: 14, minute: 0 }, location: "Online - Zoom" } }) => {


    const generateICS = (values) => {
        const { name, email } = values;
      
        const event = {
          start: [eventDetails.date.year, eventDetails.date.month, eventDetails.date.day, eventDetails.time.hour, eventDetails.time.minute],
          duration: { hours: 1, minutes: 0 },
          title: eventDetails.name,
          description: `Event registration for ${name}`,
          location: eventDetails.location,
          url: 'https://example.com', // Add a URL if needed
          organizer: { name: 'Event Organizer', email: 'organizer@example.com' },
          attendees: [{ name, email }],
        };
      
        createEvent(event, (error, value) => {
          if (error) {
            console.error('Error creating .ics file:', error);  // Log any errors
            return;
          }
          const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${eventDetails.name}.ics`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url); // Clean up the URL
        });
      };
      
  return (
    <Formik
      initialValues={{ name: '', email: '' }}
      validationSchema={Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
      })}
      onSubmit={(values, { resetForm }) => {
        generateICS(values);
        resetForm();
      }}
    >
      <Form>
        <label htmlFor="name">Name:</label>
        <Field name="name" />
        <ErrorMessage name="name" component="div" />

        <label htmlFor="email">Email:</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" component="div" />

        <button type="submit">Register & Download Invite</button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
