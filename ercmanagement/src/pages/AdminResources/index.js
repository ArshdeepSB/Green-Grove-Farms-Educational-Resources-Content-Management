import React, { useState } from 'react';

const AdminRes = () => {
    // State variables to hold form input values
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [youtubeId, setYoutubeId] = useState('');
    const [message, setMessage] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const resourceData = {
            title,
            link,
            description,
            youtubeId,
        };

        try {
            const response = await fetch('http://localhost:5002/api/createResource', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(resourceData),
            });

            if (response.ok) {
                setMessage('Resource added successfully!');
                // Clear the form
                setTitle('');
                setLink('');
                setDescription('');
                setYoutubeId('');
            } else {
                throw new Error('Error adding resource');
            }
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div>
            <h1>Add New Resource</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Link:
                        <input
                            type="url"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        YouTube ID:
                        <input
                            type="text"
                            value={youtubeId}
                            onChange={(e) => setYoutubeId(e.target.value)}
                            
                        />
                    </label>
                </div>
                <button type="submit">Add Resource</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AdminRes;
