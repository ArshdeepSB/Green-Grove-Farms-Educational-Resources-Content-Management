import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './resourcepage.css'; // Import the CSS file

const ResourcesLibrary = ({searchTerm}) => {
    const [resources, setResources] = useState([]);
    const [error, setError] = useState('');

    // Fetch all resources on component mount
    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/resourceInfo');
                setResources(response.data);
            } catch (err) {
                console.error('Error fetching resources:', err);
                setError('Error fetching resources. Please try again later.');
            }
        };

        fetchResources();
    }, []);

    const filteredResources = resources.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    

    // Filter resources into articles and videos
    const articles = filteredResources.filter(resource => resource.youtubeId === ''); // Articles when youtubeId is '0'
    const videos = filteredResources.filter(resource => resource.youtubeId !== '0' && resource.youtubeId); // Videos when youtubeId is not '0'

    return (
        <div className="container">
            <h1>Resources Library</h1>
            {error && <p className="error-message">{error}</p>}

            <h2 className="section-title">Videos</h2>
            {videos.length === 0 ? (
                <p>No videos available at this time.</p>
            ) : (
                <div className="video-container">
                    {videos.map((resource) => (
                        <div key={resource._id} className="video-item">
                            <h3 style={{ margin: '0' }}>{resource.title}</h3>
                            <p>{resource.description}</p>
                            <a href={resource.link} target="_blank" rel="noopener noreferrer" className="resource-link">
                                Visit Resource
                            </a>
                            <div className="video-frame">
                                <h4 style={{ margin: '10px 0 5px 0' }}>Video:</h4>
                                <iframe
                                    src={`https://www.youtube.com/embed/${resource.youtubeId}`}
                                    title={resource.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <h2 className="article-title">Articles & Tutorials</h2>
            {articles.length === 0 ? (
                <p>No articles or tutorials available at this time.</p>
            ) : (
                <div className="article-container section">
                    {articles.map((resource) => (
                        <div key={resource._id} className="article-item">
                            <h3 style={{ margin: '0' }}>{resource.title}</h3>
                            <p>{resource.description}</p>
                            <a href={resource.link} target="_blank" rel="noopener noreferrer" className="resource-link">
                                Visit Resource
                            </a>
                        </div>
                    ))}
                </div>
               
                
                
            )}
        </div>
    );
};

export default ResourcesLibrary;
