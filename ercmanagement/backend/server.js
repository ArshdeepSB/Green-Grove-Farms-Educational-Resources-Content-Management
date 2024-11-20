const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const TempMail = require('temp-mail-api');

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
    topic: {type: String, required: true},
    youtubeId: { type: String, required: false },
    createDate: { type: Date, default: Date.now } 
});

// Create a model for resources
const Resource = mongoose.model('resourceInfo', resourceSchema);

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Define a Schema for events
const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
});
const Event = mongoose.model('Event', eventSchema);

// Define a Schema for event registration
const eventRegistrationSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'] // Email validation
    },
    name: {
        type:String,
        required: true,
    },
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    registration_date: {
        type: Date,
        default: Date.now
    }
});

const EventRegistration = mongoose.model('EventRegistration', eventRegistrationSchema);

// Signup route
app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already registered' });

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.json({ message: 'Signup successful' });
    } catch (err) {
        res.status(500).json({ message: 'Error signing up' });
    }
});

// Login route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in' });
    }
});


const jwt = require('jsonwebtoken');
const e = require('express');

app.post('/api/registerUser', async (req, res) => {
    const { fullname, dob, email, password, accountNumber } = req.body;
    const newUser = new User({ fullname, dob, email, password, accountNumber, isAdmin: false });
    
    try {
        await newUser.save();
        res.status(201).send('User account created successfully');
    } catch (error) {
        res.status(500).send('Error creating user account');
    }
});
// Route to handle admin registration (this should be secured)
app.post('/api/registerAdmin', async (req, res) => {
    const { fullname, dob, email, password, accountNumber } = req.body;
    const newAdmin = new User({ fullname, dob, email, password, accountNumber, isAdmin: true });

    try {
        await newAdmin.save();
        res.status(201).send('Admin account created successfully');
    } catch (error) {
        res.status(500).send('Error creating admin account');
    }
});

// Route for user login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.userId = decoded.id;
        req.isAdmin = decoded.isAdmin;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (!req.isAdmin) {
        return res.status(403).send('Access denied. Admins only.');
    }
    next();
};


// Define a route to handle resource creation
app.post('/api/createResource', async (req, res) => {
    const { title, link, description,topic, youtubeId } = req.body;
    const newResource = new Resource({ title, link, description, topic, youtubeId });

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

// Update a resource
app.put('/api/resourceInfo/:id', async (req, res) => {
    const { id } = req.params;
    const { title, link, description, topic ,youtubeId } = req.body;

    try {
        const updatedResource = await Resource.findByIdAndUpdate(
            id,
            { title, link, description, topic , youtubeId },
            { new: true } // Return the updated document
        );

        if (!updatedResource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        res.status(200).json(updatedResource);
    } catch (err) {
        console.error('Error updating resource:', err);
        res.status(500).json({ message: 'Error updating resource' });
    }
});

// Delete a resource
app.delete('/api/resourceInfo/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedResource = await Resource.findByIdAndDelete(id);

        if (!deletedResource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        res.status(200).json({ message: 'Resource deleted successfully' });
    } catch (error) {
        console.error('Error deleting resource:', error);
        res.status(500).json({ message: 'Error deleting resource' });
    }
});

//Route for creating a new event registration
app.post('/api/registerEvent', async (req, res) => {
    const {  name, email, eventId } = req.body;
 

    if (!name  || !email || !eventId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newRegistration = new EventRegistration({ email,name, event_id: eventId });

    try {
        const savedRegistration = await newRegistration.save();

        res.status(201).json(savedRegistration);
    } catch (err) {
        res.status(400).json({ message: 'Error registering for event', error: err });
        console.error('Error registering for event:', err);
    }
});


// Events

// Get all events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).send('Error fetching events' + err.message);
  }
});

// Get a specific event
app.get('/api/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching event' });
  }
});

// Create an event
app.post('/api/createEvent', async (req, res) => {
  const { name, description, date, location } = req.body;
  

  if (!name || !description || !date || !location) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newEvent = new Event({ name, description, date, location });
 

  try {
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: 'Error creating event', error: err });
    console.error('Error creating event:', err);
  }
});

// Update an event
app.put('/api/events/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: 'Error updating event' });
  }
});

// Delete an event
app.delete('/api/events/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
    const deletedReg = await EventRegistration.deleteMany({ event_id: req.params.id });
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting event', error: err });
  }
});

module.exports = {
    Resource,
    User,
    Event,
    EventRegistration,
    app
};



// Route to generate a temporary email address
app.get('/generate-temp-email', async (req, res) => {
    try {
        const tempMail = new TempMail();
        const email = await tempMail.getEmail(); // Get a temporary email
        res.json({ temporaryEmail: email });
    } catch (error) {
        console.error('Error generating temporary email:', error);
        res.status(500).send('Failed to generate temporary email');
    }
});

// Route to get a registration by ID
app.get('/api/regInfo/:eventId', async (req, res) => {
   
    try {
        const registrations = await EventRegistration.find({ event_id: req.params.eventId });
        res.status(200).json(registrations);
    } catch (err) {
        res.status(500).send('Error fetching registered users', err);
    }
});

// Change the port if necessary
const port = process.env.PORT || 5002;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
