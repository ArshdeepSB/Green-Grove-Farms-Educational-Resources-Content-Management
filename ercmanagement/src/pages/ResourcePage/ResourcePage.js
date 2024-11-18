import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './resourcepage.css'; // Import the CSS file

const ResourcesLibrary = ({ searchTerm }) => {
    const [resources, setResources] = useState([]);
    const [error, setError] = useState('');
    const [sortVideosByNewest, setSortVideosByNewest] = useState(false);
    const [sortArticlesByNewest, setSortArticlesByNewest] = useState(false);


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

    const sortedVideos = videos.sort((a, b) => {
        const dateA = new Date(a.createDate);
        const dateB = new Date(b.createDate);
        return sortVideosByNewest ? dateB - dateA : dateA - dateB;
    });


    const sortedArticles = articles.sort((a, b) => {
        const dateA = new Date(a.createDate);
        const dateB = new Date(b.createDate);
        return sortArticlesByNewest ? dateB - dateA : dateA - dateB;
    });


    return (
        
        <div className="container">
            <h1>Green Groves Farm Education Platform</h1>

            {error && <p className="error-message">{error}</p>}

            <h2 className="section-title">Videos</h2>
            <div className="sort-button-container">
                <button
                    className={`sort-button ${sortVideosByNewest ? 'active' : ''}`}
                    onClick={() => setSortVideosByNewest(!sortVideosByNewest)}
                >
                    {sortVideosByNewest ? 'Newest to Oldest' : 'Oldest to Newest'}
                </button>
            </div>
            {videos.length === 0 ? (
                <p>No videos that match your search</p>
            ) : (
                <div className="video-container">
                    {sortedVideos.map((resource) => (
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
            <div className="sort-button-container">
                <button
                    className={`sort-button ${sortArticlesByNewest ? 'active' : ''}`}
                    onClick={() => setSortArticlesByNewest(!sortArticlesByNewest)}
                >
                    {sortArticlesByNewest ? 'Newest to Oldest' : 'Oldest to Newest'}
                </button>
            </div>
            {sortedArticles.length === 0 ? (
                <p>No articles or tutorials that match your search</p>
            ) : (
                <div className="article-container section">
                    {sortedArticles.map((resource) => (
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
