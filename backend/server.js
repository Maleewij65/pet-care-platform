const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Enable CORS for every origin
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   next();
});

// Connect database
connectDB();

// Init Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

require('dotenv').config();

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/animal', require('./routes/animal'));
app.use('/api/vaccination', require('./routes/vaccination'));

app.use('/api/event', require('./routes/event'));
app.use('/api/eventAttend', require('./routes/eventAttend'));

app.use('/api/adoption', require('./routes/adoption'));
app.use('/api/volunteer', require('./routes/volunteerRequest'));
app.use('/api/volunteerRespond', require('./routes/volunteerRespond'));

app.use('/api/eventFundRequest', require('./routes/eventFundRequest'));


app.use('/api/appointment', require('./routes/appointment'));

// Serve static files from the 'upload' folder
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
