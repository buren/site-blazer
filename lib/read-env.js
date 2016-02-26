var env = require('node-env-file');


try {
  // Load all environment variables from .env file
  env(__dirname + '/../.env');
} catch (err) {
  console.log("No .env file found! Please create one or you'll have to set all environment varialbes your self. If your running in production you can safely ignore this..");
}
