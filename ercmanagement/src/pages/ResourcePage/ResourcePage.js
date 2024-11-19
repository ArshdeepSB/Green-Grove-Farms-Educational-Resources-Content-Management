import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './resourcepage.css'; // Import the CSS file

const ResourcesLibrary = ({ searchTerm }) => {
    const [resources, setResources] = useState([]);
    const [error, setError] = useState('');
    const [sortVideosMode, setSortVideosMode] = useState('');
    const [sortArticlesMode, setSortArticlesMode] = useState('');
    const [selectedVideosTopicFilter, setSelectedVideosTopicFilter] = useState('');
    const [selectedArticlesTopicFilter, setSelectedArticlesTopicFilter] = useState('');


    


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
    const articles = filteredResources.filter(resource => resource.youtubeId === '' && 
        (selectedArticlesTopicFilter === '' || resource.topic === selectedArticlesTopicFilter)); // Articles when youtubeId is '0'

    const videos = filteredResources.filter(resource => resource.youtubeId !== '0' && resource.youtubeId && 
        (selectedVideosTopicFilter === '' || resource.topic === selectedVideosTopicFilter)); // Videos when youtubeId is not '0'

    const sortedVideos = videos.sort((a, b) => {
        if (sortVideosMode === 'alphabetical') {
            return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        } else if (sortVideosMode === 'newest') {
            return new Date(b.createDate) - new Date(a.createDate);
        } else if (sortVideosMode === 'oldest') {
            return new Date(a.createDate) - new Date(b.createDate);
        }
        return 0;
    });

    const sortedArticles = articles.sort((a, b) => {
        if (sortArticlesMode === 'alphabetical') {
            return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        } else if (sortArticlesMode === 'newest') {
            return new Date(b.createDate) - new Date(a.createDate);
        } else if (sortArticlesMode === 'oldest') {
            return new Date(a.createDate) - new Date(b.createDate);
        }
        return 0;
    });

    return (
        
        <div className="container">
            <h1>Welcome to Green Groves Farm Education Platform</h1>

            {error && <p className="error-message">{error}</p>}

            <h2 className="section-title">Videos</h2>
            <div className="sort-button-container">
                <div className="topic-filter">
                    <label htmlFor="topic-select"></label>
                    <select
                        id="topic-select"
                        value={selectedVideosTopicFilter}
                        className="sort-button"
                        onChange={(e) => setSelectedVideosTopicFilter(e.target.value)}
                    >
                        <option value="">All Topics</option>
                        <option value="Climate">Climate</option>
                        <option value="Fertilizer">Fertilizer</option>
                        <option value="Farming">Farming</option>
                        <option value="Animals">Animals</option>
                    </select>
                </div>
                <button
                    className={`sort-button ${sortVideosMode === 'alphabetical' ? 'active' : ''}`}
                    onClick={() => setSortVideosMode('alphabetical')}
                >
                    Sort Alphabetically
                </button>
                <button
                    className={`sort-button ${sortVideosMode === 'newest' ? 'active' : ''}`}
                    onClick={() => setSortVideosMode('newest')}
                >
                    Sort by Newest
                </button>
                <button
                    className={`sort-button ${sortVideosMode === 'oldest' ? 'active' : ''}`}
                    onClick={() => setSortVideosMode('oldest')}
                >
                    Sort by Oldest
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
                            <h4>Video topic: {resource.topic}</h4>
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
                <div className="topic-filter">
                    <label htmlFor="topic-select"></label>
                    <select
                        id="topic-select"
                        value={selectedArticlesTopicFilter}
                        className="sort-button"
                        onChange={(e) => setSelectedArticlesTopicFilter(e.target.value)}
                    >
                        <option value="">All Topics</option>
                        <option value="Climate">Climate</option>
                        <option value="Fertilizer">Fertilizer</option>
                        <option value="Farming">Farming</option>
                        <option value="Animals">Animals</option>
                    </select>
                </div>
                <button
                    className={`sort-button ${sortArticlesMode === 'alphabetical' ? 'active' : ''}`}
                    onClick={() => setSortArticlesMode('alphabetical')}
                >
                    Sort Alphabetically
                </button>
                <button
                    className={`sort-button ${sortArticlesMode === 'newest' ? 'active' : ''}`}
                    onClick={() => setSortArticlesMode('newest')}
                >
                    Sort Newest
                </button>
                <button
                    className={`sort-button ${sortArticlesMode === 'oldest' ? 'active' : ''}`}
                    onClick={() => setSortArticlesMode('oldest')}
                >
                    Sort Oldest
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
                            <h4>Topic: {resource.topic}</h4>
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
