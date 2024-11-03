import React from 'react';
import './resourcepage.css'; // Optional: Add CSS styling

// Sample data for resources
const resources = [
  {
    category: 'Articles',
    items: [
      {
        title: 'Sustainable Farming 101',
        description: 'An introductory guide to sustainable farming practices.',
        link: 'https://example.com/sustainable-farming-101'
      },
      {
        title: 'Organic Certification Process',
        description: 'Step-by-step guide to get certified for organic farming.',
        link: 'https://example.com/organic-certification'
      }
    ]
  },
  {
    category: 'Tutorials',
    items: [
      {
        title: 'Composting for Beginners',
        description: 'A video tutorial on how to start composting at home.',
        link: 'https://example.com/composting-tutorial'
      },
      {
        title: 'Soil Health Improvement',
        description: 'Learn how to improve soil health naturally.',
        link: 'https://example.com/soil-health'
      }
    ]
  },
  {
    category: 'Videos',
    items: [
      {
        title: 'Sustainable Water Usage in Farming',
        description: 'A documentary on water conservation techniques in farming.',
        link: 'https://example.com/water-usage-video'
      },
      {
        title: 'The Future of Organic Farming',
        description: 'An insightful video on the future trends in organic farming.',
        link: 'https://example.com/future-organic-farming'
      }
    ]
  }
];

const ResourceLibrary = () => {
  return (
    <div className="resource-library">
      <h1>Resource Library</h1>
      <p>Explore articles, tutorials, and videos on sustainable farming practices, organic certification, and product usage.</p>

      {/* Render each resource category */}
      {resources.map((resourceCategory) => (
        <div key={resourceCategory.category} className="resource-category">
          <h2>{resourceCategory.category}</h2>
          <ul>
            {resourceCategory.items.map((resource, index) => (
              <li key={index} className="resource-item">
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <a href={resource.link} target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ResourceLibrary;
