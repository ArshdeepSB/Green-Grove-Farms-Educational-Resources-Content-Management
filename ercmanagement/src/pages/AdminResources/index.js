import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; 

const AdminRes = () => {
    const [resources, setResources] = useState([]);
    const [newResource, setNewResource] = useState({
        title: '',
        link: '',
        description: '',
        topic: '',
        youtubeId: '',
    });
    const [editResource, setEditResource] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/resourceInfo');
                setResources(response.data);
            } catch (error) {
                console.error('Error fetching resources:', error);
            }
        };

        fetchResources();
    }, [resources]);

    // Separate videos and articles
    const videos = resources.filter(resource => resource.youtubeId && resource.youtubeId !== '0');
    const articles = resources.filter(resource => !resource.youtubeId || resource.youtubeId === '0');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewResource({ ...newResource, [name]: value });
    };

    const handleCreateResource = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5002/api/createResource', newResource);
            setResources([...resources, response.data]);
            setNewResource({ title: '', link: '', description: '', topic: '', youtubeId: '' });
            setShowCreateModal(false); 
        } catch (error) {
            console.error('Error creating resource:', error);
        }
    };

    const handleDeleteResource = async (resourceId) => {
        try {
            await axios.delete(`http://localhost:5002/api/resourceInfo/${resourceId}`);
            setResources(resources.filter(resource => resource._id !== resourceId));
        } catch (error) {
            console.error('Error deleting resource:', error);
        }
    };

    const handleEditResource = (resource) => {
        setEditResource(resource);
        setShowEditModal(true); 
    };

    const handleUpdateResource = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5002/api/resourceInfo/${editResource._id}`, editResource);
            setResources(resources.map(resource => (resource._id === editResource._id ? response.data : resource)));
            setEditResource(null);
            setShowEditModal(false); 
        } catch (error) {
            console.error('Error updating resource:', error);
        }
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditResource({ ...editResource, [name]: value });
    };

    return (
        <div className="resources-container">
            <h2>All Resources</h2>

            {/* Videos Section */}
            <h3>Videos</h3>
            <div className="videos-grid">
                {videos.map(video => (
                    <div key={video._id} className="resource-card">
                        <h3>{video.title}</h3>
                        <p>{video.description}</p>
                        <h4>Topic: {video.topic}</h4>
                        <p>
                            <a href={video.link} target="_blank" rel="noopener noreferrer">
                                Visit Resource
                            </a>
                        </p>
                        <div className="video-frame">
                            <iframe
                                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                                title={video.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="resource-actions">
                            <button onClick={() => handleDeleteResource(video._id)}>Delete</button>
                            <button onClick={() => handleEditResource(video)}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Articles Section */}
            <h3>Articles</h3>
            <div className="articles-grid">
                {articles.map(article => (
                    <div key={article._id} className="resource-card">
                        <h3>{article.title}</h3>
                        <p>{article.description}</p>
                        <h4>Topic: {article.topic}</h4>

                        <p>
                            <a href={article.link} target="_blank" rel="noopener noreferrer">
                                Visit Resource
                            </a>
                        </p>
                        <div className="resource-actions">
                            <button onClick={() => handleDeleteResource(article._id)}>Delete</button>
                            <button onClick={() => handleEditResource(article)}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="plus-button" onClick={() => setShowCreateModal(true)}>
                +
            </button>

            {/* Create Resource Modal */}
            {showCreateModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowCreateModal(false)}>
                            &times;
                        </span>
                        <form onSubmit={handleCreateResource}>
                            <h3>Create New Resource</h3>
                            <label>
                                Title:
                                <input
                                    type="text"
                                    name="title"
                                    value={newResource.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <br />
                            <label>
                                Link:
                                <input
                                    type="url"
                                    name="link"
                                    value={newResource.link}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <br />
                            <label>
                                Description:
                                <textarea
                                    name="description"
                                    value={newResource.description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <br />
                            <label>
                                Topic:
                                <input name="topic"
                                value={newResource.topic}
                                onChange={handleInputChange}
                                required
                                />
                            </label>
                            <br />
                            <label>
                                YouTube ID:
                                <input
                                    type="text"
                                    name="youtubeId"
                                    value={newResource.youtubeId}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <br />
                            <button type="submit">Create Resource</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Resource Modal */}
            {showEditModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowEditModal(false)}>
                            &times;
                        </span>
                        <form onSubmit={handleUpdateResource}>
                            <h3>Edit Resource</h3>
                            <label>
                                Title:
                                <input
                                    type="text"
                                    name="title"
                                    value={editResource.title}
                                    onChange={handleEditInputChange}
                                    required
                                />
                            </label>
                            <br />
                            <label>
                                Link:
                                <input
                                    type="url"
                                    name="link"
                                    value={editResource.link}
                                    onChange={handleEditInputChange}
                                    required
                                />
                            </label>
                            <br />
                            <label>
                                Description:
                                <textarea
                                    name="description"
                                    value={editResource.description}
                                    onChange={handleEditInputChange}
                                    required
                                />
                            </label>
                            <br />
                            <label>
                                Topic:
                                <input name="topic"
                                value={editResource.topic}
                                onChange={handleEditInputChange}
                                required
                                />
                            </label>
                            <br/>
                            <label>
                                YouTube ID:
                                <input
                                    type="text"
                                    name="youtubeId"
                                    value={editResource.youtubeId}
                                    onChange={handleEditInputChange}
                                />
                            </label>
                            <br />
                            <button type="submit">Update Resource</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminRes;
