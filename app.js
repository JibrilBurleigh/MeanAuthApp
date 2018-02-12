const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database);

// On connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

//On Error
mongoose.connection.on('error', (err) => {
    console.log('database error: ' + err);
});

const app = express();

const users = require('./routes/users')

// port number
const port = 3000;

// Cors middleware 
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

//Password Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport)

app.use('/users', users);

// index route
app.get('/', (req, res)  => {
    res.send("Invalid Endpoint");
});

// start servers
app.listen(port, () => {
    console.log('server started on port ' + port)
});
