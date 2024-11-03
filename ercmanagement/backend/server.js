// backend/server.js
const express = require('express');
const oracledb = require('oracledb');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SID}`,
};

// Route to get events
app.get('/api/events', async (req, res) => {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute('SELECT * FROM events');
        
        // Check if result.rows is empty
        if (!result.rows.length) {
            return res.status(404).json({ error: 'No events found' });
        }

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching events' }); // Send a JSON error response
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});


// Route to add events
app.post('/api/events', async (req, res) => {
  const { title, date, description } = req.body;
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      'INSERT INTO events (title, date, description) VALUES (:title, :date, :description)',
      { title, date, description }
    );
    await connection.commit();
    res.status(201).send('Event added');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding event');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
