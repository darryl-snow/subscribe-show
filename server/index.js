const express = require('express');
const expressGraphQL = require('express-graphql');
const models = require('./models');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const schema = require('./schema/schema');
const findItem = require('./controllers/findItem');
const addItem = require('./controllers/addItem');

const app = express();
const PORT = process.env.PORT || 3000;

const MONGO_URI = 'mongodb://default:default@ds113648.mlab.com:13648/subscribe-show';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.post('/find', findItem);
app.post('/watchlist/new', addItem);

const query = `{ watchListItems { title } }`;

app.get('/watchListItems', (req, res, next) => {
  axios.post('http://localhost:3000/graphql', JSON.stringify(query, null))
    .then(response => {
      res.send(response);
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
