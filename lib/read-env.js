var env = require('node-env-file');

// Load all environment variables from .env file
env(__dirname + '/../.env');
