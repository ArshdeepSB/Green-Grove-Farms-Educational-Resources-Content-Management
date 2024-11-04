const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection URI
const uri = 'mongodb+srv://tester123:test111@fiascluster.ghdz6o3.mongodb.net/fias-green-info?retryWrites=true&w=majority&appName=FIASCluster';

// Connect to MongoDB
mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Define a schema for resources
const resourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    description: { type: String, required: true },
    youtubeId: { type: String, required: false },
});

// Create a model for resources
const Resource = mongoose.model('resourceInfo', resourceSchema);

// Define a route to handle resource creation
app.post('/api/createResource', async (req, res) => {
    const { title, link, description, youtubeId } = req.body;
    const newResource = new Resource({ title, link, description, youtubeId });

    try {
        await newResource.save();
        res.status(201).send('Resource created successfully');
    } catch (error) {
        res.status(500).send('Error creating resource: ' + error.message);
    }
});

// Define a route to retrieve all resources
app.get('/api/resourceInfo', async (req, res) => {
    try {
        const resources = await Resource.find(); // Fetch all resources
        res.status(200).json(resources); // Send the resources as a JSON response
    } catch (error) {
        res.status(500).send('Error retrieving resources: ' + error.message);
    }
});

// Define a route to retrieve a specific resource by ID
app.get('/api/resourceInfo/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const resource = await Resource.findById(id); // Fetch the resource by ID
        if (!resource) {
            return res.status(404).send('Resource not found');
        }
        res.status(200).json(resource); // Send the resource as a JSON response
    } catch (error) {
        res.status(500).send('Error retrieving resource: ' + error.message);
    }
});

// Change the port if necessary
const port = process.env.PORT || 5002;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
