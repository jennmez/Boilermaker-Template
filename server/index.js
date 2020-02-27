//creating the app through express server
const express = require('express');
const app = express();

//logging middleware
const morgan = require('morgan');

//parsing middleware
const bodyParser = require('body-parser');

//serving static middleware
app.use(express.static(path.join(__dirname, '../public')));

//routes
app.use('/api', require('./apiRoutes'));

//server should send its index.html for any requests that don't match one of our API routes. PLACE AFTER ROUTES
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

//500 Error handling. PLACE AT END OF SERVER FILE
app.use(function(err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

//Start the server
const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
app.listen(port, function() {
  console.log('Knock, knock');
  console.log("Who's there?");
  console.log(`Your server, listening on port ${port}`);
});
