const express = require('express');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');

const models = require('./models');
const schema = require('./schema/schema');
const winston = require('./winston-config');
const webpackConfig = require('../webpack.config.js');

/**
 * Create the web server.
 */
const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Connect to the Database.
 */
const MONGO_URI = 'mongodb://default:default@ds113648.mlab.com:13648/subscribe-show';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

/**
 * Configure the server
 */
app.use(bodyParser.json());
app.use(morgan('combined', { stream: winston.stream }));

/**
 * Set up the route for GraphQL queries.
 */
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true,
}));

/**
 * Webpack runs as a middleware.  If any request comes in for the root route
 * ('/') Webpack will respond with the output of the webpack process: an HTML
 * file and a single bundle.js output of all of our client side Javascript.
 */
app.use(webpackMiddleware(webpack(webpackConfig)));

/**
 * Open the web server.
 */
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
